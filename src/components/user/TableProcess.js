import React, { useEffect, useState, Fragment } from 'react';
import {
  SearchState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
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
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);


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

  function handleNodeClick(nodes) {
    if (showNodeTable === false) {
      setNodeTableData(nodes);
    }
    setShowNodeTable(!showNodeTable);
  }

  function showNodes(remoteHosts, nodes) {
    if (nodes.length > 0) {
      return (
        <Button onClick={() => handleNodeClick(remoteHosts)}>{nodes.length}</Button>
      );
    }

    return (
      <span className={classes.nodeFakeBtn}>
        {nodes.length}
      </span>
    );
  }


  function getData() {
    const columns = [
      { name: 'user', title: 'Owner' },
      { name: 'process', title: 'Process' },
      { name: 'start_date', title: 'Start Date' },
      { name: 'submitted', title: 'Submitted' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'status', title: 'Status' },
      { name: 'nodes', title: 'Nodes' },
    ];

    const rows = activeProcesses.map((process) => {
      const jobs = activeJobs.filter(job => job.Process === process.Process);
      const remoteHosts = jobs.filter((obj, pos, arr) => (obj.RemoteHost
        ? arr.map(mapObj => mapObj.RemoteHost).indexOf(obj.RemoteHost) === pos
        : null
      ));
      const nodes = remoteHosts.map(mapObj => mapObj.RemoteHost.split('.')[0].split('@')[1]).filter((node, i, arr) => arr.indexOf(node) === i);

      let submitted = '';
      let status = 'Unknown';

      if (process.Process && process.Process.indexOf(100) === 0) {
        submitted = 'Portal';
      } else {
        submitted = 'Manual';
      }

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

      return {
        user: process.Owner ? process.Owner : null,
        process: process.Process ? process.Process : null,
        start_date: process.JobStartDate ? showStartDate(process.JobStartDate) : null,
        status: process.JobStatus ? status : null,
        submitted: process.Process ? submitted : null,
        cluster: process.ClusterName ? process.ClusterName : null,
        nodes: nodes ? showNodes(remoteHosts, nodes) : null,
      };
    }).filter(row => row.user.indexOf(searchValue) > -1 || row.process.indexOf(searchValue) > -1);

    setData({ columns, rows });
  }

  useEffect(() => {
    getActiveJobs();
    getActiveProcesses();
    getData();
  }, [loading, searchValue]);


  function handleSearchValue(value) {
    setSearchValue(value);
    setCurrentPage(0);
  }

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
              defaultSorting={[{ columnName: 'start_date', direction: 'asc' }]}
            />
            <IntegratedPaging />
            <IntegratedSorting />
            <Table />
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
        showNodeTable={showNodeTable}
        handleNodeClick={handleNodeClick}
        nodes={nodeTableData}
      />
    </Fragment>
  );
}

export default TableProcess;
