import React, { useEffect, useRef, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import styles from './styles';

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
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&g=mem_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=',
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&g=load_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=',
    'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&g=network_report&z=medium&c=Servidores+de+Apoio&h=srvnode01.linea.gov.br&st=',
  ]);

  // const [lineaGridPlots, setLineaGridPlots] = useState([
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc01.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc02.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc03.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc06.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc07.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc08.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc09.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc10.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc11.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc12.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc14.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc15.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc16.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc17.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc18.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc19.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc20.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc21.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc22.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc23.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc24.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc25.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc26.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc27.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc28.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc29.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc30.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc31.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc32.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc33.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc34.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  //   'http://condorapi.linea.gov.br/gangliaaltix/graph.php?m=load_one&z=small&c=Rocks-Cluster%20Production%20LIneA&h=nc36.local&l=e2ecff&v=0.08&r=hour&su=1&st=',
  // ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    // setLineaGridPlots(
    //   lineaGridPlots.map(node => `${node.split('&st=')[0]}&st=${count}`),
    // );
    setLineaGridOverview(
      lineaGridOverview.map(overview => `${overview.split('&st=')[0]}&st=${count}`),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography component="h1" className={classes.title}>Jupyter</Typography>
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
                {lineaGridOverview.map(chart => (
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
