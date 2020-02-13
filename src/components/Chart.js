import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const useStyles = makeStyles(({
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
  },
  imgResponsive: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

export default function Chart() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [icex, setIcex] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=mem_report&z=medium&_=1563364904424&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=cpu_report&z=medium&_=1563364904425&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=network_report&z=medium&_=1563364904425&st=',
    'http://condorapi.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute+Nodes&r=hour&st=1563364897&host_regex=&st=',
  ]);
  const [altix, setAltix] = useState([
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?c=Rocks-Cluster%20Production%20LIneA&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=mem_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?c=Rocks-Cluster%20Production%20LIneA&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=cpu_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?c=Rocks-Cluster%20Production%20LIneA&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=network_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaaltix/stacked.php?m=load_one&c=Rocks-Cluster%20Production%20LIneA&r=hour&st=',
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    setIcex(
      icex.map(node => `${node.split('&st=')[0]}&st=${count}`),
    );
    setAltix(
      altix.map(node => `${node.split('&st=')[0]}&st=${count}`),
    );
  }, [count, icex, altix]);


  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
            }}
            >
              <GridList
                cellHeight="auto"
                cols={3}
              >
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[ICEx]</strong>
                    {' '}
                    Memory Usage
                  </Typography>
                  <img src={icex[0]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[ICEx]</strong>
                    {' '}
                  CPU Usage
                  </Typography>
                  <img src={icex[1]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[ICEx]</strong>
                    {' '}
                  Network Usage
                  </Typography>
                  <img src={icex[2]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
              </GridList>
              <GridList
                cellHeight="auto"
                cols={3}
              >
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[Altix]</strong>
                    {' '}
                  Memory Usage
                  </Typography>
                  <img src={altix[0]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[Altix]</strong>
                    {' '}
                  CPU Usage
                  </Typography>
                  <img src={altix[1]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[Altix]</strong>
                    {' '}
                  Network Usage
                  </Typography>
                  <img src={altix[2]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
              </GridList>
              <GridList
                cellHeight="auto"
                cols={2}
              >
                <GridListTile style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[ICEx]</strong>
                    {' '}
                  Aggregated Cluster Load
                  </Typography>
                  <img src={icex[3]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile style={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    className={classes.plotTitle}
                  >
                    <strong>[Altix]</strong>
                    {' '}
                  Aggregated Cluster Load
                  </Typography>
                  <img src={altix[3]} alt="Ganglia chart" className={classes.imgResponsive} />
                </GridListTile>
              </GridList>
            </div>
          </Grid>
        </Grid>
      </div>

    </React.Fragment>
  );
}
