import React, { useState, useEffect } from "react";
import { useStore } from "../../store";
import Button from "../Button";
import Overlay from "../Overlay";
import {
  faXmark,
  faMagnifyingGlass,
  faAdd,
  faInfo,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddMovies({ handleNewMovie }) {
  const {
    userData,
    setMovieSent,
    movieSent,
    moviesToChoose,
    setMoviesToChoose,
    viewInfo,
    setViewInfo,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [infoLoaded, setInfoLoaded] = useState(false);
  const { newMovieOpen, movieTitle, setMovieTitle } = useStore();

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjI3NmE1ZGQ2N2E1NWI1ZmNhMGIwZDJhMzc4ZGQxZiIsIm5iZiI6MTc0MDg0MjM0MS45NDEsInN1YiI6IjY3YzMyNTY1NmU3NjgwOTAwNzZkZjI1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Ps93CpKb2DctSj0sW77kFIrTf4-Hex6siThjssJE2Q",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setMoviesToChoose(data.results);
    } catch (error) {
      console.error("Errore durante la ricerca dei film:", error);
    }

    setLoading(false);
  };

  const handleAddMovieToList = async (title, poster, id) => {
    const token = localStorage.getItem("token");
    const movieData = {
      title,
      image: poster,
      id,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/newmovie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movieData),
        }
      );
      if (response.ok) {
        setMovieSent(true);
      } else {
        console.error("Failed to add movie:", response.status);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  useEffect(() => {
    if (movieSent) {
      setMovieSent(false);
    }
  }, [movieSent, setMovieSent]);

  const handleInfo = () => {
    setViewInfo(!viewInfo);
    setMovieInfo({});
    setInfoLoaded(false);
  };

  return (
    <>
      <Overlay />
      <div className={newMovieOpen ? "search-song" : "hidden"}>
        <form className="search-song-form" onSubmit={handleMovieSubmit}>
          <input
            name="movie"
            className="search-song-title"
            onChange={(e) => setMovieTitle(e.target.value)}
            value={movieTitle}
            placeholder="Cerca un film o un regista"
          />
          <div className="books-list-to-add">
            {loading ? (
              <div className="loading-indicator">Caricamento...</div>
            ) : (
              moviesToChoose.map((movie) => (
                <div key={movie.id} className="book-to-add">
                  <div className="book">
                    <img
                      src={
                        movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path} `
                          : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      }
                      alt={movie.original_title}
                    />
                    <div className="book-info">
                      <p id="book-title">{movie.original_title}</p>
                      <p id="movie-year">
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="movie-buttons">
                    <Button
                      icon={faAdd}
                      func={() =>
                        handleAddMovieToList(
                          movie.original_title,
                          `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                          movie.id
                        )
                      }
                      type="button"
                    />
                    <Button
                      icon={faInfo}
                      type="button"
                      secondClass="info-button"
                    />
                  </div>
                  <div className={viewInfo ? "view" : "hidden"}>
                    <div className="view-content movie-info">
                      {infoLoaded ? (
                        <>
                          <h1>{movieInfo.original_title}</h1>
                          <img
                            src={
                              movieInfo.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image"
                            }
                            alt={movieInfo.original_title}
                          />
                          <p>
                            <strong>Overview:</strong>{" "}
                            {movieInfo.overview || "No description available."}
                          </p>
                        </>
                      ) : (
                        "Loading..."
                      )}
                      <Button
                        func={() => handleInfo()}
                        type="button"
                        icon={faClose}
                        secondClass="close-view"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="search-song-buttons-div">
            <Button icon={faMagnifyingGlass} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewMovie} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
