import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import comments, { commentSaga } from './comments';
import loading from './loading';
import login from './login';
import rooms, { rooomSaga } from './rooms';

const rootReducer = combineReducers({
  comments,
  loading,
  rooms,
  login,
});

export function* rootSaga() {
  yield all([commentSaga(), rooomSaga()]);
}

export default rootReducer;
