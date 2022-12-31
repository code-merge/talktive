import React, { useState } from "react";
import { createTimestamp } from "../utils/timestamp";
import "../../resources/styles/componentStyles/sendChatInputStyle.scss";

function SendMessage({ onSubmit, theme }) {
  const [ipvalue, setIpvalue] = useState("");

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
      setIpvalue("");
    }
  };

  const sendMessage = () => {
    if (ipvalue.trim() === "") {
      return;
    }

    const message = {
      content: ipvalue.trim(),
      timestamp: createTimestamp(),
    };

    onSubmit(message);
  };

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        onChange={(event) => setIpvalue(event.target.value)}
        onKeyPress={onKeyPress}
        className={`form-control ${theme ? "dark" : "light"}`}
        value={ipvalue}
        rows="2"
        placeholder="Type your Message Here"
      ></textarea>
    </div>
  );
}

export default SendMessage;
