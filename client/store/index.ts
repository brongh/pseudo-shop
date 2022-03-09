import { createStore, applyMiddleware, Store, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Context, createWrapper } from "next-redux-wrapper/lib";

import { RootState, SagaStore } from "../types/store";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

declare const window: any;

const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga, store.dispatch);

  return store;
};

export default createWrapper<Store<RootState>>(makeStore, { debug: false });
