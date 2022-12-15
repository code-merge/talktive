import React, { useEffect } from "react";
import Home from "./views/Home";

import { Provider, useDispatch, useSelector } from "react-redux";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Settings from "./views/Settings";

import Chat from "./views/Chat";
import Welcome from "./views/Welcome";

import { listenAuthChanges } from "./actions/authActions";
import StoreProvider from "./store/StoreProvider";
import LoadingView from "./components/shared/LoadingView";
import { listenToConnectionChanges } from "./actions/appActions";

function AuthRoute({ children, ...rest }) {
  const user = useSelector(({ auth }) => auth.user);

  const child = React.Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.cloneElement(child, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

const ContentWrapper = ({ children }) => (
  <div className="content-wrapper">{children} </div>
);

function TalktiveApp() {
  const dispatch = useDispatch();

  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);

  useEffect(() => {
    const unsubscribeFromAuth = dispatch(listenAuthChanges());

    const unsubscribeFromConnection = dispatch(listenToConnectionChanges());

    //Cleanup function to unsubscribe the above registered events
    //This function will be executed when the component is UNMOUNTED

    return function () {
      unsubscribeFromAuth();
      unsubscribeFromConnection();
    };
  }, [dispatch]);

  if (!isOnline) {
    return (
      <LoadingView message="It seems that there is no internet connection. Please try to reconnect ..." />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/home">
            <Home />
          </AuthRoute>
        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <TalktiveApp />
    </StoreProvider>
  );
}
