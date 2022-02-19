import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { UserSettingsState } from "./contexts/user-settings";

import { TopBar, Footer, NavBar } from "./components/layout";
import { AppThemeProvider } from "./theme";
import UserAuthContext from "./models/user-auth";

const App = ({ IsAuthorized, AuthContext, Role, AuthIds }: UserAuthContext) => {
  return (
    <UserSettingsState>
      <AppThemeProvider>
        <CssBaseline />
        <Container>
          <Router>
            <TopBar />
            <NavBar />
            <Container>
              <Container />
              <Container>
                <Routes />
              </Container>
              <Footer />
            </Container>
          </Router>
        </Container>
      </AppThemeProvider>
    </UserSettingsState>
  );
};

export default App;
