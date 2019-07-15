import React from 'react';
import PropTypes from 'prop-types';
import {
  PagingState, IntegratedPaging, IntegratedSorting, SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import moment from 'moment';


function Process(props) {
  const columns = [
    { name: 'process', title: 'Process' },
    { name: 'start_date', title: 'Start Date' },
    { name: 'status', title: 'Status' },
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
      start_date: el.JobStartDate ? moment.unix(el.JobStartDate).format('DD/MM/YY') : null,
      status,
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
      <Table />
      <TableHeaderRow showSortingControls />
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
