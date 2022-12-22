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

export const cancelRandomMatch = async ({ contentCategory }) => {
  await client.post(`/api/random-matches/mine`, {
    contentCategory,
  });
  const category = { topic: contentCategory };
  // eslint-disable-next-line no-use-before-define
  const res = await getMatchCount(category);
  return res;
};

export const getMatchCount = ({ topic }) => {
  return client.get(
    `/api/random-matches/members/count?contentCategory=${topic}`,
  );
};
