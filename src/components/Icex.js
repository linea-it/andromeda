import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
  },
  cardsContainer: {
    paddingTop: 20,
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '400',
    color: '#5a5c69',
    marginBottom: 0,
  },
  imgResponsive: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
  },
}));

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
  const [computerNodesPlots, setComputerNodesPlots] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl01&l=&v=1.06&r=hour&su=1&st=1563361418&x=16.09&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl02&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl03&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl04&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl05&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl06&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl07&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl08&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl09&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl10&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl11&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl12&l=&v=0.03&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl13&l=&v=1.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl14&l=&v=0.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl15&l=&v=17.00&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Compute%20Nodes&h=apl16&l=&v=1.05&r=hour&su=1&st=1563362535&x=17.00&n=0&vl=+&st=',
  ]);
  const [rackPlots, setRackPlots] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i0n0&l=&v=1.00&r=hour&su=1&st=1563366833&x=1.03&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i0n1&l=&v=0.00&r=hour&su=1&st=1563366833&x=1.03&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i1n0&l=&v=0.00&r=hour&su=1&st=1563366833&x=1.03&n=0&vl=+&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?m=load_one&z=small&c=Rack%201&h=r1i1n1&l=&v=0.01&r=hour&su=1&st=1563366833&x=1.03&n=0&vl=+&st=',
  ]);
  const [computerNodesOverview, setComputerNodesOverview] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&st=1563362232&g=mem_report&z=medium&_=1563364904424&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&st=1563362232&g=cpu_report&z=medium&_=1563364904425&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Compute+Nodes&m=load_one&r=hour&s=by+name&hc=4&mc=2&st=1563362232&g=network_report&z=medium&_=1563364904425&st=',
    'http://condorapi.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute+Nodes&r=hour&st=1563364897&host_regex=&st=',
  ]);
  const [rackOverview, setRackOverview] = useState([
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&st=1563367916&g=mem_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&st=1563367916&g=cpu_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/graph.php?c=Rack%201&m=load_one&r=hour&s=by%20name&hc=4&mc=2&st=1563367916&g=network_report&z=medium&st=',
    'http://condorapi.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Rack%201&r=hour&st=1563367916&st=',
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    setComputerNodesPlots(
      computerNodesPlots.map(node => node + count),
    );

    setRackPlots(
      rackPlots.map(node => node + count),
    );

    setComputerNodesOverview(
      computerNodesOverview.map(overview => overview + count),
    );

    setRackOverview(
      rackOverview.map(overview => overview + count),
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
                {
                  computerNodesOverview.filter(
                    (el, i) => computerNodesOverview.length - 1 !== i,
                  ).map(chart => (
                    <GridListTile>
                      <img src={chart} alt="Overview" className={classes.imgResponsive} />
                    </GridListTile>
                  ))}
                {rackOverview.filter((el, i) => rackOverview.length - 1 !== i).map(chart => (
                  <GridListTile>
                    <img src={chart} alt="Overview" className={classes.imgResponsive} />
                  </GridListTile>
                ))}
              </GridList>
              <GridList
                cellHeight="auto"
                cols={2}
              >
                <GridListTile>
                  <img src={computerNodesOverview[computerNodesOverview.length - 1]} alt="Aggregated Cluster Load" className={classes.imgResponsive} />
                </GridListTile>
                <GridListTile>
                  <img src={rackOverview[rackOverview.length - 1]} alt="Aggregated Cluster Load" className={classes.imgResponsive} />
                </GridListTile>
              </GridList>
              <GridList
                cellHeight="auto"
                cols={4}
              >
                {computerNodesPlots.map(plot => (
                  <GridListTile>
                    <img src={plot} alt="Nodes" className={classes.imgResponsive} />
                  </GridListTile>
                ))}
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
