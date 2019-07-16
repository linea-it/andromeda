import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableUser from './user/TableUser';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
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


function User() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Users</Typography>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <TableUser />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default User;
