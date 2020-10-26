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
import JobsDetail from '../commons/JobsDetail';
import useStyles from './styles';

function Process() {
  const [activeJobs, setActiveJobs] = useState([]);
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

  const [jobsDetail, setJobsDetail] = useState({
    visible: false,
    Jobs: [],
  });

  const handleJobsDetailClose = () => setJobsDetail({
    visible: false, Jobs: [], realTime: false,
  });

  const classes = useStyles();

  const renderCmd = row => (
    <Typography title={row.Cmd} variant="body2" display="block" gutterBottom>
      {row.Cmd.replace(/^.*(\\|\/|\:)/, '')}
    </Typography>
  );

  const renderDate = (row) => 
    return (

      <Typography title={row.Cmd} variant="body2" display="block" gutterBottom>
        {row.Jobs[0].JobStartDate}
      </Typography>
    );
  };


  const processColumns = [
    {
      name: 'AppType',
      title: 'Application',
      width: 140,
    },
    { name: 'Id', title: 'Id', align: 'center' },
    { name: 'User', title: 'User' },
    { name: 'ClusterName', title: 'Cluster Name', width: 200 },
    { name: 'Portal', title: 'Portal', width: 150 },
    {
      name: 'Submitter',
      title: 'Submitter',
      width: 140,
    },
    {
      name: 'Date', title: 'Date', width: 150, customElement: row => (renderDate(row)),
    },
    {
      name: 'Cmd', title: 'Cmd', width: 150, customElement: row => (renderCmd(row)),
    },
    { name: 'Submitter', title: 'Submitter', width: 250 },
    // {
    //   name: 'Nodes',
    //   title: 'Nodes',
    //   icon: el => (
    //     <span className={classes.nodeFakeBtn}>
    //       {el.Jobs.length}
    //     </span>
    //   ),
    //   action: el => setNodeTableModal({
    //     visible: !nodeTableModal.visible,
    //     process: el.process,
    //     data: el.jobs,
    //   }),
    //   align: 'center',
    // },
    {
      name: 'NumJobs',
      title: 'Jobs',
      icon: el => (
        <span className={classes.nodeFakeBtn}>
          {el.Jobs.length}
        </span>
      ),
      action: el => setJobsDetail({
        visible: !jobsDetail.visible,
        id: el.ProcessId ? el.ProcessId : el.ClusterId,
        Jobs: el.Jobs,
        realTime: true,
      }),
      align: 'center',
    },
    {
      name: 'resources_usage',
      title: 'Resources Usage',
      icon: () => <i className="fas fa-hdd" />,
      action: el => setResourceUsage({
        visible: !resourceUsage.visible,
        data: el.Jobs,
        start_date: moment.unix(el.Jobs[0].JobStartDate).format('MM/DD/YYYY+HH:mm'),
        current_date: moment(new Date()).format('MM/DD/YYYY+HH:mm'),
      }),
      align: 'center',
    },
  ];

  function getActiveJobs() {
    api.getJobs()
      .then((data) => {
        data.forEach((job) => {
          job.Id = (job.ProcessId != null ? job.ProcessId : (job.ClusterId + job.ProcId));
          job.Nodes = true;
          job.resources_usage = true;
          job.NumJobs = true;
        });
        setActiveJobs(data);
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
  }, []);

  const handleNodeModalClose = () => setNodeTableModal({ visible: false, process: '', data: [] });

  const handleResourceUsageClose = () => setResourceUsage({
    visible: false, data: [], start_date: '', current_date: '',
  });

  return (
    <>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Process</Typography>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
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
                  data={activeJobs}
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
      <JobsDetail
        title={`Jobs - Process (${jobsDetail.id})`}
        jobs={jobsDetail}
        handleClose={handleJobsDetailClose}
      />
    </>
  );
}

export default Process;
