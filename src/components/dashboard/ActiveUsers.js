import React, { useEffect, useState, Fragment } from 'react';
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  PagingPanel,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import * as api from '../../api/Api';
import Cores from './Cores';
import Process from './Process';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomTableHeaderRowCell from './CustomTableHeaderRowCell';
import CustomColumnChooser from './CustomColumnChooser';

const useStyles = makeStyles(({
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
}));

function ActiveUsers() {
  const classes = useStyles();
  const [usersStats, setUsersStats] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [coreOwner, setCoreOwner] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function getUsersStats() {
    api.getUsersStats()
      .then(data => setUsersStats(data));
  }


  function getActiveJobs() {
    api.getJobs()
      .then(data => setActiveJobs(data));
  }

  const onHideModal = () => setModalVisible(false);

  const onShowModal = (title, owner, rows) => {
    setModalTitle(title);
    setModalVisible(true);
    setModalContent(rows);
    setCoreOwner(owner);
  };

  function renderNodes(owner, nodes) {
    if (nodes) {
      return (
        <Fragment>
          <FormatListBulleted
            onClick={() => onShowModal('Nodes', owner, nodes)}
            className={classes.iconList}
          />
        </Fragment>
      );
    }
    return '-';
  }

  function renderProcesses(owner, processes) {
    if (processes) {
      return (
        <Fragment>
          <FormatListBulleted
            onClick={() => onShowModal('Processes', owner, processes)}
            className={classes.iconList}
          />
        </Fragment>
      );
    }
    return '-';
  }

  useEffect(() => {
    getUsersStats();
    getActiveJobs();
  }, []);

  const data = {
    columns: [
      { name: 'user', title: 'Owner' },
      { name: 'processes', title: 'Processes' },
      { name: 'submitted', title: 'Submitted' },
      { name: 'cluster', title: 'Cluster' },
      { name: 'node', title: 'Node' },
      { name: 'percentage_utilization', title: '% Cluster Utilization' },
    ],
    rows: usersStats.map((user) => {
      let submitted = '';
      if (user.ManualJobs === 0) {
        submitted = 'Portal';
      } else if (user.ManualJobs > 0) {
        submitted = 'Manual';
      }

      return {
        user: user.Owner,
        processes: renderProcesses(user.Owner, activeJobs),
        submitted,
        cluster: user.Cluster,
        node: renderNodes(user.Owner, activeJobs),
        percentage_utilization: `${user.ClusterUtilization}%`,
      };
    }),
    tableColumnExtensions: [
      { columnName: 'running', width: 130 },
      { columnName: 'waiting', width: 130 },
      { columnName: 'percentage_utilization', width: 180 },
    ],
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        title={(
          <span className={classes.headerTitle}>Active Users</span>
        )}
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid
          rows={data.rows}
          columns={data.columns}
        >
          <SearchState />
          <PagingState
            defaultCurrentPage={0}
            pageSize={10}
          />
          <SortingState
            defaultSorting={[{ columnName: 'user', direction: 'asc' }]}
          />
          <IntegratedFiltering />
          <IntegratedPaging />
          <IntegratedSorting />
          <Table columnExtensions={data.tableColumnExtensions} />
          <CustomTableHeaderRowCell />
          <TableColumnVisibility />
          <Toolbar />
          <SearchPanel />
          <PagingPanel />
          <CustomColumnChooser />
        </Grid>
      </CardContent>
      <Dialog
        fullWidth
        maxWidth={modalTitle === 'Processes' ? 'md' : 'sm'}
        style={{ minWidth: 600 }}
        onClose={onHideModal}
        open={modalVisible}
        aria-labelledby={modalTitle}
      >
        {modalTitle === 'Processes'
          ? <Process processes={modalContent} owner={coreOwner} />
          : <Cores cores={modalContent} owner={coreOwner} />
        }
      </Dialog>
    </Card>
  );
}

export default ActiveUsers;
