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

export default function Add() {
  const { isOpen, isBottomOpen, setIsBottomOpen, thoughtSent, setThoughtSent } = useStore();
  const [bottomClass, setBottomClass] = useState("");
  const [newThoughtOpen, setNewThoughtOpen] = useState(false);

  // bottom menu open close

  useEffect(() => {
    if (isOpen) {
      setBottomClass("bottom-menu-close");
    } else if (isBottomOpen) {
      setBottomClass("bottom-menu-options");
    } else {
      setBottomClass("bottom-menu-close");
    }
  }, [isBottomOpen, isOpen]);

  // new thought showing

  const handleNewThought = () => {
    setNewThoughtOpen(!newThoughtOpen);
  };

  useEffect(() => {
    if (newThoughtOpen) {
      setIsBottomOpen(false);
    }
  });

  // form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    try {
      const response = await fetch("http://localhost:4000/api/thoughts", {
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
    $.confirm({
      title: '<h3 class="jconfirm-title">Your thought has been saved!</h3>',
      content: false, // Rimuove il contenitore del contenuto
      type: "green",
      typeAnimated: true,
      buttons: {
        Ok: {
          text: "Ok",
          btnClass: "btn-green",
          action: function () {
            setNewThoughtOpen(false);
          },
        },
      },
    });
  };

  useEffect(() => {
    if (thoughtSent) {
      showConfirmation();
      setThoughtSent(false);
    }
  }, [thoughtSent]);

  // render

  return (
    <>
      <button
        onClick={() => setIsBottomOpen(!isBottomOpen)}
        className={isOpen ? "bottom-menu-close" : "bottom-menu"}
      >
        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
      </button>

      <div className={bottomClass}>
        <div onClick={handleNewThought} className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faBrain} />
        </div>
        <div className="separatore"></div>
        <div className="icon-div">
          <FontAwesomeIcon className="options-icon" icon={faSquareCheck} />
        </div>
      </div>

      <div className={newThoughtOpen ? "add-thought" : "add-thought-close"}>
        <form className="add-thought-form" onSubmit={handleSubmit}>
          <textarea
            name="title"
            className="add-thought-title"
            placeholder="Title"
          ></textarea>
          <textarea
            name="description"
            className="add-thought-input"
            placeholder="Write your thoughts here..."
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
    </>
  );
}
