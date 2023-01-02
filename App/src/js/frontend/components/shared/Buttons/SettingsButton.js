import React from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiSettings } from "react-icons/fi";

import "../../../../../resources/styles/componentStyles/button.scss";

function SettingsButton({ theme }) {
  return (
    <div>
      <Link to="/settings">
        <IconContext.Provider
          value={{
            className: `settings-button-${theme ? "dark" : "light"}`,
            size: "20",
          }}
        >
          <div>
            <FiSettings />
          </div>
        </IconContext.Provider>
      </Link>
    </div>
  );
}

export default SettingsButton;
