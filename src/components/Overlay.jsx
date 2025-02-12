import React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../store";

export default function Overlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { newThoughtOpen, newCheckboxOpen, viewContent, newSongOpen, newBookOpen, viewInfo } =
    useStore();

  useEffect(() => {
    setShowOverlay(
      newThoughtOpen || newCheckboxOpen || viewContent || newSongOpen || newBookOpen || viewInfo
    );
  }, [newThoughtOpen, newCheckboxOpen, viewContent, newSongOpen, newBookOpen, viewInfo]);

  return (
    <div>
      {showOverlay && <div className="overlay"></div>}
    </div>
  );
}
