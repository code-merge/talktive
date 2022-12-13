import firebase from "firebase/app";
import "firebase/auth";
import db from "../db/firestore";

export const createUserProfiles = (userProfile) => {
  db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = (uid) => 
  db.collection("profiles")
    .doc(uid)
    .get()
    .then(snapshot => snapshot.data())



export async function register({ email, password, avatar, username }) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { user } = res;

    await createUserProfiles({
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export const login = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logout = () => {
  firebase.auth().signOut()
};

export const onAuthStateChanged = (onAuth) => {
  firebase.auth().onAuthStateChanged(onAuth);
};
