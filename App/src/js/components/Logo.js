import React from "react";

function Logo({ theme }) {
    return (
      <div className="logo-container">
        <h2 className={`logo ${theme ? "dark" : "light"}`}>TALKATIVE</h2>
      </div>
    );
  }

export default Logo;