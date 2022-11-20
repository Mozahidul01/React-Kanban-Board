import React, { useState } from "react";
import { Calendar, CheckCircle, List, Tag, Trash2, Type } from "react-feather";
import Editable from "../../Editable/Editable";
import Labels from "../../Labels/Labels";
import Modal from "../../Modal/Modal";
import "./Cardinfo.css";

export default function Cardinfo({ onClose }) {
  const [activeColor, setActiveColor] = useState("");

  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  return (
    <Modal onClose={() => onClose()}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Type /> Title
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Task Title"
              placeholder="Enter Title"
              buttonText="Set Title"
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <List /> Description
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add a Description"
              placeholder="Enter Description"
              buttonText="Set Description"
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Calendar /> Date
          </div>
          <div className="cardinfo_box_body">
            <input type="date" />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <Tag /> Labels
          </div>
          <Labels />
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
            />
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_text">
            <CheckCircle /> Task
          </div>
          <div className="cardinfo_box_progress-bar">
            <div className="cardinfo_box_progress" style={{ width: "50%" }} />
          </div>
          <div className="cardinfo_box_tasks">
            <div className="cardinfo_task">
              <input type="checkbox" />
              <p>Task 01</p>
              <Trash2 />
            </div>
            <div className="cardinfo_task">
              <input type="checkbox" />
              <p>Task 02</p>
              <Trash2 />
            </div>
          </div>
          <div className="cardinfo_box_body">
            <Editable
              text="Add Task"
              placeholder="Enter Task"
              buttonText="Set Task"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
