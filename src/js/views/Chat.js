import React from "react";

import ChatMessages from "../components/ChatMessages";
import ChatUserList from "../components/ChatUserList";
import ViewTitle from "../components/shared/ViewTitle";

function Chat() {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>

      <div className="col-9 fh">
        <ViewTitle />
        <ChatMessages />
      </div>
    </div>
  );
}

export default Chat;
