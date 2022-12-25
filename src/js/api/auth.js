import firebase from "firebase/app";
import "firebase/auth";
import db from "../db/firestore";

export const createUserProfiles = (userProfile) => 
  db.collection("profiles").doc(userProfile.uid).set(userProfile);


export const getUserProfile = (uid) =>
  db
    .collection("profiles")
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data());

export async function register({ email, password, avatar, username }) {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const userProfile = {
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    };
    await createUserProfiles(userProfile);
    return userProfile;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const login = async ({ email, password }) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  const userProfile = await getUserProfile(user.uid);
  return userProfile;
};

export const logout = () =>
  firebase.auth().signOut();


export const onAuthStateChanged = (onAuth) => 
  firebase.auth().onAuthStateChanged(onAuth);

