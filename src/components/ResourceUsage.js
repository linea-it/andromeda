import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 530,
    overflow: 'auto',
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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  closeIcon: {
    width: '.5em',
    height: '.5em',
  },
  plotTitle: {
    fontSize: 16,
    width: '100%',
    float: 'left',
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
  },
  cardsContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  imgResponsive: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

function ResourceUsage({
  showTable,
  handleClose,
  remoteHosts,
  title,
  startDate,
  currentDate,
}) {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="nodes"
      open={showTable}
      maxWidth="md"
    >
      <Card className={classes.card}>
        <CardHeader
          title={(
            <>
              <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
              <span className={classes.headerTitle}>{title}</span>
            </>
          )}
          className={classes.cardHeader}
        />
        <CardContent>
          { remoteHosts.map((remoteHost, i) => {
            const node = remoteHost.ClusterName === 'ICE-X'
              ? remoteHost.RemoteHost.split('@')[1].split('.')[0]
              : remoteHost.RemoteHost.split('@')[1];

            const cluster = remoteHost.ClusterName === 'ICE-X' ? 'gangliaicx' : 'gangliaaltix';
            let grid = remoteHost.ClusterName === 'ICE-X' ? 'Compute%20Nodes' : 'Rocks-Cluster%20Production%20LIneA';
            if (node.indexOf('r1') === 0) grid = 'Rack%201';

            return (
              <React.Fragment key={node}>
                <Grid container spacing={2} className={classes.cardsContainer}>
                  <Grid item xs={12}>

                    <GridList
                      cellHeight="auto"
                      cols={3}
                    >
                      <GridListTile>
                        <Typography
                          variant="h6"
                          className={classes.plotTitle}
                        >
                          <strong>{`[${node.split('.local')[0]}]`}</strong>
                          {' '}
                          <span>Memory Usage</span>
                        </Typography>
                        <img
                          src={`http://condorapi.linea.gov.br/${cluster}/graph.php?m=mem_report&z=small&c=${grid}&h=${node}&cs=${startDate}+&ce=${currentDate}`}
                          alt="Memory Usage"
                          className={classes.imgResponsive}
                        />
                      </GridListTile>
                      <GridListTile>
                        <Typography
                          variant="h6"
                          className={classes.plotTitle}
                        >
                          <strong>{`[${node.split('.local')[0]}]`}</strong>
                          {' '}
                          <span>CPU Usage</span>
                        </Typography>
                        <img
                          src={`http://condorapi.linea.gov.br/${cluster}/graph.php?m=load_one&z=small&c=${grid}&h=${node}&cs=${startDate}+&ce=${currentDate}`}
                          alt="CPU Usage"
                          className={classes.imgResponsive}
                        />
                      </GridListTile>
                      <GridListTile>
                        <Typography
                          variant="h6"
                          className={classes.plotTitle}
                        >
                          <strong>{`[${node.split('.local')[0]}]`}</strong>
                          {' '}
                          <span>Network Usage</span>
                        </Typography>
                        <img
                          src={`http://condorapi.linea.gov.br/${cluster}/graph.php?m=network_report&z=small&c=${grid}&h=${node}&cs=${startDate}+&ce=${currentDate}`}
                          alt="Network Usage"
                          className={classes.imgResponsive}
                        />
                      </GridListTile>
                    </GridList>
                  </Grid>
                </Grid>
                {remoteHosts.length > 0 && i !== remoteHosts.length - 1 ? <Divider /> : null}
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
    </Dialog>
  );
}

ResourceUsage.propTypes = {
  title: PropTypes.string.isRequired,
  remoteHosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  showTable: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  currentDate: PropTypes.string.isRequired,
};


export default ResourceUsage;
