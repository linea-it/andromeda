import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
  SortingState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { getNodes } from '../../api/Api';

const useStyles = makeStyles(({
  tableCell: {
    display: 'table-cell',
    padding: '14px 40px 14px 16px',
    fontSize: '1rem',
    textAlign: 'left',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.43',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    letterSpacing: '0.01071em',
    verticalAlign: 'inherit',
  },
}));

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
};

function GroupCellComponent({ row, ...restProps }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableGroupRow.Cell {...restProps} colSpan={2}>
        {row.value}
      </TableGroupRow.Cell>
      <td colSpan={1} className={classes.tableCell} />
      <td colSpan={1} className={classes.tableCell} />
      <td colSpan={1} className={classes.tableCell} />
      <td colSpan={1} className={classes.tableCell} />
      <td colSpan={1} className={classes.tableCell} />
      <td colSpan={1} className={classes.tableCell} />
    </React.Fragment>
  );
}

GroupCellComponent.propTypes = {
  row: PropTypes.objectOf(PropTypes.string).isRequired,
};

function Process(props) {
  const [nodes, setNodes] = useState([]);
  const columns = [
    { name: 'process', title: 'Process' },
    { name: 'status', title: 'Status' },
    { name: 'node', title: 'Node' },
    { name: 'core', title: 'Core' },
    { name: 'memory', title: 'Memory' },
    { name: 'disk', title: 'Disk' },
    { name: 'cpu', title: 'CPU' },
    { name: 'start_date', title: 'Start Date' },
  ];

  const tableColumnExtensions = [
    { columnName: 'status', width: 180 },
  ];

  const { owner, processes } = props;

  useEffect(() => {
    getNodes().then(data => setNodes(data));
  }, []);

  const rows = processes.filter((el) => {
    if (el.Owner === owner) {
      return el;
    }
    return null;
  }).map((el) => {
    let status = 'Unknown';

    if (el.JobStatus === '1') {
      status = 'Idle';
    } else if (el.JobStatus === '2') {
      status = 'Running';
    } else if (el.JobStatus === '3') {
      status = 'Removed';
    } else if (el.JobStatus === '4') {
      status = 'Completed';
    } else if (el.JobStatus === '5') {
      status = 'Held';
    } else if (el.JobStatus === '6') {
      status = 'Transferring Output';
    } else {
      status = 'Unknown';
    }

    const process = nodes.length > 0 ? nodes.filter(item => el.RemoteHost === item.Name) : null;

    return {
      process: el.Process ? el.Process : null,
      memory: process ? formatBytes(process[0].Memory * 1000000) : null,
      disk: process ? formatBytes(process[0].Disk * 1000) : null,
      cpu: process ? Number(process[0].TotalCpus) : null,
      status,
      node: el.RemoteHost ? el.RemoteHost.split('.')[0].split('@')[1] : null,
      core: el.RemoteHost ? el.RemoteHost.split('@')[0].split('slot').join('core') : null,
      start_date: el.JobStartDate ? moment.unix(el.JobStartDate).format('DD/MM/YY') : null,
    };
  });

  // console.log(rows);

  return (
    <Grid rows={rows} columns={columns}>
      <PagingState defaultCurrentPage={0} defaultPageSize={10} />
      <SortingState
        defaultSorting={[{ columnName: 'start_date', direction: 'desc' }]}
      />
      <IntegratedPaging />
      <IntegratedSorting />
      <GroupingState
        grouping={[{ columnName: 'process' }]}
      />
      <IntegratedGrouping />
      <Table columnExtensions={tableColumnExtensions} />
      <TableHeaderRow showSortingControls />
      <TableGroupRow cellComponent={GroupCellComponent} />
      <PagingPanel pageSizes={[5, 10, 15]} />
    </Grid>
  );
}

Process.defaultProps = {
  processes: [{}],
  owner: '',
};

Process.propTypes = {
  processes: PropTypes.arrayOf(PropTypes.object),
  owner: PropTypes.string,
};


export default Process;
