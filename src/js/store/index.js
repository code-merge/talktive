import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import chatReducer from "../reducers/chatReducer";

function configStore() {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    combineReducers({
      chats: chatReducer,
    }),
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configStore;
