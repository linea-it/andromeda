/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, {
  useEffect, useState, useRef,
} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import SettingsIcon from '@material-ui/icons/Settings';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import TopUsers from './TopUsers/TopUsers';
import { getHistory, getTopUsers } from '../../api/Api';
import CustomTable from '../../utils/CustomTable';
// import ResourceUsage from '../commons/ResourceUsage';
import HistoryDetail from './HistoryDetail';
import useStyles from './styles';

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
  // const [resourceUsage, setResourceUsage] = useState({
  //   visible: false,
  //   data: [],
  //   startDate: '',
  //   endDate: '',
  // });
  const [historyDetail, setHistoryDetail] = useState({
    visible: false,
    data: [],
    startDate: '',
    endDate: '',
  });
  const [reload, setReload] = useState(false);

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
      cluster,
    }).then((res) => {
      setTopUsers(res.map(row => ({
        x: [row.TotalExecutionTime / 3600],
        y: [row.Owner],
        name: row.Owner,
        type: 'bar',
        orientation: 'h',
      })));
    });
  }, [period, cluster]);


  // useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  // const handleClusterChange = e => setCluster(e.target.value);

  useEffect(() => {
    setReload(prevState => !prevState);
  }, [cluster]);

  const handleHistoryDetailClick = (row) => {
    console.log(row);
    setHistoryDetail({
      visible: !historyDetail.visible,
      row,
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
    let baseUrl = `${row.Owner}.linea.gov.br`;
    if (row.Owner === 'production') {
      baseUrl = row.ClusterName === 'ICE-X' ? 'des-portalicex.linea.gov.br' : 'des-portal.linea.gov.br';
    }
    baseUrl += `/VP/getViewProcessCon?process_id=${row.Id}`;
    window.open(`https://${baseUrl}`, 'Process ID');
  };

  const renderProcessId = (row) => {
    if (row.submissionMode === 'Cluster' || row.submissionMode === 'Manual') {
      return (row.ProcessId !== 'None' ? row.ProcessId.substring(row.ProcessId.indexOf('.') + 1) : '-');
    }
    return (
      <span
        className={classes.itemLink}
        title={row.ProcessId !== 'None' ? row.ProcessId.substring(row.ProcessId.indexOf('.') + 1) : '-'}
        onClick={() => openProductLog(row)}
      >
        {row.ProcessId !== 'None' ? row.ProcessId.substring(row.ProcessId.indexOf('.') + 1) : '-'}
      </span>
    );
  };

  const historyColumns = [
    {
      name: 'submissionMode',
      title: 'Submission Mode',
      width: 140,
    },
    {
      name: 'Id',
      title: 'Process ID',
      width: 140,
      customElement: row => (renderProcessId(row)),
    },
    {
      name: 'Owner',
      title: 'Owner',
      width: 140,
    },
    {
      name: 'ClusterName',
      title: 'Cluster Name',
      width: 140,
    },
    {
      name: 'Cmd',
      title: 'Cmd',
      customElement: row => (renderCmd(row)),
    },
    {
      name: 'ProcessId',
      title: 'Details',
      customElement: row => <i className="fas fa-hdd" onClick={() => handleHistoryDetailClick(row)} />,
      width: 130,
      sortingEnabled: false,
      align: 'center',
    },
  ];

  const loadData = ({
    pageSize, currentPage, searchValue, sorting,
  }) => {
    const ordering = sorting[0].direction === 'desc' ? `-${sorting[0].columnName}` : sorting[0].columnName;

    getHistory({
      limit: pageSize, offset: currentPage * pageSize, search: searchValue, sorting: ordering, cluster,
    })
      .then(res => setHistoryTableData({ rows: res.data, totalCount: res.total_count }));
  };

  const handleHistoryDetailClose = () => setHistoryDetail({
    visible: false, history: [],
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
      {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} />
        <Select
          value={cluster}
          onChange={handleClusterChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="icex">IceX</MenuItem>
          <MenuItem value="altix">Altix</MenuItem>
        </Select>
      </FormControl> */}
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
                  loading
                  reload={reload}
                />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </div>
      <HistoryDetail
        title="History Detail"
        history={historyDetail}
        handleClose={handleHistoryDetailClose}
      />
    </>
  );
}

export default History;
