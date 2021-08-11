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

function Jupyter() {
  const classes = styles();
  const [count, setCount] = useState(1);

  const [lineaGridOverview, setLineaGridOverview] = useState([
    `${host}/gangliaaltix/graph.php?m=load_one&g=mem_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=`,
    `${host}/gangliaaltix/graph.php?m=load_one&g=load_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=`,
    `${host}/gangliaaltix/graph.php?m=load_one&g=network_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=`,
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    setLineaGridOverview((prevState) =>
      prevState.map((overview) => `${overview.split('&st=')[0]}&st=${count}`)
    );
  }, [count]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>
        Jupyter
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
                {lineaGridOverview.map((chart) => (
                  <GridListTile>
                    <img src={chart} alt="Overview" className={classes.imgResponsive} />
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

export default Jupyter;
