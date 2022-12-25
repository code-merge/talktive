import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "../reducers/appReducer";
import authReducer from "../reducers/authReducer";

import chatReducer from "../reducers/chatReducer";

import appMiddleware from "./middleware/appMiddleware";

function configStore() {
  const middlewares = [thunkMiddleware, appMiddleware];
  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "AUTH_LOGOUT_SUCCESS") {
      state = undefined;
    }
    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
}

export default configStore;
