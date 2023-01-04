import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_KEY;
const apiURL = 'https://api.42partner.com';

const instance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});

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
