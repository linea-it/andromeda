import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import TopUsers from './TopUsers';
import { getHistory, getTopUsers } from '../api/Api';
import CustomTable from '../utils/CustomTable';
import ResourceUsage from './ResourceUsage';

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
    // minHeight: 530,
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


function History() {
  const classes = useStyles();
  const [cluster, setCluster] = useState('icex');
  const [labelWidth, setLabelWidth] = useState(0);
  const [period, setPeriod] = useState(6);
  const [topUsers, setTopUsers] = useState([{ x: 0, y: 0 }]);
  const [historyTableData, setHistoryTableData] = useState({
    rows: [],
    totalCount: 0,
  });
  const [resourceUsage, setResourceUsage] = useState({
    visible: false,
    data: [],
    startDate: '',
    endDate: '',
  });


  const inputLabel = useRef(null);

  useEffect(() => {
    let startDate = moment();
    const endDate = moment().format('YYYY-MM-DD');
    let isToday = false;

    if (period === 0) {
      isToday = true;
      startDate = startDate.format('YYYY-MM-DD');
    } else if (period === 0.25) {
      startDate = startDate.subtract(7, 'days').format('YYYY-MM-DD');
    } else {
      startDate = startDate.subtract(period, 'months').format('YYYY-MM-DD');
    }

    getTopUsers({
      startDate,
      endDate,
      isToday,
    }).then((res) => {
      setTopUsers(res.map(row => ({
        x: [row.TotalExecutionTime / 3600],
        y: [row.Owner],
        name: row.Owner,
        type: 'bar',
        orientation: 'h',
      })));
    });
  }, [period]);


  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleClusterChange = e => setCluster(e.target.value);

  const historyColumns = [
    {
      name: 'Owner',
      title: 'Owner',
      width: 140,
    },
    {
      name: 'Process',
      title: 'Process',
      align: 'center',
      customElement: row => (row.Process !== 'None' ? row.Process : '-'),
    },
    {
      name: 'Job',
      title: 'Job',
      customElement: row => parseInt(row.Job, 10),
    },
    {
      name: 'JobStartDate',
      title: 'Start Date',
      customElement: row => (
        <span title={moment(row.JobStartDate).format('HH:mm:ss')}>
          {moment(row.JobStartDate).format('YYYY-MM-DD')}
        </span>
      ),
      width: 130,
    },
    {
      name: 'JobFinishedHookDone',
      title: 'End Date',
      customElement: row => (
        <span title={moment(row.JobFinishedHookDone).format('HH:mm:ss')}>
          {moment(row.JobFinishedHookDone).format('YYYY-MM-DD')}
        </span>
      ),
      width: 130,
    },
    {
      name: 'ExecutionTime',
      title: 'Execution Time',
      customElement: (row) => {
        if (row.ExecutionTime) {
          const execToHours = (row.ExecutionTime / 3600).toFixed(2);
          const execToMinutes = (row.ExecutionTime / 60).toFixed(2);

          if (execToHours > 1) {
            return `${execToHours}h`;
          } if (execToMinutes > 1) {
            return `${execToMinutes}min`;
          }

          return `${row.ExecutionTime}s`;
        }
        return '-';
      },
      align: 'center',
      width: 130,
    },
    {
      name: 'LastRemoteHost',
      title: 'Last Slot',
      customElement: row => (row.LastRemoteHost && row.LastRemoteHost !== 'None' ? row.LastRemoteHost.split('@')[0] : '-'),
      align: 'center',
    },
    {
      name: 'Out',
      title: 'Node',
      customElement: row => (row.LastRemoteHost && row.LastRemoteHost !== 'None' ? row.LastRemoteHost.split('@')[1].split('.')[0] : ''),
      align: 'center',
    },
    {
      name: 'RequestCpus',
      title: 'Resources Usage',
      icon: () => <i className="fas fa-hdd" />,
      action: el => setResourceUsage({
        visible: !resourceUsage.visible,
        data: [{
          RemoteHost: el.LastRemoteHost,
          ClusterName: el.ClusterName,
        }],
        startDate: moment(el.JobStartDate).format('MM/DD/YYYY+HH:mm'),
        endDate: moment(el.JobFinishedHookDone).format('MM/DD/YYYY+HH:mm'),
      }),
      width: 130,
      align: 'center',
    },
  ];

  const loadData = useCallback(({ pageSize, currentPage }) => {
    getHistory({ limit: pageSize, offset: currentPage * pageSize })
      .then(res => setHistoryTableData({ rows: res.data, totalCount: res.total_count }));
  }, []);

  const handleResourceUsageClose = () => setResourceUsage({
    visible: false, data: [], startDate: '', endDate: '',
  });

  const handlePeriodChange = (e) => {
    if (Number(e.target.value) !== period) {
      setPeriod(Number(e.target.value));
    }
  };

  return (
    <>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>History</Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} />
        <Select
          value={cluster}
          onChange={handleClusterChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="icex">IceX</MenuItem>
          <MenuItem value="altix">Altix</MenuItem>
        </Select>
      </FormControl>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title={(
                  <span className={classes.headerTitle}>Plots</span>
                )}
                className={classes.cardHeader}
              />
              <CardContent>

                <FormControl>
                  <InputLabel>Period</InputLabel>
                  <Select value={period} onChange={handlePeriodChange}>
                    <MenuItem value={0}>Today</MenuItem>
                    <MenuItem value={0.25}>Last Week</MenuItem>
                    <MenuItem value={1}>Last Month</MenuItem>
                    <MenuItem value={6}>Last Six Months</MenuItem>
                    <MenuItem value={12}>Last Year</MenuItem>
                    <MenuItem value={24}>Last Two Years</MenuItem>
                  </Select>
                </FormControl>

                <TopUsers data={topUsers} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <Card className={classes.card}>
              <CardHeader
                title={(
                  <span className={classes.headerTitle}>History</span>
                )}
                className={classes.cardHeader}
              />
              <CardContent>
                <CustomTable
                  columns={historyColumns}
                  data={historyTableData.rows}
                  loadData={loadData}
                  totalCount={historyTableData.totalCount}
                  hasResizing={false}
                  hasSorting={false}
                  loading={false}
                />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </div>
      <ResourceUsage
        title="Resources Usage"
        showTable={resourceUsage.visible}
        handleClose={handleResourceUsageClose}
        remoteHosts={resourceUsage.data}
        startDate={resourceUsage.startDate}
        currentDate={resourceUsage.endDate}
      />
    </>
  );
}

export default History;
