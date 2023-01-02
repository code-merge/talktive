import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import appReducer from "../reducers/appReducer";
import authReducer from "../reducers/authReducer";

import chatReducer from "../reducers/chatReducer";
import settingsReducer from "../reducers/settingsReducer";

import appMiddleware from "./middleware/appMiddleware";

function configStore() {
  const middlewares = [thunkMiddleware, appMiddleware];
  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "AUTH_LOGOUT_SUCCESS") {
      Object.keys(state).forEach((stateKey) => {
        if (state[stateKey].savable) {
          return;
        }
        state[stateKey] = undefined;
      });
    }
    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
}

export default configStore;
