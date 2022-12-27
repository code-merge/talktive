import Notification from "../../utils/notification";
import StorageUtil from "../../utils/StorageUtil";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE": {
      const { showNotifications } = store.getState().settings;
      if (showNotifications) {
        Notification.showNotification({
          title: "Connection Status",
          body: action.isOnline ? "Online" : "Offline",
        });
      }
    }

    case "SETTINGS_UPDATE": {
      const { setting, value } = action;
      const currentSettings = StorageUtil.getItem("app-settings");
      const settings = { ...currentSettings, [setting]: value };
      StorageUtil.setItem("app-settings", settings);
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
