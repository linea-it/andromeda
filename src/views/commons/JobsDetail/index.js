/* eslint-disable max-len */
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import CustomTable from '../../../utils/CustomTable';
import ResourceUsage from '../ResourceUsage';
import useStyles from './styles';

function JobsDetails({
  title,
  jobs,
  handleClose,
}) {
  const [resourceUsage, setResourceUsage] = useState({
    visible: false,
    data: [],
    startDate: '',
    endDate: '',
  });

  const classes = useStyles();

  const handleResourceUsageClick = (row) => {
    setResourceUsage({
      visible: !resourceUsage.visible,
      data: [{
        RemoteHost: row.LastRemoteHost || row.RemoteHost,
        ClusterName: row.ClusterName,
      }],
      startDate: moment(row.JobStartDate).format('MM/DD/YYYY+HH:mm'),
      endDate: moment(row.JobFinishedHookDone).format('MM/DD/YYYY+HH:mm'),
    });
  };

  const handleResourceUsageClose = () => setResourceUsage({
    visible: false, data: [], startDate: '', endDate: '',
  });

  const jobsColumns = jobs && jobs.realTime
    ? [
      {
        name: 'Owner',
        title: 'Owner',
        width: 140,
      },
      {
        name: 'User',
        title: 'User',
        width: 140,
      },
      {
        name: 'ClusterId',
        title: 'Job Id',
        customElement: row => (`${row.ClusterId}.${row.ProcId}`),
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
        name: 'JobStatus',
        title: 'Status',
        width: 140,
      },
      {
        name: 'RemoteHost',
        title: 'Slot',
        customElement: row => (row.RemoteHost && row.RemoteHost !== 'None' ? row.RemoteHost.split('@')[0] : '-'),
        align: 'center',
      },
      {
        name: 'RequiresWholeMachine',
        title: 'Whole Node',
        customElement: row => (row.RequiresWholeMachine ? <i className="fas fa-check" /> : ' - '),
        sortingEnabled: false,
        align: 'center',
      },
      {
        name: 'Section',
        title: 'Node',
        customElement: row => (row.RemoteHost && row.RemoteHost !== 'None' ? row.RemoteHost.split('@')[1].split('.')[0] : ''),
        sortingEnabled: false,
        align: 'center',
      },
      {
        name: 'Submitter',
        title: 'Resources Usage',
        customElement: row => <i className="fas fa-hdd" onClick={() => handleResourceUsageClick(row)} />,
        width: 130,
        sortingEnabled: false,
        align: 'center',
      },
    ]
    : [
      {
        name: 'Owner',
        title: 'Owner',
        width: 140,
      },
      {
        name: 'User',
        title: 'User',
        width: 140,
      },
      {
        name: 'ClusterId',
        title: 'Job Id',
        customElement: row => (`${row.ClusterId}.${row.ProcId}`),
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
        name: 'Section',
        title: 'Node',
        customElement: row => (row.LastRemoteHost && row.LastRemoteHost !== 'None' ? row.LastRemoteHost.split('@')[1].split('.')[0] : ''),
        sortingEnabled: false,
        align: 'center',
      },
      {
        name: 'Submitter',
        title: 'Resources Usage',
        customElement: row => <i className="fas fa-hdd" onClick={() => handleResourceUsageClick(row)} />,
        width: 130,
        sortingEnabled: false,
        align: 'center',
      },
    ];

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="nodes"
        open={jobs.visible}
        maxWidth="md"
      >
        <Card className={classes.card}>
          <CardHeader
            title={(
              <>
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
                <span className={classes.headerTitle}>
                  {title}
                </span>
              </>
            )}
            className={classes.cardHeader}
          />
          <CardContent>
            <CustomTable
              columns={jobs.visible ? jobsColumns : []}
              data={jobs.Jobs}
              totalCount={jobs.Jobs.length}
              remote={false}
            />
          </CardContent>
        </Card>
      </Dialog>
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

JobsDetails.propTypes = {
  title: PropTypes.string.isRequired,
  jobs: PropTypes.shape({
    visible: PropTypes.bool,
    row: PropTypes.shape({
      Id: PropTypes.string,
      submissionMode: PropTypes.string,
    }),
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};


export default JobsDetails;
