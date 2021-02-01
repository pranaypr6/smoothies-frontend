import React, { useState } from "react";
import axios from "axios";
import { API } from "../backend";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  const [{ user }, dispatch] = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    await axios
      .post(
        `${API}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        if (data.errors) {
          setEmailError(data.errors.email);
          setPasswordError(data.errors.password);
        }
        if (data.user) {
          dispatch({ type: "SET_USER", user: data.user });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="email error">{emailError} </div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password error">{passwordError} </div>
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
