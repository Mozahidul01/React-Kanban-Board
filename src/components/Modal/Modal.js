import React from "react";
import "./Modal.css";

export default function Modal({ onClose, children }) {
  return (
    <div className="modal" onClick={() => (onClose ? onClose() : "")}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
