import React from "react";
import "../style/pages/Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const navigate = useNavigate();
  const {
    setUserData,
    setToken,
    username,
    password,
    setUsername,
    setPassword,
  } = useStore();

  const logUser = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Login successful!");
          localStorage.setItem("token", data.token);
          setUserData(data);
          setToken(data.token);
          navigate("/wall");
        } else {
          alert(data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="login section of lifetodo app" />
        <meta name="keywords" content="React, SEO, Helmet" />
      </Helmet>
      <div className="login-div">
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1 style={{ color: "#FFD700" }}>Login</h1>
          </div>
        </div>
        <form onSubmit={logUser}>
          <div className="login-form">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon icon={faUser} className="input-icon faUser" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} className="input-icon faLock" />
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
}
