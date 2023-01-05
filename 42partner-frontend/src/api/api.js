import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_KEY;
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
      window.location = '/login';
    } else if (error.response.status === 404) {
      // 1. 404 페이지를 따로 만들기
      // 2. alert 혹은 다른 모달을 띄우고 초기 화면으로 이동
      alert('로그인이 필요합니다.');
      window.location = '/';
    }
    return Promise.reject(error);
  },
);

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
