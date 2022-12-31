import React, { useEffect } from "react";

import { fetchChats } from "../actions/chatActions";

import { useDispatch, useSelector } from "react-redux";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import ViewTitle from "../components/shared/ViewTitle";
import Notification from "../utils/notification";

import { withBaseLayout } from "../layouts/baseLayout";

import NewChatButton from "../components/shared/Buttons/NewChatButton";

function Home() {
  const dispatch = useDispatch();
  const joinedChats = useSelector(({ chats }) => chats.joined);
  const availableChats = useSelector(({ chats }) => chats.available);
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="content-window-horizontal">
      <JoinedChats chats={joinedChats} />
      <div className="content-window-vertical">
        <ViewTitle text="Choose your Channel">
          <NewChatButton theme={isDarkTheme} />
        </ViewTitle>
        <AvailableChats chats={availableChats} />
      </div>
    </div>
  );
}

export default withBaseLayout(Home);
