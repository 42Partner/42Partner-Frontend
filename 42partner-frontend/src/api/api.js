import axios from 'axios';

const apiURL = 'https://api.42partner.com';

const instance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

// instance.interceptors.request.use(
//   function setConfig(parameter) {
//     const config = parameter;
//     config.headers = {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'multipart/form-data',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     };
//     return config;
//   },
//   function getError(error) {
//     return Promise.reject(error);
//   },
// );

const refreshToken = async (error) => {
  const refresh = axios.create({
    baseURL: apiURL,
    withCredentials: true,
  });

  const retry = (errorConfig) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (errorConfig.method === 'get')
          resolve(instance.get(errorConfig.url));
        else if (errorConfig.method === 'post')
          resolve(instance.post(errorConfig.url));
      }, 500);
    });
  };

  let response;

  try {
    response = await refresh.post(`api/token/refresh`);
  } catch (e) {
    alert(e);
  }

  const newAccessToken = response.data.accessToken;

  /* eslint-disable dot-notation */
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${newAccessToken}`;
  localStorage.setItem('accessToken', newAccessToken);
  /* eslint-disable no-param-reassign */
  error.config.headers.Authorization = `Bearer ${newAccessToken}`;
  error.config.headers.withCredentials = true;
  retry(error.config);
  return Promise.reject(error);
};

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    } else if (
      error.response.status === 403 &&
      error.response.data.code === 'AU001'
    ) {
      return refreshToken(error);
    } else if (error.response.status === 404) {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default instance;

export const getMatches = () =>
  axios.get(process.env.REACT_APP_API_KEY`/matches`);

export const getActivityScore = () =>
  axios.get(process.env.REACT_APP_API_KEY`/activities/score`);
