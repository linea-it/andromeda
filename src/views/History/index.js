/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TopUsers from './TopUsers/TopUsers';
import { getHistory, getTopUsers } from '../../api/Api';
import CustomTable from '../../utils/CustomTable';
import JobsDetail from '../commons/JobsDetail';
// import SectionsSelect from '../commons/SectionsSelect';
import useStyles from './styles';


function History() {
  const classes = useStyles();
  const [topUsers, setTopUsers] = useState([{ x: 0, y: 0 }]);
  const [historyTableData, setHistoryTableData] = useState({
    rows: [],
    totalCount: 0,
  });
  const [jobsDetail, setJobsDetail] = useState({
    visible: false,
    data: [],
    Jobs: [],
    startDate: '',
    endDate: '',
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getHistory({})
      .then((res) => {
        setHistoryTableData({ rows: res.data, totalCount: res.total_count });
      });
  }, []);

  useEffect(() => {
    getTopUsers({}).then((res) => {
      setTopUsers(res.map(row => ({
        x: [row.TotalExecutionTime / 3600],
        y: [row.User],
        name: row.User,
        type: 'bar',
        orientation: 'h',
      })));
    });
  }, []);

  useEffect(() => {
    setReload(prevState => !prevState);
  }, []);

  const handleJobsDetailClick = (row) => {
    setJobsDetail({
      visible: !jobsDetail.visible,
      id: row.ProcessId ? row.ProcessId : row.ClusterId,
      Jobs: row.Jobs,
    });
  };

  const renderCmd = row => (
    <Typography title={row.Cmd} variant="body2" display="block" gutterBottom>
      {row.Cmd.replace(/^.*(\\|\/|\:)/, '')}
    </Typography>
  );

  const openProductLog = (row) => {
    // owner = production and cluster_name = altix / des-portal.linea.gov.br
    // owner = production and cluster_name = icex / des-portalicex.linea.gov.br
    // fora isso / <owner>.linea.gov.br (editado)
    let baseUrl = `${row.Portal}.linea.gov.br`;
    if (row.Portal === 'production') {
      baseUrl = row.ClusterName === 'ICE-X' ? 'des-portalicex.linea.gov.br' : 'des-portal.linea.gov.br';
    }
    baseUrl += `/VP/getViewProcessCon?process_id=${row.Id}`;
    window.open(`https://${baseUrl}`, 'Process ID');
  };

  const renderProcessId = (row) => {
    if (row.ClusterId) {
      return (row.ClusterId);
    }
    return (
      <span
        className={classes.itemLink}
        title={row.ProcessId}
        onClick={() => openProductLog(row)}
      >
        {row.ProcessId}
      </span>
    );
  };

  const historyColumns = [
    {
      name: 'Application',
      title: 'Application',
      width: 140,
    },
    {
      name: 'Id',
      title: 'Id',
      width: 140,
      customElement: row => (renderProcessId(row)),
    },
    {
      name: 'ClusterName',
      title: 'Cluster Name',
      width: 140,
    },
    {
      name: 'Portal',
      title: 'Portal',
      width: 140,
    },
    {
      name: 'Submitter',
      title: 'Submitter',
      width: 140,
    },
    {
      name: 'Cmd',
      title: 'Cmd',
      width: 200,
      customElement: row => (renderCmd(row)),
    },
    {
      name: 'Jobs',
      title: 'Jobs',
      customElement: row => <i className="fas fa-hdd" onClick={() => handleJobsDetailClick(row)} />,
      width: 130,
      sortingEnabled: false,
      align: 'center',
    },
  ];

  const handleJobsDetailClose = () => setJobsDetail({
    visible: false, Jobs: [],
  });

  // const handlePeriodChange = (e) => {
  //   if (Number(e.target.value) !== period) {
  //     setPeriod(Number(e.target.value));
  //   }
  // };

  return (
    <>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>History</Typography>
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
                  remote={false}
                  totalCount={historyTableData.totalCount}
                  loading
                  reload={reload}
                />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </div>
      <JobsDetail
        title={`Jobs - Process (${jobsDetail.id})`}
        jobs={jobsDetail}
        handleClose={handleJobsDetailClose}
      />
    </>
  );
}

export default History;
