import axios from 'axios';

const icex = 'http://localhost:8080';
const altix = 'https://condorapi.linea.gov.br/altix';

// const icex = 'https://condorapi.linea.gov.br/icex';
// const altix = 'https://condorapi.linea.gov.br/altix';
// const icex = 'https://condorapi.linea.gov.br/testing';
// const altix = 'https://condorapi.linea.gov.br/altix';

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


export const getHistory = ({ cluster, limit, offset, search, sorting }) => {

  const cols = 'ProcessId,Owner,Portal,ClusterName,Cmd';
  const params = {
    search: search,
    ordering: sorting,
    offset: offset,
    limit: limit,
    cols: cols,
  }
  return axios.get(`${icex}/history`, { params })
    .then(res => {
      res.data.data.forEach(element => {
        element.submissionMode = element.ProcessId.charAt(0).toUpperCase() + element.ProcessId.substring(1, element.ProcessId.indexOf('.'));
        element.Id = element.ProcessId !== 'None' ? element.ProcessId.substring(element.ProcessId.indexOf('.') + 1) : '-';
      });
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export const getParentHistory = ({ row, pageSize, currentPage }) => {
  console.log(row);
  const params = {
    limit:pageSize,
    page: currentPage,
  }
  if (row.submissionMode === 'Cluster' || row.submissionMode === 'Manual') {
    params.ClusterId__eq = row.Id;
  }else {
    params.Process__eq = row.Id;
  }
  return axios.get(`${icex}/parent_history`, { params })
    .then(res => {
      return res.data;
    })
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
  cluster,
}) => {
  if (isToday) {

    return axios
      .get(
        `${cluster === 'icex' ? icex : altix}/top_users?JobFinishedHookDone__contains=${endDate}&limit=${limit || 10}`
      )
      .then(res => res.data);
  }
  return axios
    .get(
      `${cluster === 'icex' ? icex : altix}/top_users?JobFinishedHookDone__range=${startDate},${endDate}&limit=${limit || 10}`
    )
    .then(res => res.data);
};