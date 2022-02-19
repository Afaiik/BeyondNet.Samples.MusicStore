import React from "react";
import PropTypes from "prop-types";

import { useUserSettings } from "../../hooks";
import UserSettingsContext from "./user-settings";

type UserSettingsStateProps = {
  children?: React.ReactChild | React.ReactChild[];
};

const UserSettingsState = ({ children }: UserSettingsStateProps) => {
  const [userSettings, userSettingsSetters] = useUserSettings();

  return (
    <UserSettingsContext.Provider
      value={{ ...userSettings, ...userSettingsSetters }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

UserSettingsState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserSettingsState;
