import React, { useEffect, useState } from 'react';
import {
  SearchState,
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  Toolbar,
  SearchPanel,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import '../ResourceUsage';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CustomColumnChooser from '../../../utils/CustomColumnChooser';
import CustomTableHeaderRowCell from '../../../utils/CustomTableHeaderRowCell';
import { getNodes } from '../../../api/Api';
import CustomTableGroupRow from '../../../utils/CustomTableGroupRow';
import useStyles from './styles';

function TableNode(props) {
  const classes = useStyles();
  const {
    process, showNodeTable, handleNodeClick, jobs,
  } = props;

  const [nodes, setNodes] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getNodes()
      .then((res => setNodes(res)));
  }, []);

  function slotsIncrementor(n, node, imageSize) {
    let i = 1;
    const r = [];
    while (i <= n) {
      // eslint-disable-next-line no-loop-func
      const cpu = nodes.filter(el => el.Name === `slot${i}@${node.split('@')[1]}`)[0].LoadAvg;
      r.push({
        slot: `slot${i}`,
        node: node ? node.split('.')[0].split('@')[1] : null,
        imageSize,
        cpu,
      });
      // eslint-disable-next-line no-plusplus
      i++;
    }
    return r;
  }

  const columns = [
    { name: 'node', title: 'Node' },
    { name: 'slot', title: 'Slot' },
    { name: 'cpu', title: 'CPU' },
    { name: 'memory', title: 'Memory' },
  ];
  const showNode = (remoteHost) => {
    if (remoteHost) {
      return remoteHost.split('.')[0].split('@')[1];
    }
    return '-';
  };

  useEffect(() => {
    let lines = [];
    if (jobs.length > 0) {
      jobs.forEach((job) => {
        const slots = job.RemoteHost.split('@')[0];
        if (job.RequiresWholeMachine === 'True') {
          const slotsAmount = Number(nodes.filter(node => node.Name === job.RemoteHost)[0].TotalCpus.split('.')[0]);
          lines = lines.concat(slotsIncrementor(slotsAmount, job.RemoteHost, job.ImageSize));
        } else {
          lines = lines.concat(rows.concat([{
            node: showNode(job.RemoteHost),
            slot: job.RemoteHost ? slots : null,
            imageSize: job.ImageSize ? job.ImageSize : null,
            cpu: nodes.filter(node => node.Name === job.RemoteHost)[0].LoadAvg,
          }]));
        }
      });
      setRows(lines);
    }
    // eslint-disable-next-line
  }, [jobs]);


  return (
    <Dialog
      onClose={handleNodeClick}
      aria-labelledby="nodes"
      open={showNodeTable}
      maxWidth="md"
    >
      <Card className={classes.card}>
        <CardHeader
          title={(
            <>
              <IconButton aria-label="close" className={classes.closeButton} onClick={handleNodeClick}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
              <span className={classes.headerTitle}>{`PROCESS NAME: ${process}`}</span>
            </>
          )}
          className={classes.cardHeader}
        />
        <CardContent>
          <Grid
            rows={rows}
            columns={columns}
          >
            <SearchState />
            <SortingState
              defaultSorting={[{ columnName: 'node', direction: 'asc' }]}
            />
            <GroupingState
              grouping={[{ columnName: 'node' }]}
            />
            <IntegratedSorting />
            <IntegratedFiltering />
            <IntegratedGrouping />
            <VirtualTable />
            <CustomTableHeaderRowCell />
            <CustomTableGroupRow
              rows={rows}
            />
            <TableColumnVisibility />
            <Toolbar />
            <SearchPanel />
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
