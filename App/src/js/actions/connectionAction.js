import * as api from "../api/connectionApi";

export const checkUserConnection = (userId) => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    api.setUserOnlineStatus(userId, isConnected);
    dispatch({ type: "CONNECTED_USER_STATUS_CHANGED" });
  });
