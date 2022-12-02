import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import comments, { commentSaga } from './comments';
import loading from './loading';
import login from './login';
import rooms, { rooomSaga } from './rooms';
import mypage, { mypageSaga } from './mypage';
import random, { randomSaga } from './random';

const rootReducer = combineReducers({
  comments,
  loading,
  rooms,
  login,
  mypage,
  random,
});

export function* rootSaga() {
  yield all([commentSaga(), rooomSaga(), mypageSaga(), randomSaga()]);
}

export default rootReducer;
