import StorageUtil from "../utils/StorageUtil";

const INITIAL_STATE = {
  isDarkTheme: false,
  showNotifications: true,
  playSound: true,
  savable: true,
};

export default function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SETTINGS_UPDATE":
      return { ...state, [action.setting]: action.value };
    case "SETTINGS_INITIAL_LOAD":
      const storedSettings = StorageUtil.getItem("app-settings");
      return { ...state, ...storedSettings };
    default:
      return state;
  }
}
