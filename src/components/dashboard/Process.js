import React from 'react';
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

function Process(props) {
  const columns = [
    { name: 'process', title: 'Process' },
    { name: 'status', title: 'Status' },
    { name: 'node', title: 'Node' },
    { name: 'core', title: 'Core' },
    { name: 'start_date', title: 'Start Date' },
  ];
  const { owner, processes } = props;

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

    return {
      process: el.Process ? el.Process : null,
      status,
      node: el.RemoteHost ? el.RemoteHost.split('.')[0].split('@')[1] : null,
      core: el.RemoteHost ? el.RemoteHost.split('@')[0] : null,
      start_date: el.JobStartDate ? moment.unix(el.JobStartDate).format('DD/MM/YY') : null,
    };
  });

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
      <Table />
      <TableHeaderRow showSortingControls />
      <TableGroupRow />
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
