import client from './client';

export const getCommentList = ({ articleId }) => {
  // console.log('getCommentList');
  return client.get(`/api/articles/${articleId}/opinions`);
};

export const getCommentInfo = ({ opinionId }) => {
  // console.log('getCommentInfo');
  return client.post(`/api/opinions/${opinionId}`);
};

export const addNewComment = async ({ commentInfo }) => {
  // console.log('addNewComment');

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
  // console.log('deleteComment');
  return client.delete(`/api/opinions/${opinionId}/recoverable-delete`);
};

export const editComment = ({ content, opinionId }) => {
  // console.log('editComment');
  return client.put(`/api/opinions/${opinionId}`, content);
};
