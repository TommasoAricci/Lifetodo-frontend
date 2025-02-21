import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddThought from "../components/Add/AddThought";
import AddButton from "../components/Add/AddButton";
import "../style/pages/Thoughts.scss";
import { faClose, faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import Button from "../components/Button";
import Overlay from "../components/Overlay";
import NavbarLaptop from "../components/Navbar-laptop";
import { Helmet } from "react-helmet-async";
const { useStore } = require("../store");

export default function Thoughts() {
  const {
    thoughtSent,
    setThoughtEdit,
    thoughtEdit,
    setNewThoughtOpen,
    thoughtTitle,
    setThoughtTitle,
    thoughtDescription,
    setThoughtDescription,
    setThoughtId,
    viewContent,
    setViewContent,
    userData,
    newThoughtOpen,
  } = useStore();

  const [thoughts, setThoughts] = useState([]);
  const location = useLocation();
  const filteredThoughts = thoughts.filter(
    (thought) => thought.user?._id === userData?._id
  );

  // THOUGHTS

  const handleNewThought = () => {
    setNewThoughtOpen(!newThoughtOpen);
    setThoughtTitle("");
    setThoughtDescription("");
    setThoughtEdit(false);
  };

  useEffect(() => {
    async function getThoughts() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/thoughts`
        );
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getThoughts();
  }, [thoughtSent, thoughtEdit]);

  // api delete

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/thoughts/${id}`, {
        method: "DELETE",
      });

      setThoughts(thoughts.filter((thought) => thought._id !== id));
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  };

  const confirmDelete = (thought) => {
    $.confirm({
      theme: "modern",
      animation: "opacity",
      title: "Are you sure?",
      content: "Press delete to remove this note",
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
          action: function () {},
        },
      },
    });
  };

  // api edit

  const editThought = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/thoughts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: thoughtTitle,
            description: thoughtDescription,
          }),
        }
      );

      const data = await response.json();

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
    setViewContent(true);
    setThoughtTitle(title);
    setThoughtDescription(description);
  };

  return (
    <>
      <Helmet>
        <title>notes</title>
        <meta name="description" content="notes section of lifetodo app" />
        <meta name="keywords" content="React, SEO, Helmet" />
      </Helmet>
      <Navbar />
      <NavbarLaptop />
      <AddButton handleNewThought={handleNewThought} />
      <AddThought
        editThought={editThought}
        handleNewThought={handleNewThought}
      />
      <Overlay />
      <>
        <div
          className={location.pathname === "/thoughts" ? "mainAbout" : "hidden"}
        >
          <div id="aboutTitle">
            <h1>Notes</h1>
          </div>
        </div>

        {location.pathname === "/wall" && filteredThoughts.length > 0 && (
          <div className="smallTitleWrapper">
            <small id="smallTitleWall">notes</small>
          </div>
        )}
        {filteredThoughts?.length > 0 && (
          <div className="mainWall">
            <div className="thoughts">
              {filteredThoughts.map((thought) => (
                <div
                  onClick={() => {
                    location.pathname !== "/wall" &&
                      view(thought.title, thought.description);
                  }}
                  className="thought"
                  key={thought._id}
                >
                  <h2>{thought.title}</h2>
                  <p>{thought.description}</p>

                  <Button
                    func={(e) => {
                      e.stopPropagation();
                      confirmDelete(thought);
                    }}
                    type="button"
                    secondClass="delete-button"
                    className="add-thought-icon"
                    icon={faTrashCan}
                  />

                  <Button
                    func={(e) => {
                      e.stopPropagation();
                      handleEdit(
                        thought.title,
                        thought.description,
                        thought._id
                      );
                    }}
                    type="button"
                    secondClass="edit-button"
                    className="add-thought-icon"
                    icon={faPen}
                  />
                </div>
              ))}
            </div>

            <div className={viewContent ? "view" : "hidden"}>
              <div className="view-content">
                <h2>{thoughtTitle}</h2>
                <p>
                  <strong></strong> {thoughtDescription}
                </p>
                <Button
                  func={() => setViewContent(false)}
                  type="button"
                  icon={faClose}
                  secondClass="close-view"
                />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
