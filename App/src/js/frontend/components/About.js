import React from "react";
import { useSelector } from "react-redux";

import BackButton from "./shared/Buttons/BackButton";

import "../../../resources/styles/AuthStyle.scss";
import "../../../resources/styles/AboutStyle.scss";

function About() {
  const { isDarkTheme } = useSelector(({ settings }) => settings);
  const imgName = `talktive_logo_${isDarkTheme ? "dark" : "light"}.png`;
  const logoImg = require(`../../../resources/images/${imgName}`);

  return (
    <div className="centered-view">
      <div className="centered-container">
        <BackButton theme={isDarkTheme} />
        <div
          className={`centered-container-form ${
            isDarkTheme ? "dark" : "light"
          }`}
        >
          <div className="image-div">
            <img src={logoImg} alt="app-logo" className="logo-img"></img>
          </div>
          <div
            className={`about-details-container ${
              isDarkTheme ? "dark" : "light"
            }`}
          >
            <h3>TALKATIVE</h3>
            <h5>Version 1.0.0</h5>
          </div>
          <div className={`developer-info ${isDarkTheme ? "dark" : "light"}`}>
            <span>Developer: &#169; 2022 Chinmay Gokhale</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
