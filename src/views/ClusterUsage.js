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
          pad: 0,
          autoexpand: true,
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
