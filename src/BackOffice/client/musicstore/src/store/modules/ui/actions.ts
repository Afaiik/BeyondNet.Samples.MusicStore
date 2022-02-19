import { action } from "typesafe-actions";

import { SET_ENTITY } from "./constants";

export const setEntity = (entity: string) => action(SET_ENTITY, entity);
