import instance from './api';

export const getCommentList = ({ articleId }) => {
  return instance.get(`/api/articles/${articleId}/opinions`);
};

export const getCommentInfo = ({ opinionId }) => {
  return instance.get(`/api/opinions/${opinionId}`);
};

export const addNewComment = async ({ commentInfo }) => {
  const opinionId = await instance
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
  return instance.post(`/api/opinions/${opinionId}/recoverable-delete`);
};

export const editComment = async ({ content, opinionId }) => {
  await instance.put(`/api/opinions/${opinionId}`, JSON.stringify(content));
  return getCommentInfo({ opinionId });
};
