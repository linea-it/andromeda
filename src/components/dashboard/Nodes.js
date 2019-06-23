import * as React from 'react';
import Paper from '@material-ui/core/Paper';
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
    { columnName: 'node', width: 260 },
    { columnName: 'status', width: 120 },
    { columnName: 'core', width: 100 },
    { columnName: 'jobs', width: 100 },
    { columnName: 'memory', width: 100 },
    { columnName: 'disk', width: 100 },
  ],
};

function Nodes() {
  // const [rows, setRows] = React.useState(data.rows);
  // const [columns, setColumns] = React.useState(data.columns);
  // const [tableColumnExtensions, setTableColumnExtensions] =
  // React.useState(data.tableColumnExtensions);

  const [rows] = React.useState(data.rows);
  const [columns] = React.useState(data.columns);
  const [tableColumnExtensions] = React.useState(data.tableColumnExtensions);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <SearchState />
        <PagingState
          defaultCurrentPage={0}
          pageSize={5}
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
    </Paper>
  );
}

export default Nodes;
