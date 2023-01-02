import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Welcome() {
  const [isLogin, setLoginView] = useState(true);
  const user = useSelector(({ auth }) => auth.user);
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  const footerText = isLogin
    ? ["Don't Have an Account yet? ", "Register"]
    : ["Already have an Account? ", " Login"];

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLogin ? (
          <LoginForm theme={isDarkTheme} />
        ) : (
          <RegisterForm theme={isDarkTheme} />
        )}

        <small className="form-text mt-8">
          {footerText[0]}
          <span
            onClick={() => setLoginView(!isLogin)}
            className="btn-link ml-2"
          >
            {footerText[1]}
          </span>
        </small>
      </div>
    </div>
  );
}

export default Welcome;
