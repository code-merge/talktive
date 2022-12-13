import React, { useEffect } from "react";

import { fetchChats } from "../actions/chatActions";

import { useDispatch, useSelector } from "react-redux";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import ViewTitle from "../components/shared/ViewTitle";
import BaseLayout, { withBaseLayout } from "../layouts/baseLayout";

function Home() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your Channel" />
        <AvailableChats chats={chats} />
      </div>
    </div>
  );
}

export default withBaseLayout(Home);
