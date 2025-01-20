import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Add from "../components/Add";
import "../style/pages/Thoughts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
const { useStore } = require("../store");

export default function Thoughts() {
  const {
    thoughtSent,
    setThoughtEdit,
    setNewThoughtOpen,
    thoughtTitle,
    setThoughtTitle,
    thoughtDescription,
    setThoughtDescription,
    setThoughtId,
    thoughtView,
    setThoughtView,

  } = useStore();
  const [thoughts, setThoughts] = useState([]);

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

  const editThought = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/thoughts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: thoughtTitle,
          description: thoughtDescription,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setThoughtEdit(false);
        setNewThoughtOpen(false);

        const updatedThoughts = thoughts.map((thought) =>
          thought._id === id ? data : thought
        );
        setThoughts(updatedThoughts);
      } else {
        console.error("Errore nell'aggiornamento del pensiero", data);
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const handleEdit = (title, description, id) => {
    setNewThoughtOpen(true);
    setThoughtTitle(title);
    setThoughtDescription(description);
    setThoughtId(id);
    setThoughtEdit(true);
  };

  // view

  const view = (title, description) => {
    setThoughtView(true);
    setThoughtTitle(title);

    setThoughtDescription(description);
  };

  return (
    <>
      <Navbar />
      <Add editThought={editThought} />
      <>
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>Notes</h1>
          </div>
        </div>

        <div className="mainWall">
          <div className="thoughts">
            {thoughts.map((thought) => (
              <div
                onClick={() => view(thought.title, thought.description)}
                className="thought"
                key={thought._id}>
                <h2>{thought.title}</h2>
                <p>{thought.description}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(thought);
                  }}
                  className="delete-button"
                >
                  <FontAwesomeIcon className="add-thought-icon" icon={faTrashCan} />
                </button>

                <button
                  className="edit-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(thought.title, thought.description, thought._id);
                  }}
                >
                  <FontAwesomeIcon className="add-thought-icon" icon={faPen} />
                </button>
              </div>
            ))}
          </div>

          <div className={thoughtView ? "thought-view" : "hidden"}>
            <div className="thought-view-content">
              <h2>{thoughtTitle}</h2>
              <p>
                <strong></strong> {thoughtDescription}
              </p>
              <button
                onClick={() => setThoughtView(false)}
                className="close-view"
                aria-label="Close View"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
