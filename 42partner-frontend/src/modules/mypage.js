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

export const getProfile = createAction(GET_PROFILE);
export const getScore = createAction(GET_SCORE);
export const getMatches = createAction(GET_MATCHES);
export const getDetail = createAction(GET_DETAIL, (matchId) => matchId);

// export const getmatches = createAction(GET_MATCHES); // payload가 id인 액션객체 생성
// export const getUsers = createAction(GET_SCORE); // payload가 없는 액션객체 생성
const getProfileSaga = createRequestSaga(GET_PROFILE, mypageApi.getUserData);
const getScoreSaga = createRequestSaga(GET_SCORE, mypageApi.getScore);
const getMatchesSaga = createRequestSaga(GET_MATCHES, mypageApi.getMatches);
const getDetailSaga = createRequestSaga(GET_DETAIL, mypageApi.getDetail);

// state 의 초기값 설정
const initialState = {
  //   matches: null,
  user: null,
  score: 0,
  matches: null,
  matchesNum: 0,
  detail: null,
  requestError: null,
};

//* * Redux * *//
// /matches 요청 성공 시 Data 처리하는 redux만 정의
// /matches 요청 실패 시 처리할 데이터 없음
// /matches 요청 액션은 Saga에서 수행
// const mypage = handleActions(
//   {
//     [GET_MATCHES_SUCCESS]: (state, action) => ({
//       ...state,
//       matches: action.payload,
//     }),
//     [GET_SCORE_SUCCESS]: (state, action) => ({
//       ...state,
//       users: action.payload,
//     }),
//   },
//   initialState,
// );

// export default mypage;

//* * Saga **//
// GET_MATCHES/GET_SCORE 액션에 대한 서버요청을 위한 Saga
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
      matchesNum: matches.number,
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
  },
  initialState,
);

export default mypage;
