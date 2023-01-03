import React from "react";
import "../../../resources/styles/AboutStyle.scss";
import BackButton from "./shared/Buttons/BackButton";

function About({ theme }) {
  const imgName = `talktive_logo_${theme ? "dark" : "light"}.png`;
  const logoImg = require(`../../../resources/images/${imgName}`);

  return (
    <div className="centered-view">
      <div className="centered-container">
        <BackButton theme={theme} />
        <div className={`centered-container-form ${theme ? "dark" : "light"}`}>
          <div className="image-div">
            <img src={logoImg} alt="app-logo" className="logo-img"></img>
          </div>
          <div className="about-details-container">
            <h3>TALKATIVE</h3>
            <h5>Version 1.0.0</h5>
          </div>
          <div className="developer-info">
            <span>Developer: &#169; 2022 Chinmay Gokhale</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
