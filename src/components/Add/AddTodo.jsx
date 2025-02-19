import React from "react";
import { useStore } from "../../store";
import { useEffect, useCallback } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../style/Add.scss";
import $ from "jquery";
import "jquery-confirm/dist/jquery-confirm.min.css";
import "jquery-confirm/dist/jquery-confirm.min.js";
import Button from "../../components/Button";

export default function AddTodo({ editTodos, handleNewCheckbox }) {
  const {
    checkboxTitle,
    setCheckboxTitle,
    checkboxItems,
    setCheckboxItems,
    checkboxEdit,
    checkboxId,
    checkboxSent,
    setCheckboxSent,
    newCheckboxOpen,
    setNewCheckboxOpen,
    setIsBottomOpen,
  } = useStore();

  useEffect(() => {
    if (newCheckboxOpen) {
      setIsBottomOpen(false);
    }
  });

  const handleCheckboxSubmit = async (e) => {
    const title = checkboxTitle;
    const items = checkboxItems;

    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.REACT_APP_BASE_URL}/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, items }),
      });

      setCheckboxSent(true);
    } catch (error) {
      console.error("Error creating checkbox:", error);
    }
  };

  const showConfirmationTodo = useCallback(() => {
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
          isHidden: true,
          action: function () {},
        },
      },
    });
    setNewCheckboxOpen(false);
  }, [setNewCheckboxOpen]);

  useEffect(() => {
    if (checkboxSent) {
      showConfirmationTodo();
      setCheckboxSent(false);
    }
  }, [checkboxSent, setCheckboxSent, showConfirmationTodo]);

  return (
    <>
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
            placeholder="Title"
            value={checkboxTitle}
            onChange={(e) => setCheckboxTitle(e.target.value)}
            required
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
            <Button icon={faFloppyDisk} func={null} type="submit" />
            <Button icon={faXmark} func={handleNewCheckbox} type="button" />
          </div>
        </form>
      </div>
    </>
  );
}
