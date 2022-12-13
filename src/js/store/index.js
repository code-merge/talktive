import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/authReducer";

import chatReducer from "../reducers/chatReducer";

function configStore() {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    combineReducers({
      chats: chatReducer,
      auth: authReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configStore;
