import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { subscribeToChat } from "../actions/chatActions";

import ChatMessages from "../components/ChatMessages";
import ChatUserList from "../components/ChatUserList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/baseLayout";

function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToChat(id));
    return () => {
      unsubscribe();
    };
  }, []);

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
