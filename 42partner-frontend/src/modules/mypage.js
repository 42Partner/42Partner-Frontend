import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as mypageApi from '../api/mypage';

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('mypage/GET_PROFILE');
const [GET_SCORE, GET_SCORE_SUCCESS, GET_SCORE_FAILURE] =
  createRequestActionTypes('mypage/GET_SCORE');
const [GET_MATCHES, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE] =
  createRequestActionTypes('mypage/GET_MATCHES');
const [GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_FAILURE] =
  createRequestActionTypes('mypage/GET_DETAIL');
const RESET_DETAIL = 'mypage/RESET_DETAIL';

export const getProfile = createAction(GET_PROFILE);
export const getScore = createAction(GET_SCORE);
export const getMatches = createAction(GET_MATCHES);
export const getDetail = createAction(GET_DETAIL, (matchId) => matchId);
export const resetDetail = createAction(RESET_DETAIL);

const getProfileSaga = createRequestSaga(GET_PROFILE, mypageApi.getUserData);
const getScoreSaga = createRequestSaga(GET_SCORE, mypageApi.getScore);
const getMatchesSaga = createRequestSaga(GET_MATCHES, mypageApi.getMatches);
const getDetailSaga = createRequestSaga(GET_DETAIL, mypageApi.getDetail);

const initialState = {
  user: null,
  score: 0,
  matches: null,
  matchesNum: 0,
  detail: null,
  requestError: null,
};

export function* mypageSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga);
  yield takeLatest(GET_SCORE, getScoreSaga);
  yield takeLatest(GET_MATCHES, getMatchesSaga);
  yield takeLatest(GET_DETAIL, getDetailSaga);
}

const mypage = handleActions(
  {
    [GET_PROFILE_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_SCORE_SUCCESS]: (state, { payload: score }) => ({
      ...state,
      score: score.score,
    }),
    [GET_SCORE_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_MATCHES_SUCCESS]: (state, { payload: matches }) => ({
      ...state,
      matches: matches.content,
      matchesNum: matches.content.length,
    }),
    [GET_MATCHES_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [GET_DETAIL_SUCCESS]: (state, { payload: detail }) => ({
      ...state,
      detail,
    }),
    [GET_DETAIL_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
    [RESET_DETAIL]: (state) => ({
      ...state,
      detail: null,
    }),
  },
  initialState,
);

export default mypage;
