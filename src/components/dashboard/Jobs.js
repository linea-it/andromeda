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
    { name: 'process', title: 'Process' },
    { name: 'owner', title: 'Owner' },
    { name: 'status', title: 'Status' },
    { name: 'node', title: 'Node' },
  ],
  rows: [
    {
      process: 'Lorem ipsum',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'Dolor sit',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'Consectetur adipiscing elit',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'In fermentum ligula',
      owner: 'Inactive',
      status: 25,
      node: 20,
    },
    {
      process: 'Sit amet nibh tristique',
      owner: 'Inactive',
      status: 1123,
      node: 20,
    },
    {
      process: 'Diam consectetur',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'Nullam dignissim quam',
      owner: 'Inactive',
      status: 20,
      node: 20,
    },
    {
      process: 'Consectetur adipiscing elit',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'In fermentum ligula',
      owner: 'Inactive',
      status: 25,
      node: 11,
    },
    {
      process: 'Sit amet nibh tristique',
      owner: 'Inactive',
      status: 1123,
      node: 2354,
    },
    {
      process: 'Diam consectetur',
      owner: 'Active',
      status: 20,
      node: 20,
    },
    {
      process: 'Nullam dignissim quam',
      owner: 'Inactive',
      status: 20,
      node: 20,
    },
  ],
  tableColumnExtensions: [
    { columnName: 'process', width: 260 },
    { columnName: 'owner', width: 120 },
    { columnName: 'status', width: 100 },
    { columnName: 'node', width: 100 },
  ],
};

function Jobs() {
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
          defaultSorting={[{ columnName: 'process', direction: 'asc' }]}
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

export default Jobs;
