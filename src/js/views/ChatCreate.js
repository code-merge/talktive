import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChat } from "../actions/chatActions";

import { withBaseLayout } from "../layouts/baseLayout";

function ChatCreate() {
  const { register, handleSubmit } = useForm();

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
          className="centered-container-form"
        >
          <div className="header">Create Chat</div>
          <div className="subheader">
            Create a chat and hang out with other people!
          </div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Chat Description</label>
              <textarea
                {...register("description")}
                name="description"
                className="form-control"
                id="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                {...register("image")}
                type="text"
                className="form-control"
                id="image"
                name="image"
              />
            </div>

            <button type="submit" className="btn btn-outline-primary mt-2">
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withBaseLayout(ChatCreate, { backEnabled: true });
