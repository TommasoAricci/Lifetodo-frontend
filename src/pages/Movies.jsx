import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavbarLaptop from "../components/Navbar-laptop";
import Button from "../components/Button";
import { Helmet } from "react-helmet-async";
import { faTrashCan, faClose } from "@fortawesome/free-solid-svg-icons";
import "../style/pages/Movies.scss";
import { useStore } from "../store";
import AddMovies from "../components/Add/AddMovies";
import AddButton from "../components/Add/AddButton";
import $ from "jquery";
import { useLocation } from "react-router-dom";

export default function Movies() {
  const {
    movieSent,
    newMovieOpen,
    setNewMovieOpen,
    setMovieTitle,
    setMoviesToChoose,
    userData,
  } = useStore();
  const [moviesList, setMoviesList] = useState([]);
  const [movieInfo, setMovieInfo] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [viewContent, setViewContent] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const location = useLocation();

  const handleNewMovie = () => {
    setNewMovieOpen(!newMovieOpen);
    setMovieTitle("");
    setMoviesToChoose([]);
  };

    useEffect(() => {
      if (moviesList.length > 0 && userData?._id) {
        const filtered = moviesList.filter(
          (song) => song.user?._id === userData?._id
        );
        setFilteredMovies(filtered);
      }
    }, [moviesList, userData]);

  const getMoviesList = () => {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/allmovies`)
        .then((res) => res.json())
        .then((data) => {
          setMoviesList(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(moviesList);

  useEffect(() => {
    getMoviesList();
  }, [movieSent]);

  const confirmDeleteMovie = (movie) => {
    $.confirm({
      theme: "modern",
      animation: "opacity",
      title: "Are you sure?",
      content: "Press delete to remove this book",
      buttons: {
        ok: {
          text: "Delete",
          btnClass: "btn-red",
          action: function () {
            deleteMovie(movie._id);
            getMoviesList();
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

  const deleteMovie = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/deletemovie/${id}`, {
        method: "DELETE",
      });
      getMoviesList();
    } catch (error) {
      console.error(error);
    }
  };

/*   const getMovieInfo = async (imdbID) => {
    setViewContent(true);
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${imdbID}`
      );
      const data = await res.json();
      setMovieInfo(data);
      setInfoLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }; */

  const handleInfo = () => {
    setViewContent(false);
    setMovieInfo(null);
    setInfoLoaded(false);
  };

  return (
    <>
      <AddMovies handleNewMovie={handleNewMovie} />
      <AddButton handleNewMovie={handleNewMovie} />
      <Helmet>
        <title>Movies</title>
        <meta name="description" content="Movie section of lifetodo app" />
      </Helmet>
      <Navbar />
      <NavbarLaptop />

      <div className={location.pathname === "/movies" ? "mainAbout" : "hidden"}>
        <div id="aboutTitle">
          <h1>My Movies</h1>
        </div>
      </div>

      {location.pathname === "/wall" && filteredMovies.length > 0 && (
        <div className="smallTitleWrapper">
          <small id="smallTitleWall">movies</small>
        </div>
      )}

      <div className="booksList moviesList">
        {filteredMovies.map((movie) => (
          <div key={movie._id} className="book-container movie-container">
            <div className="book movie">
              <img src={movie.image} alt={movie.title} />
              <div className="info">
                <h1>{movie.title}</h1>
                <p>{movie.year}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                icon={faTrashCan}
                type="button"
                func={() => confirmDeleteMovie(movie)}
              />
              {/* <Button
                icon={faInfo}
                type="button"
                func={() => getMovieInfo(movie.imdbID)}
              /> */}
            </div>
          </div>
        ))}
      </div>

      {viewContent && movieInfo && (
        <div className="view-content book-info">
          {infoLoaded ? (
            <>
              <h1
                style={{
                  fontSize: "25px",
                }}
              >
                {movieInfo?.volumeInfo?.title}
              </h1>
              <img
                src={movieInfo?.volumeInfo?.imageLinks?.thumbnail || ""}
                alt={movieInfo?.volumeInfo?.title || "Book Image"}
              />
              <div className="single-book-info">
                <p>
                  <strong>Author:</strong>{" "}
                  {movieInfo?.volumeInfo?.authors?.join(", ") || "Unknown"}
                </p>
                <p>
                  <strong>Pages:</strong>{" "}
                  {movieInfo?.volumeInfo?.pageCount || "N/A"}
                </p>
                <p>
                  <strong>Genre:</strong>{" "}
                  {movieInfo?.volumeInfo?.categories?.join(", ") || "Unknown"}
                </p>
              </div>
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      movieInfo?.volumeInfo?.description ||
                      "No description available.",
                  }}
                />
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
      )}
    </>
  );
}
