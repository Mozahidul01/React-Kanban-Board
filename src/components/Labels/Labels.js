import React from "react";
import { X } from "react-feather";
import "./Labels.css";

export default function Labels({ text, color, close, onClose }) {
  return (
    <div className="labels" style={{ background: color }}>
      {text} {close && <X onClick={() => onclose()} />}
    </div>
  );
}
