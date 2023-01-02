import React from "react";
import { useHistory } from "react-router-dom";

import { IconContext } from "react-icons";
import { FiArrowLeftCircle } from "react-icons/fi";

import "../../../../../resources/styles/componentStyles/button.scss";

function BackButton({ theme }) {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} className="back-button">
      <IconContext.Provider
        value={{
          className: `back-button-${theme ? "dark" : "light"}`,
          size: "26",
        }}
      >
        <FiArrowLeftCircle />
      </IconContext.Provider>
    </button>
  );
}

export default BackButton;
