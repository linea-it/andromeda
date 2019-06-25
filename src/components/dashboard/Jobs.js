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
  itemText: {
    fontSize: 12,
  },
}));

const data = {
  columns: [
    { name: 'process', title: 'Process' },
    { name: 'owner', title: 'Owner' },
    { name: 'status', title: 'Status' },
    { name: 'node', title: 'Node' },
  ],
  rows: [
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Lorem ipsum',
    },
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Dolor sit',
    },
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Consectetur adipiscing elit',
    },
    {
      process: 2324213140,
      owner: 'Jane Doe',
      status: 25,
      node: 'In fermentum ligula',
    },
    {
      process: 2324213140,
      owner: 'Jane Doe',
      status: 'Inactive',
      node: 'Sit amet nibh tristique',
    },
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Diam consectetur',
    },
    {
      process: 2324213140,
      owner: 'Jane Doe',
      status: 'Running',
      node: 'Nullam dignissim quam',
    },
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Consectetur adipiscing elit',
    },
    {
      process: 1324213141,
      owner: 'Jane Doe',
      status: 'Inactive',
      node: 'In fermentum ligula',
    },
    {
      process: 232421314354,
      owner: 'Jane Doe',
      status: 'Inactive',
      node: 'Sit amet nibh tristique',
    },
    {
      process: 2324213140,
      owner: 'John Doe',
      status: 'Running',
      node: 'Diam consectetur',
    },
    {
      process: 2324213140,
      owner: 'Jane Doe',
      status: 'Running',
      node: 'Nullam dignissim quam',
    },
  ],
  tableColumnExtensions: [
    { columnName: 'process', width: 150 },
    { columnName: 'owner', width: 150 },
    { columnName: 'status', width: 80 },
    { columnName: 'node', width: 230 },
  ],
};

function Jobs() {
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
          <span className={classes.headerTitle}>Jobs</span>
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

export default Jobs;
