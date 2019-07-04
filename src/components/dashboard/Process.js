import React from 'react';
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
import PropTypes from 'prop-types';

const useStyles = makeStyles(({
  card: {
    maxHeight: 600,
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

function Process(props) {
  const classes = useStyles();
  const { columns, rows } = props;
  const data = { columns, rows };

  return (
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

Process.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Process;
