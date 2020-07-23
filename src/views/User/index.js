/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import * as api from '../../api/Api';
import CustomTable from '../../utils/CustomTable';
import TableNode from '../commons/TableNode';
import ResourceUsage from '../commons/ResourceUsage';
import useStyles from './styles';

function User() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeProcessesByOwner, setActiveProcessesByOwner] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [userTableData, setUserTableData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [processTableData, setProcessTableData] = useState([]);
  const [activeProcesses, setActiveProcesses] = useState([]);
  const [nodeTableModal, setNodeTableModal] = useState({
    visible: false,
    process: '',
    data: [],
  });
  const [resourceUsage, setResourceUsage] = useState({
    visible: false,
    data: [],
    start_date: '',
    current_date: '',
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
    {
      name: 'resources_usage',
      title: 'Resources Usage',
      icon: () => <i className="fas fa-hdd" />,
      action: el => setResourceUsage({
        visible: !resourceUsage.visible,
        data: el.remoteHosts,
        start_date: moment.unix(el.start_date_original).format('MM/DD/YYYY+HH:mm'),
        current_date: moment(new Date()).format('MM/DD/YYYY+HH:mm'),
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
  // eslint-disable-next-line
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
  }, [activeProcessesByOwner, activeJobs, userStats]);

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
          }
        }
        if (jobs.filter(job => job.JobStatus === '2').length > 0) {
          status = 'Running';
        }
        return {
          user: process.Owner ? process.Owner : null,
          process: process.Process ? process.Process : null,
          start_date: process.JobStartDate ? showStartDate(process.JobStartDate) : null,
          start_date_original: process.JobStartDate ? process.JobStartDate : null,
          status: process.JobStatus ? status : null,
          submitted: process.Process ? submitted : null,
          cluster: process.ClusterName ? process.ClusterName : null,
          nodes: nodes ? nodes.length : null,
          resources_usage: process.RemoteHost || null,
          remoteHosts,
        };
      }),
    );
  }, [activeProcesses, activeJobs]);

  const handleNodeModalClose = () => setNodeTableModal({ visible: false, process: '', data: [] });

  const handleResourceUsageClose = () => setResourceUsage({
    visible: false, data: [], start_date: '', current_date: '',
  });

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
        </Grid>
      </div>
      <ResourceUsage
        title="Resources Usage in Real Time"
        showTable={resourceUsage.visible}
        handleClose={handleResourceUsageClose}
        remoteHosts={resourceUsage.data}
        startDate={resourceUsage.start_date}
        currentDate={resourceUsage.current_date}
      />
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
