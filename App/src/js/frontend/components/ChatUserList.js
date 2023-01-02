import React from "react";
import "../../../resources/styles/listStyles.scss";

function ChatUserList({ users = [], theme }) {
  return (
    <div className={`list-container ${theme ? "dark" : "light"}`}>
      <span className="chat-span">Participants</span>
      <ul className="items">
        {users.map((user) => (
          <li key={user.uid} className={`item ${theme ? "dark" : "light"}`}>
            <div className="item-status">
              <img src={user.avatar} alt="Retail Admin" />
              <span className={`status : ${user.state}`}></span>
            </div>
            <p className="name-time">
              <span className="name mr-2">{user.username}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatUserList;
