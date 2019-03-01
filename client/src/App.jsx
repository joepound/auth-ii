import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";

import { UsersContext } from "./providers/UsersProvider";

import { AppHeader } from "./components/AppHeader";

import { LoginPage } from "./views/Login";
import { RegistrationPage } from "./views/Registration";

function App(props) {
  const { authenticate } = useContext(UsersContext);

  useEffect(() => {
    authenticate();
  }, []);

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
