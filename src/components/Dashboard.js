import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardStatus from './dashboard/CardStatus';
import ActiveUsers from './dashboard/ActiveUsers';
import Chart from './dashboard/Chart';
import * as api from '../api/Api';

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
  const [servers, setServers] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [jobsRunning, setJobsRunning] = React.useState([]);

  function getUniqueServers() {
    api.getActiveServers()
      .then((res) => {
        setServers(res);
      });
  }

  function getJobs() {
    api.getJobs()
      .then((res) => {
        setJobs(res);
      });
  }

  function getUniqueUsers() {
    api.getUniqueUsers()
      .then((res) => {
        setUsers(res);
      });
  }

  function getJobsRunning() {
    api.getJobsRunning()
      .then((res) => {
        setJobsRunning(res);
      });
  }

  useEffect(() => {
    getUniqueServers();
    getJobs();
    getUniqueUsers();
    getJobsRunning();
  }, []);

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
                active: servers.length,
                color: '#F2443F',
                icon: 'fa-server',
              },
              {
                title: 'Total Jobs',
                active: jobs.length,
                color: '#377ADA',
                icon: 'fa-rocket',
              },
              {
                title: 'Users',
                active: users.length,
                color: '#FEBC4F',
                icon: 'fa-users',
              },
              {
                title: 'Jobs Running',
                active: jobsRunning.length,
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
          <Grid item xs={12}>
            <Chart />
          </Grid>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <ActiveUsers />
          </Grid>
          {/* <Grid item xs={12}>
            <Jobs />
          </Grid> */}
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
