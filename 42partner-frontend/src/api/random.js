import client from './client';

export const getRandomMatch = async ({ contentCategory }) => {
  return client.get(
    `/api/random-matches/mine?contentCategory=${contentCategory}`,
  );
};

export const postRandomMatch = async ({ option }) => {
  await client.post(`/api/random-matches`, option);
  return getRandomMatch(option);
};

export const cancelRandomMatch = ({ contentCategory }) => {
  return client.post(`/api/random-matches/mine`, { contentCategory });
};

export const completeRandomMatch = ({ contentCategory }) => {
  return client.get(
    `/api/matches?contentCategory=${contentCategory}&sort=createdAt,DESC&size=1`, // &methodCategory=RANDOM
  );
};
