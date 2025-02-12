import React from "react";
import "../style/navbar.scss";
import image from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className="mainLaptop">
        <img className="image" src={image} alt="" width="100px" />
        <nav>
          <Link to="/wall" style={linkStyle}>
            <div
              className={location.pathname === "/wall" ? "navDiv active" : "navDiv"}
            >
              <h2>Wall</h2>
            </div>
          </Link>
          <Link to="/thoughts" style={linkStyle}>
            <div
              className={
                location.pathname === "/thoughts" ? "navDiv active" : "navDiv"
              }
            >
              <h2>Notes</h2>
            </div>
          </Link>
          <Link to="/todos" style={linkStyle}>
            <div
              className={
                location.pathname === "/todos" ? "navDiv active" : "navDiv"
              }
            >
              <h2>Todos</h2>
            </div>
          </Link>
          <Link to="/music" style={linkStyle}>
            <div
              className={
                location.pathname === "/music" ? "navDiv active" : "navDiv"
              }
            >
              <h2>Music</h2>
            </div>
          </Link>
          <Link to="/books" style={linkStyle}>
            <div
              className={
                location.pathname === "/books" ? "navDiv active" : "navDiv"
              }
            >
              <h2>Books</h2>
            </div>
          </Link>
        </nav>

        <div className="laptop-buttons">
          <Link to="/account">
            <button className="laptop-bottom-menu laptop-account-button">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </button>
          </Link>
          <Link to="/logout">
            <button className="laptop-bottom-menu laptop-logout-button">
              <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
