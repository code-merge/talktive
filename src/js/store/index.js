import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "../reducers/appReducer";
import authReducer from "../reducers/authReducer";

import chatReducer from "../reducers/chatReducer";

import appMiddleware from "./middleware/appMiddleware";

function configStore() {
  const middlewares = [thunkMiddleware, appMiddleware];

  const store = createStore(
    combineReducers({
      chats: chatReducer,
      auth: authReducer,
      app: appReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configStore;
