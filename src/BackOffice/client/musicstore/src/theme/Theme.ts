import { THEME_MODES } from "../models/constants";
import {
  blue,
  green,
  amber,
  indigo,
  lime,
  teal,
  grey,
} from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const commonPalette = {
  primary: {
    main: indigo[600],
  },
  secondary: {
    main: lime[600],
  },
  success: {
    main: green[600],
  },
  warning: {
    main: amber[700],
  },
};

const palettes = {
  [THEME_MODES.Light]: {
    appNavBar: {
      background: grey[700],
      onHoverLinkBackground: "rgba(0,0,0,0.1)",
    },
    logo: {
      shadow: teal[50],
      store: blue[600],
    },
    dataTable: {
      headerBackground: "rgba(0, 0, 0, 0.02)",
    },
    lowestBackground: "#f3f3f3",
  },
  [THEME_MODES.Dark]: {
    appNavBar: {
      background: "#252526",
      onHoverLinkBackground: "rgba(255, 255, 255, 0.1)",
    },
    logo: {
      shadow: "#3d4f56",
      store: blue[400],
    },
    dataTable: {
      headerBackground: "rgba(0,0,0,.1)",
    },
    lowestBackground: "#383838",
  },
};

const Theme = (mode = THEME_MODES.Light) =>
  createTheme({
    palette: {
      // mode: THEME_MODES[mode],

      ...commonPalette,
      ...palettes[mode],
    },
  });

export default Theme;
