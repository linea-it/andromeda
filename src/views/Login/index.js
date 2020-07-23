import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../commons/ResourceUsage';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';

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
