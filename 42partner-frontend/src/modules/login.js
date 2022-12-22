import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as userApi from '../api/user';
import createRequestSaga, {
  createRequestActionTypes,
} from '../api/createRequestSaga';

const [REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, REQUEST_LOGIN_FAILURE] =
  createRequestActionTypes('rooms/REQUEST_LOGIN');
const SET_TOKEN = 'login/SET_TOKEN';
const SET_USERID = 'login/SET_USERID';

export const requestLogin = createAction(REQUEST_LOGIN);
export const setToken = createAction(SET_TOKEN, (token) => token);
export const setUserId = createAction(SET_USERID, (userId) => userId);

const requestLoginSaga = createRequestSaga(REQUEST_LOGIN, userApi.requestLogin);

export function* loginSaga() {
  yield takeLatest(REQUEST_LOGIN, requestLoginSaga);
}

const initialState = {
  userId: null,
  token: null,
  requestError: null,
};

const login = handleActions(
  {
    [SET_TOKEN]: (state, { payload: token }) => ({
      ...state,
      token,
      requestError: null,
    }),
    [SET_USERID]: (state, { payload: userId }) => ({
      ...state,
      userId,
      requestError: null,
    }),
    [REQUEST_LOGIN_SUCCESS]: (state) => ({
      ...state,
      requestError: null,
    }),
    [REQUEST_LOGIN_FAILURE]: (state, { payload: e }) => ({
      ...state,
      requestError: e,
    }),
  },
  initialState,
);

export default login;
