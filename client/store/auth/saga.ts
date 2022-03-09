import { Dispatch } from "redux";
import { all, fork, take, put } from "redux-saga/effects";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from "../../config/storage";
import { instance } from "../../services/api";
import { FAIL, START, SUCCESS } from "../common";
import * as actions from "./actions";

const Login = async (email: string, password: string) => {
  const data: any = await instance
    .post("/auth/login", { email, password })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      const errorCode = err.response.status;
      const errorMessage = err.response.data;
      return { error: { errorCode, errorMessage } };
    });
  return { data };
};

const Signup = async (name: string, email: string, password: string) => {
  const data: any = await instance
    .post("/auth/register", { name, email, password })
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => {
      const errorCode = error.response.status;
      const errorMessage = error.response.data;
      return { error: { errorCode, errorMessage } };
    });
  return { data };
};

function* signup(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_SIGNUP + START);
    try {
      const { data } = yield Signup(
        payload.name,
        payload.email,
        payload.password
      );
      if (!data.error) {
        setAuthToken(data?.token);
        yield put({
          type: actions.FETCH_SIGNUP + SUCCESS,
          payload: data,
        });
      } else {
        yield put({
          type: actions.FETCH_SIGNUP + FAIL,
          payload: data,
        });
      }
    } catch (error: any) {
      yield put({
        type: actions.FETCH_SIGNUP + FAIL,
        payload: error.response.data,
      });
    }
  }
}

function* login(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_LOGIN + START);
    try {
      const { data } = yield Login(payload.email, payload.password);
      if (!data.error) {
        setAuthToken(data?.token);
        yield put({
          type: actions.FETCH_LOGIN + SUCCESS,
          payload: data,
        });
      } else {
        yield put({
          type: actions.FETCH_LOGIN + FAIL,
          payload: data,
        });
      }
    } catch (error: any) {
      yield put({
        type: actions.FETCH_LOGIN + FAIL,
        payload: error.response.data,
      });
    }
  }
}

const verifyUser = async (token: string) => {
  const data = await instance
    .get("/auth/")
    .then((res: any) => {
      return res.data;
    })
    .catch((err) => {
      const errorCode = err.response.status;
      const errorMessage = err.response.data;
      return { error: { errorCode, errorMessage } };
    });
  return { data };
};

function* fetchUser(): any {
  while (true) {
    try {
      const token = getAuthToken();
      yield take(actions.FETCH_USER + START);
      if (!token) {
        yield put({
          type: actions.FETCH_USER + FAIL,
        });
      } else {
        const { data } = yield verifyUser(token);
        yield put({
          type: actions.FETCH_USER + SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      yield put({
        type: actions.FETCH_USER + FAIL,
      });
    }
  }
}

function* logout(): any {
  while (true) {
    yield take(actions.LOG_OUT);
    removeAuthToken();
  }
}

export default function* authSaga() {
  yield all([fork(login), fork(fetchUser), fork(logout), fork(signup)]);
}
