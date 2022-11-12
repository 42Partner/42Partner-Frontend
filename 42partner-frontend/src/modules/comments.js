import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CREATE = 'comment/CREATE';
const EDIT = 'comment/EDIT';
const DELETE = 'comment/DELETE';

export const createComment = createAction(CREATE, ({ articleId, content }) => ({
  articleId,
  content,
}));
export const editComment = createAction(EDIT, ({ opinionId, content }) => ({
  opinionId,
  content,
}));
export const deleteComment = createAction(DELETE, (opinionId) => opinionId);

const initialState = {
  commentInfo: {
    articleId: '',
    content: '',
    level: 1,
    parentId: '',
  },
  allComment: {
    valueCount: 0,
    values: '',
  },
};

const comments = handleActions(
  {
    [CREATE]: (state, { payload: { opinionId, content } }) =>
      produce(state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.commentInfo[opinionId] = opinionId;
        // eslint-disable-next-line no-param-reassign
        draft.commentInfo[content] = content;
      }),
    [EDIT]: (state, { payload: { opinionId, content } }) =>
      produce(state, (draft) => {
        const comment = draft.allComment.values.find(
          (c) => c.opinionId === opinionId,
        );
        comment.content = content;
      }),
    [DELETE]: (state, { payload: opinionId }) =>
      produce(state, (draft) => {
        const index = draft.allComment.values.findIndex(
          (c) => c.opinionId === opinionId,
        );
        draft.allComment.values.splice(index, 1);
      }),
  },
  initialState,
);

export default comments;
