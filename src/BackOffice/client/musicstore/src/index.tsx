import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./app";
import UserAuthContext from "./models/user-auth";
import Unauthorized from "./pages/unauthorized";
import Auth from "./services/auth-service";

import store from "./store";

const buildApp = (props: UserAuthContext) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

Auth(({ AuthContext, IsAuthorized, Role, AuthIds }: UserAuthContext) => {
  ReactDOM.render(
    IsAuthorized ? (
      buildApp({ AuthContext, IsAuthorized, Role, AuthIds })
    ) : (
      <Unauthorized />
    ),
    document.getElementById("root")
  );
});
