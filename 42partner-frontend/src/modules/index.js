import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import comments, { commentSaga } from './comments';
import history, { historySaga } from './history';
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
  history,
});

export function* rootSaga() {
  yield all([
    commentSaga(),
    rooomSaga(),
    mypageSaga(),
    randomSaga(),
    historySaga(),
  ]);
}

export default rootReducer;
