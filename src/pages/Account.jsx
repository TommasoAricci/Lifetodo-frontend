import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../style/pages/Account.scss";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import $ from "jquery";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import userPic from "../images/copia.jpg";

export default function Account() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const {
    username,
    setUsername,
    password,
    setPassword,
    fullName,
    setFullName,
    editMode,
    setEditMode,
    edited,
    setEdited,
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

  const updateUser = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:4000/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, username }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUserData(data.user);
        setEdited(true);
      } else {
        console.error("Error updating user:", data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const showConfirmationAccount = () => {
    $.alert({
      theme: "modern",
      animation: "opacity",
      closeAnimation: "opacity",
      autoClose: "close|50",
      title: "Data Updated",
      content: "",
      buttons: {
        close: {
          text: "Chiudi",
          isHidden: true, // Nasconde il pulsante
          action: function () {},
        },
      },
    });
    setEditMode(false);
  };

  useEffect(() => {
    if (edited) {
      showConfirmationAccount();
      setEdited(false);
    }
  }, [setEditMode, edited]);

  return (
    <div className="account-container">
      {userData ? (
        <>
          <div className="profile-header">
            <div className="profile-img">
              <img
                src={userData.profilePicture || userPic}
                alt="User Profile"
                style={{ width: "140px", height: "130px" }}
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

          <form
            className={editMode ? "edit-div" : "hidden"}
            onSubmit={(e) => {
              e.preventDefault();
              updateUser();
            }}
          >
            <div className="edit-form">
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
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Update</button>
              <button type="button"
                onClick={() => setEditMode(false)}
                className="close-view"
                aria-label="Close View"
              ></button>
            </div>
          </form>
        </>
      ) : (
        <h2 className="loading">Loading...</h2>
      )}
    </div>
  );
}
