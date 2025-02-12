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
    username,
    password,
    setUsername,
    setPassword,
    setFullName,
    fullName,
  } = useStore();

  const registerUser = (event) => {
    event.preventDefault(); // Prevenzione del refresh della pagina
    fetch(`${process.env.REACT_APP_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert(data.message || "Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="register section of lifetodo app" />
        <meta name="keywords" content="React, SEO, Helmet" />
      </Helmet>
      <div className="login-div">
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1 style={{ color: "#FFD700" }}>Register</h1>
          </div>
        </div>
        <form onSubmit={registerUser}>
          <div className="login-form">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FontAwesomeIcon icon={faUser} className="input-icon faUser" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon icon={faLock} className="input-icon faLock" />
            <button type="submit">Register</button>
          </div>
        </form>
        <div className="login-footer"></div>
      </div>
    </>
  );
}
