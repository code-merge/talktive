import React from "react";
import '../../../resources/styles/NavBarStyle.scss'

function ViewTitle({ text, children }) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div>{children}</div>
    </div>
  );
}

export default ViewTitle;
