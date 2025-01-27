import React from "react";
import "../style/pages/Login.scss";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

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
    event.preventDefault(); // Prevenzione del refresh della pagina
    fetch("/api/login", {
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
