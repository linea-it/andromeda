import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import styles from './styles';
import { host } from '../../api/Api';

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

function Apollo() {
  const classes = styles();
  const [count, setCount] = useState(1);

  const [lineaGridOverview, setLineaGridOverview] = useState([
    `${host}/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=mem_report&z=medium&_=1563364904424&st=`,
    `${host}/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=cpu_report&z=medium&_=1563364904425&st=`,
    `${host}/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&g=network_report&z=medium&_=1563364904425&st=`,
    `${host}/gangliaicx/stacked.php?m=load_one&c=Compute+Nodes&r=hour&st=`,
  ]);

  const [lineaGridPlots, setLineaGridPlots] = useState([
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl01&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl02&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl03&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl04&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl05&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl06&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl07&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl08&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl09&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl10&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl11&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl12&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl13&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl14&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl15&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl16&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=gwicx&st=`,
    `${host}/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=loginicx&st=`,
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    setLineaGridPlots((prevState) =>
      prevState.map((node) => `${node.split('&st=')[0]}&st=${count}`)
    );
    setLineaGridOverview((prevState) =>
      prevState.map((overview) => `${overview.split('&st=')[0]}&st=${count}`)
    );
  }, [count]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>
        Apollo
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.cardsContainer}>
          <Grid item xs={12}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
              }}>
              <GridList cellHeight="auto" cols={3}>
                {lineaGridOverview
                  .filter((el, i) => lineaGridOverview.length - 1 !== i)
                  .map((chart) => (
                    <GridListTile>
                      <img src={chart} alt="Overview" className={classes.imgResponsive} />
                    </GridListTile>
                  ))}
              </GridList>
              <GridList cellHeight="auto" cols={1}>
                <GridListTile>
                  <img
                    src={lineaGridOverview[lineaGridOverview.length - 1]}
                    alt="Aggregated Cluster Load"
                    className={classes.imgResponsive}
                  />
                </GridListTile>
              </GridList>
              <GridList cellHeight="auto" cols={4}>
                {lineaGridPlots.map((plot) => (
                  <GridListTile>
                    <img src={plot} alt="Nodes" className={classes.imgResponsive} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Apollo;
