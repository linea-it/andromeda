import React, { useEffect, useState, useRef } from 'react';
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
import { getHistory } from '../api/Api';
import CustomTable from '../utils/CustomTable';

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


function History() {
  const classes = useStyles();

  const [cluster, setCluster] = useState('icex');
  const [labelWidth, setLabelWidth] = useState(0);
  const [historyTableData, setHistoryTableData] = useState({
    rows: [],
    totalCount: 0,
  });

  const inputLabel = useRef(null);

  useEffect(() => setLabelWidth(inputLabel.current.offsetWidth), []);

  const handleClusterChange = e => setCluster(e.target.value);

  const historyColumns = [
    { name: 'Owner', title: 'Owner' },
    { name: 'Process', title: 'Process', align: 'center', customElement: row => row.Process !== 'None' ? row.Process : '-' },
    { name: 'Job', title: 'Job', customElement: row => parseInt(row.Job) },
    { name: 'JobStartDate', title: 'Start Date', customElement: row => moment(row.JobStartDate).format('YYYY-MM-DD') },
    { name: 'JobFinishedHookDone', title: 'End Date', customElement: row => moment(row.JobStartDate).format('YYYY-MM-DD') },
    { name: 'LastRemoteHost', title: 'Last Slot', customElement: row => row.LastRemoteHost.split('@')[0], align: 'center' },
    { name: 'ServerTime', title: 'Server Time', customElement: row => row.ServerTime !== 'None' ? row.ServerTime : '-', align: 'center' },
  ];

  const loadData = async ({ pageSize, currentPage }) => {

    const rows = await getHistory({ limit: pageSize, offset: currentPage * pageSize });
    const totalCount = await getHistory({ limit: 0 });
    setHistoryTableData({ rows, totalCount: totalCount.length });
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
                  columns={historyColumns}
                  data={historyTableData.rows}
                  loadData={loadData}
                  hasResizing={false}
                  totalCount={historyTableData.totalCount}
                />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default History;
