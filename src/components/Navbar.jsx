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
    /*     newThougthOpen,
    setNewThoughtOpen,
    thoughtView,
    setThoughtView,
    newCheckboxOpen,
    setNewCheckboxOpen, */
  } = useStore();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  /*   useEffect(() => {
    if (isOpen) {
      setNewThoughtOpen(false);
      setThoughtView(false);
      setNewCheckboxOpen(false);
    }
  }, [newThougthOpen, isOpen, thoughtView, newCheckboxOpen]); */

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className={isOpen ? "mainMobile mainLaptop" : "mainClose"}>
        <img className="image" src={image} alt="" width="200px" />
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
              <h2>My Music</h2>
            </div>
          </Link>
          <div className="navDiv">
            <h2>My Books</h2>
          </div>
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
