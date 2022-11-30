import { useSelector } from 'react-redux';
import client from './client';

export const getUserData = () => {
  const { token } = useSelector(({ login }) => ({
    token: login.token,
  }));
  console.log('11111', token);
  return client.get(`/api/users/${token}`);
};
export default getUserData;
