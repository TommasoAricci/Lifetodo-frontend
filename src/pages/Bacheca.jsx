import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../style/pages/About.scss";
import "../style/Tabs.scss";
import Add from "../components/Add";
const { useStore } = require("../store");

export default function AboutMe() {
  const { thoughtSent } = useStore();
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    async function getThoughts() {
      try {
        const response = await fetch("http://localhost:4000/api/thoughts");
        const data = await response.json();
        console.log(data);
        setThoughts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getThoughts();
  }, [thoughtSent]);

  return (
    <>
      <Navbar />
      <Add />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>Wall</h1>
          </div>
        </div>

        <div className="thoughts">
          {thoughts.map((thought) => (
            <div className="thought" key={thought._id}>
              <h2>{thought.title}</h2>
              <p>{thought.description}</p>
            </div>
          ))}
        </div>
      </>
    </>
  );
}
