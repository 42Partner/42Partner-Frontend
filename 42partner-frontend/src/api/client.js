import axios from 'axios';

const client = axios.create();

client.defaults.withCredentials = true;

client.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
