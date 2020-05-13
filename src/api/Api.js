import axios from 'axios';

const icex = 'https://condorapi.linea.gov.br/icex';
const altix = 'https://condorapi.linea.gov.br/altix';
const icexHistory = 'https://condorapi.linea.gov.br/testing';

export const getJobs = () =>
  axios.all([
    axios.get(`${icex}/jobs?cols=ImageSize`),
    axios.get(`${altix}/jobs?cols=ImageSize`),
  ])
  .then(axios.spread((icexRes, altixRes) => altixRes.data.concat(icexRes.data)))
  .catch((err) => {
    console.error(err);
    return err;
  });


export const getProcesses = () =>
  axios.all([
    axios.get(`${icex}/jobs?cols=ImageSize`),
    axios.get(`${altix}/jobs?cols=ImageSize`),
  ])
  .then(axios.spread((icexRes, altixRes) => {
    const icexData = icexRes.data.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj.Process + mapObj.Owner).indexOf(obj.Process + obj.Owner) === pos
    )
    const altixData = altixRes.data.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj.Process + mapObj.Owner).indexOf(obj.Process + obj.Owner) === pos
      &&
      obj["All queues are empty"] !== 'All'
    )

    return icexData.concat(altixData)
    }
  ))
  .catch((err) => {
    console.error(err);
    return err;
  });

export const getProcessesByOwner = (owner) =>
  axios.all([
    axios.get(`${icex}/jobs?Owner="${owner}"`),
    axios.get(`${altix}/jobs?Owner="${owner}"`),
  ])
  .then(axios.spread((icexRes, altixRes) =>
    altixRes.data.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj.Process)
      .indexOf(obj.Process) === pos
    )
    .concat(icexRes.data.filter((obj, pos, arr) =>
      arr.map(mapObj => mapObj.Process)
      .indexOf(obj.Process) === pos
    ))
  ))
  .catch((err) => {
    console.error(err);
    return err;
  });

export const getUsersStats = () =>
  axios.all([
    axios.get(`${icex}/users_stats`),
    axios.get(`${altix}/users_stats`),
  ])
  .then(axios.spread((icexRes, altixRes) => altixRes.data.concat(icexRes.data)))
  .catch((err) => {
    console.error(err);
    return err;
  });

export const getNodes = () =>
  axios.all([
    axios.get(`${icex}/nodes`),
    axios.get(`${altix}/nodes`),
  ])
  .then(axios.spread((icexRes, altixRes) => altixRes.data.concat(icexRes.data)))
  .catch((err) => {
    console.error(err);
    return err;
  });


export const getHistory = ({ limit, offset, search, sorting }) => {


  const params = {
    search: search,
    ordering: sorting,
    offset: offset,
    limit: limit,
  }

  console.table(params)

  return axios.get(`${icexHistory}/history`, { params })
    .then(res => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export const getTopUsers = ({
  startDate,
  endDate,
  isToday,
  limit,
}) => {
  if (isToday) {

    console.log('endDate', endDate)

    return axios
      .get(
        `${icexHistory}/top_users?JobFinishedHookDone__contains=${endDate}&limit=${limit || 10}`
      )
      .then(res => res.data);
  }
  return axios
    .get(
      `${icexHistory}/top_users?JobFinishedHookDone__range=${startDate},${endDate}&limit=${limit || 10}`
    )
    .then(res => res.data);
};