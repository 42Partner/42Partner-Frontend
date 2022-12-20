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
const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] =
  createRequestActionTypes('rooms/JOIN');
const [CANCLE, CANCLE_SUCCESS, CANCLE_FAILURE] =
  createRequestActionTypes('rooms/CANCLE');
const [COMPLETE, COMPLETE_SUCCESS, COMPLETE_FAILURE] =
  createRequestActionTypes('rooms/COMPLETE');
const [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAILURE] =
  createRequestActionTypes('rooms/LOAD_INFO');
const RESET_ALL_DATA = 'rooms/RESET_ALL_DATA';
const RESET_ARTICLE_DATA = 'rooms/RESET_ARTICLE_DATA';
const CHANGE_EDITMODE = 'rooms/CHANGE_EDITMODE';

export const createRoom = createAction(CREATE, (article) => article);
export const editRoom = createAction(EDIT, ({ article, articleId }) => ({
  article,
  articleId,
}));
export const deleteRoom = createAction(DELETE, (articleId) => articleId);
export const loadRoomList = createAction(LOADLIST);
export const resetData = createAction(RESET_ALL_DATA);
export const resetArticleData = createAction(RESET_ARTICLE_DATA);
export const loadArticleInfo = createAction(
  LOAD_INFO,
  (articleId) => articleId,
);
export const changeEditMode = createAction(CHANGE_EDITMODE);
export const joinRoom = createAction(JOIN, (articleId) => articleId);
export const cancleRoom = createAction(CANCLE, (articleId) => articleId);
export const completeRoom = createAction(COMPLETE, (articleId) => articleId);

const createSaga = createRequestSaga(CREATE, roomApi.createRoom);
const editSaga = createRequestSaga(EDIT, roomApi.editRoomInfo);
const deleteSaga = createRequestSaga(DELETE, roomApi.deleteRoom);
const loadRoomListSaga = createRequestSaga(LOADLIST, roomApi.getRoomList);
const loadArticleInfoSaga = createRequestSaga(LOAD_INFO, roomApi.getOneRoom);
const joinRoomSaga = createRequestSaga(JOIN, roomApi.joinRoom);
const cancleRoomSaga = createRequestSaga(CANCLE, roomApi.cancleRoom);
const completeRoomSaga = createRequestSaga(COMPLETE, roomApi.completeRoom);

export function* rooomSaga() {
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(EDIT, editSaga);
  yield takeLatest(DELETE, deleteSaga);
  yield takeLatest(LOADLIST, loadRoomListSaga);
  yield takeLatest(LOAD_INFO, loadArticleInfoSaga);
  yield takeLatest(JOIN, joinRoomSaga);
  yield takeLatest(CANCLE, cancleRoomSaga);
  yield takeLatest(COMPLETE, completeRoomSaga);
}

const initialState = {
  editMode: false,
  articleInfo: null,
  roomList: [],
  completeRoomList: [],
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
    [CREATE_SUCCESS]: (state, { payload: article }) => ({
      ...state,
      requestError: null,
      roomList: state.roomList.concat(article),
    }),
    [CREATE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // edit
    [EDIT_SUCCESS]: (state, { payload }) => ({
      ...state,
      requestError: null,
      roomList: state.roomList.map((room) =>
        room.articleId === payload.articleId ? payload : room,
      ),
    }),
    [EDIT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // Delete
    [DELETE_SUCCESS]: (state, { payload: article }) => ({
      ...state,
      roomList: state.roomList.filter(
        (room) => room.articleId !== article.articleId,
      ),
    }),
    [DELETE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // join
    [JOIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      articleInfo: payload,
      roomList: state.roomList.map((room) =>
        room.articleId === payload.articleId ? payload : room,
      ),
    }),
    [JOIN_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // cancle
    [CANCLE_SUCCESS]: (state, { payload }) => ({
      ...state,
      articleInfo: payload,
      roomList: state.roomList.map((room) =>
        room.articleId === payload.articleId ? payload : room,
      ),
    }),
    [CANCLE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // complete
    [COMPLETE_SUCCESS]: (state, { payload: article }) =>
      produce(state, (draft) => {
        draft.requestError = null;
        const room = draft.roomList.find(
          (c) => c.articleId === article.articleId,
        );
        draft.completeRoomList.push(room);
      }),
    [COMPLETE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    // load info
    [LOAD_INFO_SUCCESS]: (state, { payload: articleInfo }) => ({
      ...state,
      articleInfo,
    }),
    [LOAD_INFO_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),

    [RESET_ALL_DATA]: () => initialState,
    [RESET_ARTICLE_DATA]: (state) => ({
      ...state,
      articleInfo: null,
    }),

    [CHANGE_EDITMODE]: (state, { payload: isEditMode }) => ({
      ...state,
      editMode: isEditMode,
    }),
  },
  initialState,
);

export default rooms;
