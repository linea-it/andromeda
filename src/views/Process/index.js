import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import * as api from '../../api/Api';
import CustomTable from '../../utils/CustomTable';
import TableNode from '../commons/TableNode';
import ResourceUsage from '../commons/ResourceUsage';
import JobsDetail from '../commons/JobsDetail';
import useStyles from './styles';

function Process() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [activeJobsOriginal, setActiveJobsOriginal] = useState([]);
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

  const [selectedAplication, setSelectedAplication] = useState('All');

  const [arrayAplication, setArrayAplication] = useState(['All']);

  const handleChange = (event) => {
    setSelectedAplication(event.target.value);
  };

  useEffect(() => {
    const arrayFilter = [];
    activeJobsOriginal.forEach((job) => {
      if (selectedAplication === job.AppType || selectedAplication === 'All') {
        arrayFilter.push(job);
      }
    });
    setActiveJobs(arrayFilter);
  }, [selectedAplication]);

  const classes = useStyles();

  const renderCmd = row => (
    <Typography title={row.Cmd} variant="body2" display="block" gutterBottom>
      {row.Cmd.replace(/^.*(\\|\/|\:)/, '')}
    </Typography>
  );

  const renderDate = row => (
    <Typography title={moment(row.Jobs[0].JobStartDate).format('HH:mm')} variant="body2" display="block" gutterBottom>
      {moment(row.Jobs[0].JobStartDate).format('YYYY-MM-DD')}
    </Typography>
  );

  const processColumns = [
    {
      name: 'AppType',
      title: 'Application',
      width: 140,
    },
    { name: 'Id', title: 'Id', align: 'center' },
    { name: 'User', title: 'User', width: 200 },
    { name: 'ClusterName', title: 'Cluster Name', width: 200 },
    { name: 'Portal', title: 'Portal', width: 150 },
    {
      name: 'AppName', title: 'Pipeline', width: 150,
    },
    {
      name: 'StartDate', title: 'Start Date', width: 100, customElement: row => (renderDate(row)),
    },
    {
      name: 'Cmd', title: 'Cmd', width: 150, customElement: row => (renderCmd(row)),
    },
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
        appType: el.AppType,
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
    const options = ['All'];
    const arrayActiveJobs = [];
    api.getJobsByApps()
      .then((data) => {
        Object.keys(data).forEach((key) => {
          options.push(key);
          setArrayAplication(options);

          data[key].forEach((job) => {
            job.Id = (job.ProcessId != null ? job.ProcessId : (job.ClusterId + job.ProcId));
            job.Nodes = true;
            job.resources_usage = true;
            job.NumJobs = true;
            job.StartDate = true;
            arrayActiveJobs.push(job);
          });
        });
        setActiveJobsOriginal(arrayActiveJobs);
        setActiveJobs(arrayActiveJobs);
      });
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
              <CardContent>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                  Aplications
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAplication}
                  onChange={handleChange}
                  className={classes.select}
                >
                  {
                    arrayAplication.map(element => (<MenuItem value={element}>{element}</MenuItem>))
                  }
                </Select>
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
        title={`Jobs - ${jobsDetail.appType} (${jobsDetail.id})`}
        jobs={jobsDetail}
        handleClose={handleJobsDetailClose}
      />
    </>
  );
}

export default Process;
