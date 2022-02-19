import React from "react";
import PropTypes from "prop-types";

import {
  WbSunny as SunIcon,
  NightsStay as MoonIcon,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { Container, Switch } from "@mui/material";

type ThemeSwitchProps = {
  isLightTheme: boolean;
  onChange: any;
};

const ThemeSwitch = ({
  isLightTheme,
  onChange,
}: ThemeSwitchProps): JSX.Element => {
  return (
    <Container>
      <LightMode className={`${isLightTheme ? "active" : ""}`}>
        <SunIcon />
      </LightMode>
      <DarkMode className={`${!isLightTheme ? "active" : ""}`}>
        <MoonIcon />
      </DarkMode>
      <Switch
        onChange={onChange}
        checked={isLightTheme}
        color="info"
        inputProps={{ "aria-label": "Change Theme" }}
      />
    </Container>
  );
};

ThemeSwitch.defaultProps = {
  isLightTheme: false,
};

ThemeSwitch.propTypes = {
  isLightTheme: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(ThemeSwitch);
