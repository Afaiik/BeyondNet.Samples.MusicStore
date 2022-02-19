import { combineReducers } from "redux";
import { History } from "history";

import { connectRouter } from "connected-react-router";
import uiReducer from "./modules/ui/reducer";
import authReducer from "./modules/auth/reducer";

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    uis: uiReducer,
    auths: authReducer,
  });

export default rootReducer;
