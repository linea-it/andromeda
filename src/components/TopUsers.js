import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

function TopUsers({ data }) {
  return (
    <Plot
      data={data}
      layout={{
        title: 'Top Users',
        font: {
          family: 'Roboto',
        },
        margin: {
          // l: 0,
          // r: 0,
          // t: 0,
          // b: 0,
          pad: 0,
          autoexpand: true,
        },
        xaxis: {
          title: 'UA (hour)',
          automargin: true,
          autorange: true,
          exponentformat: 'none',
          separatethousands: true,
          showgrid: true,
        },
        yaxis: {
          title: 'Owner',
          automargin: true,
          autorange: true,
        },
        hovermode: 'closest',
        autosize: true,
        fixedrange: true,
      }}
      config={{
        scrollZoom: true,
        displaylogo: false,
        responsive: true,
      }}
    />
  );
}

TopUsers.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopUsers;
