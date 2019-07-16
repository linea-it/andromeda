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


function Cores(props) {
  const columns = [
    { name: 'node', title: 'Node' },
    { name: 'core', title: 'Core' },
  ];
  const { owner, cores } = props;

  const rows = cores.filter(el => (el.Owner === owner ? el : null)).map(el => ({
    node: el.RemoteHost ? el.RemoteHost.split('.')[0].split('@')[1] : null,
    core: el.RemoteHost ? el.RemoteHost.split('@')[0].split('slot').join('core') : null,
  })).filter(el => el.node && el.core !== null);

  return (
    <Grid rows={rows} columns={columns}>
      <PagingState defaultCurrentPage={0} defaultPageSize={10} />
      <SortingState
        defaultSorting={[{ columnName: 'node', direction: 'asc' }]}
      />
      <IntegratedPaging />
      <IntegratedSorting />
      <Table />
      <TableHeaderRow showSortingControls />
      <PagingPanel pageSizes={[5, 10, 15]} />
    </Grid>
  );
}


Cores.propTypes = {
  cores: PropTypes.arrayOf(PropTypes.object).isRequired,
  owner: PropTypes.string.isRequired,
};


export default Cores;
