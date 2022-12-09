import React from "react";
import Home from "./views/Home";

import { Provider } from "react-redux";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Register from "./views/Register";
import Chat from "./views/Chat";
import configStore from "./store";

const store = configStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/chat/:id">
              <Chat />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
