import * as api from "../api/chatApis";
import db from "../db/firestore";

export const fetchChats = () => async (dispatch, getState) => {

  const { user } = getState().auth;
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();
  
  chats
    .forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id));

  const sortedChats = chats.reduce((accumulatedChat, chat) => {

    accumulatedChat[chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'].push(chat);
    return accumulatedChat;
  }, {joined: [], available: []})

  dispatch({
    type: 'CHATS_FETCH_SUCCESS',
    ...sortedChats
  })
  return sortedChats;
};

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat: {...newChat, id: chatId}});

  return chatId;
};
