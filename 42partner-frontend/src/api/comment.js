import client from './client';

// eslint-disable-next-line no-unused-vars
export const getCommentList = ({ articleId }) => {
  // client.get(`/api/articles/${articleId}/opinions`);
  console.log('getCommentList');
  return client.get(`/api/articles/asdfasdf/opinions`);
};

export const addNewComment = ({ commentInfo }) => {
  console.log('addNewComment');
  // client.post(`/api/opinions`, commentInfo);
  return getCommentList(commentInfo.articleId);
};
// eslint-disable-next-line no-unused-vars
export const deleteComment = ({ opinionId, articleId }) => {
  console.log('deleteComment');
  // client.delete(`/api/opinions/${opinionId}`);
  return getCommentList(articleId);
};
// eslint-disable-next-line no-unused-vars
export const editComment = ({ content, articleId, opinionId }) => {
  console.log('editComment');
  // client.put(`/api/opinions/${opinionId}`, content);
  return getCommentList(articleId);
};
