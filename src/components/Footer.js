import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  footerWrapper: {
    float: 'left',
    width: '100%',
    height: 41,
    boxShadow: '0px -2px 4px -1px rgba(0, 0, 0, 0.2)',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#858797',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footerWrapper}>
      <p className={classes.footerText}>Portal Monitor</p>
    </footer>
  );
}

export default Footer;
