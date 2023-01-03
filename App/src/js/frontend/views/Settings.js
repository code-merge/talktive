import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSettings } from "../redux/actions/settingsActions";
import { withBaseLayout } from "../layouts/baseLayout";
import AboutButton from "../components/shared/Buttons/AboutButton";
import "../../../resources/styles/AuthStyle.scss";

function Settings() {
  const dispatch = useDispatch();

  const { isDarkTheme, showNotifications } = useSelector(
    ({ settings }) => settings
  );

  const handleChange = ({ target: { checked, name } }) => {
    dispatch(updateSettings(name, checked));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form
          className={`centered-container-form ${
            isDarkTheme ? "dark" : "light"
          }`}
        >
          <div className="header">Adjust application settings</div>
          <div className="form-container">
            <div className="my-3">
              <div className="form-check">
                <input
                  checked={isDarkTheme}
                  onChange={handleChange}
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Dark Theme</label>
              </div>
              <div className="form-check">
                <input
                  checked={showNotifications}
                  onChange={handleChange}
                  name="showNotifications"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Enable Notification</label>
              </div>
            </div>
            <AboutButton theme={isDarkTheme} />
            <button
              type="button"
              onClick={() => electron_preload.appApi.quitApp()}
              className="form-btn red"
            >
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withBaseLayout(Settings, {
  backEnabled: true,
});
