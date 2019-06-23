import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    display: 'block',
    float: 'right',
  },
  input: {
    display: 'none',
  },
  btnWrapper: {
    width: '100%',
    float: 'right',
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.btnWrapper}>
      <Button variant="contained" className={classes.button} color="default">User</Button>
    </div>
  );
}

export default Login;
