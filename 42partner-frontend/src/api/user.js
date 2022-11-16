import client from './client';

export const getUserId = () => {
  return client.get(`/`);
};

export const tmpApiFunc = () => {
  // code
};
