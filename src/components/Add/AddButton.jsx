import React from "react";
import { useStore } from "../../store";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBrain,
  faSquareCheck,
  faBook,
  faMusic,
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
  newThoughtOpen,
}) {
  // VARIABLES

  const {
    isOpen,
    isBottomOpen,
    setIsBottomOpen,
    newCheckboxOpen,
    newBookOpen,
  } = useStore();
  const [bottomClass, setBottomClass] = useState("");
  const location = useLocation();

  // PLUS BUTTON

  useEffect(() => {
    if (isOpen || newThoughtOpen || newCheckboxOpen || newBookOpen) {
      setBottomClass("hidden");
    } else if (isBottomOpen) {
      setBottomClass("bottom-menu-options");
    } else {
      setBottomClass("hidden");
    }
  }, [isBottomOpen, isOpen, newThoughtOpen, newCheckboxOpen, newBookOpen]);

  // LOCATION

  const handleLocationChange = () => {
    if (location.pathname === "/thoughts") {
      handleNewThought();
    } else if (location.pathname === "/todos") {
      handleNewCheckbox();
    } else if (location.pathname === "/music") {
      handleNewSong();
    } else if (location.pathname === "/books") {
      handleNewBook();
    }
  };

  // RENDER

  return (
    <>
      {location.pathname !== "/wall" && (
        <button
          onClick={handleLocationChange}
          className={isOpen ? "hidden" : "bottom-menu"}
        >
          <FontAwesomeIcon className="plus-icon" icon={faPlus} />
        </button>
      )}
    </>
  );
}
