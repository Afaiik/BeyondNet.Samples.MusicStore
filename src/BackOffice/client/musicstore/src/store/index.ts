import { RootAction, RootState, Services } from "MyTypes";
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
// import { routerMiddleware as createRouterMiddleware } from "connected-react-router";

import { composeEnhancers } from "./utils";
import rootReducer from "./root-reducer";
import { localStorage, logger } from "../services";

// browser history
export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: { localStorage, logger },
});

// const routerMiddleware = createRouterMiddleware(history);

// configure middlewares
// const middlewares = [epicMiddleware, routerMiddleware];

// compose enhancers
// const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const enhancer = composeEnhancers(applyMiddleware());

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

// const store = createStore(rootReducer(history), initialState);

// epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
