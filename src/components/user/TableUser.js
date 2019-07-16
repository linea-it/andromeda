import React, { useEffect, useState } from 'react';
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
import * as api from '../../api/Api';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomTableHeaderRowCell from './CustomTableHeaderRowCell';
import CustomColumnChooser from './CustomColumnChooser';

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
}));

function TableUser() {
  const classes = useStyles();
  const [activeJobs, setActiveJobs] = useState([]);


  function getActiveJobs() {
    api.getJobs()
      .then(data => setActiveJobs(data));
  }

  useEffect(() => {
    getActiveJobs();
  }, []);

  const data = {
    columns: [
      { name: 'user', title: 'Owner' },
      { name: 'process', title: 'Process' },
      { name: 'start_date', title: 'Start Date' },
      { name: 'status', title: 'Status' },
      { name: 'submitted', title: 'Submitted' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'node', title: 'Node' },
      { name: 'core', title: 'Core' },
    ],
    rows: activeJobs.map((job) => {
      let submitted = '';
      let status = 'Unknown';

      if (job.Process.indexOf(100) === 0) {
        submitted = 'Portal';
      } else {
        submitted = 'Manual';
      }

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
        user: job.Owner ? job.Owner : null,
        process: job.Process ? job.Process : null,
        start_date: job.JobStartDate ? moment.unix(job.JobStartDate).format('DD/MM/YY HH:mm') : null,
        status: job.JobStatus ? status : null,
        submitted: job.Process ? submitted : null,
        cluster: 'ICEX',
        node: job.RemoteHost ? job.RemoteHost.split('.')[0].split('@')[1] : null,
        core: job.RemoteHost ? job.RemoteHost.split('@')[0].split('slot').join('core') : null,
      };
    }),
    tableColumnExtensions: [
      { columnName: 'running', width: 130 },
      { columnName: 'waiting', width: 130 },
      { columnName: 'percentage_utilization', width: 180 },
    ],
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={(
          <span className={classes.headerTitle}>Active Users</span>
        )}
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid
          rows={data.rows}
          columns={data.columns}
        >
          <SearchState />
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <SortingState
            defaultSorting={[{ columnName: 'user', direction: 'asc' }]}
          />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table columnExtensions={data.tableColumnExtensions} />
          <CustomTableHeaderRowCell />
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

export default TableUser;
