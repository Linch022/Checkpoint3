import React, { useState } from "react";
import CreateAccount from "../components/LoginComponent/CreateAccount";
import Login from "../components/LoginComponent/Login";

function LoginPage() {
  const [loginChoice, setLoginChoice] = useState(true);

  const changeChoice = (value) => {
    if (value === "connect") {
      if (!loginChoice) {
        setLoginChoice(true);
      }
    } else if (value === "create") {
      if (loginChoice) {
        setLoginChoice(false);
      }
    }
  };
  return (
    <div className="login-container">
      <div className="choice-login">
        <button type="button" onClick={() => changeChoice("connect")}>
          Connexion
        </button>
        <button type="button" onClick={() => changeChoice("create")}>
          Créer un compte
        </button>
      </div>
      {loginChoice ? <Login /> : <CreateAccount />}
    </div>
  );
}

export default LoginPage;
