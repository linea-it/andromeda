import axios from 'axios';

const url = 'http://loginicx.linea.gov.br:5000';

export const getActiveServers = () => 
  axios.get(`${url}/nodes`)
    .then(res => {
      const servers = res.data.map(item => item.UtsnameNodename);
      const uniqueServers = servers.filter((el, i) => servers.indexOf(el) === i);
      return uniqueServers;
    });

export const getUniqueUsers = () =>
  axios.get(`${url}/jobs`)
    .then(res => {
      const users = res.data.map(item => item.Owner);
      const uniqueUsers = users.filter((el, i) => users.indexOf(el) === i);
      return uniqueUsers;
    });

export const getJobs = () =>
  axios.get(`${url}/jobs`)
    .then(res => res.data)
    .catch((err) => {
      console.error(err);
      return err;
    });

export const getJobsRunning = () =>
  axios.get(`${url}/jobs`)
  .then(res => res.data.filter(el => el.JobStatus === '2'));
