/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle, List, Tag, Trash2, Type } from "react-feather";
import Editable from "../../Editable/Editable";
import Labels from "../../Labels/Labels";
import Modal from "../../Modal/Modal";
import "./Cardinfo.css";

export default function Cardinfo({ card, onClose, updateCard, boardId }) {
  const { title, labels, desc, tasks, date } = card;

  const [activeColor, setActiveColor] = useState("");
  const [values, setValues] = useState({ ...card });

  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  // Labels Add Function
  const addLabel = (value, color) => {
    const index = values.labels?.findIndex((item) => item.text === value);
    if (index > -1) return;

    const label = {
      text: value,
      color: color,
    };
    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  // Labels Remove Function
  const removeLabel = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  // Tasks Add Function
  const addTask = (value) => {
    const tasks = {
      id: date.now + Math.random() * 5,
      text: value,
      completed: false,
    };
    setValues({ ...values, tasks: [...values.tasks, tasks] });
  };

  // Tasks Remove Function
  const removeTask = (id) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempTask = values.tasks?.splice(index, 1);
    setValues({ ...values, tasks: tempTask });
  };

  // Tasks Update Function
  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;
    setValues({ ...values, tasks: tempTasks });
  };

  // Task Percentage Calculation function
  const calculatePercentage = () => {
    if (values.tasks?.length === 0) return "0";
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100 + "";
  };

  // Card Update
  useEffect(() => {
    updateCard(card.id, boardId, values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Modal onClose={() => onClose()}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Type /> Title
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.title}
              defaultValue={values.title}
              placeholder="Enter Title"
              buttonText="Set Title"
              onSubmit={(value) => setValues({ ...values, title: value })}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <List /> Description
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text={values.desc}
              defaultValue={values.desc}
              placeholder="Enter Description"
              buttonText="Set Description"
              onSubmit={(value) => setValues({ ...values, desc: value })}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Calendar /> Date
          </div>
          <div className="cardinfo_box_body">
            <input
              type="date"
              defaultValue={values.date}
              onChange={(event) =>
                setValues({ ...values, date: event.target.value })
              }
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Tag /> Labels
          </div>
          <div className="cardinfo_box_labels">
            {values.labels.map((item, index) => (
              <Labels
                close
                key={item.text + index}
                color={item.color}
                text={item.text}
                onClose={() => {
                  console.log("clicked");
                  removeLabel(item.text);
                }}
              />
            ))}
          </div>
          <div className="cardinfo_box_colors">
            {colors.map((item, index) => (
              <li
                key={index}
                className={item === activeColor ? "active" : ""}
                style={{ backgroundColor: item }}
                onClick={() => setActiveColor(item)}
              />
            ))}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add Labels"
              placeholder="Enter Labels"
              buttonText="Set Labels"
              onSubmit={(value) => addLabel(value, activeColor)}
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <CheckCircle /> Task
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: calculatePercentage() + "%",
                backgroundColor:
                  calculatePercentage() === "100" ? "#0c9200" : "",
              }}
            />
          </div>
          <div className="cardinfo_box_tasks">
            {values.tasks.map((item) => (
              <div key={item.id} className="cardinfo_task">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(e) => updateTask(item.id, e.target.checked)}
                />
                <p>{item.text}</p>
                <Trash2 onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add New Task"
              placeholder="Enter Task"
              buttonText="Set Task"
              onSubmit={(value) => addTask(value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
