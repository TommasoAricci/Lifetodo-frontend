import React from "react";
import { useStore } from "../../store";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBrain,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/Add.scss";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import { useLocation } from "react-router-dom";

export default function AddButton({
  handleNewThought,
  handleNewCheckbox,
  handleNewSong,
  handleNewBook,
}) {
  // VARIABLES

  const {
    isOpen,
    isBottomOpen,
    setIsBottomOpen,
    newThoughtOpen,
    newCheckboxOpen,
  } = useStore();
  const [bottomClass, setBottomClass] = useState("");
  const location = useLocation();

  // PLUS BUTTON

  useEffect(() => {
    if (isOpen || newThoughtOpen || newCheckboxOpen) {
      setBottomClass("hidden");
    } else if (isBottomOpen) {
      setBottomClass("bottom-menu-options");
    } else {
      setBottomClass("hidden");
    }
  }, [isBottomOpen, isOpen, newThoughtOpen, newCheckboxOpen]);

  // LOCATION

  const handleLocationChange = () => {
    if (location.pathname === "/thoughts") {
      handleNewThought();
    } else if (location.pathname === "/todos") {
      handleNewCheckbox();
    } else if (location.pathname === "/music") {
      handleNewSong();
    } else {
      setIsBottomOpen(!isBottomOpen);
    }
  };

  // RENDER

  return (
    <>
      <button
        onClick={handleLocationChange}
        className={isOpen ? "hidden" : "bottom-menu"}
      >
        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
      </button>

      {/*wall buttons*/}

      <div className={bottomClass}>
        <div onClick={handleNewThought} className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faBrain} />
        </div>
        <div className="separatore"></div>
        <div onClick={handleNewCheckbox} className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faSquareCheck} />
        </div>
        <div className={isBottomOpen ? "bottom-menu-descriptions" : "hidden"}>
          <p id="add-thought-description ">Add Thought</p>
          <p id="add-thought-description">Add List</p>
        </div>
      </div>
    </>
  );
}
