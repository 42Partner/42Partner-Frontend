import client from './client';

export const postRandomMatch = ({ option }) => {
  client
    .post(`/api/random-matches`, option)
    .then((res) => {
      console.log('!!!!', option);
      return res.data;
    })
    .catch((e) => {
      console.log('errrrr', option);
      console.error(e);
    });
};

export const cancelRandomMatch = () => {
  return client.post(`/api/random-matches/mine`);
};
