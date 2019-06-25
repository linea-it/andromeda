import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardStatus from './dashboard/CardStatus';
import Nodes from './dashboard/Nodes';
import Jobs from './dashboard/Jobs';
import Api from '../api/Api';

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


function Dashboard() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Dashboard</Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {
            [
              {
                title: 'Servers',
                active: 20,
                color: '#F2443F',
                icon: 'fa-server',
              },
              {
                title: 'Total Jobs',
                active: 1142,
                color: '#377ADA',
                icon: 'fa-rocket',
              },
              {
                title: 'Users',
                active: 5,
                color: '#FEBC4F',
                icon: 'fa-users',
              },
              {
                title: 'Jobs Running',
                active: 115,
                color: '#00C68D',
                icon: 'fa-running',
              },
            ].map(el => (
              <Grid key={el.title} item xs={12} sm={6} md={3}>
                <CardStatus
                  title={el.title}
                  services={el.active}
                  color={el.color}
                  icon={el.icon}
                />
              </Grid>
            ))
          }
        </Grid>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12} md={6}>
            <Nodes />
          </Grid>
          <Grid item xs={12} md={6}>
            <Jobs />
          </Grid>
        </Grid>
      </div>
      <Api />
    </React.Fragment>
  );
}

export default Dashboard;
