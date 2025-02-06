import React from "react";
import Navbar from "../components/Navbar";
import "../style/pages/Wall.scss";
import Add from "../components/Add/AddButton";
import Books from "./Books";
import Todos from "./Todos";
import Music from "./Music";
const { useStore } = require("../store");

export default function Wall() {
  const { userData, thoughts } = useStore();

  return (
    <>
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

        <Books />
        <Music />
        <Todos />
        <Navbar />

        <Add thoughts={thoughts} />
      </div>
    </>
  );
}
