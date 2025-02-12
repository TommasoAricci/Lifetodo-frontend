import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddButton from "../components/Add/AddButton";
import AddTodo from "../components/Add/AddTodo";
import "../style/pages/Todos.scss";
import { faTrashCan, faPen, faClose } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import Button from "../components/Button";
import Overlay from "../components/Overlay";
import NavbarLaptop from "../components/Navbar-laptop";
import { Helmet } from "react-helmet-async";
const { useStore } = require("../store");

export default function Todos() {
  const {
    checkboxSent,
    setCheckboxEdit,
    checkboxEdit,
    setNewCheckboxOpen,
    checkboxTitle,
    setCheckboxTitle,
    checkboxItems,
    setCheckboxItems,
    setCheckboxId,
    userData,
    viewContent,
    setViewContent,
    newCheckboxOpen,
  } = useStore();
  const [todos, setTodos] = useState([]);
  const location = useLocation();
  const filteredTodos = todos.filter((todo) => todo.user._id === userData?._id);

  // CHECKBOX

  const handleNewCheckbox = () => {
    setNewCheckboxOpen(!newCheckboxOpen);
    setCheckboxTitle("");
    setCheckboxItems([]);
    setCheckboxEdit(false);
  };

  useEffect(() => {
    async function getCheckbox() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/todos`
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCheckbox();
  }, [checkboxSent, checkboxEdit]);

  // delete

  const handleCheckboxDelete = async (todoId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/todos/${todoId}`, {
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
      title: "Are you sure?",
      content: "Press delete to remove this list",
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
        `${process.env.REACT_APP_BASE_URL}/api/todos/${todoId}`,
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
      setNewCheckboxOpen(false);
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

  // view

  const view = (title, items) => {
    setViewContent(true);
    setCheckboxTitle(title);
    setCheckboxItems(items);
  };

  return (
    <>
      <Helmet>
        <title>todos</title>
        <meta name="description" content="todos section of lifetodo app" />
        <meta name="keywords" content="React, SEO, Helmet" />
      </Helmet>
      <Navbar />
      <NavbarLaptop />
      <AddButton handleNewCheckbox={handleNewCheckbox} />
      <AddTodo editTodos={editTodos} handleNewCheckbox={handleNewCheckbox} />
      <Overlay />
      <>
        <div
          className={location.pathname === "/todos" ? "mainAbout" : "hidden"}
        >
          <div id="aboutTitle">
            <h1>Todos</h1>
          </div>
        </div>

        {location.pathname === "/wall" && filteredTodos.length > 0 && (
          <div className="smallTitleWrapper">
            <small id="smallTitleWall">todos</small>
          </div>
        )}

        <div className="todos">
          {filteredTodos.map((todo) => (
            <div
              onClick={() => {
                location.pathname !== "/wall" && view(todo.title, todo.items);
              }}
              className="todo"
              key={todo._id}
            >
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
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label htmlFor={`checkbox-${todo._id}-${index}`}>
                          {option}
                        </label>
                      </div>
                    )
                )}
              </div>
              <Button
                func={(e) => {
                  e.stopPropagation();
                  confirmDeleteTodo(todo);
                }}
                icon={faTrashCan}
                type="button"
                secondClass="delete-button"
              />

              <Button
                func={(e) => {
                  e.stopPropagation();
                  handleEdit(todo.title, todo.items, todo._id);
                }}
                icon={faPen}
                type="button"
                secondClass="edit-button"
              />
            </div>
          ))}
        </div>

        <div className={viewContent ? "view" : "hidden"}>
          <div className="view-content">
            <h2>{checkboxTitle}</h2>
            <div className="items-list">
              {checkboxItems.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <Button
              func={() => setViewContent(false)}
              type="button"
              icon={faClose}
              secondClass="close-view"
            />
          </div>
        </div>
      </>
    </>
  );
}
