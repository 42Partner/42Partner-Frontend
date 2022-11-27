import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from './api';

const GET_MATCHES = 'mypage/GET_MATCHES'; // MATCHES 를 요청하는 액션
const GET_MATCHES_SUCCESS = 'mypage/GET_MATCHES_SUCCESS'; // MATCHES 요청 성공 시 데이터(MATCHES)를 전달하는 액션
const GET_MATCHES_FAILURE = 'mypage/GET_MATCHES_FAILURE'; // MATCHES 요청 실패 시 처리하는 액션

const GET_SCORE = 'mypage/GET_SCORE'; // score 를 요청하는 액션
const GET_SCORE_SUCCESS = 'mypage/GET_SCORE_SUCCESS'; // score 요청 성공 시 데이터(users) 를 전달하는 액션
const GET_SCORE_FAILURE = 'mypage/GET_SCORE_FAILURE'; // score 요청 실패 시 처리하는 액션

export const getmatches = createAction(GET_MATCHES); // payload가 id인 액션객체 생성
export const getUsers = createAction(GET_SCORE); // payload가 없는 액션객체 생성

// state 의 초기값 설정
const initialState = {
  matches: null,
  users: null,
};

//* * Redux * *//
// /matches 요청 성공 시 Data 처리하는 redux만 정의
// /matches 요청 실패 시 처리할 데이터 없음
// /matches 요청 액션은 Saga에서 수행
const mypage = handleActions(
  {
    [GET_MATCHES_SUCCESS]: (state, action) => ({
      ...state,
      matches: action.payload,
    }),
    [GET_SCORE_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState,
);

export default mypage;

//* * Saga **//
// GET_MATCHES/GET_SCORE 액션에 대한 서버요청을 위한 Saga
export function* mypageSaga() {
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(GET_MATCHES, getMatchesSaga);
  // eslint-disable-next-line no-use-before-define
  yield takeLatest(GET_SCORE, getUsersSaga);
}

// GET_MATCHES 액션 dispatch 시 실행될 함수. 비동기로 서버의 matches 데이터 요청
function* getMatchesSaga(action) {
  try {
    const matches = yield call(api.getmatches, action.payload);
    // matches 데이터요청하는 비동기함수인 getmatches을 요청하며, 인자로 action.payload인 id를 넘김
    yield put({
      type: GET_MATCHES_SUCCESS, // 요청 성공 액션을 dispatch함.
      payload: matches.data, // 액션 dispatch할 때 payload로 matches.data(포스트 내용)을 전달함
    });
  } catch (e) {
    yield put({
      type: GET_MATCHES_FAILURE, // 요청 실패 액션을 dispatch함
      payload: e, // 액션 dispatch할 때 payload로 에러를 전달함
      error: true, // 액션 객체의 항목에 error: true를 넘겨줌
    });
  }
}

// GET_SCORE 액션 dispatch 시 실행될 함수. 비동기로 서버의 users 데이터 요청
function* getUsersSaga() {
  try {
    const users = yield call(api.getUsers);
    // users 데이터를 요청하는 비동기함수인 getUsers를 요청하며, 전달인자는 없음.
    yield put({
      type: GET_SCORE_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_SCORE_FAILURE,
      payload: e,
      error: true,
    });
  }
}
