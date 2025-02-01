import React from "react";
import Navbar from "../components/Navbar";
import AddBooks from "../components/Add/AddBooks";

export default function Books() {
/*   const handleBooks = () => {
    try {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key{${process.env.REACT_APP_BOOK_API}}&maxResults=10`)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };

  handleBooks(); */

  return (
    <>
      <Navbar />
      <AddBooks /* editTodos={editTodos} */ />
      <div className="mainAbout">
        <div id="aboutTitle">
          <h1>My Books</h1>
        </div>
      </div>
    </>
  );
}
