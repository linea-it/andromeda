import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import * as api from '../api/Api';
import CustomTable from '../utils/CustomTable';
import TableNode from './TableNode';
// import TableProcess from './user/TableProcess';

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
  card: {
    minHeight: 530,
  },
  cardHeader: {
    backgroundColor: 'rgb(248, 249, 252)',
    borderBottom: '1px solid rgb(227, 230, 240)',
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerTitle: {
    color: '#34465d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconList: {
    fontSize: 24,
    cursor: 'pointer',
  },
  nodeFakeBtn: {
    color: 'rgba(0, 0, 0, 0.87)',
    margin: 0,
    fontSize: '1rem',
    fontWeight: '500',
    lineHeight: '1.43',
    letterSpacing: '0.01071em',
    padding: 0,
    minWidth: 40,
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    textAlign: 'center',
  },
}));


function User() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeProcessesByOwner, setActiveProcessesByOwner] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [userTableData, setUserTableData] = useState([]);
  const [processTableData, setProcessTableData] = useState([]);
  const [activeProcesses, setActiveProcesses] = useState([]);
  const [nodeTableModal, setNodeTableModal] = useState({
    visible: false,
    process: '',
    data: [],
  });

  const classes = useStyles();
  const userColumns = [
    { name: 'user', title: 'Owner' },
    { name: 'cluster', title: 'Cluster' },
    { name: 'processes', title: 'Processes' },
    { name: 'jobs', title: 'Jobs' },
    { name: 'cluster_utilization', title: 'CPU %' },
  ];
  const processColumns = [
    { name: 'user', title: 'Owner' },
    { name: 'cluster', title: 'Cluster' },
    { name: 'submitted', title: 'Submitted' },
    { name: 'process', title: 'Process' },
    { name: 'start_date', title: 'Start Date' },
    { name: 'status', title: 'Status' },
    {
      name: 'nodes',
      title: 'Nodes',
      icon: el => (
        <span className={classes.nodeFakeBtn}>
          {el.nodes}
        </span>
      ),
      action: el => setNodeTableModal({
        visible: !nodeTableModal.visible,
        process: el.process,
        data: el.remoteHosts,
      }),
      align: 'center',
    },
  ];

  function getActiveJobs() {
    api.getJobs()
      .then(data => setActiveJobs(data));
  }

  function getActiveProcessesByOwner(owner) {
    api.getProcessesByOwner(owner)
      .then(data => setActiveProcessesByOwner(processes => processes.concat([{ [`"${owner}"`]: data }])));
  }

  function getUsersStats() {
    api.getUsersStats()
      .then((data) => {
        setUserStats(data);
        if (data.length > 0) data.forEach(user => getActiveProcessesByOwner(user.Owner));
      });
  }

  function getActiveProcesses() {
    api.getProcesses()
      .then((res) => {
        setActiveProcesses((res));
      });
  }

  function showStartDate(date) {
    return (
      <span title={moment.unix(date).format('HH:mm')}>
        {moment.unix(date).format('DD/MM/YY')}
      </span>
    );
  }


  useEffect(() => {
    getActiveJobs();
    getUsersStats();
    getActiveProcesses();
  }, []);

  useEffect(() => {
    setUserTableData(
      userStats.map((user) => {
        const processes = activeProcessesByOwner.map(processesArr => (
          processesArr[`"${user.Owner}"`]
            ? processesArr[`"${user.Owner}"`]
            : null
        )).filter(processesArr => processesArr !== null)[0];

        const jobs = activeJobs.filter(
          job => job.Owner === user.Owner && job.ClusterName === user.Cluster,
        );

        return {
          user: user.Owner ? user.Owner : null,
          cluster: user.Cluster ? user.Cluster : null,
          processes: processes
            ? processes.filter(
              process => process.Owner === user.Owner && process.ClusterName === user.Cluster,
            ).length
            : null,
          jobs: jobs ? jobs.length : null,
          cluster_utilization: user ? `${user.ClusterUtilization.toFixed(2)}%` : null,
        };
      }),
    );
  }, [activeProcessesByOwner]);

  useEffect(() => {
    setProcessTableData(
      activeProcesses.map((process) => {
        const jobs = activeJobs.filter(
          job => job.Process === process.Process
          && job.ClusterName === process.ClusterName,
        );

        const remoteHosts = jobs
          .filter((obj, pos, arr) => obj.RemoteHost
            && arr.map(mapObj => mapObj.RemoteHost + mapObj.Owner)
              .indexOf(obj.RemoteHost + process.Owner) === pos);

        const nodes = remoteHosts
          .map(mapObj => mapObj.RemoteHost.split('.')[0].split('@')[1])
          .filter((node, i, arr) => arr.indexOf(node) === i);

        let submitted = '';
        let status = 'Unknown';

        if (process.Process && process.Process.indexOf(100) === 0) {
          submitted = 'Portal';
        } else {
          submitted = 'Manual';
        }

        if (jobs.length > 0) {
          if (jobs[0].JobStatus === '1') {
            status = 'Idle';
          } else if (jobs[0].JobStatus === '2') {
            status = 'Running';
          } else if (jobs[0].JobStatus === '3') {
            status = 'Removed';
          } else if (jobs[0].JobStatus === '4') {
            status = 'Completed';
          } else if (jobs[0].JobStatus === '5') {
            status = 'Hold';
          } else if (jobs[0].JobStatus === '6') {
            status = 'Transferring Output';
          } else {
            status = 'Unknown';
          }
        }

        if (jobs.filter(job => job.JobStatus === '2').length > 0) {
          status = 'Running';
        }
        if (process.Process === '5696') {
          console.log(nodes);
        }
        return {
          user: process.Owner ? process.Owner : null,
          process: process.Process ? process.Process : null,
          start_date: process.JobStartDate ? showStartDate(process.JobStartDate) : null,
          start_date_data: process.JobStartDate ? process.JobStartDate : null,
          status: process.JobStatus ? status : null,
          submitted: process.Process ? submitted : null,
          cluster: process.ClusterName ? process.ClusterName : null,
          nodes: nodes ? nodes.length : null,
          remoteHosts,
        };
      }),
    );
  }, [activeProcesses]);

  const handleNodeModalClose = () => setNodeTableModal({ visible: false, process: '', data: [] });

  return (
    <>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Users</Typography>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <Card className={classes.card}>
              <CardHeader
                title={(
                  <span className={classes.headerTitle}>Users</span>
                )}
                className={classes.cardHeader}
              />
              <CardContent>
                <CustomTable
                  columns={userColumns}
                  data={userTableData}
                  hasResizing={false}
                  remote={false}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <Card className={classes.card}>
              <CardHeader
                title={(
                  <span className={classes.headerTitle}>Processes</span>
                )}
                className={classes.cardHeader}
              />
              <CardContent>
                <CustomTable
                  columns={processColumns}
                  data={processTableData}
                  hasResizing={false}
                  remote={false}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <TableNode
        process={nodeTableModal.process}
        showNodeTable={nodeTableModal.visible}
        handleNodeClick={handleNodeModalClose}
        jobs={nodeTableModal.data}
      />
    </>
  );
}

export default User;
