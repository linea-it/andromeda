import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardStatus from './dashboard/CardStatus';
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
  const [jobs, setJobs] = React.useState([]);
  const [nodes, setNodes] = React.useState([]);
  const [cores, setCores] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [jobsRunning, setJobsRunning] = React.useState([]);
  const [jobsIdle, setJobsIdle] = React.useState([]);

  function getJobs() {
    api.getJobs()
      .then((res) => {
        setJobs(res);
      });
  }

  function getNodes() {
    api.getNodes()
      .then((res) => {
        const allNodes = res.map(el => el.UtsnameNodename);
        const uniqueNodes = allNodes.filter((el, i) => allNodes.indexOf(el) === i);
        const allCores = res.map(el => el.Name);
        const uniqueCores = allCores.filter((el, i) => allCores.indexOf(el) === i);
        setNodes(uniqueNodes);
        setCores(uniqueCores);
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

  function getJobsIdle() {
    api.getJobsIdle()
      .then((res) => {
        setJobsIdle(res);
      });
  }

  useEffect(() => {
    getNodes();
    getJobs();
    getUniqueUsers();
    getJobsRunning();
    getJobsIdle();
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
                title: 'Users',
                active: users.length,
                color: '#FEBC4F',
                icon: 'fa-users',
              },
              {
                title: 'Processes',
                active: jobs.length,
                color: '#58326c',
                icon: 'fa-microchip',
              },
              {
                title: 'Nodes',
                active: nodes.length,
                color: '#458c12',
                icon: 'fa-cubes',
              },
              {
                title: 'Cores',
                active: cores.length,
                color: '#8c5b12',
                icon: 'fa-atom',
              },
              {
                title: 'Jobs Running',
                active: jobsRunning.length,
                color: '#00C68D',
                icon: 'fa-running',
              },
              {
                title: 'Jobs Idle',
                active: jobsIdle.length,
                color: '#377ADA',
                icon: 'fa-people-carry',
              },
            ].map(el => (
              <Grid key={el.title} item xs={12} sm={6} md={2}>
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
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
