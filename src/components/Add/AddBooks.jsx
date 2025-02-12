import React from "react";
import { useState, useEffect } from "react";
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

export default function AddBooks({ handleNewBook }) {
  const {
    userData,
    setBookSent,
    bookSent,
    booksToChoose,
    setBooksToChoose,
    viewInfo,
    setViewInfo,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [infoLoaded, setInfoLoaded] = useState(false);
  const { newBookOpen, bookTitle, setBookTitle } = useStore();

  console.log(booksToChoose);

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
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/newbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, description, image, id, userId }),
      });
      setBookSent(true);
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  useEffect(() => {
    if (bookSent) {
      setBookSent(false);
    }
  }, [bookSent, setBookSent]);

  //

  const getInfo = async (id) => {
    setViewInfo(true);
    try {
      await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBookInfo(data);
          setInfoLoaded(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfo = () => {
    setViewInfo(!viewInfo);
    setBookInfo({});
    setInfoLoaded(false);
  };

  return (
    <>
      <Overlay />
      <div className={newBookOpen ? "search-song" : "hidden"}>
        <form className="search-song-form" onSubmit={handleBookSubmit}>
          <input
            name="song"
            className="search-song-title"
            onChange={(e) => setBookTitle(e.target.value)}
            value={bookTitle}
            placeholder="Cerca un titolo o un autore"
          />
          <div className="books-list-to-add">
            {loading ? (
              <div className="loading-indicator">Caricamento...</div> // Mostra il caricamento se `loading` è true
            ) : (
              booksToChoose.map((book) => (
                <div key={book.id} className="book-to-add">
                  <div className="book">
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        book.volumeInfo.imageLinks?.smallThumbnail
                      }
                      alt=""
                    />
                    <div className="book-info">
                      <p id="book-title">{book.volumeInfo.title}</p>
                      <p id="book-author">{book.volumeInfo.authors}</p>
                    </div>
                  </div>
                  <Button
                    icon={faAdd}
                    func={() =>
                      handleAddBookToList(
                        book.volumeInfo?.title || "",
                        book.volumeInfo?.authors?.[0] || "",
                        book.volumeInfo?.description || "",
                        book.volumeInfo?.imageLinks?.thumbnail || "",
                        book.id || ""
                      )
                    }
                    type="button"
                  />
                  <Button
                    icon={faInfo}
                    type="button"
                    func={() => {
                      getInfo(book.id);
                    }}
                    secondClass={"info-button"}
                  />
                  <div className={viewInfo ? "view" : "hidden"}>
                    <div className="view-content">
                      <p>
                        <strong>
                          {infoLoaded ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  bookInfo?.volumeInfo?.description ||
                                  "No description available.",
                              }}
                            />
                          ) : (
                            "Loading..."
                          )}
                        </strong>
                      </p>
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
            <Button icon={faXmark} func={handleNewBook} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
