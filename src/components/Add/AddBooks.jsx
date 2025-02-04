import React from "react";
import { useState } from "react";
import { useStore } from "../../store";
import AddButton from "./AddButton";
import Button from "../Button";
import {
  faXmark,
  faMagnifyingGlass,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddBooks() {
  const { userData, setBookSent } = useStore();
  const [booksToChoose, setBooksToChoose] = useState([]);
  const [loading, setLoading] = useState(false);
  const { newBookOpen, setNewBookOpen, bookTitle, setBookTitle } = useStore();

  console.log(booksToChoose);

  const handleNewBook = () => {
    setNewBookOpen(!newBookOpen);
    setBookTitle("");
    setBooksToChoose([]);
  };

  // get books from api

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q={${bookTitle}}&key{${process.env.REACT_APP_BOOK_API}}&maxResults=10`
        )
        .then((response) => {
          setBooksToChoose(response.data.items);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // save on db

  const handleAddBookToList = async (title, author, description, image, id) => {
    const userId = userData._id;
    const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/newbook`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, author, description, image, id, userId }),
          }
        );

        const result = await response.json();
        console.log(result);
        setBookSent(true);
      } catch (error) {
        console.error("Error creating song:", error);
      }
  };

  return (
    <>
      <AddButton handleNewBook={handleNewBook} />
      <div className={newBookOpen ? "search-song" : "hidden"}>
        <form className="search-song-form" onSubmit={handleBookSubmit}>
          <input
            name="song"
            className="search-song-title"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
            placeholder="Cerca una canzone o artista"
          />
          <div className="books-list-to-add">
            {loading ? (
              <div className="loading-indicator">Caricamento...</div> // Mostra il caricamento se `loading` è true
            ) : (
              booksToChoose.map((book) => (
                <div key={book.id} className="book-to-add">
                  <img src={book.volumeInfo.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.smallThumbnail} alt="" />
                  <div className="book-info">
                    <p id="book-title">{book.volumeInfo.title}</p>
                    <p id="book-author">{book.volumeInfo.authors}</p>
                  </div>
                  <Button
                    icon={faAdd}
                    func={() => handleAddBookToList(
                      book.volumeInfo.title,
                      book.volumeInfo.authors[0],
                      book.volumeInfo.infoLink,
                      book.volumeInfo.imageLinks.thumbnail,
                      book.id
                    )}
                    type="button"
                  />
                </div>
              ))
            )}
          </div>

          <div className="search-song-buttons-div">
            <Button icon={faMagnifyingGlass} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewBook} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
