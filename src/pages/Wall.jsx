import React from "react";
import Navbar from "../components/Navbar";
import "../style/pages/Wall.scss";
import Books from "./Books";
import Todos from "./Todos";
import Music from "./Music";
import Thoughts from "./Thoughts";
import NavbarLaptop from "../components/Navbar-laptop";
const { useStore } = require("../store");

export default function Wall() {
  const { userData, newThoughtOpen } = useStore();

  console.log(newThoughtOpen);

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
      </div>
    </>
  );
}
