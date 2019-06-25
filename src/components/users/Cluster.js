import * as React from 'react';
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
    color: 'rgb(100, 117, 223)',
    fontSize: 14,
    fontWeight: 'bold',
  },
}));

const data = {
  columns: [
    { name: 'user', title: 'User' },
    { name: 'processes', title: 'Portal Processes' },
    { name: 'submited', title: 'Jobs Manualy Submited' },
    { name: 'cluster', title: 'Cluster' },
    { name: 'running', title: 'Jobs Running' },
    { name: 'waiting', title: 'Jobs Waiting' },
    { name: 'percentage_utilization', title: '% Cluster Utilization' },
  ],
  rows: [
    {
      user: 'Lorem ipsum',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'Dolor sit',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'Consectetur adipiscing elit',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'In fermentum ligula',
      processes: 'Inactive',
      submited: 25,
      cluster: 20,
      running: 11,
      waiting: 2555,
      percentage_utilization: 123123,
    },
    {
      user: 'Sit amet nibh tristique',
      processes: 'Inactive',
      submited: 1123,
      cluster: 20,
      running: 22,
      waiting: 24452,
      percentage_utilization: 1231355,
    },
    {
      user: 'Diam consectetur',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'Nullam dignissim quam',
      processes: 'Inactive',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'Consectetur adipiscing elit',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'In fermentum ligula',
      processes: 'Inactive',
      submited: 25,
      running: 11,
      waiting: 2555,
      percentage_utilization: 123123,
    },
    {
      user: 'Sit amet nibh tristique',
      processes: 'Inactive',
      submited: 1123,
      cluster: 2354,
      running: 22,
      waiting: 24452,
      percentage_utilization: 1231355,
    },
    {
      user: 'Diam consectetur',
      processes: 'Active',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
    {
      user: 'Nullam dignissim quam',
      processes: 'Inactive',
      submited: 20,
      cluster: 20,
      running: 159,
      waiting: 256,
      percentage_utilization: 4000,
    },
  ],
  tableColumnExtensions: [
    { columnName: 'user', width: 320 },
    { columnName: 'processes', width: 200 },
    { columnName: 'submited', width: 200 },
    { columnName: 'cluster', width: 200 },
    { columnName: 'running', width: 200 },
    { columnName: 'waiting', width: 200 },
    { columnName: 'percentage_utilization', width: 200 },
  ],
};

function Cluster() {
  // const [rows, setRows] = React.useState(data.rows);
  // const [columns, setColumns] = React.useState(data.columns);
  // const [tableColumnExtensions, setTableColumnExtensions] =
  // React.useState(data.tableColumnExtensions);

  const classes = useStyles();
  const [rows] = React.useState(data.rows);
  const [columns] = React.useState(data.columns);
  const [tableColumnExtensions] = React.useState(data.tableColumnExtensions);

  return (
    <Card className={classes.card}>
      <CardHeader
        title={(
          <span className={classes.headerTitle}>Cluster</span>
        )}
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid
          rows={rows}
          columns={columns}
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
          <Table columnExtensions={tableColumnExtensions} />
          <TableHeaderRow showSortingControls />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Cluster;
