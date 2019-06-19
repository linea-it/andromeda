import React, { useEffect } from 'react';
import axios from 'axios';

const config = {
  headers: { 'Access-Control-Allow-Origin': '*' },
};

function Api() {
  useEffect(() => {
    axios.get('http://loginicx.linea.gov.br:/5000/jobs', config)
      .then(res => res.json())
      .catch(err => err)
      .finally(data => data);
  });

  return (
    <p>...</p>
  );
}

export default Api;
