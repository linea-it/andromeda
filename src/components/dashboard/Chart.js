import React, { useState, useEffect, useRef } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


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

export default function Chart() {
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([
    'https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute%20Nodes&r=hour&st=0',
    'https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Rack%201&r=hour&st=0',
    'https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Controller%20Nodes&r=hour&st=0',
  ]);

  useInterval(() => {
    setCount(count + 1);
  }, 5000);

  useEffect(() => {
    setImages([
      `https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Compute%20Nodes&r=hour&st=${count}`,
      `https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Rack%201&r=hour&st=${count}`,
      `https://srvlupa.linea.gov.br/gangliaicx/stacked.php?m=load_one&c=Controller%20Nodes&r=hour&st=${count}`,
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
            <img src={images[0]} alt="Ganglia chart" />
          </GridListTile>
          <GridListTile>
            <img src={images[1]} alt="Ganglia chart" />
          </GridListTile>
          <GridListTile>
            <img src={images[2]} alt="Ganglia chart" />
          </GridListTile>
        </GridList>
      </div>
    </React.Fragment>
  );
}
