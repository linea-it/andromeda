import axios from 'axios';

const baseUrl = 'http://localhost:8090';
let sections = [];

export const getSections = () =>
  axios.get(`${baseUrl}/sections`)
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

// export const getJobs = () => filtroSection(jobsJson,"Section","data",true);
export const getJobs = () =>
  axios.get(`${baseUrl}/jobs?cols=ImageSize`)
  .then((res) => filtroSection(res.data,"Section","data",true))
  .catch((err) => {
    console.error(err);
    return err;
  });

export const getJobsByApps = () => {
    return axios.get(`${baseUrl}/jobs_by_key?key=AppType`)
      .then(res => res.data)
      .catch((err) => {
        console.error(err);
        return err;
      });;
  };


export const getProcesses = () =>
  axios.get(`${baseUrl}/jobs?cols=ImageSize`).then(res => {
    return filtroSection(res.data,"Section","data",true);
  }).catch((err) => {
    console.error(err);
    return err;
  });

export const getUsersStats = () =>
  axios.get(`${baseUrl}/users_stats`).then(
    (res) => filtroSection(res.data,"ClusterName","Users", true)
  ).catch((err) => {
    console.error(err);
    return err;
  });

export const getNodes = () =>
  axios.get(`${baseUrl}/nodes`).then((res) => res.data)
  .catch((err) => {
    console.error(err);
    return err;
  });


export const getHistory = ({ section }) => {
  const params = {
    section
  }
  return axios.get(`${baseUrl}/history`, { params })
    .then(res => {
      const data = filtroSection(res.data,"Section");
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

export const getTopUsers = ({
  section,
}) => {
  return axios.get(`${baseUrl}/top_users`)
    .then(res => {
      return agruparTopUsers(filtroSection(res.data,"ClusterName","Users", true));
    });
};

const agruparTopUsers = (topUsers) => {
  const topUsersAgrupado = [];
  topUsers.forEach(topUser => {
    const index = topUsersAgrupado.findIndex(el => el.User === topUser.User);
    if (index >= 0){
      topUsersAgrupado[index].TotalExecutionTime = 
      topUsersAgrupado[index].TotalExecutionTime + topUser.TotalExecutionTime;
    }else {
      topUsersAgrupado.push(topUser);
    }
  })
  return topUsersAgrupado;
}

const filtroSection = (data, propertySection, pathDados, isArray) => {
  let dadosConcat = [];
  if (data.length > 0) {
    return data;
  } else { 
    sections.forEach(section => {
      if (data[section[propertySection]]) {
        dadosConcat = dadosConcat.concat(data[section[propertySection]][pathDados || 'data']);
      }
    });
    if (isArray) {
      return dadosConcat;
    }
    return {
      total_count: dadosConcat.length,
      data: dadosConcat
    };
  }
}