import React, { useEffect } from "react";

import { fetchChats } from "../actions/chatActions";

import { useDispatch, useSelector } from "react-redux";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import ViewTitle from "../components/shared/ViewTitle";
import Notification from "../utils/notification";

import { withBaseLayout } from "../layouts/baseLayout";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const joinedChats = useSelector(({chats}) => chats.joined);
  const availableChats = useSelector(({chats}) => chats.available);


  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());

  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats chats={joinedChats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your Channel">
          <Link to={"/chatCreate"} className="btn btn-outline-primary btn-sm">
            New
          </Link>
        </ViewTitle>
        <AvailableChats chats={availableChats} />
      </div>
    </div>
  );
}

export default withBaseLayout(Home);
