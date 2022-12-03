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

export const postRandomMatch = createAction(POST_RANDOM, (option) => option);
export const cancelRandomMatch = createAction(
  CANCEL_RANDOM,
  (category) => category,
);
export const getRandomMatch = createAction(GET_RANDOM, (url) => url);

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

export function* randomSaga() {
  yield takeLatest(POST_RANDOM, postRandomMatchSaga);
  yield takeLatest(CANCEL_RANDOM, cancelRandomMatchSaga);
  yield takeLatest(GET_RANDOM, getRandomMatchSaga);
}

const initialState = {
  options: null,
  category: '',
  data: null,
  showBack: false,
};

const random = handleActions(
  {
    [POST_RANDOM_SUCCESS]: (state, { payload: options }) => ({
      ...state,
      options,
      showBack: true,
    }),
    [POST_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [CANCEL_RANDOM_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      category,
      showBack: false,
    }),
    [CANCEL_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_RANDOM_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [GET_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default random;
