import React from "react";
import { useStore } from "../store";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faBrain,
  faSquareCheck,
  faFloppyDisk,
  faXmark,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Add.scss";
import $ from "jquery";
import axios from "axios";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function Add({ editThought, editTodos }) {
  // VARIABLES

  const {
    isOpen,
    isBottomOpen,
    setIsBottomOpen,
    thoughtSent,
    setThoughtSent,
    checkboxSent,
    setCheckboxSent,
    // THOUGHT
    newThoughtOpen,
    setNewThoughtOpen,
    newCheckboxOpen,
    setNewCheckboxOpen,
    thoughtTitle,
    setThoughtTitle,
    thoughtDescription,
    setThoughtDescription,
    thoughtId,
    thoughtEdit,
    setThoughtEdit,
    thoughtView,
    // CHECKBOX
    checkboxTitle,
    setCheckboxTitle,
    checkboxItems,
    setCheckboxItems,
    checkboxEdit,
    setCheckboxEdit,
    checkboxId,
    userData,
    // SONG
    setSongSent,
    newSongOpen,
    setNewSongOpen,
    songTitle,
    setSongTitle,
    songData,
    setSongData,
    songToken,
    setDeletedSong,
  } = useStore();
  const [bottomClass, setBottomClass] = useState("");
  const location = useLocation();
  const [songsToChoose, setSongsToChoose] = useState([]);
  const [loading, setLoading] = useState(false); // Aggiungi lo stato per il caricamento

  // BLACKBOX

  useEffect(() => {
    const blackBox = document.createElement("div");
    blackBox.id = "blackBox";
    document.body.appendChild(blackBox);
    if (newThoughtOpen || newCheckboxOpen || thoughtView || newSongOpen) {
      blackBox.style.display = "block";
    } else {
      blackBox.style.display = "none";
    }

    return () => {
      document.body.removeChild(blackBox);
    };
  }, [newThoughtOpen, newCheckboxOpen, thoughtView, newSongOpen]);

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

  // THOUGHT

  const handleNewThought = () => {
    setNewThoughtOpen(!newThoughtOpen);
    setThoughtTitle("");
    setThoughtDescription("");
    setThoughtEdit(false);
  };

  useEffect(() => {
    if (newThoughtOpen) {
      setIsBottomOpen(false);
    }
  });

  const handleFormSubmit = async (e) => {
    const title = thoughtTitle;
    const description = thoughtDescription;
    const userId = userData._id;

    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:4000/api/thought", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, userId }),
      });

      setThoughtSent(true);
    } catch (error) {
      console.error("Error creating thought:", error);
    }
  };

  const showConfirmation = useCallback(() => {
    $.alert({
      theme: "modern",
      animation: "opacity",
      closeAnimation: "opacity",
      autoClose: "close|50",
      title: "Contenuto Creato",
      content: "Your thought has been created",
      buttons: {
        close: {
          text: "Chiudi",
          isHidden: true, // Nasconde il pulsante
          action: function () {},
        },
      },
    });
    setNewThoughtOpen(false);
  }, [setNewThoughtOpen]); // Nessuna dipendenza, poiché non usa variabili esterne.

  useEffect(() => {
    if (thoughtSent) {
      showConfirmation();
      setThoughtSent(false);
    }
  }, [thoughtSent, setThoughtSent, showConfirmation]);

  // CHECKBOX

  const handleNewCheckbox = () => {
    setNewCheckboxOpen(!newCheckboxOpen);
    setCheckboxTitle("");
    setCheckboxItems([]);
    setCheckboxEdit(false);
  };

  useEffect(() => {
    if (newCheckboxOpen) {
      setIsBottomOpen(false);
    }
  });

  const handleCheckboxSubmit = async (e) => {
    const title = checkboxTitle;
    const items = checkboxItems;

    try {
      const token = localStorage.getItem("token"); // Assumendo che il token sia salvato nel localStorage

      await fetch("http://localhost:4000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Includi il token nell'header
        },
        body: JSON.stringify({ title, items }),
      });

      setCheckboxSent(true);
    } catch (error) {
      console.error("Error creating checkbox:", error);
    }
  };

  const showConfirmationTodo = useCallback(() => {
    $.alert({
      theme: "modern",
      animation: "opacity",
      closeAnimation: "opacity",
      autoClose: "close|50",
      title: "Contenuto Creato",
      content: "Your thought has been created",
      buttons: {
        close: {
          text: "Chiudi",
          isHidden: true, // Nasconde il pulsante
          action: function () {},
        },
      },
    });
    setNewCheckboxOpen(false);
  }, [setNewCheckboxOpen]);

  useEffect(() => {
    if (checkboxSent) {
      showConfirmationTodo();
      setCheckboxSent(false);
    }
  }, [checkboxSent, setCheckboxSent, showConfirmationTodo]);

  // MUSIC

  const handleNewSong = () => {
    setNewSongOpen(!newSongOpen);
    setSongTitle("");
    setCheckboxItems([]);
    setSongsToChoose([]);
    setSongSent(false);
    setDeletedSong(false);
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();
    if (!songToken) {
      console.error(
        "Token non disponibile, impossibile effettuare la ricerca."
      );
      return;
    }

    setLoading(true); // Imposta loading a true prima di fare la richiesta

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          songTitle
        )}&type=track&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${songToken}`,
          },
        }
      );

      if (response.data.tracks.items.length > 0) {
        setSongsToChoose(response.data.tracks.items);
        const track = response.data.tracks.items[0];
        setSongData(track);
      } else {
        console.log("Nessuna traccia trovata.");
      }
    } catch (error) {
      console.error(
        "Errore durante la ricerca della canzone:",
        error.response || error.message
      );
    } finally {
      setLoading(false); // Imposta loading a false quando la richiesta è completata
    }
  };

  const handleAddSongToList = async (title, id) => {
    const userId = userData._id;
    const token = localStorage.getItem("token");
    if (songData) {
      try {
        const response = await fetch("http://localhost:4000/api/newsong", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, id, userId }),
        });

        const result = await response.json();
        console.log(result);
        setSongSent(true);
      } catch (error) {
        console.error("Error creating song:", error);
      }
    }
  };

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
      {/*plus button*/}

      <button
        onClick={handleLocationChange}
        className={isOpen ? "hidden" : "bottom-menu"}
      >
        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
      </button>

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

      {/*new thought open*/}

      <div className={newThoughtOpen ? "add-thought" : "hidden"}>
        <form
          className="add-thought-form"
          onSubmit={(e) => {
            e.preventDefault();
            thoughtEdit ? editThought(thoughtId) : handleFormSubmit();
          }}
        >
          <textarea
            name="title"
            className="add-thought-title"
            onChange={(e) => setThoughtTitle(e.target.value)}
            value={thoughtTitle}
            placeholder="Title"
          ></textarea>
          <textarea
            name="description"
            className="add-thought-input"
            onChange={(e) => setThoughtDescription(e.target.value)}
            value={thoughtDescription}
            placeholder="Text"
          />
          <div className="add-thought-buttons-div">
            <Button icon={faFloppyDisk} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewThought} type="button" />
          </div>
        </form>
      </div>

      {/*checkbox open*/}

      <div className={newCheckboxOpen ? "add-checkbox-list" : "hidden"}>
        <form
          className="add-checkbox-list-form"
          onSubmit={(e) => {
            e.preventDefault();
            checkboxEdit ? editTodos(checkboxId) : handleCheckboxSubmit();
          }}
        >
          <textarea
            name="listTitle"
            className="add-checkbox-list-title"
            placeholder="List Title"
            value={checkboxTitle}
            onChange={(e) => setCheckboxTitle(e.target.value)} // Aggiungi gestione del cambiamento
          ></textarea>

          <div className="checkbox-list">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="checkbox-item">
                <input
                  type="text"
                  id={`checkbox-${index}`}
                  value={checkboxItems[index] || ""}
                  onChange={(e) =>
                    setCheckboxItems((prevItems) => [
                      ...prevItems.slice(0, index),
                      e.target.value,
                      ...prevItems.slice(index + 1),
                    ])
                  }
                  placeholder={`Item ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="add-checkbox-list-buttons-div">
            <Button icon={faFloppyDisk} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewCheckbox} type="button" />
          </div>
        </form>
      </div>

      {/*music open*/}

      <div className={newSongOpen ? "search-song" : "hidden"}>
        <form className="search-song-form" onSubmit={handleSongSubmit}>
          <input
            name="song"
            className="search-song-title"
            onChange={(e) => setSongTitle(e.target.value)}
            value={songTitle}
            placeholder="Cerca una canzone o artista"
          />
          <div className="songs-list-to-add">
            {loading ? (
              <div className="loading-indicator">Caricamento...</div> // Mostra il caricamento se `loading` è true
            ) : (
              songsToChoose.map((song) => (
                <div key={song.id} className="song-item">
                  <iframe
                    title={`Spotify Minimal Embed for ${song.id}`}
                    src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`}
                    frameBorder="0"
                    allow="encrypted-media"
                    className="song-iframe"
                  ></iframe>
                  <Button
                    icon={faAdd}
                    func={() => handleAddSongToList(song.name, song.id)}
                    type="button"
                  />

                  {/* <button
                    onClick={() => handleAddSongToList(song.name, song.id)}
                    className="search-song-button add-song-button"
                    type="button"
                  >
                    <FontAwesomeIcon className="add-song-icon" icon={faAdd} />
                  </button> */}
                </div>
              ))
            )}
          </div>

          <div className="search-song-buttons-div">
            <Button icon={faMagnifyingGlass} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewSong} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
