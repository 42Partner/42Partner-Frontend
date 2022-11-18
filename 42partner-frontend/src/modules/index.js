import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import comments, { commentSaga } from './comments';
import loading from './loading';
import rooms, { rooomSaga } from './rooms';

const rootReducer = combineReducers({
  comments,
  loading,
  rooms,
});

export function* rootSaga() {
  yield all([commentSaga(), rooomSaga()]);
}

export default rootReducer;
