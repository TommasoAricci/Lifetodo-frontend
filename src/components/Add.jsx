import React from "react";
import { useStore } from "../store";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../style/Add.scss";
import $ from "jquery";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import { useLocation } from "react-router-dom";

export default function Add({ editThought, editTodos }) {
  // variables

  const {
    isOpen,
    isBottomOpen,
    setIsBottomOpen,
    thoughtSent,
    setThoughtSent,
    checkboxSent,
    setCheckboxSent,
    newThoughtOpen,
    setNewThoughtOpen,
    newCheckboxOpen,
    setNewCheckboxOpen,
    thoughtTitle,
    setThoughtTitle,
    thoughtDescription,
    setThoughtDescription,
    thoughtId,
    thoughtEdit,
    setThoughtEdit,
    checkboxTitle,
    setCheckboxTitle,
    checkboxItems,
    setCheckboxItems,
    checkboxEdit,
    setCheckboxEdit,
    checkboxId
  } = useStore();

  const [bottomClass, setBottomClass] = useState("");
  const [plusButtonLocation, setPlusButtonLocation] = useState();
  const location = useLocation();

  // black box

  useEffect(() => {
    const blackBox = document.createElement("div");
    blackBox.id = "blackBox";
    document.body.appendChild(blackBox);
    if (newThoughtOpen || newCheckboxOpen) {
      blackBox.style.display = "block";
    } else {
      blackBox.style.display = "none";
    }

    return () => {
      document.body.removeChild(blackBox);
    };
  }, [newThoughtOpen, newCheckboxOpen]);

  // PLUS BUTTON

  useEffect(() => {
    if (isOpen || newThoughtOpen || newCheckboxOpen) {
      setBottomClass("hidden");
    } else if (isBottomOpen) {
      setBottomClass("bottom-menu-options");
    } else {
      setBottomClass("hidden");
    }
  }, [isBottomOpen, isOpen, newThoughtOpen, newCheckboxOpen]);

  // THOUGHT

  const handleNewThought = () => {
    setNewThoughtOpen(!newThoughtOpen);
    setThoughtTitle("");
    setThoughtDescription("");
    setThoughtEdit(false);
  };

  useEffect(() => {
    if (newThoughtOpen) {
      setIsBottomOpen(false);
    }
  });

  // form submit

  const handleFormSubmit = async (e) => {
    const title = thoughtTitle;
    const description = thoughtDescription;

    try {
      const response = await fetch("http://localhost:4000/api/thought", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();
      console.log(result);
      setThoughtSent(true);
    } catch (error) {
      console.error("Error creating thought:", error);
    }
  };

  // confirmation

  const showConfirmation = () => {
    $.alert({
      theme: "modern",
      animation: "opacity",
      closeAnimation: "opacity",
      autoClose: "close|50",
      title: "Contenuto Creato",
      content: "Your thought has been created",
      buttons: {
        close: {
          text: "Chiudi",
          isHidden: true, // Nasconde il pulsante
          action: function () {},
        },
      },
    });
    setNewThoughtOpen(false);
  };

  useEffect(() => {
    if (thoughtSent) {
      showConfirmation();
      setThoughtSent(false);
    }
  }, [thoughtSent, setThoughtSent]);

  // CHECKBOX

  const handleNewCheckbox = () => {
    setNewCheckboxOpen(!newCheckboxOpen);
    setCheckboxTitle("");
    setCheckboxItems([]);
    setCheckboxEdit(false);
  };

  useEffect(() => {
    if (newCheckboxOpen) {
      setIsBottomOpen(false);
    }
  });

  // form submit

  const handleCheckboxSubmit = async (e) => {
    e.preventDefault();

    const title = checkboxTitle;
    const items = checkboxItems;

    try {
      const response = await fetch("http://localhost:4000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, items }),
      });

      const result = await response.json();
      console.log(result);
      setCheckboxSent(true);
    } catch (error) {
      console.error("Error creating checkbox:", error);
    }
  };

  // confirmation

  const showConfirmationTodo = () => {
    $.alert({
      theme: "modern",
      animation: "opacity",
      closeAnimation: "opacity",
      autoClose: "close|50",
      title: "Contenuto Creato",
      content: "Your thought has been created",
      buttons: {
        close: {
          text: "Chiudi",
          isHidden: true, // Nasconde il pulsante
          action: function () {},
        },
      },
    });
    setNewCheckboxOpen(false);
  };

  // location
  const handleLocationChange = () => {
    if (location.pathname === "/thoughts") {
      setPlusButtonLocation(handleNewThought);
    } else if (location.pathname === "/todos") {
      setPlusButtonLocation(handleNewCheckbox);
    } else {
      setPlusButtonLocation(setIsBottomOpen(!isBottomOpen));
    }
  };

  // RENDER

  return (
    <>
      {/*plus button*/}

      <button
        onClick={handleLocationChange}
        className={isOpen ? "hidden" : "bottom-menu"}
      >
        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
      </button>

      <div className={bottomClass}>
        <div onClick={handleNewThought} className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faBrain} />
        </div>
        <div className="separatore"></div>
        <div onClick={handleNewCheckbox} className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faSquareCheck} />
        </div>
        <div className={isBottomOpen ? "bottom-menu-descriptions" : "hidden"}>
          <p id="add-thought-description ">Add Thought</p>
          <p id="add-thought-description">Add List</p>
        </div>
      </div>

      {/*new thought open*/}

      <div className={newThoughtOpen ? "add-thought" : "hidden"}>
        <form
          className="add-thought-form"
          onSubmit={(e) => {
            e.preventDefault();
            thoughtEdit ? editThought(thoughtId) : handleFormSubmit();
          }}
        >
          <textarea
            name="title"
            className="add-thought-title"
            onChange={(e) => setThoughtTitle(e.target.value)}
            value={thoughtTitle}
            placeholder="Title"
          ></textarea>
          <textarea
            name="description"
            className="add-thought-input"
            onChange={(e) => setThoughtDescription(e.target.value)}
            value={thoughtDescription}
            placeholder="Text"
          />
          <div className="add-thought-buttons-div">
            <button className="add-thought-button" type="submit">
              <FontAwesomeIcon
                className="add-thought-icon"
                icon={faFloppyDisk}
              />
            </button>
            <button
              onClick={handleNewThought}
              type="button"
              className="add-thought-button"
            >
              <FontAwesomeIcon className="add-thought-icon" icon={faXmark} />
            </button>
          </div>
        </form>
      </div>

      {/*checkbox open*/}

      <div className={newCheckboxOpen ? "add-checkbox-list" : "hidden"}>
        <form
          className="add-checkbox-list-form"
          onSubmit={(e) => {
            e.preventDefault();
            checkboxEdit ? editTodos(checkboxId) : handleCheckboxSubmit();
          }}
        >
          <textarea
            name="listTitle"
            className="add-checkbox-list-title"
            placeholder="List Title"
            value={checkboxTitle}
            onChange={(e) => setCheckboxTitle(e.target.value)} // Aggiungi gestione del cambiamento
          ></textarea>

          <div className="checkbox-list">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="checkbox-item">
                <input
                  type="text"
                  id={`checkbox-${index}`}
                  value={checkboxItems[index] || ""}
                  onChange={(e) =>
                    setCheckboxItems((prevItems) => [
                      ...prevItems.slice(0, index),
                      e.target.value,
                      ...prevItems.slice(index + 1),
                    ])
                  }
                  placeholder={`Item ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="add-checkbox-list-buttons-div">
            <button
              onClick={showConfirmationTodo}
              className="add-checkbox-list-button"
              type="submit"
            >
              <FontAwesomeIcon
                className="add-checkbox-icon"
                icon={faFloppyDisk}
              />
            </button>
            <button
              onClick={handleNewCheckbox}
              type="button"
              className="add-checkbox-list-button"
            >
              <FontAwesomeIcon className="add-checkbox-icon" icon={faXmark} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
