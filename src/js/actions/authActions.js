import * as api from "../api/auth";
import * as conApi from "../api/connectionApi";

export const registerUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_REGISTER_INIT" });
  return api
    .register(formData)
    .then((user) => {
      dispatch({
        type: "AUTH_REGISTER_SUCCESS",
        user,
      });
    })
    .catch((error) => {
      dispatch({
        type: "AUTH_REGISTER_ERROR",
        error,
      });
    });
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_LOGIN_INIT" });
  return api
    .login(formData)
    .then((user) => {
      dispatch({
        type: "AUTH_LOGIN_SUCCESS",
        user,
      });
    })
    .catch((error) => {
      dispatch({
        type: "AUTH_LOGIN_ERROR",
        error,
      });
    });
};

export const logoutUser = (userId) => async (dispatch) => {
  await conApi.setUserOnlineStatus(userId, false);
  return api.logout().then((_) => {
    dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
    dispatch({ type: "CHATS_FETCH_RESTART" });
  });
};

export const listenAuthChanges = () => (dispatch) => {
  dispatch({ type: "AUTH_ON_INIT" });
  return api.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      const userProfile = await api.getUserProfile(authUser.uid);
      dispatch({ type: "AUTH_ON_SUCCESS", user: userProfile });
      console.log("Authentecated");
    } else {
      dispatch({ type: "AUTH_ON_ERROR" });
      console.log("not authenticated");
    }
  });
};
