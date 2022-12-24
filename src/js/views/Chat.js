import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { subscribeToChat, subscribeToProfile } from "../actions/chatActions";

import ChatMessages from "../components/ChatMessages";
import ChatUserList from "../components/ChatUserList";
import ViewTitle from "../components/shared/ViewTitle";
import LoadingView from "../components/shared/LoadingView";
import { withBaseLayout } from "../layouts/baseLayout";

function Chat() {
  const { id } = useParams();
  //We will preserve teh values in-between renders of component
  const peopleWatchers = useRef({});
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToChat(id));
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

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat....." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUsers} />
      </div>

      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name} `} />
        <ChatMessages />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { backEnabled: true });
