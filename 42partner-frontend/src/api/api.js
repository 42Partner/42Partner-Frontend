import axios from 'axios';

const apiURL = 'https://api.42partner.com';

const instance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    } else if (
      error.response.status === 403 &&
      error.response.data.code === 'AU001'
    ) {
      // 함수화하기?
      axios
        .create({
          baseURL: apiURL,
          withCredentials: true,
        })
        .post(`api/token/refresh`)
        .then((Response) => {
          /* eslint-disable dot-notation */
          const newAccessToken = Response.data.accessToken;
          instance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${newAccessToken}`;
          localStorage.setItem('accessToken', newAccessToken);
          window.location.href = '/select';
        })
        .catch((Error) => {
          console.log(Error);
        });
    } else if (error.response.status === 404) {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

// // 다른 axios instance로 사용해야 무한 루프에 빠지지 않음
// refresh.interceptors.response.use(
//   (res) => {
//     console.log(res);
//     return res;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       window.location = '/login';
//     }
//     return Promise.reject(error);
//   },
// );

// instance.defaults.withCredentials = true;

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

export default instance;

export const getMatches = () =>
  axios.get(process.env.REACT_APP_API_KEY`/matches`);

export const getActivityScore = () =>
  axios.get(process.env.REACT_APP_API_KEY`/activities/score`);
