import * as api from "../../../backend/api/chatApis";
import db from "../../../backend/db/firestore";

export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();

  chats.forEach(
    (chat) => (chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
  );

  const sortedChats = chats.reduce(
    (accumulatedChat, chat) => {
      accumulatedChat[
        chat.joinedUsers.includes(user.uid) ? "joined" : "available"
      ].push(chat);
      return accumulatedChat;
    },
    { joined: [], available: [] }
  );

  dispatch({
    type: "CHATS_FETCH_SUCCESS",
    ...sortedChats,
  });
  return sortedChats;
};

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat: { ...newChat, id: chatId } });

  return chatId;
};

export const joinChat = (chat, userId) => (dispatch) => {
  api.joinChat(userId, chat.id).then((_) => {
    dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
  });
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const userSnapshot = await userRef.get();
        return { id: userSnapshot.id, ...userSnapshot.data() };
      })
    );

    chat.joinedUsers = joinedUsers;
    dispatch({ type: "CHAT_SET_ACTIVE_CHAT", chat });
  });

export const subscribeToProfile = (userId, chatId) => (dispatch) =>
  api.subscribeToProfile(userId, (user) => {
    console.log("Profile changed");
    dispatch({ type: "CHAT_UPDATE_USER_STATE", user, chatId });
  });

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
  const newMessage = { ...message };
  const { user } = getState().auth;
  const userRef = db.doc(`profiles/${user.uid}`);
  newMessage.author = userRef;

  return api
    .sendChatMessage(newMessage, chatId)
    .then((_) => dispatch({ type: "CHATS_MESSAGE_SENT" }));
};

export const subscribeToMessage = (chatId) => (dispatch) => {
  return api.subscribeToMessage(chatId, async (messages) => {
    const chatMessages = messages.map((changedMessage) => {
      if (changedMessage.type === "added") {
        return { id: changedMessage.doc.id, ...changedMessage.doc.data() };
      }
    });

    const messagesWithAuthor = [];
    const cashedUser = {};

    for await (let message of chatMessages) {
      if (cashedUser[message.author.uid]) {
        message.author = cashedUser[message.author.uid];
      } else {
        const userSnapshot = await message.author.get();

        cashedUser[userSnapshot.id] = userSnapshot.data();

        message.author = cashedUser[userSnapshot.id];
      }
      messagesWithAuthor.push(message);
    }

    return dispatch({
      type: "CHAT_SET_MESSAGES",
      messages: messagesWithAuthor,
      chatId,
    });
  });
};

export const registerMessageSubscription = (chatId, messageSubscription) => ({
  type: "CHAT_REG_MESSAGE_SUB",
  sub: messageSubscription,
  chatId,
});
