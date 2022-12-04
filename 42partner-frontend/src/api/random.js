import client from './client';

export const getRandomMatch = ({ contentCategory }) => {
  return client.get(
    `/api/random-matches/mine?contentCategory=${contentCategory}`,
  );
};

export const getMatchCondition = ({ topic }) => {
  return client.get(
    `/api/random-matches/condition/mine?contentCategory=${topic}`,
  );
};

export const postRandomMatch = async ({ option }) => {
  await client.post(`/api/random-matches`, option);
  return getRandomMatch(option);
};

export const cancelRandomMatch = ({ contentCategory }) => {
  return client.post(`/api/random-matches/mine`, { contentCategory });
};

export const getMatchCount = ({ topic }) => {
  return client.get(
    `/api/random-matches/members/count?contentCategory=${topic}`,
  );
};
