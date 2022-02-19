import { ActionType } from "typesafe-actions";

import * as uis from "./actions";

export type UIAction = ActionType<typeof uis>;

export type UIState = Readonly<{
  entity: string;
}>;
