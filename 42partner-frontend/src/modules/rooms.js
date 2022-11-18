import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as roomApi from '../api/room';

const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] =
  createRequestActionTypes('rooms/CREATE');
const [EDIT, EDIT_SUCCESS, EDIT_FAILURE] =
  createRequestActionTypes('rooms/EDIT');
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes('rooms/DELETE');
const [LOADLIST, LOADLIST_SUCCESS, LOADLIST_FAILURE] =
  createRequestActionTypes('rooms/LOADLIST');
const RESETDATA = 'rooms/RESETDATA';
const LOADINFO = 'rooms/LOADINFO';

export const createRoom = createAction(CREATE, (article) => article);
export const editRoom = createAction(EDIT, ({ article, articleId }) => ({
  article,
  articleId,
}));
export const deleteRoom = createAction(DELETE, ({ articleId }) => ({
  articleId,
}));
export const loadRoomList = createAction(LOADLIST);
export const resetData = createAction(RESETDATA);
export const loadArticleInfo = createAction(LOADINFO, ({ articleId }) => ({
  articleId,
}));

const createSaga = createRequestSaga(CREATE, roomApi.createRoom);
const editSaga = createRequestSaga(EDIT, roomApi.editRoomInfo);
const deleteSaga = createRequestSaga(DELETE, roomApi.deleteRoom);
const loadRoomListSaga = createRequestSaga(LOADLIST, roomApi.getRoomList);

export function* rooomSaga() {
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(EDIT, editSaga);
  yield takeLatest(DELETE, deleteSaga);
  yield takeLatest(LOADLIST, loadRoomListSaga);
}

const initialState = {
  articleInfo: null,
  roomList: [],
  requestError: null,
};

const rooms = handleActions(
  {
    [LOADLIST_SUCCESS]: (state, { payload: roomList }) => ({
      ...state,
      roomList: roomList.content,
      requestError: null,
    }),
    [LOADLIST_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    // create
    [CREATE_SUCCESS]: (state, { payload: article }) =>
      produce(
        (state,
        (draft) => {
          draft.roomList.push(article);
          draft.requestError = null;
        }),
      ),
    [CREATE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }), // edit
    [EDIT]: (state, { payload: { article, articleId } }) =>
      produce(state, (draft) => {
        draft.requestError = null;
        let oldArticle = draft.roomList.find((c) => c.articleId === articleId);
        // eslint-disable-next-line no-unused-vars
        oldArticle = article;
      }),
    [EDIT_SUCCESS]: (state) =>
      produce(state, (draft) => {
        draft.requestError = null;
      }),
    [EDIT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }), // Delete
    [DELETE_SUCCESS]: (state, { payload: articleId }) =>
      produce(state, (draft) => {
        draft.requestError = null;
        const index = draft.roomList.findIndex(
          (c) => c.articleId === articleId,
        );
        draft.roomList.splice(index, 1);
      }),
    [DELETE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }), // reset data
    [RESETDATA]: () => initialState,
    [LOADINFO]: (state, { payload: articleId }) => ({
      ...state,
      articleInfo: state.roomList.filter(
        (article) => article.articleId === articleId,
      ),
    }),
  },
  initialState,
);

export default rooms;
