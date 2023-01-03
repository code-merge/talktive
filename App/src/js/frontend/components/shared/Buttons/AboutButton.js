import React from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";

import "../../../../../resources/styles/componentStyles/button.scss";

function AboutButton({ theme }) {
  return (
    <div>
      <Link to={"/about"} className="about-button-container">
        <IconContext.Provider
          value={{
            className: `about-button-${theme ? "dark" : "light"}`,
            size: "25",
          }}
        >
          <div className={`about-button-container ${theme ? "dark" : "light"}`}>
            <FiAlertCircle />
            <span>About</span>
          </div>
        </IconContext.Provider>
      </Link>
    </div>
  );
}

export default AboutButton;
