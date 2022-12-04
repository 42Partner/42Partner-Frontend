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

export const postRandomMatch = createAction(POST_RANDOM, (option) => option);
export const cancelRandomMatch = createAction(CANCEL_RANDOM, (topic) => topic);
export const getRandomMatch = createAction(GET_RANDOM, (topic) => topic);
export const getMatchCondition = createAction(GET_MATCH_INFO, (topic) => topic);

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

export function* randomSaga() {
  yield takeLatest(POST_RANDOM, postRandomMatchSaga);
  yield takeLatest(CANCEL_RANDOM, cancelRandomMatchSaga);
  yield takeLatest(GET_RANDOM, getRandomMatchSaga);
  yield takeLatest(GET_MATCH_INFO, getMatchConditionSaga);
}

const initialState = {
  options: null,
  category: '',
  showBack: null,
  match: null,
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
    [GET_RANDOM_SUCCESS]: (state, { payload: isExist }) => ({
      ...state,
      showBack: isExist.isExist,
    }),
    [GET_RANDOM_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_MATCH_INFO_SUCCESS]: (state, { payload: options }) => ({
      ...state,
      options,
    }),
    [GET_MATCH_INFO_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default random;
