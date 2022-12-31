import React from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";

import "../../../../resources/styles/componentStyles/button.scss";

function NewChatButton({ theme }) {
  return (
    <div>
      <Link to={"/chatCreate"}>
        <IconContext.Provider
          value={{
            className: `newchat-button-${theme ? "dark" : "light"}`,
            size: "25",
          }}
        >
          <div>
            <FiPlus />
          </div>
        </IconContext.Provider>
      </Link>
    </div>
  );
}

export default NewChatButton;
