import React from "react";
import Navbar from "../components/Navbar";
import "../style/pages/Wall.scss";
import Books from "./Books";
import Todos from "./Todos";
import Music from "./Music";
import Thoughts from "./Thoughts";
import NavbarLaptop from "../components/Navbar-laptop";
import { Helmet } from "react-helmet-async";

const { useStore } = require("../store");

export default function Wall() {
  const { userData } = useStore();
  return (
    <>
      <Navbar />
      <NavbarLaptop />
      <div className="mainWall">
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>
              {userData?.fullName
                ? `${userData?.fullName.split(" ")[0]}'s Wall`
                : "Loading..."}
            </h1>
          </div>
        </div>

        <Thoughts />
        <Todos />
        <Music />
        <Books />
        
        <Helmet>
          <title>wall</title>
          <meta name="description" content="wall section of lifetodo app" />
          <meta name="keywords" content="React, SEO, Helmet" />
        </Helmet>
      </div>
    </>
  );
}
