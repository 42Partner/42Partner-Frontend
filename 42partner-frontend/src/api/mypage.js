import client from './client';

export const getUserData = () => {
  const userId = localStorage.getItem('userId');
  return client.get(`/api/users/${userId}`);
};

export const getScore = () => {
  return client.get(`/api/activities/score`);
};

export const getMatches = () => {
  return client.get(`/api/matches`);
};

export const getDetail = ({ matchId }) => {
  console.log(matchId);
  return client.get(`/api/matches/${matchId}`);
};
