import React, { useState } from "react";
import { MoreHorizontal, X } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";
import "./Board.css";

export default function Board({
  board,
  removeBoard,
  addCard,
  removeCard,
  dragEntered,
  dragEnded,
  updateCard,
}) {
  const { id, title, background, cards } = board;

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="board">
      <div className="board_top" style={{ background: background }}>
        <p className="board_top_title">
          {title}
          <span>{`${cards?.length}`}</span>
        </p>
        <div className="board_top_more">
          <MoreHorizontal onClick={(e) => setShowDropdown(true)} />
          {showDropdown && (
            <Dropdown classes="board_dropdown">
              <div className="dropdown_close">
                <span onClick={(e) => setShowDropdown(false)}>
                  <X />
                </span>
              </div>
              <p>Rename Board</p>
              <p onClick={(e) => removeBoard(board?.id)}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="board_cards">
        {cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={removeCard}
            boardId={id}
            dragEntered={dragEntered}
            dragEnded={dragEnded}
            updateCard={updateCard}
          />
        ))}
        <Editable
          displayClass="boards_cards_add"
          defaultValue="New Task"
          text="Add Card"
          placeholder="Enter Card title"
          onSubmit={(value) => addCard(value, id)}
        />
      </div>
    </div>
  );
}
