import client from './client';

export const requestLogin = async () => {
  const data = await client
    .get('/oauth2/authorization/authclient')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    });
  return data;
};

export default requestLogin;
