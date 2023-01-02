import React from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";

import "../../../../../resources/styles/componentStyles/button.scss";

function NewChatButton({ theme }) {
  return (
    <div>
      <Link to={"/chatCreate"} className="create-new-chat">
        <IconContext.Provider
          value={{
            className: `newchat-button-${theme ? "dark" : "light"}`,
            size: "25",
          }}
        >
          <div className={`create-new-chat ${theme ? "dark" : "light"}`}>
            <FiPlus />
            <span>Or Create One</span>
          </div>
        </IconContext.Provider>
      </Link>
    </div>
  );
}

export default NewChatButton;
