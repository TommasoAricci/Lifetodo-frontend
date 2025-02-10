import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddButton from "../components/Add/AddButton";
import AddBooks from "../components/Add/AddBooks";
import Overlay from "../components/Overlay";
import "../style/pages/Books.scss";
import { useStore } from "../store";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import NavbarLaptop from "../components/Navbar-laptop";
import { faTrashCan, faInfo, faClose } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

export default function Books() {
  const {
    bookSent,
    viewContent,
    setViewContent,
    userData,
    newBookOpen,
    setNewBookOpen,
    setBooksToChoose,
    setBookTitle,
  } = useStore();

  const [booksList, setBooksList] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const location = useLocation();
  const filteredBooks = booksList.filter(
    (thought) => thought.user._id === userData?._id
  );

  const handleNewBook = () => {
    setNewBookOpen(!newBookOpen);
    setBookTitle("");
    setBooksToChoose([]);
  };

  const getBookLists = () => {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/allbooks`)
        .then((res) => res.json())
        .then((data) => {
          setBooksList(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookLists();
  }, [bookSent]);

  // delete

  const deleteBook = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/deletebook/${id}`, {
        method: "DELETE",
      });
      getBookLists();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteBook = (book) => {
    $.confirm({
      theme: "modern",
      animation: "opacity",
      title: "Are you sure?",
      content: "Sei sicuro di voler eliminare questo elemento?",
      buttons: {
        ok: {
          text: "Delete",
          btnClass: "btn-red",
          action: function () {
            deleteBook(book._id);
            getBookLists();
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

  // info

  const getInfo = async (refId) => {
    setViewContent(true);
    try {
      await fetch(`https://www.googleapis.com/books/v1/volumes/${refId}`)
        .then((res) => res.json())
        .then((data) => {
          setBookInfo(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <NavbarLaptop />
      <Overlay />
      <AddButton handleNewBook={handleNewBook} />
      <AddBooks handleNewBook={handleNewBook} />

      <div className={location.pathname === "/books" ? "mainAbout" : "hidden"}>
        <div id="aboutTitle">
          <h1>My Books</h1>
        </div>
      </div>

      {location.pathname === "/wall" && filteredBooks.length > 0 && (
        <div className="smallTitleWrapper">
          <small id="smallTitleWall">books</small>
        </div>
      )}

      <div className="booksList">
        {filteredBooks.map((book) => (
          <div key={book._id}>
            <div className="book-container">
              <div className="book">
                <img src={book.image} alt={book.title} />
                <div className="info">
                  <h1>{book.title}</h1>
                  <p>{book.author}</p>
                </div>
              </div>
              <div className="book-buttons">
                <Button
                  icon={faTrashCan}
                  type="button"
                  func={() => confirmDeleteBook(book)}
                />
                <Button
                  icon={faInfo}
                  type="button"
                  func={() => {
                    getInfo(book.refId);
                  }}
                  secondClass={"info-button"}
                />
              </div>
            </div>
            <div className={viewContent ? "view" : "hidden"}>
              <div className="view-content">
                <p>
                  <strong></strong>
                </p>
                <Button
                  func={() => setViewContent(false)}
                  type="button"
                  icon={faClose}
                  secondClass="close-view"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
