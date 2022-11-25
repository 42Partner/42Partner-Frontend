import axios from 'axios';

const client = axios.create({});

client.interceptors.response.use(
  (res) => {
    console.log(res.data);
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  },
);

export default client;
