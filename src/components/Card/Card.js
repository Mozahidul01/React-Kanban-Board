import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal, X } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Labels from "../Labels/Labels";
import "./Card.css";

export default function Card({
  card,
  removeCard,
  dragEnded,
  dragEntered,
  boardId,
}) {
  const { id, title, tasks, labels, date } = card;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="card"
      draggable
      onDragEnd={() => dragEnded(id, boardId)}
      onDragEnter={() => dragEntered(id, boardId)}
    >
      <div className="card_top">
        <div className="card_labels">
          {labels?.map((item, index) => (
            <Labels key={index} text={item.text} color={item.color} />
          ))}
        </div>

        <div className="card_more">
          {showDropdown ? (
            <X onClick={(e) => setShowDropdown(false)} />
          ) : (
            <MoreHorizontal onClick={(e) => setShowDropdown(true)} />
          )}
          {showDropdown && (
            <Dropdown classes="card_dropdown">
              <p onClick={(e) => removeCard(id, boardId)}>Delete Card</p>
            </Dropdown>
          )}
        </div>
      </div>

      <div className="card_title">
        <h3>{title}</h3>
      </div>

      <div className="card_footer">
        {date && (
          <p>
            <Clock /> {date}
          </p>
        )}
        <p>
          <CheckSquare />
          1/4
        </p>
      </div>
    </div>
  );
}
