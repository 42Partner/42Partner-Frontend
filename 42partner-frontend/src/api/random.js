import instance from './api';

export const getRandomMatch = ({ contentCategory }) => {
  return instance.get(
    `/api/random-matches/mine?contentCategory=${contentCategory}`,
  );
};

export const getMatchCondition = ({ topic }) => {
  return instance.get(
    `/api/random-matches/condition/mine?contentCategory=${topic}`,
  );
};

export const postRandomMatch = async ({ option }) => {
  await instance.post(`/api/random-matches`, option);
  return getRandomMatch(option);
};

export const cancelRandomMatch = ({ contentCategory }) => {
  return instance.post(`/api/random-matches/mine`, { contentCategory });
};

export const getMatchCount = ({ topic }) => {
  return instance.get(
    `/api/random-matches/members/count?contentCategory=${topic}`,
  );
};
