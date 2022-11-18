import client from './client';

export const getRoomList = () => {
  // console.log('getRoomList');
  return client.get(`/api/articles`);
};

export const getOneRoom = ({ articleId }) => {
  // console.log('getOneRoom');
  return client.post(`/api/articles/${articleId}`);
};

export const createRoom = async ({ article }) => {
  // console.log('createRoom');
  const articleId = await client
    .post(`/api/articles`, article)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
  return getOneRoom(articleId);
};

export const deleteRoom = ({ articleId }) => {
  // console.log('deleteRoom');
  return client.post(`/api/articles/${articleId}/recoverable-delete`);
};

export const editRoomInfo = ({ article, articleId }) => {
  // console.log('editRoomInfo');
  return client.put(`/api/articles/${articleId}`, article);
};
