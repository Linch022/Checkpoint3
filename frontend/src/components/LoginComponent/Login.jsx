/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import "../../assets/styles/login-page.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post("/user/login", {
        username,
        password,
      })
      .then((res) => {
        const { token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        const { user } = res.data;
        setUser(user);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
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
      <button type="submit" onClick={handleLogin}>
        Valider
      </button>
    </form>
  );
}

export default Login;
