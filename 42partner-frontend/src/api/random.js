import client from './client';

export const postRandomMatch = ({ option }) => {
  client
    .post(`/api/random-matches`, option)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
};

export const cancelRandomMatch = () => {
  return client.post(`/api/random-matches/mine`);
};
