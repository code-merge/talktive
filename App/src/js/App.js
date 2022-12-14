import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Welcome from "./frontend/views/Welcome";
import Home from "./frontend/views/Home";
import LoadingView from "./frontend/components/shared/Loader/LoadingView";
import Settings from "./frontend/views/Settings";
import Chat from "./frontend/views/Chat";
import ChatCreate from "./frontend/views/ChatCreate";

import { listenAuthChanges } from "./frontend/redux/actions/authActions";
import StoreProvider from "./frontend/redux/store/StoreProvider";
import { listenToConnectionChanges } from "./frontend/redux/actions/appActions";
import { checkUserConnection } from "./frontend/redux/actions/connectionAction";
import { loadInitialSettings } from "./frontend/redux/actions/settingsActions";

import "../resources/styles/mainStyle.scss";
import About from "./frontend/components/About";

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

const ContentWrapper = ({ children }) => {
  const { isDarkTheme } = useSelector(({ settings }) => settings);
  return (
    <div className={`content-wrapper-${isDarkTheme ? "dark" : "light"}`}>
      {children}
    </div>
  );
};

function TalktiveApp() {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubscribeFromAuth = dispatch(listenAuthChanges());
    const unsubscribeFromConnection = dispatch(listenToConnectionChanges());

    //Cleanup function to unsubscribe the above registered events
    //This function will be executed when the component is UNMOUNTED

    return function () {
      unsubscribeFromAuth();
      unsubscribeFromConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubscribeFromUserConnection;
    if (user?.uid) {
      unsubscribeFromUserConnection = dispatch(checkUserConnection(user.uid));
    }
    return () => {
      unsubscribeFromUserConnection && unsubscribeFromUserConnection();
    };
  }, [dispatch, user]);

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
          <AuthRoute path="/chatCreate">
            <ChatCreate />
          </AuthRoute>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/about">
            <About />
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
