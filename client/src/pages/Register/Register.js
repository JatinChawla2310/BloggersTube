import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  let history = useNavigate();
  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      history("/");
    }
  };
  const [credentials, setcredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = credentials;  
      try {
        const res = await fetch(`http://localhost:5000/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, cpassword }),
        });
        const json = await res.json();
        if (json.success) {
          alert("Registration successful");
          history("/login");
        } else {
          alert(json.error);
        }
      } catch (error) {
        alert("Registration failed");
      }
    
  };
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    window.scroll(0,0)
    checkLogin()
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter unique username..."
            name="username"
            onChange={handleChange}
            required
            minLength={3}
          />
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            required
            minLength={5}
          />
          <label>Confirm Password</label>
          <input
            className="registerInput"
            type="password"
            name="cpassword"
            placeholder="Confirm your password..."
            onChange={handleChange}
            required
            minLength={5}
          />
          <button type="submit" className="registerButton">
            Register
          </button>
        </form>
        <Link to="/login" className="link registerLoginButton">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
