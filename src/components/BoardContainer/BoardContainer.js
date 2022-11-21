import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Editable from "../Editable/Editable";
import "./BoardContainer.css";

export default function Boards() {
  const [boards, setBoards] = useState([
    JSON.parse(localStorage.getItem("kanban")) || [],
  ]);

  const [target, setTarget] = useState({ cId: "", bId: "" });

  // Board Add Function
  const addBoard = (title, background) => {
    setBoards([
      ...boards,
      {
        id: Math.random() * 1000,
        title: title,
        cards: [],
      },
    ]);
  };

  // Board Remove Function
  const removeBoard = (bId) => {
    const tempBoards = boards.filter((item) => item.id !== bId);

    setBoards(tempBoards);
  };

  // Card Add Function
  const addCard = (title, bId) => {
    const card = {
      id: Math.random() * 5,
      title: title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bId);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  // Card Remove Function
  const removeCard = (cId, bId) => {
    const boardIndex = boards.findIndex((item) => item.id === bId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cId
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  // Card Drag Handler
  const handleDragEnter = (cId, bId) => {
    setTarget({
      cId,
      bId,
    });
  };

  const handleDragEnd = (cId, bId) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;

    s_bIndex = boards.findIndex((item) => item.id === bId);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cId);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((item) => item.id === target.bId);
    if (t_bIndex < 0) return;

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === target.cId
    );
    if (t_cIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards);
  };

  // Card Update function
  const updateCard = (cId, bId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === bId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cId
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoards);
  };

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="boards">
      {boards.map((item) => (
        <Board
          key={item.id}
          board={item}
          removeBoard={removeBoard}
          addCard={addCard}
          removeCard={removeCard}
          dragEntered={handleDragEnter}
          dragEnded={handleDragEnd}
          updateCard={updateCard}
        />
      ))}

      <div className="boards_newboard">
        <Editable
          defaultValue="New Board"
          text="Add New Board"
          placeholder="Enter Board Title"
          onSubmit={(value) => addBoard(value)}
        />
      </div>
    </div>
  );
}
