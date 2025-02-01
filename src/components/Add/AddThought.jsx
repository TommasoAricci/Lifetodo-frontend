import React from "react";
import { useStore } from "../../store";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../style/Add.scss";
import $ from "jquery";
import axios from "axios";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import { useLocation } from "react-router-dom";
import Button from "../Button";
import AddButton from "../Add/AddButton";

export default function AddThought({ editThought }) {
  const {
    newThoughtOpen,
    setNewThoughtOpen,
    thoughtTitle,
    setThoughtTitle,
    thoughtDescription,
    setThoughtDescription,
    thoughtId,
    thoughtEdit,
    setThoughtEdit,
    userData,
    setThoughtSent,
    thoughtSent,
    setIsBottomOpen,
  } = useStore();

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

  const handleFormSubmit = async (e) => {
    const title = thoughtTitle;
    const description = thoughtDescription;
    const userId = userData._id;

    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.REACT_APP_BASE_URL}/api/thought`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, userId }),
      });

      setThoughtSent(true);
    } catch (error) {
      console.error("Error creating thought:", error);
    }
  };

  const showConfirmation = useCallback(() => {
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
  }, [setNewThoughtOpen]); // Nessuna dipendenza, poiché non usa variabili esterne.

  useEffect(() => {
    if (thoughtSent) {
      showConfirmation();
      setThoughtSent(false);
    }
  }, [thoughtSent, setThoughtSent, showConfirmation]);

  return (
    <>
      <AddButton handleNewThought={handleNewThought} />
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
            <Button icon={faFloppyDisk} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewThought} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
