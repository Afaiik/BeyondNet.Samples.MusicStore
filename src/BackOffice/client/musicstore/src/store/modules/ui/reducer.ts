import { combineReducers } from "redux";

import { SET_ENTITY } from "./constants";
import { UIAction, UIState } from "./models";

const initialState: UIState = {
  entity: "",
};

export default combineReducers<UIState, UIAction>({
  entity: (state = initialState.entity, action) => {
    switch (action.type) {
      case SET_ENTITY:
        return action.payload;

      default:
        return state;
    }
  },
});
