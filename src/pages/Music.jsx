import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddButton from "../components/Add/AddButton";
import "../style/pages/Music.scss";
import "../style/Add.scss";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../style/pages/Music.scss";
import Button from "../components/Button";
import $ from "jquery";
import AddMusic from "../components/Add/AddMusic";
import Overlay from "../components/Overlay";
import NavbarLaptop from "../components/Navbar-laptop";
const { useStore } = require("../store");

export default function Music() {
  const {
    songToken,
    setSongToken,
    setSongDbTitle,
    songSent,
    setSongId,
    userData,
    deletedSong,
    setDeletedSong,
    newSongOpen,
    setNewSongOpen,
    setSongTitle,
    setSongsToChoose,
    setSongSent,
  } = useStore();
  const [songsFromDb, setSongsFromDb] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const location = useLocation();

  const handleNewSong = () => {
    setNewSongOpen(!newSongOpen);
    setSongTitle("");
    setSongsToChoose([]);
    setSongSent(false);
    setDeletedSong(false);
  };

  useEffect(() => {
    if (songsFromDb.length > 0 && userData?._id) {
      const filtered = songsFromDb.filter(
        (song) => song.user._id === userData?._id
      );
      setFilteredSongs(filtered);
    }
  }, [songsFromDb, userData]);

  // db call

  const getSongsList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/allsongs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setSongsFromDb(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSongsList();
  }, [songSent, deletedSong]);

  useEffect(() => {
    if (songsFromDb.length > 0) {
      songsFromDb.forEach((song) => {
        setSongDbTitle(song.title);
        setSongId(song._id);
      });
    }
  }, [songsFromDb, songSent, setSongDbTitle, setSongId]);

  // spotify call

  useEffect(() => {
    async function fetchSpotifyToken() {
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

      try {
        const tokenResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
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
  }, [setSongToken]);

  const handleFetchSongs = useCallback(async () => {
    if (!songToken) {
      return;
    }

    const songIds = songsFromDb.map((song) => song.refId);

    try {
      await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${songIds.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${songToken}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Errore durante il recupero dei dettagli delle canzoni:",
        error.response || error.message
      );
    }
  }, [songToken, songsFromDb]); // Dipendenze necessarie.

  useEffect(() => {
    handleFetchSongs();
  }, [songToken, songsFromDb, songsFromDb, handleFetchSongs]);

  // delete

  const confirmDeleteSong = (song) => {
    $.confirm({
      theme: "modern",
      animation: "opacity",
      title: "Are you sure?", // Aggiungi un'emoji qui
      content: "Sei sicuro di voler eliminare questo elemento?",
      buttons: {
        ok: {
          text: "Delete",
          btnClass: "btn-red",
          action: function () {
            handleDeleteSong(song._id);
          },
        },
        cancel: {
          text: "Back",
          action: function () {
            // Non eliminare l'elemento
          },
        },
      },
    });
  };

  const handleDeleteSong = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/deletesong/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setDeletedSong(true);
        setTimeout(() => {
          setDeletedSong(false);
        }, 1000);
      } else {
        console.error("Failed to delete song");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <NavbarLaptop />
      <AddButton handleNewSong={handleNewSong} />
      <AddMusic  handleNewSong={handleNewSong} />
      <Overlay />
      <div className={location.pathname === "/music" ? "mainAbout" : "hidden"}>
        <div id="aboutTitle">
          <h1>My Music</h1>
        </div>
      </div>

      {location.pathname === "/wall" && filteredSongs.length > 0 && (
        <div className="smallTitleWrapper">
          <small id="smallTitleWall">songs</small>
        </div>
      )}

      <div className="songs-list">
        {filteredSongs.length > 0 &&
          filteredSongs.map((song) => (
            <div key={song._id} className="song-item">
              <iframe
                title={`Spotify Minimal Embed for ${song.refId}`}
                src={`https://open.spotify.com/embed/track/${song.refId}?utm_source=generator&theme=0`}
                frameBorder="0"
                allow="encrypted-media"
                className="song-iframe"
              ></iframe>
              <Button
                icon={faTrashCan}
                func={() => confirmDeleteSong(song)}
                type="button"
              />
            </div>
          ))}
      </div>
    </>
  );
}
