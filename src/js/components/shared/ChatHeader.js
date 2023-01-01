import React from "react";
import { useSelector } from "react-redux";

import "../../../resources/styles/ChatsStyle.scss";

function ChatHeader({ image, name, theme }) {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div className={`chat-header-container ${theme ? "dark" : "light"}`}>
      <img src={image} alt="profile pic" className="chatHeader-img"></img>
      <div>
        <span className="chatHeader-span">{name}</span>
      </div>
    </div>
  );
}

export default ChatHeader;
