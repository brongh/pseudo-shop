import { combineReducers } from "redux";

import { RootState } from "../types/store";
import authReducer from "./auth/reducer";

export default function rootReducer() {
  return combineReducers<RootState>({
    auth: authReducer,
  });
}
