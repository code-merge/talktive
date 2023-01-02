import React from "react";
import { IconContext } from "react-icons";
import { FiPower } from "react-icons/fi";

import { logoutUser } from "../../../redux/actions/authActions";

import "../../../../../resources/styles/componentStyles/button.scss";

function LogoutButton({ theme, dispatch, user }) {
  return (
    <button
      className="logout-button"
      onClick={() => dispatch(logoutUser(user.uid))}
    >
      <IconContext.Provider
        value={{
          className: `logout-button-${theme ? "dark" : "light"}`,
          size: "20",
        }}
      >
        <FiPower />
      </IconContext.Provider>
    </button>
  );
}

export default LogoutButton;
