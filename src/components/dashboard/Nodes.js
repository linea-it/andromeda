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
    { name: 'node', title: 'Node' },
    { name: 'status', title: 'Status' },
    { name: 'load', title: 'Load' },
    { name: 'core', title: 'Core' },
    { name: 'jobs', title: 'Jobs' },
    { name: 'memory', title: 'Memory' },
    { name: 'disk', title: 'Disk' },
  ],
  rows: [
    {
      node: 'Lorem ipsum',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'Dolor sit',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'Consectetur adipiscing elit',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'In fermentum ligula',
      status: 'Inactive',
      load: 25,
      core: 20,
      jobs: 11,
      memory: 2555,
      disk: 123123,
    },
    {
      node: 'Sit amet nibh tristique',
      status: 'Inactive',
      load: 1123,
      core: 20,
      jobs: 22,
      memory: 24452,
      disk: 1231355,
    },
    {
      node: 'Diam consectetur',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'Nullam dignissim quam',
      status: 'Inactive',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'Consectetur adipiscing elit',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'In fermentum ligula',
      status: 'Inactive',
      load: 25,
      jobs: 11,
      memory: 2555,
      disk: 123123,
    },
    {
      node: 'Sit amet nibh tristique',
      status: 'Inactive',
      load: 1123,
      core: 2354,
      jobs: 22,
      memory: 24452,
      disk: 1231355,
    },
    {
      node: 'Diam consectetur',
      status: 'Active',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
    {
      node: 'Nullam dignissim quam',
      status: 'Inactive',
      load: 20,
      core: 20,
      jobs: 159,
      memory: 256,
      disk: 4000,
    },
  ],
  tableColumnExtensions: [
    { columnName: 'node', width: 230 },
    { columnName: 'status', width: 100 },
    { columnName: 'load', width: 80 },
    { columnName: 'core', width: 80 },
    { columnName: 'jobs', width: 80 },
    { columnName: 'memory', width: 100 },
    { columnName: 'disk', width: 80 },
  ],
};

function Nodes() {
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
          <span className={classes.headerTitle}>Nodes</span>
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
            defaultSorting={[{ columnName: 'node', direction: 'asc' }]}
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

export default Nodes;
