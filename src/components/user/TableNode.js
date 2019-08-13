import React, { useEffect, useState } from 'react';
import {
  SearchState,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CustomColumnChooser from './CustomColumnChooser';
import CustomTableHeaderRowCell from './CustomTableHeaderRowCell';
import { getNodes } from '../../api/Api';
import CustomTableGroupRow from './CustomTableGroupRow';


const useStyles = makeStyles(theme => ({
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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  closeIcon: {
    width: '.5em',
    height: '.5em',
  },
}));

function TableNode(props) {
  const classes = useStyles();
  const {
    process, showNodeTable, handleNodeClick, jobs,
  } = props;

  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    getNodes()
      .then((res => setNodes(res)));
  }, []);

  function slotsIncrementor(n, node) {
    let i = 1;
    const r = [];
    while (i <= n) {
      r.push({
        slot: `slot${i}`,
        node: node ? node.split('.')[0].split('@')[1] : null,
      });
      // eslint-disable-next-line no-plusplus
      i++;
    }
    return r;
  }

  const data = {
    columns: [
      { name: 'node', title: 'Node' },
      { name: 'slot', title: 'Slot' },
    ],
    rows: jobs.length > 0 ? jobs.map((job) => {
      const slots = job.RemoteHost.split('@')[0];
      if (job.RequiresWholeMachine === 'True') {
        const slotsAmount = Number(nodes.filter(node => node.Name === job.RemoteHost)[0].TotalCpus.split('.')[0]);
        return slotsIncrementor(slotsAmount, job.RemoteHost);
      }

      return [{
        node: job.RemoteHost ? job.RemoteHost.split('.')[0].split('@')[1] : null,
        slot: job.RemoteHost ? slots : null,
      }];
    })[0] : [],
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
            <React.Fragment>
              <IconButton aria-label="close" className={classes.closeButton} onClick={handleNodeClick}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
              <span className={classes.headerTitle}>{`PROCESS NAME: ${process}`}</span>
            </React.Fragment>
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
            <GroupingState
              grouping={[{ columnName: 'node' }]}
            />
            <IntegratedPaging />
            <IntegratedSorting />
            <IntegratedFiltering />
            <IntegratedGrouping />
            <Table columnExtensions={data.tableColumnExtensions} />
            <CustomTableHeaderRowCell />
            <CustomTableGroupRow
              rows={data.rows}
            />
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
  process: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  showNodeTable: PropTypes.bool.isRequired,
  handleNodeClick: PropTypes.func.isRequired,
};


export default TableNode;
