import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UsersContext } from "../../providers/UsersProvider";

import { AccountInfoForm } from "../../components/AccountInfoForm";

function RegistrationPage(props) {
  document.title = "Sign Up - Userlist";

  const { register } = useContext(UsersContext);

  return (
    <main className="userlist__registration">
      <AccountInfoForm {...props} action={register} />
      <div className="userlist__registration__login-link">
        <Link to="/">Back to login</Link>
      </div>
    </main>
  );
}

export default RegistrationPage;
