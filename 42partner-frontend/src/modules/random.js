import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as randomApi from '../api/random';

const [POST_RANDOM, POST_RANDOM_SUCCESS, POST_RANDOM_FAILURE] =
  createRequestActionTypes('random/POST_RANDOM');
const [CANCEL_RANDOM, CANCEL_RANDOM_SUCCESS, CANCEL_RANDOM_FAILURE] =
  createRequestActionTypes('random/CANCEL_RANDOM');
const [GET_RANDOM, GET_RANDOM_SUCCESS, GET_RANDOM_FAILURE] =
  createRequestActionTypes('random/GET_RANDOM');
const [COMPLETE_RANDOM, COMPLETE_RANDOM_SUCCESS, COMPLETE_RANDOM_FAILURE] =
  createRequestActionTypes('random/COMPLETE_RANDOM');

export const postRandomMatch = createAction(POST_RANDOM, (option) => option);
export const cancelRandomMatch = createAction(
  CANCEL_RANDOM,
  (category) => category,
);
export const getRandomMatch = createAction(GET_RANDOM, (url) => url);
export const completeRandomMatch = createAction(
  COMPLETE_RANDOM,
  (category) => category,
);

const postRandomMatchSaga = createRequestSaga(
  POST_RANDOM,
  randomApi.postRandomMatch,
);
const cancelRandomMatchSaga = createRequestSaga(
  CANCEL_RANDOM,
  randomApi.cancelRandomMatch,
);
const getRandomMatchSaga = createRequestSaga(
  GET_RANDOM,
  randomApi.getRandomMatch,
);
const completeRandomMatchSaga = createRequestSaga(
  GET_RANDOM,
  randomApi.completeRandomMatch,
);

export function* randomSaga() {
  yield takeLatest(POST_RANDOM, postRandomMatchSaga);
  yield takeLatest(CANCEL_RANDOM, cancelRandomMatchSaga);
  yield takeLatest(GET_RANDOM, getRandomMatchSaga);
  yield takeLatest(GET_RANDOM, completeRandomMatchSaga);
}

const initialState = {
  options: null,
  category: '',
  data: null,
  showBack: null,
  match: null,
};

const random = handleActions(
  {
    [POST_RANDOM]: (state, { payload: option }) => ({
      ...state,
      options: option.option,
    }),
    [POST_RANDOM_SUCCESS]: (state, { payload: isExist }) => ({
      ...state,
      showBack: isExist,
    }),
    [POST_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [CANCEL_RANDOM_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      category,
      data: null,
      showBack: false,
    }),
    [CANCEL_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
      data: null,
      showBack: false,
    }),
    [GET_RANDOM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [GET_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [COMPLETE_RANDOM_SUCCESS]: (state, { payload: match }) => ({
      ...state,
      match,
    }),
    [COMPLETE_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default random;
