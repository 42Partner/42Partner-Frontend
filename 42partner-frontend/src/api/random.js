import client from './client';

export const postRandomMatch = () => {
  return client.post(`/api/random-matches`);
};

export const cancelRandomMatch = () => {
  return client.post(`/api/random-matches/mine`);
};
