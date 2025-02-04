import React from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import AddBooks from "../components/Add/AddBooks";
import { useStore } from "../store";
import Button from "../components/Button";
import { faTrashCan, faInfo } from "@fortawesome/free-solid-svg-icons";
import "../style/pages/Books.scss";

export default function Books() {
  const { bookSent } = useStore();
  const [booksList, setBooksList] = React.useState([]);

  console.log(booksList);

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

  return (
    <>
      <Navbar />
      <AddBooks /* editTodos={editTodos} */ />
      <div className="mainAbout">
        <div id="aboutTitle">
          <h1>My Books</h1>
        </div>
      </div>

      <div className="booksList">
        {booksList.map((book) => (
          <div className="book" key={book.id}>
            <img src={book.image} alt="" />
            <div className="info">
              <h1>{book.title}</h1>
              <p>{book.author}</p>
              <div className="book-buttons">
                <Button icon={faTrashCan} type="button" onClick={() => {}} />
                <Button icon={faInfo} type="button" onClick={() => {}} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
