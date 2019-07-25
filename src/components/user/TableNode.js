import React from 'react';
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
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import CustomColumnChooser from './CustomColumnChooser';
import CustomTableHeaderRowCell from './CustomTableHeaderRowCell';


const useStyles = makeStyles(({
  card: {
    minHeight: 530,
    overflow: 'auto',
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

function TableNode(props) {
  const classes = useStyles();
  const { showNodeTable, handleNodeClick, nodes } = props;

  const data = {
    columns: [
      { name: 'node', title: 'Node' },
      { name: 'core', title: 'Core' },
    ],
    rows: nodes.length > 0 ? nodes.map(node => ({
      node: node.RemoteHost ? node.RemoteHost.split('.')[0].split('@')[1] : null,
      core: node.RemoteHost ? node.RemoteHost.split('@')[0].split('slot').join('core') : null,
    })) : [],
  };

  return (
    <Dialog
      onClose={handleNodeClick}
      aria-labelledby="nodes"
      open={showNodeTable}
      maxWidth="sm"
    >
      <Card className={classes.card}>
        <CardHeader
          title={(
            <span className={classes.headerTitle}>Nodes</span>
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
              defaultSorting={[{ columnName: 'node', direction: 'asc' }]}
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
    </Dialog>
  );
}


TableNode.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  showNodeTable: PropTypes.bool.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};


export default TableNode;
