import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import comments, { commentSaga } from './comments';
import loading from './loading';

const rootReducer = combineReducers({
  comments,
  loading,
});

export function* rootSaga() {
  yield all([commentSaga()]);
}

export default rootReducer;
