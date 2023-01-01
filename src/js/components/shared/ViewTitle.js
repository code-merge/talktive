import React from "react";
import { useSelector } from "react-redux";
import "../../../resources/styles/NavBarStyle.scss";

function ViewTitle({ text, children }) {
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  return (
    <div className={`chat-name-container ${isDarkTheme ? 'dark' : 'light'}`}>
      <span className="name">{text}</span>
      <div>{children}</div>
    </div>
  );
}

export default ViewTitle;
