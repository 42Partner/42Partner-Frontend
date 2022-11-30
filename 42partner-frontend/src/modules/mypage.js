import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as mypageApi from '../api/mypage';

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('mypage/GET_PROFILE');

// const GET_MATCHES = 'mypage/GET_MATCHES'; // MATCHES 를 요청하는 액션
// const GET_MATCHES_SUCCESS = 'mypage/GET_MATCHES_SUCCESS'; // MATCHES 요청 성공 시 데이터(MATCHES)를 전달하는 액션
// const GET_MATCHES_FAILURE = 'mypage/GET_MATCHES_FAILURE'; // MATCHES 요청 실패 시 처리하는 액션

// const GET_SCORE = 'mypage/GET_SCORE'; // score 를 요청하는 액션
// const GET_SCORE_SUCCESS = 'mypage/GET_SCORE_SUCCESS'; // score 요청 성공 시 데이터(users) 를 전달하는 액션
// const GET_SCORE_FAILURE = 'mypage/GET_SCORE_FAILURE'; // score 요청 실패 시 처리하는 액션

export const getProfile = createAction(GET_PROFILE);
// export const getmatches = createAction(GET_MATCHES); // payload가 id인 액션객체 생성
// export const getUsers = createAction(GET_SCORE); // payload가 없는 액션객체 생성
const getProfileSaga = createRequestSaga(GET_PROFILE, mypageApi.getUserData);

// state 의 초기값 설정
const initialState = {
  //   matches: null,
  user: null,
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
  // eslint-disable-next-line no-use-before-define
  //   yield takeLatest(GET_SCORE, getUsersSaga);
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
  },
  initialState,
);

export default mypage;
