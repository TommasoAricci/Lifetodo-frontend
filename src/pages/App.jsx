import React, { useEffect } from "react";
import "../style/App.scss";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function App() {

useEffect(() => {
  async function getTodos() {
    try {
      const response = await axios.get("http://localhost:4000/api/todos");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  getTodos();
}, []);

  return (
    <>
      <Navbar />
      <div className="mainAbout mainApp">
        <h1 id="app-h1">
          Welcome to my <br /><span> web developer portfolio</span>
        </h1>
      </div>
      <div className="aboutDescription appDescription"></div>
    </>
  );
}
