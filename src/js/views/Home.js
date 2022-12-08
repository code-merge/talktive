import React, { useEffect } from "react";

import { fetchChats } from "../api/chatApis";

import AvailableChats from "../components/AvailableChats";
import JoinedChats from "../components/JoinedChats";
import ViewTitle from "../components/shared/ViewTitle";

function Home() {

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your Channel" />
        <AvailableChats />
      </div>
    </div>
  );
}

export default Home;
