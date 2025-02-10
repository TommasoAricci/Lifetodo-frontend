import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/Button.scss";

export default function Button({ icon, func, type, secondClass }) {
  const location = useLocation();

  if (location.pathname === "/wall") {
    return null;
  }

  return (
    <button onClick={func} className={`add-functions-button ${secondClass}`} type={type}>
      <FontAwesomeIcon className="search-song-icon" icon={icon} />
    </button>
  );
}
