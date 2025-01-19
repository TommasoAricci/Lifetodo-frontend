import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../style/pages/Wall.scss";
import Add from "../components/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { Navigate } from "react-router-dom";
const { useStore } = require("../store");

export default function AboutMe() {
  const { thoughtSent, checkboxSent, userData, token } = useStore();
  const [thoughts, setThoughts] = useState([]);
  const [todos, setTodos] = useState([]);

  console.log(userData);

  // THOUGHTS

  useEffect(() => {
    async function getThoughts() {
      try {
        const response = await fetch("http://localhost:4000/api/thoughts");
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getThoughts();
  }, [thoughtSent]);

  // api delete

  const handleDelete = async (id) => {
    console.log("Deleting item with ID:", id); // Log dell'ID che stai cercando di eliminare
    try {
      await fetch(`http://localhost:4000/api/thoughts/${id}`, {
        method: "DELETE",
      });

      setThoughts(thoughts.filter((thought) => thought._id !== id));
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  };

  const confirmDelete = (thought) => {
    console.log(thought); // Aggiungi un log per verificare cosa contiene `thought`
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
            handleDelete(thought._id);
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

  // api edit

  const handleEdit = async (thoughtId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/thoughts/${thoughtId}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // CHECKBOX

  useEffect(() => {
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
  }, [checkboxSent]);

  // delete

  const handleCheckboxDelete = async (todoId) => {
    try {
      await fetch(`http://localhost:4000/api/todos/${todoId}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error(error);
    }
  };

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
  };

  return (
    <>
    {!token && <Navigate to="/" />}
      <Navbar />
      <Add thoughts={thoughts} />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1> Wall</h1>
          </div>
        </div>

        {/* <div className="mainWall">
          {wall[0] &&
            wall[0].entries &&
            wall[0].entries.map((entry) => {
              if (entry.type === "Thought" && entry.doc !== null) {
                return (
                  <div className="thoughts" key={entry._id}>
                    <div className="thought">
                      <h2>{entry.doc?.title}</h2>
                      <p>{entry.doc?.description}</p>
                      <button
                        onClick={() => confirmDelete(entry.doc)} 
                        className="delete-button"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>

                      <button
                        className="edit-button"
                        onClick={() => handleEdit(entry.doc)}
                      ></button>
                    </div>
                  </div>
                );
              }
              if (entry.type === "Todo" && entry.doc !== null) {
                return (
                  <div className="todos" key={entry._id}>
                    <div className="todo">
                      <h2>{entry.doc?.title}</h2>
                      <div className="checkbox-list">
                        {entry.doc?.items.map((option, index) => (
                          <div key={index} className="checkbox-item">
                            <input
                              type="checkbox"
                              id={`checkbox-${entry._id}-${index}`}
                              name={`checkbox-${entry._id}-${index}`}
                              value={option}
                            />
                            <label htmlFor={`checkbox-${entry._id}-${index}`}>
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => confirmDeleteTodo(entry.doc)}
                        className="delete-button"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                );
              }
              return null; 
            })}
        </div> */}

        <div className="mainWall">
          <div className="thoughts">
            {thoughts.map((thought) => (
              <div className="thought" key={thought._id}>
                <h2>{thought.title}</h2>
                <p>{thought.description}</p>
                <button
                  onClick={() => confirmDelete(thought)}
                  className="delete-button"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(thought._id)}
                ></button>
              </div>
            ))}
          </div>

          <div className="todos">
            {todos.map((todo) => (
              <div className="todo" key={todo._id}>
                <h2>{todo.title}</h2>
                <div className="checkbox-list">
                  {todo.items.map((option, index) => (
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
                  ))}
                </div>
                <button
                  onClick={() => confirmDeleteTodo(todo)}
                  className="delete-button"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
