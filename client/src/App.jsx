import React from "react";
import { Route } from "react-router-dom";

import { AppHeader } from "./components/AppHeader";

import { LoginPage } from "./views/Login";
import { RegistrationPage } from "./views/Registration";

function App(props) {
  return (
    <div className="userlist">
      <AppHeader />
      <Route exact path="/" render={props => <LoginPage {...props} />} />
      <Route exact path="/signin" render={props => <LoginPage {...props} />} />
      <Route
        exact
        path="/signup"
        render={props => <RegistrationPage {...props} />}
      />
    </div>
  );
}

export default App;
