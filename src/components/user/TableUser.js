import React, { useEffect, useState } from 'react';
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
  const [activeProcessesByOwner, setActiveProcessesByOwner] = useState([]);
  const [userStats, setUserStats] = useState([]);


  function getActiveJobs() {
    api.getJobs()
      .then(data => setActiveJobs(data));
  }

  function getActiveProcessesByOwner(owner) {
    api.getProcessesByOwner(owner)
      .then(data => setActiveProcessesByOwner(processes => processes.concat([{ [`"${owner}"`]: data }])));
  }

  function getUsersStats() {
    api.getUsersStats()
      .then((data) => {
        setUserStats(data);
        if (data.length > 0) data.forEach(user => getActiveProcessesByOwner(user.Owner));
      });
  }

  useEffect(() => {
    getActiveJobs();
    getUsersStats();
  }, []);

  const data = {
    columns: [
      { name: 'user', title: 'Owner' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'processes', title: 'Processes' },
      { name: 'jobs', title: 'Jobs' },
      { name: 'cluster_utilization', title: 'Cluster %' },
    ],
    rows: userStats.length > 0 ? userStats.map((user) => {
      const processes = activeProcessesByOwner.map(processesArr => (
        processesArr[`"${user.Owner}"`]
          ? processesArr[`"${user.Owner}"`]
          : null
      )).filter(processesArr => processesArr !== null)[0];

      const jobs = activeJobs.filter(
        job => job.Owner === user.Owner && job.ClusterName === user.Cluster,
      );

      return {
        user: user.Owner ? user.Owner : null,
        cluster: user.Cluster ? user.Cluster : null,
        processes: processes
          ? processes.filter(
            process => process.Owner === user.Owner && process.ClusterName === user.Cluster,
          ).length
          : null,
        jobs: jobs ? jobs.length : null,
        cluster_utilization: user ? `${user.ClusterUtilization.toFixed(2)}%` : null,
      };
    }) : [],
    tableColumnExtensions: [
      { columnName: 'cluster_utilization', width: 180 },
    ],
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={(
          <span className={classes.headerTitle}>Users</span>
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
          <IntegratedFiltering />
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
