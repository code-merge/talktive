import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "../../../resources/styles/listStyles.scss";

function JoinedChats({ chats }) {
  const history = useHistory();
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  return (
    <div className={`list-container ${isDarkTheme ? "dark" : "light"}`}>
      <span className="chat-span">Chats</span>

      <ul className="items">
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => {
              history.push(`/chat/${chat.id}`);
            }}
            className={`item ${isDarkTheme ? "dark" : "light"}`}
          >
            <div className="item-status">
              <img src={chat.image} alt="Retail Admin" />
              <span className="status online"></span>
            </div>
            <p className="name-time">
              <span className="name mr-2">{chat.name}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinedChats;
