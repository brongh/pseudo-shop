import { handleActions } from "redux-actions";
import produce from "immer";
import { HYDRATE } from "next-redux-wrapper/lib";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../common";

export interface AuthState {
  isLoggedIn: boolean;
  authorizing: boolean;
  error: any;
  user: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authorizing: false,
  error: undefined,
  user: {},
};

const reducer = handleActions<AuthState, any>(
  {
    [actions.INIT_AUTH]: (state) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = undefined;
      }),
    [actions.FETCH_SIGNUP + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = true;
        draft.error = undefined;
      }),
    [actions.FETCH_SIGNUP + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.authorizing = false;
        draft.error = undefined;
        draft.user = payload;
      }),
    [actions.FETCH_SIGNUP + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = payload;
      }),
    [actions.FETCH_LOGIN + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = true;
        draft.error = undefined;
      }),
    [actions.FETCH_LOGIN + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.authorizing = false;
        draft.error = undefined;
        draft.user = payload;
      }),
    [actions.FETCH_LOGIN + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = payload?.error;
      }),
    [actions.FETCH_USER + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = true;
        draft.error = undefined;
      }),
    [actions.FETCH_USER + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.authorizing = false;
        draft.error = undefined;
        draft.user = payload.data;
      }),
    [actions.FETCH_USER + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = payload?.error;
      }),
    [actions.LOG_OUT]: (state) => {
      return { ...initialState };
    },
  },

  initialState
);

export default reducer;
