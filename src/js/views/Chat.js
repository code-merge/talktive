import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  registerMessageSubscription,
  sendChatMessage,
  subscribeToChat,
  subscribeToMessage,
  subscribeToProfile,
} from "../actions/chatActions";

import ChatMessages from "../components/ChatMessages";
import ChatUserList from "../components/ChatUserList";
import ViewTitle from "../components/shared/ViewTitle";
import LoadingView from "../components/shared/LoadingView";
import { withBaseLayout } from "../layouts/baseLayout";
import SendMessage from "../components/SendMessage";
import ChatHeader from "../components/shared/ChatHeader";

function Chat() {
  const { id } = useParams();
  //We will preserve teh values in-between renders of component
  const peopleWatchers = useRef({});
  const endOfMessageList = useRef();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messageSub = useSelector(({ chats }) => chats.regMessageSub[id]);
  const joinedUsers = activeChat?.joinedUsers;
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToChat(id));

    if (!messageSub) {
      const unsubscribeFromMessages = dispatch(subscribeToMessage(id));
      dispatch(registerMessageSubscription(id, unsubscribeFromMessages));
    }

    return () => {
      unsubscribe();
      unsubscribeFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (joinedUsers) => {
      //This is a helper function to check if the joined users exists or undefined
      joinedUsers.forEach((user) => {
        if (!peopleWatchers.current[user.uid]) {
          peopleWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unsubscribeFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id)).then((_) =>
        endOfMessageList.current.scrollIntoView(false)
      );
    },
    [id]
  );

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat....." />;
  }

  return (
    <div className="content-window-horizontal">
      <ChatUserList users={activeChat?.joinedUsers} theme={isDarkTheme} />
      <div className="content-window-vertical">
        {/*<ViewTitle text={`Channel: ${activeChat?.name} `} />*/}
        <ChatHeader
          image={activeChat?.image}
          name={activeChat?.name}
          theme={isDarkTheme}
        />
        <ChatMessages innerRef={endOfMessageList} messages={messages || []} />
        <SendMessage onSubmit={sendMessage} theme={isDarkTheme} />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { backEnabled: true });
