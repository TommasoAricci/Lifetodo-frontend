import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import "../style/pages/Todos.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "../style/pages/Music.scss";
const { useStore } = require("../store");

export default function Todos() {
  const { userData, songData } = useStore();
  const [music, setMusic] = useState([]);
  const [url, setUrl] = useState("");
  const [song, setSong] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const acdc = "711MCceyCBcFnzjGY4Q7Un";
  const metallica = "2ye2Wgw4gimLv2eAKyk1NB?utm_source=generator";

  // CHECKBOX

  /*   useEffect(() => {
    async function getCheckbox() {
      try {
        const response = await fetch("http://localhost:4000/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCheckbox();
  }, [checkboxSent]); */

  // delete

  /*  const handleCheckboxDelete = async (todoId) => {
    try {
      await fetch(`http://localhost:4000/api/todos/${todoId}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error(error);
    }
  }; */
  /* 
  const confirmDeleteTodo = (todo) => {
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
            handleCheckboxDelete(todo._id);
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
  }; */

  // edit

  /* const editTodos = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/todos/${todoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: checkboxTitle, items: checkboxItems }),
        }
      );
      const data = await response.json();
      setTodos(todos.map((todo) => (todo._id === todoId ? data : todo)));
      setCheckboxEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
 */
  /*   const handleEdit = (title, items, id) => {
    setNewCheckboxOpen(true);
    setCheckboxTitle(title);
    setCheckboxItems(items);
    setCheckboxEdit(true);
    setCheckboxId(id);
  };
 */
  return (
    <>
      <Navbar />
      <Add /* editTodos={editTodos} */ />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>My Music</h1>
          </div>
        </div>

        {songData !== null && (
          <iframe
            title="Spotify Minimal Embed"
            src={`https://open.spotify.com/embed/track/${songData.id}?utm_source=generator&theme=0`}
            width="300"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
            }}
          ></iframe>
        )}

        {/*        <div className="mainWall">
          <div className="todos">
            {filteredTodos.map((todo) => (
                <div className="todo" key={todo._id}>
                  <h2>{todo.title}</h2>
                  <div className="checkbox-list">
                    {todo.items.map(
                      (option, index) =>
                        option.trim() !== "" && (
                          <div key={index} className="checkbox-item">
                            <input
                              type="checkbox"
                              id={`checkbox-${todo._id}-${index}`}
                              name={`checkbox-${todo._id}-${index}`}
                              value={option}
                            />
                            <label htmlFor={`checkbox-${todo._id}-${index}`}>
                              {option}
                            </label>
                          </div>
                        )
                    )}
                  </div>
                  <button
                    onClick={() => confirmDeleteTodo(todo)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(todo.title, todo.items, todo._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              ))}
          </div>
        </div> */}
      </>
    </>
  );
}
