import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/authActions";
import LoadingView from "./shared/LoadingView";

import "../../resources/styles/AuthStyle.scss";

function LoginForm({ theme }) {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.login.error);
  const isChecking = useSelector(({ auth }) => auth.login.isChecking);

  const imgName = `talktive_logo_${theme ? "dark" : "light"}.png`;
  const logoImg = require(`../../resources/images/${imgName}`);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`centered-container-form ${theme ? "dark" : "light"}`}
    >
      <div className="image-div">
        <img src={logoImg} alt="app-logo" className="logo-img"></img>
      </div>

      <div className="subheader">
        Sign In to be <span>TALKATIVE</span>
      </div>
      <div className="form-container">
        <div className="form-group">
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
        </div>
        {error && (
          <div className="alert alert-danger small mt-3">{error.message}</div>
        )}
        <button type="submit" className="form-btn">
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
