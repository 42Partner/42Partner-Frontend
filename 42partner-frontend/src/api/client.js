import axios from 'axios';

const client = axios.create(
  { headers: { 'Content-Type': `application/json` } },
  { withCredentials: true },
);

client.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   window.location = '/login';
    // }
    return Promise.reject(error);
  },
);

export default client;
