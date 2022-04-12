// Firebase back-end connection
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAydfeGKXCSC4AwUktzOAdwgIZXnQQ-drw",
  authDomain: "qollide-project-manager.firebaseapp.com",
  projectId: "qollide-project-manager",
  storageBucket: "qollide-project-manager.appspot.com",
  messagingSenderId: "336120320293",
  appId: "1:336120320293:web:0b936b9a80e28241174acc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Init Firestore DB
const db = firebase.firestore();
// Init Firebase Auth
const auth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { db, auth, timestamp };
