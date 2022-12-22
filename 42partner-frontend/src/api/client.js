import axios from 'axios';

const client = axios.create({
  headers: {
    'Content-Type': `application/json`,
  },
  // baseURL: 'https://api.42partner.com',
  withCredentials: true,
});

client.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if ('response' in error && error.response.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  },
);

export default client;
