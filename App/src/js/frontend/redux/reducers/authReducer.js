import { combineReducers } from "redux";

import { createErrorReducer, createIsFetchingReducer } from "./comman";

function createLoginReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer("AUTH_LOGIN"),
    error: createErrorReducer("AUTH_LOGIN"),
  });
}

function createRegisterReducer() {
  return combineReducers({
    isChecking: createIsFetchingReducer("AUTH_REGISTER"),
    error: createErrorReducer("AUTH_REGISTER"),
  });
}

function createAuthReducer() {
  const userReducer = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_INIT":
      case "AUTH_ON_ERROR":
        return null;
      case "AUTH_ON_SUCCESS":
      case "AUTH_REGISTER_SUCCESS":
      case "AUTH_LOGIN_SUCCESS":
        return action.user;
      default:
        return state;
    }
  };

  return combineReducers({
    user: userReducer,
    isChecking: createIsFetchingReducer("AUTH_ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
}

export default createAuthReducer();
