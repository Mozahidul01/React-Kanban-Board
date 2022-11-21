import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal, X } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Labels from "../Labels/Labels";
import "./Card.css";
import Cardinfo from "./Cardinfo/Cardinfo";

export default function Card({
  card,
  removeCard,
  dragEnded,
  dragEntered,
  boardId,
  updateCard,
}) {
  const { id, title, labels, date } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Cardinfo
          updateCard={updateCard}
          boardId={boardId}
          card={card}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className="card"
        draggable
        onDragEnd={() => dragEnded(id, boardId)}
        onDragEnter={() => dragEntered(id, boardId)}
        onClick={() => setShowModal(true)}
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
          {card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {card?.tasks?.filter((item) => item.completed).length}/
              {card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
