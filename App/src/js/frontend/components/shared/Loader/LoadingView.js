import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

import "../../../../../resources/styles/LoadingStyle.scss";

function LoadingView({ message = "Loading ...." }) {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);

  return (
    <div className={isDarkTheme ? "dark" : "light"}>
      <div className={"loading-screen"}>
        <div className="loading-view">
          <div className="loading-view-container">
            <div className="mb-3"> {message}</div>
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingView;
