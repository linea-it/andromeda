import React, { useEffect } from 'react';
import {
  SearchState,
  IntegratedFiltering,
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
  TableHeaderRow,
  PagingPanel,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import { getJobs, getNodes } from '../../api/Api';
import Process from './Process';
import CustomColumnChooser from './CustomColumnChooser';

const useStyles = makeStyles(theme => ({
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
  itemText: {
    fontSize: 12,
  },
  paper: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    right: 0,
    width: 'auto',
    maxWidth: '70%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0,
    outline: 'none',
  },
}));

function Jobs() {
  const classes = useStyles();
  const [jobs, setJobs] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [columnsPopup, setColumnsPopup] = React.useState([]);
  const [rowsPopup, setRowsPopup] = React.useState([]);

  function fetchJobs() {
    getJobs().then(res => setJobs(res));
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const data = {
    columns: [
      { name: 'process', title: 'Process' },
      { name: 'owner', title: 'Owner' },
      { name: 'startDate', title: 'Start Date' },
      { name: 'status', title: 'Status' },
      { name: 'node', title: 'Node' },
    ],
    rows: jobs.length >= 1 ? jobs.map((job) => {
      let status = 'Unknown';

      if (job.JobStatus === '1') {
        status = 'Idle';
      } else if (job.JobStatus === '2') {
        status = 'Running';
      } else if (job.JobStatus === '3') {
        status = 'Removed';
      } else if (job.JobStatus === '4') {
        status = 'Completed';
      } else if (job.JobStatus === '5') {
        status = 'Held';
      } else if (job.JobStatus === '6') {
        status = 'Transferring Output';
      } else {
        status = 'Unknown';
      }

      return {
        process: job.Process ? job.Process : null,
        owner: job.Owner ? job.Owner : null,
        startDate: job.JobStartDate ? moment.unix(job.JobStartDate).format('DD/MM/YY h:mm A') : null,
        status,
        node: job.RemoteHost ? job.RemoteHost.split('.')[0].split('@')[1] : null,
      };
    }) : [],
    tableColumnExtensions: [
      { columnName: 'process', width: 150 },
      { columnName: 'node', width: 230 },
    ],
  };

  function handleProcessClick(e) {
    setOpen(!open);

    const process = e.target.title;
    const owner = e.target.getAttribute('owner');
    jobs.forEach((el) => {
      if (el.Owner === owner) {
        const currentNode = el.RemoteHost.split('.')[0].split('@')[1];
        getNodes()
          .then((res) => {
            const nodes = res.filter(item => item.UtsnameNodename.trim() === currentNode.trim());
            const rows = [];
            nodes.forEach((item) => {
              rows.push({
                state: item.State,
                activity: item.Activity,
                memory: item.Memory,
                total_cpu: item.TotalCpus,
                disk: item.Disk,
                load_avg: item.LoadAvg,
              });
            });
            setRowsPopup(rows);
            // setNodesByProcess(nodes);
          });
      }
    });

    if (process) {
      setColumnsPopup([
        { name: 'state', title: 'State' },
        { name: 'activity', title: 'Activity' },
        { name: 'memory', title: 'Memory' },
        { name: 'total_cpu', title: 'Total CPUs' },
        { name: 'disk', title: 'Disk' },
        { name: 'load_avg', title: 'Load Average' },
      ]);
    }
  }

  function renderProcess(process, owner) {
    if (process) {
      return (
        <React.Fragment>
          <span title={process} owner={owner} onClick={handleProcessClick}>
            {process}
          </span>
          <Modal
            aria-labelledby="Jobs"
            open={open}
            onClose={handleProcessClick}
          >
            <div className={classes.paper}>
              <Process columns={columnsPopup} rows={rowsPopup} />
            </div>
          </Modal>
        </React.Fragment>
      );
    }
    return '-';
  }

  function renderOwner(owner) {
    if (owner) {
      return (
        <span title={owner}>
          {owner}
        </span>
      );
    }
    return '-';
  }

  function renderStartDate(startDate) {
    if (startDate) {
      return (
        <span title={startDate}>
          {startDate}
        </span>
      );
    }
    return '-';
  }

  function renderStatus(status) {
    if (status) {
      return (
        <span title={status}>
          {status}
        </span>
      );
    }
    return '-';
  }

  function renderNode(node) {
    if (node) {
      return (
        <span title={node}>
          {node}
        </span>
      );
    }
    return '-';
  }

  const rows = data.rows.map(row => ({
    process: renderProcess(row.process, row.owner),
    owner: renderOwner(row.owner),
    startDate: renderStartDate(row.startDate),
    status: renderStatus(row.status),
    node: renderNode(row.node),
  }));

  return (
    <Card className={classes.card}>
      <CardHeader
        title={(
          <span className={classes.headerTitle}>Jobs</span>
        )}
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid
          rows={rows}
          columns={data.columns}
        >

          <SearchState />
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <SortingState
            defaultSorting={[{ columnName: 'node', direction: 'asc' }]}
          />
          <IntegratedFiltering />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table columnExtensions={data.tableColumnExtensions} />
          <TableHeaderRow />
          <TableColumnVisibility />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
          <CustomColumnChooser />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Jobs;
