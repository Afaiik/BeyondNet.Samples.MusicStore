import { ActionType } from "typesafe-actions";

import * as auths from "./actions";

export type AuthAction = ActionType<typeof auths>;

export type AuthState = Readonly<{
  isAuthenticated: boolean;
}>;
