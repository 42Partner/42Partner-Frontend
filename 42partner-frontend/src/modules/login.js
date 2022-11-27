import { createAction, handleActions } from 'redux-actions';

const SET_TOKEN = 'login/SET_TOKEN';
const SET_USERID = 'login/SET_USERID';

export const setToken = createAction(SET_TOKEN, (token) => token);
export const setUserId = createAction(SET_USERID, (userId) => userId);

const initialState = {
  userId: null,
  token: null,
};

const login = handleActions(
  {
    [SET_TOKEN]: (state, { payload: token }) => ({
      ...state,
      token,
    }),
    [SET_USERID]: (state, { payload: userId }) => ({
      ...state,
      userId,
    }),
  },
  initialState,
);

export default login;
