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
const [GET_MATCH_INFO, GET_MATCH_INFO_SUCCESS, GET_MATCH_INFO_FAILURE] =
  createRequestActionTypes('random/GET_MATCH_INFO');
const [GET_MATCH_COUNT, GET_MATCH_COUNT_SUCCESS, GET_MATCH_COUNT_FAILURE] =
  createRequestActionTypes('random/GET_MATCH_COUNT');

export const postRandomMatch = createAction(POST_RANDOM, (option) => option);
export const cancelRandomMatch = createAction(CANCEL_RANDOM, (topic) => topic);
export const getRandomMatch = createAction(GET_RANDOM, (topic) => topic);
export const getMatchCondition = createAction(GET_MATCH_INFO, (topic) => topic);
export const getMatchCount = createAction(GET_MATCH_COUNT, (topic) => topic);

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
const getMatchConditionSaga = createRequestSaga(
  GET_MATCH_INFO,
  randomApi.getMatchCondition,
);
const getMatchCountSaga = createRequestSaga(
  GET_MATCH_COUNT,
  randomApi.getMatchCount,
);

export function* randomSaga() {
  yield takeLatest(POST_RANDOM, postRandomMatchSaga);
  yield takeLatest(CANCEL_RANDOM, cancelRandomMatchSaga);
  yield takeLatest(GET_RANDOM, getRandomMatchSaga);
  yield takeLatest(GET_MATCH_INFO, getMatchConditionSaga);
  yield takeLatest(GET_MATCH_COUNT, getMatchCountSaga);
}

const initialState = {
  options: null,
  category: '',
  showBack: null,
  match: null,
  count: 0,
  requestError: null,
};

const random = handleActions(
  {
    [POST_RANDOM]: (state, { payload: option }) => ({
      ...state,
      options: option.option,
    }),
    [POST_RANDOM_SUCCESS]: (state) => ({
      ...state,
      showBack: true,
      requestError: null,
    }),
    [POST_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [CANCEL_RANDOM_SUCCESS]: (state, { payload: category }) => ({
      ...state,
      category,
      showBack: false,
      requestError: null,
    }),
    [CANCEL_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_RANDOM_SUCCESS]: (state, { payload: isExist }) => ({
      ...state,
      showBack: isExist.isExist,
      requestError: null,
    }),
    [GET_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_MATCH_INFO_SUCCESS]: (state, { payload: options }) => ({
      ...state,
      options,
      requestError: null,
    }),
    [GET_MATCH_INFO_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_MATCH_COUNT_SUCCESS]: (state, { payload: count }) => ({
      ...state,
      count: count.randomMatchCount,
      requestError: null,
    }),
    [GET_MATCH_COUNT_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default random;
