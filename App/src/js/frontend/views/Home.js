import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import ViewTitle from "../components/shared/ViewTitle";

import { withBaseLayout } from "../layouts/baseLayout";
import NewChatButton from "../components/shared/Buttons/NewChatButton";

import { fetchChats } from "../redux/actions/chatActions";
import Notification from "../../utils/notification";

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
