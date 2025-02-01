import React from "react";
import { useStore } from "../../store";
import { useState } from "react";
import {
  faMagnifyingGlass,
  faXmark,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/Add.scss";
import $ from "jquery";
import axios from "axios";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import Button from "../../components/Button";
import AddButton from "../Add/AddButton";

export default function AddMusic() {
  const {
    setSongSent,
    newSongOpen,
    setNewSongOpen,
    songTitle,
    setSongTitle,
    songData,
    setSongData,
    songToken,
    setDeletedSong,
    userData,
    setCheckboxItems,
  } = useStore();

  const [songsToChoose, setSongsToChoose] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  };

  const handleAddSongToList = async (title, id) => {
    const userId = userData._id;
    const token = localStorage.getItem("token");
    if (songData) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/newsong`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, id, userId }),
          }
        );

        const result = await response.json();
        console.log(result);
        setSongSent(true);
      } catch (error) {
        console.error("Error creating song:", error);
      }
    }
  };

  return (
    <>
      <AddButton handleNewSong={handleNewSong} />
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
