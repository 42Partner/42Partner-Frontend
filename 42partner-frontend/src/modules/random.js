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

export const postRandomMatch = createAction(POST_RANDOM, (option) => option);
export const cancelRandomMatch = createAction(CANCEL_RANDOM);

const postRandomMatchSaga = createRequestSaga(
  POST_RANDOM,
  randomApi.postRandomMatch,
);
const cancelRandomMatchSaga = createRequestSaga(
  CANCEL_RANDOM,
  randomApi.cancelRandomMatch,
);

export function* randomSaga() {
  yield takeLatest(POST_RANDOM, postRandomMatchSaga);
  yield takeLatest(CANCEL_RANDOM, cancelRandomMatchSaga);
}

const initialState = {
  options: null,
  category: '',
};

const random = handleActions({
  [POST_RANDOM_SUCCESS]: (state, { payload: options }) => ({
    ...state,
    options,
  }),
  [POST_RANDOM_FAILURE]: (state, { payload: e }) => ({
    ...state,
    requestError: e,
  }),
  [CANCEL_RANDOM_SUCCESS]: (state, { payload: category }) => ({
    ...state,
    category,
  }),
  [CANCEL_RANDOM_FAILURE]: (state, { payload: e }) => ({
    ...state,
    requestError: e,
  }),
  initialState,
});

export default random;
