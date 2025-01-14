import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
const { useStore } = require("../store");

export default function AboutMe() {
  const { checkboxSent } = useStore();
  const [todos, setTodos] = useState([]);

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
      <Navbar />
      <Add />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>Todos</h1>
          </div>
        </div>

        <div className="mainWall">
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
