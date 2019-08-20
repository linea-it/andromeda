import React from 'react';
import PropTypes from 'prop-types';
import { TableGroupRow } from '@devexpress/dx-react-grid-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableCell: {
    display: 'table-cell',
    padding: '14px 40px 14px 7px',
    fontSize: '1rem',
    textAlign: 'left',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.43',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    letterSpacing: '0.01071em',
    verticalAlign: 'inherit',
    cursor: 'pointer',
  },
  groupTitle: {
    fontWeight: 'bolder',
    color: 'rgb(85, 85, 85)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});


function CustomTableGroupRow({ rows }) {
  const classes = useStyles();

  const TableGroupRowCell = ({ ...restProps }) => {
    const slotsQty = rows.filter(row => row.node === restProps.row.value).length;
    return (
      <React.Fragment>
        <TableGroupRow.Cell {...restProps} colSpan={2} className={classes.groupTitle}>
          {restProps.row.value}
        </TableGroupRow.Cell>
        <td className={classes.tableCell} onClick={restProps.onToggle}>
          <span className={classes.groupTitle}>{slotsQty > 1 ? `${slotsQty} slots` : `${slotsQty} slot`}</span>
        </td>
      </React.Fragment>
    );
  };

  const GroupCellContent = ({ ...restProps }) => (
    <span>
      <strong>
        {restProps.row.value}
      </strong>
    </span>
  );

  return (
    <TableGroupRow
      cellComponent={TableGroupRowCell}
      contentComponent={GroupCellContent}
      showColumnsWhenGrouped
    />
  );
}


CustomTableGroupRow.defaultProps = {
  restProps: {
    row: [],
  },
};

CustomTableGroupRow.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  restProps: PropTypes.shape({
    row: PropTypes.array,
  }),
};

export default CustomTableGroupRow;
