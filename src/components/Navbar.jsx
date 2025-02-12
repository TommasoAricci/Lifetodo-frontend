import React, { useEffect } from "react";
import "../style/navbar.scss";
import image from "../images/copia.jpg";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../store";

export default function Navbar() {
  const {
    isOpen,
    setIsOpen,
    newThougthOpen,
    setNewThoughtOpen,
    viewContent,
    setViewContent,
    newCheckboxOpen,
    setNewCheckboxOpen,
    newSongOpen,
    setNewSongOpen
  } = useStore();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setNewThoughtOpen(false);
      setViewContent(false);
      setNewCheckboxOpen(false);
      setNewSongOpen(false);
    }
  }, [newThougthOpen, isOpen, viewContent, newCheckboxOpen, setNewCheckboxOpen,
    setNewThoughtOpen, setViewContent, newSongOpen, setNewSongOpen]);

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className={isOpen ? "mainMobile" : "mainClose"}>
        <img className="image" src={image} alt="" width="100px" />
        <nav>
          <Link to="/wall" style={linkStyle}>
            <div
              className={location.pathname === "/" ? "navDiv active" : "navDiv"}
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
      </div>

      <Hamburger toggled={isOpen} toggle={setIsOpen} />
      <Link to="/account">
        <button className={isOpen ? "bottom-menu account-button" : "hidden"}>
          <FontAwesomeIcon icon={faUser} className="icon" />
        </button>
      </Link>
      <Link to="/logout">
        <button className={isOpen ? "bottom-menu logout-button" : "hidden"}>
          <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
        </button>
      </Link>
    </>
  );
}
