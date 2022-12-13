import * as api from "../api/auth";

export const registerUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_REGISTER_INIT" });
  return api
    .register(formData)
    .then((_) => {
      dispatch({
        type: "AUTH_REGISTER_SUCCESS",
        user: {
          avatar:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        },
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
    .then((_) => {
      dispatch({
        type: "AUTH_LOGIN_SUCCESS",
        user: {
          avatar:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: "AUTH_LOGIN_ERROR",
        error,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  return api.logout().then((_) => dispatch({ type: "AUTH_LOGOUT_SUCCESS" }));
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
