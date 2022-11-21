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

export const editRoomInfo = ({ article }) => {
  // console.log('editRoomInfo');
  return client.put(`/api/articles/${article.articleId}`, article);
};

export const joinRoom = ({ articleId }) => {
  // console.log('joinRoom');
  return client.post(`/api/articles/${articleId}/participate`);
};

export const cancleRoom = ({ articleId }) => {
  // console.log('cancleRoom');
  return client.post(`/api/articles/${articleId}/participate-cancel`);
};

export const completeRoom = ({ articleId }) => {
  // console.log('completeRoom');
  return client.post(`/api/articles/${articleId}/complete`);
};
