import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import comments, { commentSaga } from './comments';
import loading from './loading';
import login from './login';
import rooms, { rooomSaga } from './rooms';
import mypage, { mypageSaga } from './mypage';

const rootReducer = combineReducers({
  comments,
  loading,
  rooms,
  login,
  mypage,
});

export function* rootSaga() {
  yield all([commentSaga(), rooomSaga(), mypageSaga()]);
}

export default rootReducer;
