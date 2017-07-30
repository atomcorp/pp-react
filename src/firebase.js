import firebase from 'firebase';
import {firebaseApi} from './api.js';

// Initialize Firebase
const config = {
  apiKey: firebaseApi,
  authDomain: "pp-react.firebaseapp.com",
  databaseURL: "https://pp-react.firebaseio.com",
  projectId: "pp-react",
  storageBucket: "pp-react.appspot.com",
  messagingSenderId: "1025315948205"
};
firebase.initializeApp(config);
export default firebase;
