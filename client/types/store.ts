import { Task } from "@redux-saga/types";
import { NextPageContext } from "next";
import { AnyAction, CombinedState, Reducer, Store } from "redux";
import { AuthState } from "../store/auth/reducer";

type RootReducer = Reducer<CombinedState<{ auth: AuthState }>, AnyAction>;

export type RootState = ReturnType<RootReducer>;

export interface SagaStore extends Store<RootState, AnyAction> {
  sagaTask: Task;
}

export interface CustomPageContext extends NextPageContext {
  store: Store;
  isServer: boolean;
}
