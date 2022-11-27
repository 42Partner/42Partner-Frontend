import client from './client';

export const getCommentList = ({ articleId }) => {
  return client.get(`/api/articles/${articleId}/opinions`);
};

export const getCommentInfo = ({ opinionId }) => {
  return client.post(`/api/opinions/${opinionId}`);
};

export const addNewComment = async ({ commentInfo }) => {
  await client.post(`/api/opinions`, commentInfo);
  const opinionId = await client
    .post(`/api/opinions`, commentInfo)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
    });
  return getCommentInfo(opinionId);
};

export const deleteComment = ({ opinionId }) => {
  return client.post(`/api/opinions/${opinionId}/recoverable-delete`);
};

export const editComment = ({ content, opinionId }) => {
  return client.put(`/api/opinions/${opinionId}`, content);
};
