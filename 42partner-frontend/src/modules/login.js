import { createAction, handleActions } from 'redux-actions';

const SET_USERID = 'login/SET_USERID';

export const setUserId = createAction(SET_USERID, (userId) => userId);

const initialState = {
  userId: null,
};

const login = handleActions(
  {
    [SET_USERID]: (state, { payload: userId }) => ({
      ...state,
      userId,
    }),
  },
  initialState,
);

export default login;
