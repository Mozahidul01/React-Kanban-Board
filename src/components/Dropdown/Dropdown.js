import React from "react";
import "./Dropdown.css";

export default function Dropdown({ classes, children }) {
  return <div className={`dropdown ${classes ? classes : ""}`}>{children}</div>;
}
