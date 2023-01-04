import instance from './client';

export const getRoomList = () => {
  return instance.get(`/api/articles?isComplete=false`);
};

export const getOneRoom = ({ articleId }) => {
  return instance.get(`/api/articles/${articleId}`);
};

export const createRoom = async ({ article }) => {
  const articleId = await instance
    .post(`/api/articles`, JSON.stringify(article))
    .then((res) => {
      return res.data;
    });
  return getOneRoom(articleId);
};

export const deleteRoom = ({ articleId }) => {
  return instance.post(`/api/articles/${articleId}/recoverable-delete`);
};

export const editRoomInfo = async ({ article, articleId }) => {
  await instance.put(`/api/articles/${articleId}`, JSON.stringify(article));
  return getOneRoom({ articleId });
};

export const joinRoom = ({ articleId }) => {
  return instance.post(`/api/articles/${articleId}/participate`);
};

export const cancleRoom = ({ articleId }) => {
  return instance.post(`/api/articles/${articleId}/participate-cancel`);
};

export const completeRoom = ({ articleId }) => {
  return instance.post(`/api/articles/${articleId}/complete`);
};
