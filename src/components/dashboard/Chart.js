import React, { useState, useEffect, useRef } from 'react';
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
}));

export default function Chart() {
  const classes = useStyles();
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([
    'https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute%20Nodes&r=hour&st==0',
    'https://srvlupa.linea.gov.br/gangliaicx/graph.php?r=hour&z=xlarge&me=ICE&m=load_one&s=by+hosts+up&mc=2&g=mem_report&st&st=0',
    'https://srvlupa.linea.gov.br/gangliaicx/graph.php?r=hour&z=xlarge&me=ICE&m=load_one&s=by+hosts+up&mc=2&g=network_report&st=0',
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 2000);

  useEffect(() => {
    setImages([
      `https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute%20Nodes&r=hour&st==${count}`,
      `https://srvlupa.linea.gov.br/gangliaicx/graph.php?r=hour&z=xlarge&me=ICE&m=load_one&s=by+hosts+up&mc=2&g=mem_report&st&st=${count}`,
      `https://srvlupa.linea.gov.br/gangliaicx/graph.php?r=hour&z=xlarge&me=ICE&m=load_one&s=by+hosts+up&mc=2&g=network_report&st=${count}`,
    ]);
  }, [count]);


  return (
    <React.Fragment>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
      }}
      >
        <GridList
          cellHeight={320}
          style={{
            width: '100%',
            height: 330,
          }}
          cols={3}
        >
          <GridListTile>
            <Typography
              variant="h6"
              className={classes.plotTitle}
            >
              Aggregated Cluster Load
            </Typography>
            <img src={images[0]} alt="Ganglia chart" />
          </GridListTile>
          <GridListTile>
            <Typography
              variant="h6"
              className={classes.plotTitle}
            >
              Memory Usage
            </Typography>
            <img src={images[1]} alt="Ganglia chart" />
          </GridListTile>
          <GridListTile>
            <Typography
              variant="h6"
              className={classes.plotTitle}
            >
              Network Usage
            </Typography>
            <img src={images[2]} alt="Ganglia chart" />
          </GridListTile>
        </GridList>
      </div>
    </React.Fragment>
  );
}
