import firebase from "firebase/app";
import "firebase/database";
import db from "../db/firestore";

const getOnlineStatus = (isOnline) => {
  return {
    state: isOnline ? "online" : "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

export const setUserOnlineStatus = (userId, isOnline) => {
  const userRef = db.doc(`/profiles/${userId}`);
  const updatedStatus = getOnlineStatus(isOnline);
  return userRef.update(updatedStatus);
};

export const onConnectionChanged = (onConnection) => {
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      const isConnected = snapshot?.val() ? snapshot.val() : false;
      onConnection(isConnected);
    });
};
