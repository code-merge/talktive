import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import BackButton from "./shared/BackButton";

function NavBar({ backEnabled, view }) {
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);

  return (
    <>
      <div className="chat-navbar">
        <nav className="chat-navbar-inner">
          <div className="chat-navbar-inner-left">
            {backEnabled && <BackButton />}

            {view !== "Settings" && (
              <Link to="/settings" className="btn btn-outline-success ml-2">
                Settings
              </Link>
            )}
          </div>

          <div className="chat-navbar-inner-right">
            {user && (
              <>
                <img className="avatar mr-2" src={user.avatar}></img>
                <span className="logged-in-user">Hi {user.username}</span>
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="btn btn-outline-danger ml-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
