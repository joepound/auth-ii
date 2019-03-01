import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../providers/UsersProvider";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function LoginPage(props) {
  document.title = "Sign In - Userlist";

  const { authenticate, login } = useContext(UsersContext);

  useEffect(() => {
    if (authenticate()) {
      window.location.href = "/users";
    }
  }, []);

  return (
    <main className="userlist__login">
      <AccountInfoForm {...props} action={login} />
      <div className="userlist__login__register-link">
        Not logged in? Sign up <Link to="/signup">here</Link>.
      </div>
    </main>
  );
}

export default LoginPage;