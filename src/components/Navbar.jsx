import React, { useEffect, useState } from "react";
import "../style/navbar.scss";
import image from "../images/copia.jpg";
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { useStore } from "../store";

export default function Navbar() {
  const { isOpen, setIsOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      <div className={isOpen ? "mainMobile" : "mainClose"}>
        <img className="image" src={image} alt="" width="200px" />
        <nav>
          <Link to="/" style={linkStyle}>
            <div
              className={location.pathname === "/" ? "navDiv active" : "navDiv"}
            >
              <h2>Bacheca</h2>
            </div>
          </Link>
          <Link to="/thoughts" style={linkStyle}>
            <div
              className={
                location.pathname === "/thoughts" ? "navDiv active" : "navDiv"
              }
            >
              <h2>Thoughts</h2>
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
          <div className="navDiv">
            <h2>Projects</h2>
          </div>
          <div className="navDiv">
            <h2>Contacts</h2>
          </div>
        </nav>
      </div>

      <Hamburger toggled={isOpen} toggle={setIsOpen} />
    </>
  );
}
