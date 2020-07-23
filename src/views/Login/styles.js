import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  avatar: {
    margin: 3,
    justifyContent: 'end',
  },
  buttonWrapper: {
    width: '100%',
    float: 'right',
  },
  buttonText: {
    textTransform: 'none',
    textAlign: 'right',
    paddingRight: 5,
    color: 'rgb(160, 151, 157)',
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
    padding: '3px 0',
    display: 'block',
    float: 'right',
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    borderLeft: '1px solid rgb(227, 230, 240)',
    borderRadius: 0,
    minWidth: 120,
    '&:active': {
      boxShadow: 'none',
    },
  },
  icon: {
    fontSize: 12,
    width: 'auto',
    color: 'rgb(160, 151, 157)',
  },
  listItemIcon: {
    minWidth: 24,
  },
  itemText: {
    fontSize: '.875em',
    color: 'rgb(160, 151, 157)',
  },
  menuItem: {
    padding: '.25rem 1.5rem',
  },
}));

export default styles;
