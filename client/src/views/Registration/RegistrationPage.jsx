import React from "react";
import { Link } from "react-router-dom";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function RegistrationPage(props) {
  document.title = "Sign Up - Userlist";

  return (
    <main className="userlist__registration">
      <AccountInfoForm {...props} />
      <div className="userlist__registration__login-link">
        <Link to="/">Back to login</Link>
      </div>
    </main>
  );
}

export default RegistrationPage;
