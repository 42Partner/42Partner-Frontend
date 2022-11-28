import axios from 'axios';

const client = axios.create(
  {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoeWVuYW1Ac3R1ZGVudC40MnNlb3VsLmtyIiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL2xvZ2luL29hdXRoMi9jb2RlL2F1dGhjbGllbnQiLCJleHAiOjE2NzA4MjgzMDAsImF1dGhvcml0aWVzIjpbInVzZXIuZGVsZXRlIiwibWF0Y2guY3JlYXRlIiwiYXJ0aWNsZS5yZWFkIiwidXNlci51cGRhdGUiLCJtYXRjaC5yZWFkIiwicmFuZG9tLW1hdGNoLnVwZGF0ZSIsIm9waW5pb24uY3JlYXRlIiwib3Bpbmlvbi5kZWxldGUiLCJhcnRpY2xlLnVwZGF0ZSIsImFjdGl2aXR5LmRlbGV0ZSIsImFydGljbGUuZGVsZXRlIiwicmFuZG9tLW1hdGNoLmNyZWF0ZSIsIm1hdGNoLnVwZGF0ZSIsInVzZXIucmVhZCIsInVzZXIuY3JlYXRlIiwiYWN0aXZpdHkudXBkYXRlIiwiYWN0aXZpdHkuY3JlYXRlIiwiYXJ0aWNsZS5jcmVhdGUiLCJyYW5kb20tbWF0Y2gucmVhZCIsIm1hdGNoLmRlbGV0ZSIsInJhbmRvbS1tYXRjaC5kZWxldGUiLCJvcGluaW9uLnVwZGF0ZSIsImFjdGl2aXR5LnJlYWQiLCJvcGluaW9uLnJlYWQiXX0.tW5B9i3QGMKe_z0M4_OVhBat--kZNEDT__Jm8HD_Qic',
    },
  },
  { withCredentials: true },
);

client.interceptors.response.use(
  (res) => {
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
