import React from "react";

import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";

function SearchChat({ theme }) {
  return (
    <div className="chat-search-box">
      <div className={`searchBar ${theme ? "dark" : "light"}`}>
        <IconContext.Provider
          value={{
            size: "20",
          }}
        >
          <div>
            <FiSearch />
          </div>
        </IconContext.Provider>
        <input className="form-control" placeholder="Search" />
      </div>
    </div>
  );
}

export default SearchChat;
