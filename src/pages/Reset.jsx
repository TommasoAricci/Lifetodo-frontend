import React from "react";
import "../style/pages/Login.scss";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const navigate = useNavigate();
  const { username, newPassword, setUsername, setNewPassword } = useStore();

  const resetPassword = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Password reset successful!");
          navigate("/login");
        } else {
          alert(data.message || "Password reset failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Reset error:", error);
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
            <h1 style={{ color: "#FFD700" }}>Reset Password</h1>
          </div>
        </div>
        <form onSubmit={resetPassword}>
          <div className="login-form">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="new Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset</button>
          </div>
        </form>
        <div className="login-footer"></div>
      </div>
    </>
  );
}
