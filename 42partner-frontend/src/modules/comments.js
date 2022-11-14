import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as commentApi from '../api/comment';

const SETARTICLEID = 'comment/SETARTICLEID';
const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] =
  createRequestActionTypes('comment/CREATE');
const [EDIT, EDIT_SUCCESS, EDIT_FAILURE] =
  createRequestActionTypes('comment/EDIT');
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes('comment/DELETE');
const [LOADLIST, LOADLIST_SUCCESS, LOADLIST_FAILURE] =
  createRequestActionTypes('comment/LOADLIST');
const RESETDATA = 'comment/RESETDATA';

export const setArticleId = createAction(
  SETARTICLEID,
  (articleId) => articleId,
);
export const createComment = createAction(CREATE, (commentInfo) => commentInfo);
export const editComment = createAction(
  EDIT,
  ({ content, articleId, opinionId }) => ({ content, articleId, opinionId }),
);
export const deleteComment = createAction(
  DELETE,
  ({ opinionId, articleId }) => ({ articleId, opinionId }),
);
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
  articleId: '',
  commentInfo: null,
  allComment: null,
  requestError: null,
};

const comments = handleActions(
  {
    [SETARTICLEID]: (state, { payload: articleId }) => ({
      ...state,
      articleId,
    }),
    [LOADLIST_SUCCESS]: (state, { payload: allComment }) => ({
      ...state,
      allComment,
      requestError: null,
    }),
    [LOADLIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [CREATE_SUCCESS]: (state) => ({
      ...state,
      requestError: null,
    }),
    [CREATE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [EDIT_SUCCESS]: (state) => ({
      ...state,
      requestError: null,
    }),
    [EDIT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [DELETE_SUCCESS]: (state) => ({
      ...state,
      requestError: null,
    }),
    [DELETE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [RESETDATA]: () => initialState,
  },
  initialState,
);

export default comments;
