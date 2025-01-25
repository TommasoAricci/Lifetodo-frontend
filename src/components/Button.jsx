import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/Button.scss";

export default function Button({icon, func, type, secondClass}) {
  return (
    <button onClick={func} className={`add-functions-button ${secondClass}`} type={type}>
      <FontAwesomeIcon className="search-song-icon" icon={icon} />
    </button>
  );
}
