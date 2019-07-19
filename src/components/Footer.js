import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import logo from '../assets/img/linea-logo-mini.png';
// eslint-disable-next-line camelcase
import git_json from '../assets/json/version.json';

function Footer(props) {
  const { drawerOpen } = props;
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      float: 'right',
      height: 64,
    },
    grow: {
      flexGrow: 1,
    },
    appBarDrawerOpen: {
      top: 'auto',
      bottom: 0,
      backgroundColor: '#596C7B',
      width: 'calc(100% - 240px)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarDrawerClose: {
      top: 'auto',
      bottom: 0,
      backgroundColor: '#596C7B',
      width: `calc(100% - ${theme.spacing(7) - 1}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    versionLink: {
      color: '#d2cf00',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer',
    },
    logoLink: {
      lineHeight: 0,
    },
  }));

  const classes = useStyles();

  const openGithub = (vlink) => {
    if (vlink) {
      window.open(vlink);
    }
  };

  const instance = 'Testing';
  // process.env.NODE_ENV === 'production'
  //   // eslint-disable-next-line no-underscore-dangle
  //   ? window._env_.REACT_APP_INSTANCE
  //   : process.env.REACT_APP_INSTANCE;

  let version = '--';
  let vlink = null;

  if (
    Object.entries(git_json).length !== 0
    && git_json.constructor === Object
  ) {
    if (git_json.tag) {
      version = `${git_json.tag}`;
      vlink = `${git_json.url}`;
    } else {
      version = `${git_json.sha.substring(0, 7)}`;
      vlink = `${git_json.url.replace(/.git$/, '')}/commit/${git_json.sha}`;
    }
  }

  return (
    <footer className={classes.root}>
      <AppBar position="fixed" className={drawerOpen ? classes.appBarDrawerOpen : classes.appBarDrawerClose}>
        <Toolbar className={classes.toolbar}>
          <Typography color="inherit" className={classes.grow}>
            {instance}
            {' '}
            Portal:
            {' '}
            <span
              onClick={() => openGithub(vlink)}
              className={classes.versionLink}
            >
              {version}
            </span>
          </Typography>
          <Typography color="inherit">Powered by</Typography>
          <a href="http://www.linea.gov.br/" target="blank" className={classes.logoLink}>
            <img
              src={logo}
              title="LIneA"
              alt="LineA"
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
          </a>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

Footer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
};

export default Footer;
