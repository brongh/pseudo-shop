import { createAction } from "redux-actions";
import { START } from "../common";

export const INIT_AUTH = "INIT_AUTH";
export const FETCH_LOGIN = "FETCH_LOGIN";
export const FETCH_USER = "FETCH_USER";
export const LOG_OUT = "LOG_OUT";
export const FETCH_SIGNUP = "FETCH_SIGNUP";

export const initAuthAction = createAction(INIT_AUTH);

export const fetchLoginAction = createAction(FETCH_LOGIN + START);

export const fetchUserAction = createAction(FETCH_USER + START);
export const logOutAction = createAction(LOG_OUT);

export const fetchSignUpAction = createAction(FETCH_SIGNUP + START);
