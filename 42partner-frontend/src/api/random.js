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

export const cancelRandomMatch = ({ category }) => {
  client
    .post(`/api/random-matches/mine`, category)
    .then((res) => {
      console.log('!!!!', category);
      return res.data;
    })
    .catch((e) => {
      console.log('errrrr', category);
      console.error(e);
    });
};

export const getRandomMatch = ({ value }) => {
  return client.get(
    `/api/random-matches/condition/mine?contentCategory=${value}`,
  );
};
