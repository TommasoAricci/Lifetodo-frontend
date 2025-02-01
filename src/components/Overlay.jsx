import React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../store";

export default function Overlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const { newThoughtOpen, newCheckboxOpen, viewContent, newSongOpen } =
    useStore();

  useEffect(() => {
    setShowOverlay(
      newThoughtOpen || newCheckboxOpen || viewContent || newSongOpen
    );
  }, [newThoughtOpen, newCheckboxOpen, viewContent, newSongOpen]);

  return (
    <div>
      {showOverlay && <div className="overlay"></div>}
    </div>
  );
}
