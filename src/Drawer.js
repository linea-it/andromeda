import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router, Route, Link, Redirect,
} from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from '@material-ui/core/Icon';
import Logo from './assets/img/linea.png';
import Report from './components/Report';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Icex from './components/Icex';
import User from './components/User';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
    color: '#000',
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: '#fff',
  },
  hide: {
    display: 'none',
  },
  drawerList: {
    paddingTop: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background: '#34465d',
    borderRight: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: '#34465d',
    borderRight: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  drawerControlWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 68,
    backgroundColor: 'rgb(240, 241, 244)',
  },
  bodyWrapper: {
    height: '100%',
    width: '100%',
  },
  homeBtn: {
    fontSize: 18,
    fontWeight: 'bold !important',
    textAlign: 'center',
    maxWidth: '100%',
    textTransform: 'uppercase',
  },
  btnGroup: {
    textAlign: 'right',
    width: '100%',
    color: '#fff',
  },
  invisibleLink: {
    color: 'black',
    textDecoration: 'none',
    display: 'none,',
  },
  textDrawer: {
    color: 'white',
  },
  ListIconDrawer: {
    minWidth: 40,
    color: 'white',
  },
  ListIconControlDrawer: {
    backgroundColor: 'rgba(255,255,255,.2)',
    padding: 7,
  },
  iconDrawer: {
    width: 'auto',
    fontSize: '1.4rem',
  },
  borderDrawer: {
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  iconHomeOpen: {
    maxWidth: 65,
    borderRadius: 65,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconHomeClose: {
    maxWidth: 42,
    marginLeft: -8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  homeDrawer: {
    fontWeight: 'bold',
  },
  reportDrawer: {
    marginTop: 120,
  },
  toolbar: {
    padding: 0,
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
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <Login />
          </Toolbar>
        </AppBar>
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
          <List className={classes.drawerList}>
            <Link to="/dashboard" className={classes.invisibleLink}>
              <ListItem button>
                <ListItemIcon className={classes.ListIconDrawer}>
                  <img src={Logo} alt="Monitor" className={clsx(open ? classes.iconHomeOpen : classes.iconHomeClose)} />
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <span className={classes.homeDrawer}>
                      Cluster
                      <br />
                      Monitor
                    </span>
                  )}
                  className={clsx(classes.homeBtn, classes.textDrawer)}
                />
              </ListItem>
            </Link>
            <Divider className={classes.borderDrawer} />
            <Link to="/dashboard" className={classes.invisibleLink}>
              <ListItem button>
                <ListItemIcon className={classes.ListIconDrawer}>
                  <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-tachometer-alt')} />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  className={classes.textDrawer}
                />
              </ListItem>
            </Link>
            <Divider className={classes.borderDrawer} />
            <Link to="/users" className={classes.invisibleLink}>
              <ListItem button>
                <ListItemIcon className={classes.ListIconDrawer}>
                  <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-users')} />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  className={classes.textDrawer}
                />
              </ListItem>
            </Link>
            <Divider className={classes.borderDrawer} />
            <Link to="/icex" className={classes.invisibleLink}>
              <ListItem button>
                <ListItemIcon className={classes.ListIconDrawer}>
                  <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-server')} />
                </ListItemIcon>
                <ListItemText
                  primary="ICEx"
                  className={classes.textDrawer}
                />
              </ListItem>
            </Link>
            <Divider className={classes.borderDrawer} />
          </List>
          <div className={classes.drawerControlWrapper}>
            <IconButton
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              className={clsx(classes.ListIconDrawer, classes.ListIconControlDrawer)}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
        </Drawer>
        <div className={classes.bodyWrapper}>
          <main className={classes.content}>
            <div className={classes.btnGroup}>
              <Report className={classes.reportDrawer} />
            </div>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/icex" component={Icex} />
            <Route exact path="/users" component={User} />
          </main>
          <Footer drawerOpen={open} />
        </div>
      </Router>
    </div>
  );
}

export default MiniDrawer;
