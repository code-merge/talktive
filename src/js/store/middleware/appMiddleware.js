import Notification from "../../utils/notification";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE": {
      Notification.showNotification({
        title: "Connection Status",
        body: action.isOnline ? "Online" : "Offline",
      });
    }
    case "AUTH_LOGOUT_SUCCESS": {
      const { regMessageSub } = store.getState().chats;
      if (regMessageSub) {
        Object.keys(regMessageSub).forEach((messageSubKey) => {
          regMessageSub[messageSubKey]();
        });
      }
    }
  }

  next(action);
};
