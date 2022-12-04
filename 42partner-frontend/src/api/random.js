import client from './client';

export const getRandomMatch = ({ contentCategory }) => {
  return client.get(
    `/api/random-matches/condition/mine?contentCategory=${contentCategory}`,
  );
};

export const postRandomMatch = async ({ option }) => {
  await client.post(`/api/random-matches`, option);
  return getRandomMatch(option);
};

export const cancelRandomMatch = ({ contentCategory }) => {
  client
    .post(`/api/random-matches/mine`, { contentCategory })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
};

export const completeRandomMatch = ({ contentCategory }) => {
  return client.get(
    `/api/matches?contentCategory=${contentCategory}&sort=createdAt,DESC&size=1`, // &methodCategory=RANDOM
  );
};
