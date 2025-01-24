import React from "react";
import { useStore } from "../store";
import { useState, useEffect } from "react";
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
    editMode,
    songSent,
    setSongSent,
    newSongOpen,
    setNewSongOpen,
    songTitle,
    setSongTitle,
    songData,
    setSongData,
  } = useStore();
  const [bottomClass, setBottomClass] = useState("");
  const [plusButtonLocation, setPlusButtonLocation] = useState();
  const [songToken, setSongToken] = useState("");
  const location = useLocation();
  const [songsToChoose, setSongsToChoose] = useState([]);

  console.log(songsToChoose);

  // BLACKBOX

  useEffect(() => {
    const blackBox = document.createElement("div");
    blackBox.id = "blackBox";
    document.body.appendChild(blackBox);
    if (
      newThoughtOpen ||
      newCheckboxOpen ||
      thoughtView ||
      newSongOpen ||
      editMode
    ) {
      blackBox.style.display = "block";
    } else {
      blackBox.style.display = "none";
    }

    return () => {
      document.body.removeChild(blackBox);
    };
  }, [newThoughtOpen, newCheckboxOpen, thoughtView, newSongOpen, editMode]);

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

      const response = await fetch("http://localhost:4000/api/thought", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, userId }),
      });

      const result = await response.json();
      console.log(result);
      setThoughtSent(true);
    } catch (error) {
      console.error("Error creating thought:", error);
    }
  };

  const showConfirmation = () => {
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
  };

  useEffect(() => {
    if (thoughtSent) {
      showConfirmation();
      setThoughtSent(false);
    }
  }, [thoughtSent, setThoughtSent]);

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

      const response = await fetch("http://localhost:4000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Includi il token nell'header
        },
        body: JSON.stringify({ title, items }),
      });

      const result = await response.json();
      console.log(result);
      setCheckboxSent(true);
    } catch (error) {
      console.error("Error creating checkbox:", error);
    }
  };

  const showConfirmationTodo = () => {
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
  };

  useEffect(() => {
    if (checkboxSent) {
      showConfirmationTodo();
      setCheckboxSent(false);
    }
  }, [checkboxSent, setCheckboxSent]);

  // MUSIC

  const handleNewSong = () => {
    setNewSongOpen(!newSongOpen);
    setSongTitle("");
    setCheckboxItems([]);
    setSongsToChoose([]);
  };

  useEffect(() => {
    // Funzione per ottenere il token di Spotify
    async function fetchSpotifyToken() {
      try {
        const tokenResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "9a8cf9cac79d4f2e869f51bcdbf61a14", // Sostituisci con il tuo Client ID
            client_secret: "14a93dee07b9489daa24727e530b2818", // Sostituisci con il tuo Client Secret
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const token = tokenResponse.data.access_token;
        setSongToken(token); // Salva il token nello stato
      } catch (error) {
        console.error(
          "Errore durante l'ottenimento del token:",
          error.response || error.message
        );
      }
    }

    fetchSpotifyToken();
  }, []);

  const handleSongSubmit = async (e) => {
    if (!songToken) {
      console.error(
        "Token non disponibile, impossibile effettuare la ricerca."
      );
      return;
    }

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

      console.log("Risultato della ricerca:", response.data);

      if (response.data.tracks.items.length > 0) {
        setSongsToChoose(response.data.tracks.items);
        const track = response.data.tracks.items[0];
        setSongData(track); // Salva i dati della traccia nello stato
      } else {
        console.log("Nessuna traccia trovata.");
      }
    } catch (error) {
      console.error(
        "Errore durante la ricerca della canzone:",
        error.response || error.message
      );
    }
  };

  // LOCATION

  const handleLocationChange = () => {
    if (location.pathname === "/thoughts") {
      setPlusButtonLocation(handleNewThought);
    } else if (location.pathname === "/todos") {
      setPlusButtonLocation(handleNewCheckbox);
    } else if (location.pathname === "/music") {
      setPlusButtonLocation(handleNewSong);
    } else {
      setPlusButtonLocation(setIsBottomOpen(!isBottomOpen));
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
            <button className="add-thought-button" type="submit">
              <FontAwesomeIcon
                className="add-thought-icon"
                icon={faFloppyDisk}
              />
            </button>
            <button
              onClick={handleNewThought}
              type="button"
              className="add-thought-button"
            >
              <FontAwesomeIcon className="add-thought-icon" icon={faXmark} />
            </button>
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
            <button className="add-checkbox-list-button" type="submit">
              <FontAwesomeIcon
                className="add-checkbox-icon"
                icon={faFloppyDisk}
              />
            </button>
            <button
              onClick={handleNewCheckbox}
              type="button"
              className="add-checkbox-list-button"
            >
              <FontAwesomeIcon className="add-checkbox-icon" icon={faXmark} />
            </button>
          </div>
        </form>
      </div>

      {/*music open*/}

      <div className={newSongOpen ? "search-song" : "hidden"}>
        <form
          className="search-song-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSongSubmit();
          }}
        >
          <input
            name="song"
            className="search-song-title"
            onChange={(e) => setSongTitle(e.target.value)}
            value={songTitle}
            placeholder="Cerca una canzone o artista"
          ></input>
          <div className="songs-list-to-add">
            {songsToChoose.map((song) => (
              <div key={song.id} className="song-item">
                {/* Iframe */}
                <iframe
                  title={`Spotify Minimal Embed for ${song.id}`}
                  src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`}
                  frameBorder="0"
                  allow="encrypted-media"
                  className="song-iframe"
                ></iframe>

                <button
                  className="search-song-button add-song-button"
                  type="button"
                >
                  <FontAwesomeIcon className="add-song-icon" icon={faAdd} />
                </button>
              </div>
            ))}
          </div>

          <div className="search-song-buttons-div">
            <button className="search-song-button" type="submit">
              <FontAwesomeIcon
                className="search-song-icon"
                icon={faMagnifyingGlass}
              />
            </button>
            <button
              onClick={handleNewSong}
              type="button"
              className="search-song-button"
            >
              <FontAwesomeIcon className="search-song-icon" icon={faXmark} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
