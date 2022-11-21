import React, { useState } from "react";
import { Plus, X } from "react-feather";
import "./Editable.css";
export default function Editable({
  buttonText,
  placeholder,
  text,
  onSubmit,
  editClass,
  displayClass,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit ${editClass || ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(inputValue);
            setShowEdit(false);
            setInputValue("");
          }}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder={placeholder || "Enter Item"}
          />

          {/* <select className="editable_colors" id="bcolor" name="colors">
            <option value="#F7A4A4">Red</option>
            <option value="#FEBE8C">Orange</option>
            <option value="#FFFBC1">Yellow</option>
            <option value="#B6E2A1">Green</option>
          </select> */}

          <div className="editable_edit_footer">
            <button type="submit" className="editable_submit_btn">
              <Plus /> {buttonText || "Add"}
            </button>
            <X
              className="editable_display_close_btn"
              onClick={() => setShowEdit(false)}
            />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${displayClass || ""}`}
          onClick={() => setShowEdit(true)}
        >
          {text || "Add item"} <span /> <span /> <span /> <span />
        </p>
      )}
    </div>
  );
}
