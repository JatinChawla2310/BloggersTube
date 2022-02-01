import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let history = useNavigate();
  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      history("/");
    }
  };
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    const { username, password } = credentials;
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("id", json.id);
      alert("Logged in successfully");
      history("/");
    } else {
      alert("Invalid Credentials");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    window.scroll(0,0)
    checkLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Enter your username..."
            required
            minLength={3}
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password..."
            required
            minLength={5}
          />
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
        <Link to="/register" className="link loginRegisterButton">
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
