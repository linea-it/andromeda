import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import * as api from '../../api/Api';
import CustomTable from '../../utils/CustomTable';
import useStyles from './styles';

function User() {
  const [userStats, setUserStats] = useState([]);

  const classes = useStyles();
  const userColumns = [
    { name: 'User', title: 'User', width: 200 },
    { name: 'Cluster', title: 'Cluster' },
    {
      name: 'Submitter',
      title: 'Jobs',
      customElement: row => (row.PortalJobs + row.ManualJobs),
    },
    { name: 'Running', title: 'Running' },
    { name: 'Waiting', title: 'Waiting' },
    {
      name: 'PortalJobs',
      title: 'Processes',
      customElement: row => (
        row.Processes.length
      ),
    },
    {
      name: 'CoresPercentage',
      title: 'Cores Percentage',
      customElement: row => (`${(row.CoresPercentage).toFixed(2)}%`),
    },
  ];

  useEffect(() => {
    api.getUsersStats().then((data) => {
      setUserStats(data);
    });
  }, []);


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
                  data={userStats}
                  hasResizing={false}
                  remote={false}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default User;
