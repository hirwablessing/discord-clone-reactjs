import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_1K5mAmGfBLQN2ZC25cqjgTKdjbttjSA",
  authDomain: "hirwab-discord-clone.firebaseapp.com",
  databaseURL: "https://hirwab-discord-clone.firebaseio.com",
  projectId: "hirwab-discord-clone",
  storageBucket: "hirwab-discord-clone.appspot.com",
  messagingSenderId: "939677461786",
  appId: "1:939677461786:web:f8cf6be2bbdfda0d3810a3",
  measurementId: "G-0H2ZSW58GH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
