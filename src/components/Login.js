import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 3,
    justifyContent: 'end',
  },
  buttonWrapper: {
    width: '100%',
    float: 'right',
  },
  buttonText: {
    textTransform: 'none',
    textAlign: 'right',
    paddingRight: 5,
    color: 'rgb(160, 151, 157)',
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
    padding: '3px 0',
    display: 'block',
    float: 'right',
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    borderLeft: '1px solid rgb(227, 230, 240)',
    borderRadius: 0,
    minWidth: 120,
    '&:active': {
      boxShadow: 'none',
    },
  },
  icon: {
    fontSize: 12,
    width: 'auto',
    color: 'rgb(160, 151, 157)',
  },
  listItemIcon: {
    minWidth: 24,
  },
  itemText: {
    fontSize: '.875em',
    color: 'rgb(160, 151, 157)',
  },
  menuItem: {
    padding: '.25rem 1.5rem',
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Login() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.buttonWrapper}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.button}
      >
        <Grid item xs={12} sm container alignItems="center">
          <Grid item xs={7} container direction="column">
            <Typography component="span" className={classes.buttonText}>Usuário</Typography>
          </Grid>
          <Grid item xs={5} container direction="column" justify="center">
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
          </Grid>
        </Grid>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className={clsx(classes.icon, 'fas', 'fa-user')} />
          </ListItemIcon>
          <ListItemText
            primary={(
              <span className={classes.itemText}>Profile</span>
            )}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className={clsx(classes.icon, 'fas', 'fa-cogs')} />
          </ListItemIcon>
          <ListItemText
            primary={(
              <span className={classes.itemText}>Settings</span>
            )}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className={clsx(classes.icon, 'fas', 'fa-list')} />
          </ListItemIcon>
          <ListItemText
            primary={(
              <span className={classes.itemText}>Activity Log</span>
            )}
          />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem>
          <ListItemIcon className={classes.listItemIcon}>
            <Icon className={clsx(classes.icon, 'fas', 'fa-sign-out-alt')} />
          </ListItemIcon>
          <ListItemText
            primary={(
              <span className={classes.itemText}>Logout</span>
            )}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default Login;
