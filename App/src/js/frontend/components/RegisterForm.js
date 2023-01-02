import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../redux/actions/authActions";
import LoadingView from "./shared/Loader/LoadingView";

import "../../../resources/styles/AuthStyle.scss";

function RegisterForm({ theme }) {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const error = useSelector(({ auth }) => auth.register.error);
  const isChecking = useSelector(({ auth }) => auth.register.isChecking);

  const onSubmit = (registerData) => {
    dispatch(registerUser(registerData));
  };

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`centered-container-form ${theme ? "dark" : "light"}`}
    >
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          
          <input
            {...register("username")}
            placeholder="Username"
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
         
          <input
            {...register("avatar")}
            placeholder="Avatar (URL)"
            type="text"
            name="avatar"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          
          <input
            {...register("password")}
            placeholder="Password"
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        {error && (
          <div className="alert alert-danger small mt-3">{error.message}</div>
        )}
        <button type="submit" className="form-btn">
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
