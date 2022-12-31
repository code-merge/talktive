import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../utils/timestamp";
import '../../resources/styles/ChatsStyle.scss'

function ChatMessages({ messages = [], innerRef }) {
  const user = useSelector(({ auth }) => auth.user);

  const { isDarkTheme } = useSelector(({ settings }) => settings);
  const theme = isDarkTheme ? 'dark' : 'light';

  const isAuthor = useCallback((message) => {
    return message?.author.uid === user.uid ? `chat-right ${theme}` : "chat-left";
  });

  return (
    <div className="chat-container">
      <ul ref={innerRef} className="chat-box chatContainerScroll">

        {messages.map((message) => (

          <li className={isAuthor(message)} key={message.id}>
            <div className="chat-avatar">
              <img src={message?.author.avatar} alt="Retail Admin" />
              <div className="chat-name">{message?.author.username}</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">{formatTime(message.timestamp)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMessages;
