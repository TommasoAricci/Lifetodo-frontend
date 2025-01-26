import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import "../style/pages/Todos.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
const { useStore } = require("../store");

export default function Todos() {
  const {
    checkboxSent,
    setCheckboxEdit,
    setNewCheckboxOpen,
    checkboxTitle,
    setCheckboxTitle,
    checkboxItems,
    setCheckboxItems,
    setCheckboxId,
    userData,
  } = useStore();
  const [todos, setTodos] = useState([]);
  const filteredTodos = todos.filter((todo) => todo.user._id === userData._id);

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

  // edit

  const editTodos = async (todoId) => {
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

  const handleEdit = (title, items, id) => {
    setNewCheckboxOpen(true);
    setCheckboxTitle(title);
    setCheckboxItems(items);
    setCheckboxEdit(true);
    setCheckboxId(id);
  };

  return (
    <>
      <Navbar />
      <Add editTodos={editTodos} />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>Todos</h1>
          </div>
        </div>

        <div className="mainWall">
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
        </div>
      </>
    </>
  );
}
