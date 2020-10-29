import axios from 'axios';

const host = process.env.REACT_APP_API || `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? ':' : ''
}${window.location.port}`;

axios.defaults.baseURL = host;

let sections = [];

export const getSections = () =>
  axios.get('/sections')
  .then((res) => {
    if (sections.length === 0) {
      sections = res.data;
    }
  })  
  .catch((err) => {
    console.error(err);
    return err;
  });
  getSections();

export const getJobs = () =>
  axios.get('/jobs?cols=ImageSize')
  .then((res) => filterSection(res.data,"Section","data",true))
  .catch((err) => {
    console.error(err);
    return err;
  });

export const getJobsByApps = () => {
    return axios.get('/jobs_by_key?key=AppType')
      .then(res => res.data)
      .catch((err) => {
        console.error(err);
        return err;
      });;
  };


export const getProcesses = () =>
  axios.get('/jobs?cols=ImageSize').then(res => {
    return filterSection(res.data,"Section","data",true);
  }).catch((err) => {
    console.error(err);
    return err;
  });

export const getUsersStats = () =>
  axios.get('/users_stats').then(
    (res) => filterSection(res.data,"ClusterName","Users", true)
  ).catch((err) => {
    console.error(err);
    return err;
  });

export const getNodes = () =>
  axios.get('/nodes').then((res) => res.data)
  .catch((err) => {
    console.error(err);
    return err;
  });


export const getHistory = () => {
  return axios.get('/history')
    .then(res => {
      const data = filterSection(res.data,"Section");
      return {
        total_count: data.total_count,
        data: data.data.map(item => ({...item, Id: item.ClusterId || item.ProcessId}))
      };
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export const getTopUsers = () => {
  return axios.get('/top_users')
    .then(res => {
      return groupTopUsers(filterSection(res.data,"ClusterName","Users", true));
    });
};

const groupTopUsers = (topUsers) => {
  const topUsersGrouped = [];
  topUsers.forEach(topUser => {
    const index = topUsersGrouped.findIndex(el => el.User === topUser.User);
    if (index >= 0){
      topUsersGrouped[index].TotalExecutionTime = 
      topUsersGrouped[index].TotalExecutionTime + topUser.TotalExecutionTime;
    }else {
      topUsersGrouped.push(topUser);
    }
  })
  return topUsersGrouped;
}

const filterSection = (data, propertySection, path, isArray) => {
  let dataConcat = [];
  if (data.length > 0) {
    return data;
  } else { 
    sections.forEach(section => {
      if (data[section[propertySection]]) {
        dataConcat = dataConcat.concat(data[section[propertySection]][path || 'data']);
      }
    });
    if (isArray) {
      return dataConcat;
    }
    return {
      total_count: dataConcat.length,
      data: dataConcat
    };
  }
}