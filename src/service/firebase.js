import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBSdULpo-V1iE3cnU7mUA3-ET4599Qvg4",
  authDomain: "codoc-ecc64.firebaseapp.com",
  databaseURL: "https://codoc-ecc64.firebaseio.com",
  projectId: "codoc-ecc64",
  storageBucket: "codoc-ecc64.appspot.com",
  messagingSenderId: "546634619306",
  appId: "1:546634619306:web:70eed5abbcaecf0eb4b3d3",
  measurementId: "G-L3WYVT84CQ",
};
firebase.initializeApp(firebaseConfig);

//Exporting firebase authorisation and firestore
export default firebase.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageBucket = firebase.storage();


//Passed in user information and additional data
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  //checks to see if user information is already in firestore
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  //if no snapshot exists in firestore, sets with additional data
  if (!snapshot.exists) {
    const {
      email,
      firstName,
      lastName,
      papers
    } = user;
    try {
      await userRef.set({
        firstName,
        lastName,
        email,
        papers,
        ...additionalData
      });

    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  //if snapshot exists, return the user document 
  return getUserDocument(user.uid);
};


//Similar to createUser Document except updates
export const updateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    const {
      email,
      firstName,
      lastName,
      papers
    } = user;
    try {
      await userRef.update({
        firstName,
        lastName,
        email,
        papers,
        ...additionalData
      });
    } catch (error) {
      console.error("Error updating user document", error);
    }
  }
  return getUserDocument(user.uid);
};



//Returns user information based on their unique identifier
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()

    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};