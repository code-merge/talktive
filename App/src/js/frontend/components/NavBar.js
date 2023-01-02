import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Logo from "./Logo";
import BackButton from "./shared/Buttons/BackButton";
import LogoutButton from "./shared/Buttons/LogoutButton";
import SettingsButton from "./shared/Buttons/SettingsButton";

import "../../../resources/styles/NavBarStyle.scss";
import SearchChat from "./ChatSearch";

function NavBar({ backEnabled, view }) {
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  return (
    <>
      <div className={`chat-navbar ${isDarkTheme ? "dark" : "light"}`}>
        <div className="left-side">
          {!backEnabled && <Logo theme={isDarkTheme} />}
          {backEnabled && <BackButton theme={isDarkTheme} />}
          <SearchChat theme={isDarkTheme} />
        </div>

        <div className="right-side">
          {user && (
            <>
              {view !== "Settings" && <SettingsButton theme={isDarkTheme} />}
              <LogoutButton
                theme={isDarkTheme}
                dispatch={dispatch}
                user={user}
              />
              <img className="avatar mr-2" src={user.avatar}></img>
              <span className="logged-in-user">Hi {user.username}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
