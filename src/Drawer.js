import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FaceIcon from '@material-ui/icons/Face';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import Report from './components/Report';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',

    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  homeBtn: {
    fontSize: 16,
  },
  btnGroup: {
    textAlign: 'right',
    width: '100%',
  },
}));

function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <List>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <FingerprintIcon />
                </ListItemIcon>
                <ListItemText
                  primary="LIneA Monitoring Dashboard"
                  className={classes.homeBtn}
                />
              </ListItem>
            </Link>
            <Divider />
            <Link to="/dashboard">
              <ListItem button>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                />
              </ListItem>
            </Link>
            <Link to="/users">
              <ListItem button>
                <ListItemIcon>
                  <AvTimerIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                />
              </ListItem>
            </Link>
            <Divider />
          </List>
          <div className={classes.toolbar}>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.btnGroup}>
            <Login />
            <Report />
          </div>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/users" component={Users} />
        </main>
      </Router>
    </div>
  );
}

export default MiniDrawer;
