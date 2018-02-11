import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBfWE55uYREZNxbJdhhe5jo_rOeuli_-AU",
  authDomain: "platzimusic-7921b.firebaseapp.com",
  databaseURL: "https://platzimusic-7921b.firebaseio.com",
  projectId: "platzimusic-7921b",
  storageBucket: "platzimusic-7921b.appspot.com",
  messagingSenderId: "582736492494"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();

export default firebase;