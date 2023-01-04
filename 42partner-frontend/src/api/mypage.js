import instance from './api';

export const getUserData = () => {
  const userId = localStorage.getItem('userId');
  return instance.get(`/api/users/${userId}`);
};

export const getScore = () => {
  return instance.get(`/api/activities/score`);
};

export const getMatches = () => {
  return instance.get(`/api/matches`);
};

export const getDetail = ({ matchId }) => {
  return instance.get(`/api/matches/${matchId}`);
};
