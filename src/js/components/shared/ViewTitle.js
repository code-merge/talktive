import React from "react";
import { Link } from "react-router-dom";

function ViewTitle({ text }) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <Link to={"/"} className="btn btn-outline-primary btn-sm">
        New
      </Link>
    </div>
  );
}

export default ViewTitle;
