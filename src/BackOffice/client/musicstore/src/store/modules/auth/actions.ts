import { action } from "typesafe-actions";
import { SET_AUTH } from "./constants";

export const setAuth = (value: boolean) => action(SET_AUTH, value);
