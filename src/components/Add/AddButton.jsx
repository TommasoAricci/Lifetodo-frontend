import React from "react";
import { useStore } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
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
  } = useStore();
  const location = useLocation();

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
