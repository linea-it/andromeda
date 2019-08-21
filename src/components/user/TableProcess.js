import React, { useEffect, useState, Fragment } from 'react';
import {
  SearchState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  PagingPanel,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '@material-ui/core/Button';
import CustomColumnChooser from './CustomColumnChooser';
import CustomTableHeaderRowCell from './CustomTableHeaderRowCell';
import * as api from '../../api/Api';
import TableNode from './TableNode';


const useStyles = makeStyles(({
  card: {
    minHeight: 530,
  },
  cardHeader: {
    backgroundColor: 'rgb(248, 249, 252)',
    borderBottom: '1px solid rgb(227, 230, 240)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerTitle: {
    color: '#34465d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconList: {
    fontSize: 24,
    cursor: 'pointer',
  },
  nodeFakeBtn: {
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    padding: '6px 8px',
    minWidth: 64,
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    textAlign: 'center',
  },
}));

function TableProcess() {
  const classes = useStyles();
  const [data, setData] = useState({ columns: [], rows: [] });
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeProcesses, setActiveProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNodeTable, setShowNodeTable] = useState(false);
  const [nodeTableData, setNodeTableData] = useState([]);
  const [nodeTableProcess, setNodeTableProcess] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([{ columnName: 'start_date', direction: 'desc' }]);

  function getActiveJobs() {
    api.getJobs()
      .then((res) => {
        setActiveJobs(res);
      });
  }

  function getActiveProcesses() {
    api.getProcesses()
      .then((res) => {
        setActiveProcesses((res));
        setLoading(false);
      });
  }

  function showStartDate(date) {
    return (
      <span title={moment.unix(date).format('HH:mm')}>
        {moment.unix(date).format('DD/MM/YY')}
      </span>
    );
  }

  function handleNodeClick(process, jobs) {
    if (showNodeTable === false) {
      setNodeTableProcess(process);
      setNodeTableData(jobs);
    }
    setShowNodeTable(!showNodeTable);
  }

  function showNodes(process, remoteHosts, nodes) {
    if (nodes.length > 0) {
      return (
        <Button onClick={() => handleNodeClick(process, remoteHosts)}>{nodes.length}</Button>
      );
    }

    return (
      <span className={classes.nodeFakeBtn}>
        {nodes.length}
      </span>
    );
  }

  function loadData(sort) {
    const columns = [
      { name: 'user', title: 'Owner' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'submitted', title: 'Submitted' },
      { name: 'process', title: 'Process' },
      { name: 'start_date', title: 'Start Date' },
      { name: 'status', title: 'Status' },
      { name: 'nodes', title: 'Nodes' },
    ];


    let rows = activeProcesses.map((process) => {
      const jobs = activeJobs.filter(
        job => job.Process === process.Process
        && job.ClusterName === process.ClusterName,
      );

      const remoteHosts = jobs
        .filter((obj, pos, arr) => obj.RemoteHost
          && arr.map(mapObj => mapObj.RemoteHost + mapObj.Owner)
            .indexOf(obj.RemoteHost + process.Owner) === pos);

      const nodes = remoteHosts
        .map(mapObj => mapObj.RemoteHost.split('.')[0].split('@')[1]);

      let submitted = '';
      let status = 'Unknown';

      if (process.Process && process.Process.indexOf(100) === 0) {
        submitted = 'Portal';
      } else {
        submitted = 'Manual';
      }

      if (jobs.length > 0) {
        if (jobs[0].JobStatus === '1') {
          status = 'Idle';
        } else if (jobs[0].JobStatus === '2') {
          status = 'Running';
        } else if (jobs[0].JobStatus === '3') {
          status = 'Removed';
        } else if (jobs[0].JobStatus === '4') {
          status = 'Completed';
        } else if (jobs[0].JobStatus === '5') {
          status = 'Hold';
        } else if (jobs[0].JobStatus === '6') {
          status = 'Transferring Output';
        } else {
          status = 'Unknown';
        }
      }

      if (jobs.filter(job => job.JobStatus === '2').length > 0) {
        status = 'Running';
      }

      return {
        user: process.Owner ? process.Owner : null,
        process: process.Process ? process.Process : null,
        start_date: process.JobStartDate ? showStartDate(process.JobStartDate) : null,
        start_date_data: process.JobStartDate ? process.JobStartDate : null,
        status: process.JobStatus ? status : null,
        submitted: process.Process ? submitted : null,
        cluster: process.ClusterName ? process.ClusterName : null,
        nodes: nodes ? showNodes(process.Process, remoteHosts, nodes) : null,
        nodes_data: nodes ? nodes.length : null,
      };
    })
      .filter(row => (
        row.user
          ? row.user.indexOf(searchValue) > -1
          || row.process.indexOf(searchValue) > -1
          : row
      ))
      // eslint-disable-next-line consistent-return
      .sort((a, b) => {
        const sortState = sort || sorting;
        if (sortState) {
          if (sortState[0].columnName === 'start_date' || sortState[0].columnName === 'nodes') {
            return a[`${sortState[0].columnName}_data`] > b[`${sortState[0].columnName}_data`] ? 1 : -1;
          }
          return a[sortState[0].columnName] > b[sortState[0].columnName] ? 1 : -1;
        }
      });


    const sortState = sort || sorting;
    if (sortState[0].direction === 'desc') {
      rows = rows.reverse();
    }

    setData({ columns, rows });
  }

  function handleSorting(value) {
    setSorting(value);
    loadData(value);
  }

  function handleSearchValue(value) {
    setSearchValue(value);
    setCurrentPage(0);
    loadData();
  }

  useEffect(() => {
    getActiveJobs();
    getActiveProcesses();
    loadData();
  }, [loading]);

  const changeCurrentPage = pageNumber => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          title={(
            <span className={classes.headerTitle}>Processes</span>
          )}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid
            rows={data.rows}
            columns={data.columns}
          >
            <SearchState
              value={searchValue}
              onValueChange={handleSearchValue}
            />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={changeCurrentPage}
              defaultCurrentPage={0}
              pageSize={10}
            />
            <SortingState
              defaultSorting={sorting}
              onSortingChange={handleSorting}
            />
            <IntegratedPaging />
            <IntegratedSorting />
            <Table />
            <IntegratedFiltering />
            <CustomTableHeaderRowCell />
            <TableColumnVisibility />
            <Toolbar />
            <SearchPanel />
            <PagingPanel />
            <CustomColumnChooser />
          </Grid>
        </CardContent>
      </Card>
      <TableNode
        process={nodeTableProcess}
        showNodeTable={showNodeTable}
        handleNodeClick={handleNodeClick}
        jobs={nodeTableData}
      />
    </Fragment>
  );
}

export default TableProcess;
