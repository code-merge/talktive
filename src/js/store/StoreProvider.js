import { Provider } from "react-redux";
import React from "react";
import configStore from ".";

const store = configStore();

function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
