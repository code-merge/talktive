import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

function createChatReducer() {
  const joined = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.joined;
      case "CHATS_JOIN_SUCCESS":
        return [...state, action.chat];
      default: {
        return state;
      }
    }
  };

  const available = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.available;
      case "CHATS_JOIN_SUCCESS":
        return state.filter((chat) => chat.id !== action.chat.id);
      default: {
        return state;
      }
    }
  };

  const activeChats = createReducer(
    {},
    {
      'CHAT_SET_ACTIVE_CHAT': (state, action) => {
        const { chat } = action;
        state[chat.id] = chat;
      },

      'CHAT_UPDATE_USER_STATE': (state, action) => {
        const { user, chatId } = action;
        const joinedUsers = state[chatId].joinedUsers;
        const index = joinedUsers.findIndex(juser => juser.uid === user.uid);
        // user not found
        if (index < 0) {
          return state;
        }
        //if state of user is same as previous
        const userState = joinedUsers[index].state;
        
        if (userState === user.state) {
          return state;
        }
        //else if there is a change then we will update it
        joinedUsers[index].state = user.state;
      },
    }
  );

  return combineReducers({
    joined,
    available,
    activeChats,
  });
}

export default createChatReducer();
