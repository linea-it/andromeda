import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import '@fortawesome/fontawesome-free/css/all.min.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    display: 'block',
    float: 'right',
    textTransform: 'none',
    padding: '4px 12px',
    backgroundColor: '#34465d',
  },
  iconReport: {
    fontSize: 18,
    marginRight: 5,
    verticalAlign: 'middle',
    color: 'rgb(166, 185, 239)',
  },
  buttonWrapper: {
    float: 'right',
  },
}));

function Report() {
  const classes = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <Button variant="contained" className={classes.button} color="primary">
        <Icon className={clsx(classes.iconReport, 'fas', 'fa-download')} />
        Generate Report
      </Button>
    </div>
  );
}

export default Report;
