import React, { useState } from "react";
import useApi from "../../services/useApi";

function CreateAccount() {
  const api = useApi();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    api
      .post("/user", {
        username,
        email,
        password,
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setUsername("");
      });
  };
  return (
    <form className="login-form">
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" onClick={handleCreateAccount}>
        Valider
      </button>
    </form>
  );
}

export default CreateAccount;
