import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import user, { userSaga } from './user';

const rootReducer = combineReducers({
  user,
  loading,
});

export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
