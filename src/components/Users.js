import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ActiveUsers from './users/ActiveUsers';
import Cluster from './users/Cluster';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardsContainer: {
    paddingTop: 20,
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '400',
    color: '#5a5c69',
    marginBottom: 0,
  },
}));


function Users() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Users</Typography>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12} md={12}>
            <ActiveUsers />
          </Grid>
          <Grid item xs={12} md={12}>
            <Cluster />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Users;
