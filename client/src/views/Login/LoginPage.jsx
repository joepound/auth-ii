import React from "react";
import { Link } from "react-router-dom";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function LoginPage(props) {
  document.title = "Sign In - Userlist";

  return (
    <main className="userlist__login">
      <AccountInfoForm {...props} />
      <div className="userlist__login__register-link">
        Not logged in? Sign up <Link to="/signup">here</Link>.
      </div>
    </main>
  );
}

export default LoginPage;
