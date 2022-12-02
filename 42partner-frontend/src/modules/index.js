import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import comments, { commentSaga } from './comments';
import history, { historySaga } from './history';
import loading from './loading';
import login from './login';
import rooms, { rooomSaga } from './rooms';

const rootReducer = combineReducers({
  comments,
  loading,
  rooms,
  login,
  history,
});

export function* rootSaga() {
  yield all([commentSaga(), rooomSaga(), historySaga()]);
}

export default rootReducer;
