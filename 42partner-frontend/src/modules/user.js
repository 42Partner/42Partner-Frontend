import { takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';
import * as userApi from '../api/user';

const [SAVEUSERID, SAVEUSERID_SUCCESS, SAVEUSERID_FAILURE] =
  createRequestActionTypes('user/CREATE');

export const saveUserId = createAction(SAVEUSERID, (userId) => userId);

const createSaga = createRequestSaga(SAVEUSERID, userApi.addNewComment);

export function* userSaga() {
  yield takeLatest(SAVEUSERID, createSaga);
}

const initialState = {
  userId: null,
  loginError: null,
};

const user = handleActions(
  {
    [SAVEUSERID_SUCCESS]: (state, { payload: userId }) => ({
      ...state,
      loginError: null,
      userId,
    }),
    [SAVEUSERID_FAILURE]: (state, { payload: e }) => ({
      ...state,
      loginError: e,
    }),
  },
  initialState,
);

export default user;
