import { combineReducers } from "redux";

import { SET_AUTH } from "./constants";
import { AuthAction, AuthState } from "./models";

const initialState: AuthState = {
  isAuthenticated: false,
};

export default combineReducers<AuthState, AuthAction>({
  isAuthenticated: (state = initialState.isAuthenticated, action) => {
    switch (action.type) {
      case SET_AUTH:
        return action.payload;

      default:
        return state;
    }
  },
});
