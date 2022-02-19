import { routerActions } from "connected-react-router";
import * as uiActions from "./modules/ui/actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  router: routerActions,
  uis: uiActions,
};
