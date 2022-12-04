import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../api/createRequestSaga';
import * as myPageApi from '../api/history';

const WRITE_REVIEW = 'mypage/WRITE_REVIEW';
const WRITE_REVIEW_FAILURE = 'mypage/WRITE_REVIEW_FAILURE';

export const writeReview = createAction(
  WRITE_REVIEW,
  ({ reviewList, matchId }) => ({
    reviewList,
    matchId,
  }),
);

const writeReviewSaga = createRequestSaga(WRITE_REVIEW, myPageApi.writeReview);

export function* historySaga() {
  yield takeLatest(WRITE_REVIEW, writeReviewSaga);
}

const initialState = {
  requestError: null,
};

const history = handleActions(
  {
    [WRITE_REVIEW_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default history;
