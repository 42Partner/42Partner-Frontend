import client from './client';

export const getCommentList = ({ articleId }) => {
  return client.get(`/api/articles/${articleId}/opinions`);
};

export const getCommentInfo = ({ opinionId }) => {
  return client.get(`/api/opinions/${opinionId}`);
};

export const addNewComment = async ({ commentInfo }) => {
  const opinionId = await client
    .post(`/api/opinions`, JSON.stringify(commentInfo))
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

export const editComment = async ({ content, opinionId }) => {
  await client.put(`/api/opinions/${opinionId}`, JSON.stringify(content));
  return getCommentInfo({ opinionId });
};
