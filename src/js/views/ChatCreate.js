import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChat } from "../actions/chatActions";

import { withBaseLayout } from "../layouts/baseLayout";

import "../../resources/styles/AuthStyle.scss";
import "../../resources/styles/componentStyles/sendChatInputStyle.scss";

function ChatCreate() {
  const { register, handleSubmit } = useForm();

  const { isDarkTheme } = useSelector(({ settings }) => settings);
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(createChat(data, user.uid)).then((_) => history.push("/home"));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`centered-container-form ${
            isDarkTheme ? "dark" : "light"
          }`}
        >
          <div className="header">Create Chat</div>
          <div className="subheader">
            Create a chat and hang out with other people!
          </div>
          <div className="form-container">
            <div className="form-group">
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Chat name"
              />
            </div>
            <div className="form-group">
              <textarea
                {...register("description")}
                name="description"
                className={`form-control ${isDarkTheme ? "dark" : "light"}`}
                id="description"
                placeholder="Chat description"
              ></textarea>
            </div>
            <div className="form-group">
              <input
                {...register("image")}
                type="text"
                className="form-control"
                id="image"
                name="image"
                placeholder="Chat profile picture (URL)"
              />
            </div>

            <button type="submit" className="form-btn">
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withBaseLayout(ChatCreate, { backEnabled: true });
