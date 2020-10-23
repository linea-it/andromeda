import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import useStyles from './styles';

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

function Icex() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [rackPlots, setRackPlots] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i0n0&l=&v=1.00&r=hour&su=1&x=1.03&n=0&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i0n1&l=&v=0.00&r=hour&su=1&x=1.03&n=0&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i1n0&l=&v=0.00&r=hour&su=1&x=1.03&n=0&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i1n1&l=&v=0.01&r=hour&su=1&x=1.03&n=0&st=',
  ]);
  const [rackOverview, setRackOverview] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=mem_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=cpu_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&g=network_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Rack%201&r=hour&st=',
  ]);

  useInterval(() => {
    if (count > 1000) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }, 2000);

  useEffect(() => {
    setRackPlots(
      rackPlots.map(node => `${node.split('&st=')[0]}&st=${count}`),
    );

    setRackOverview(
      rackOverview.map(overview => `${overview.split('&st=')[0]}&st=${count}`),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>ICEx</Typography>
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
                {rackOverview.filter((el, i) => rackOverview.length - 1 !== i).map(chart => (
                  <GridListTile>
                    <img src={chart} alt="Overview" className={classes.imgResponsive} />
                  </GridListTile>
                ))}
              </GridList>
              <GridList
                cellHeight="auto"
                cols={1}
              >
                <GridListTile>
                  <img src={rackOverview[rackOverview.length - 1]} alt="Aggregated Cluster Load" className={classes.imgResponsive} />
                </GridListTile>
              </GridList>
              <GridList
                cellHeight="auto"
                cols={4}
              >
                {rackPlots.map(plot => (
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

export default Icex;
