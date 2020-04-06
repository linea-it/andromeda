import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

function TopUsers({ data }) {
  return (
    <Plot
      data={data}
      layout={{
        width: '100%',
        height: 480,
        title: 'Top Users',
        barmode: 'group',
        xaxis: {
          title: 'Owner',
          automargin: true,
          autorange: true,
        },
        yaxis: {
          title: 'UA (hour)',
          automargin: true,
          autorange: true,
          exponentformat: 'none',
          separatethousands: true,
          showgrid: true,
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
