import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as commentApi from '../api/comment';

const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] =
  createRequestActionTypes('comment/CREATE');
const [EDIT, EDIT_SUCCESS, EDIT_FAILURE] =
  createRequestActionTypes('comment/EDIT');
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes('comment/DELETE');
const [LOADLIST, LOADLIST_SUCCESS, LOADLIST_FAILURE] =
  createRequestActionTypes('comment/LOADLIST');
const RESETDATA = 'comment/RESETDATA';

export const createComment = createAction(CREATE, (commentInfo) => commentInfo);
export const editComment = createAction(EDIT, ({ content, opinionId }) => ({
  content,
  opinionId,
}));
export const deleteComment = createAction(DELETE, ({ opinionId }) => ({
  opinionId,
}));
export const loadCommentList = createAction(LOADLIST, (articleId) => articleId);
export const resetData = createAction(RESETDATA);

const createSaga = createRequestSaga(CREATE, commentApi.addNewComment);
const editSaga = createRequestSaga(EDIT, commentApi.editComment);
const deleteSaga = createRequestSaga(DELETE, commentApi.deleteComment);
const loadCommentListSaga = createRequestSaga(
  LOADLIST,
  commentApi.getCommentList,
);

export function* commentSaga() {
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(EDIT, editSaga);
  yield takeLatest(DELETE, deleteSaga);
  yield takeLatest(LOADLIST, loadCommentListSaga);
}

const initialState = {
  commentList: [],
  requestError: null,
};

const comments = handleActions(
  {
    [LOADLIST_SUCCESS]: (state, { payload: commentList }) => ({
      ...state,
      commentList: commentList.values,
      requestError: null,
    }),
    [LOADLIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // create
    [CREATE_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentList: state.commentList.concat(payload),
    }),
    [CREATE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // edit
    [EDIT_SUCCESS]: (state, { payload }) => ({
      ...state,
      commentList: state.commentList.map((c) =>
        c.opinionId === payload.opinionId ? payload : c,
      ),
    }),
    [EDIT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // Delete
    [DELETE_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      commentList: state.commentList.filter(
        (c) => c.opinionId !== comment.opinionId,
      ),
    }),
    [DELETE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // reset data
    [RESETDATA]: () => initialState,
  },
  initialState,
);

export default comments;
