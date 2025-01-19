import React from "react";
import "../style/pages/Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault(); // Prevenzione del refresh della pagina
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
