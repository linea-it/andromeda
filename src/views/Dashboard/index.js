import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardStatus from './CardStatus';
import Chart from '../../components/Chart';
import * as api from '../../api/Api';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();
  const [processes, setProcesses] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [slots, setSlots] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState({
    idle: [],
    running: [],
    removed: [],
    completed: [],
    held: [],
    transferringOutput: [],
  });

  function getProcesses() {
    api.getProcesses()
      .then(res => setProcesses((res)));
  }

  function getNodes() {
    api.getNodes()
      .then((res) => {
        const allNodes = res.map(el => el.UtsnameNodename);
        const uniqueNodes = allNodes.filter((el, i) => allNodes.indexOf(el) === i);
        const allSlots = res.map(el => el.Name);
        const uniqueSlots = allSlots.filter((el, i) => allSlots.indexOf(el) === i);
        setNodes(uniqueNodes);
        setSlots(uniqueSlots);
      });
  }

  function getUsersStats() {
    api.getUsersStats()
      .then(res => setUsers(res));
  }

  function getJobs() {
    api.getJobs()
      .then((res) => {
        const idle = res.filter(el => el.JobStatus === '1');
        const running = res.filter(el => el.JobStatus === '2');
        const removed = res.filter(el => el.JobStatus === '3');
        const completed = res.filter(el => el.JobStatus === '4');
        const held = res.filter(el => el.JobStatus === '5');
        const transferringOutput = res.filter(el => el.JobStatus === '6');

        setJobs({
          idle,
          running,
          removed,
          completed,
          held,
          transferringOutput,
        });
      });
  }

  useEffect(() => {
    getNodes();
    getProcesses();
    getUsersStats();
    getJobs();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Dashboard</Typography>
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          {
            [
              {
                title: 'Users',
                active: users.length,
                color: '#333300',
                icon: 'fa-users',
              },
              {
                title: 'Processes',
                active: processes.length,
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
                title: 'Slots',
                active: slots.length,
                color: '#8c5b12',
                icon: 'fa-atom',
              },
              {
                title: 'Jobs Idle',
                active: jobs.idle.length,
                color: '#FEBC4F',
                icon: 'fa-spinner',
              },
              {
                title: 'Jobs Running',
                active: jobs.running.length,
                color: '#00C68D',
                icon: 'fa-running',
              },
              {
                title: 'Jobs Removed',
                active: jobs.removed.length,
                color: '#e60000',
                icon: 'fa-times',
              },
              {
                title: 'Jobs Completed',
                active: jobs.completed.length,
                color: '#377ADA',
                icon: 'fa-check',
              },
              {
                title: 'Jobs Held',
                active: jobs.held.length,
                color: '#808080',
                icon: 'fa-people-carry',
              },
              {
                title: 'Jobs Transferring Output',
                active: jobs.transferringOutput.length,
                color: '#cc00cc',
                icon: 'fa-exchange-alt',
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
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
