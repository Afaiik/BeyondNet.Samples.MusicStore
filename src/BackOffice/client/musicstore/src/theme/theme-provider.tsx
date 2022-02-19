import { memo, useContext, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import PropTypes from "prop-types";

import UserSettingsContext from "../contexts/user-settings/user-settings";
import { THEME_MODES } from "../models/constants";
import { Theme, GlobalStyles } from ".";

type AppThemeProviderProps = {
  children?: React.ReactChild | React.ReactChild[];
};

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const { lightTheme } = useContext(UserSettingsContext);

  const currentTheme = useMemo(
    () => Theme(lightTheme ? THEME_MODES.Light : THEME_MODES.Dark),
    [lightTheme]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles />
      <StyledThemeProvider theme={currentTheme}>
        <StylesProvider injectFirst>{children}</StylesProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(AppThemeProvider);
