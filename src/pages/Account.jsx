import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSignOutAlt,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "../style/pages/Account.scss";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const {
    username,
    setUsername,
    password,
    setPassword,
    fullName,
    setFullName,
  } = useStore();

  const openEditData = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/currentuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            console.error("Errore:", data.message);
          }
        })
        .catch((error) => console.error("Errore:", error));
    }
  }, []);

  return (
    <div className="account-container">
      {userData ? (
        <>
          <div className="profile-header">
            <div className="profile-img">
              <img
                src={userData.profilePicture || "/default-avatar.png"}
                alt="User Profile"
                width={100}
                height={100}
              />
            </div>
            <div className="user-info">
              <h1>{userData.fullName}</h1>
              <p>@{userData.username}</p>
            </div>
          </div>

          <div className="account-details">
            <div className="detail-row">
              <label>Full Name:</label>
              <span>{userData.fullName}</span>
            </div>
            <div className="detail-row">
              <label>Username:</label>
              <span>{userData.username}</span>
            </div>
            <div className="detail-row">
              <label>Password:</label>
              <span>*******</span>
            </div>
          </div>

          <div className="actions">
            <button
              onClick={openEditData}
              className="action-button edit-button"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
            <button
              onClick={() => navigate("/logout")}
              className="action-button logout-button"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>

          <form className={editMode ? "login-div" : "hidden"}>
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
        </>
      ) : (
        <h2 className="loading">Loading...</h2>
      )}
    </div>
  );
}
