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
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import * as api from '../../api/Api';

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
}));

function ActiveUsers() {
  const classes = useStyles();
  const [usersStats, setUsersStats] = React.useState([]);

  function getUsersStats() {
    api.getUsersStats()
      .then((res) => {
        setUsersStats(res);
      });
  }

  useEffect(() => {
    getUsersStats();
  }, []);

  const data = {
    columns: [
      { name: 'user', title: 'Owner' },
      { name: 'processes', title: 'Portal Processes' },
      { name: 'submited', title: 'Manualy Submited' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'running', title: 'Jobs Running' },
      { name: 'waiting', title: 'Jobs Waiting' },
      { name: 'percentage_utilization', title: '% Cluster Utilization' },
    ],
    rows: usersStats.map(user => ({
      user: user.Owner,
      processes: user.PortalProcesses,
      submited: user.ManualJobs,
      cluster: user.Cluster,
      running: user.Running,
      waiting: user.Waiting,
      percentage_utilization: `${user.ClusterUtilization}%`,
    })),
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
          <IntegratedFiltering />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table columnExtensions={data.tableColumnExtensions} />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ActiveUsers;
