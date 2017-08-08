// http://bodiddlie.github.io/firebase-auth-with-react-router/
import firebase from './firebase';

export const db = firebase.database(); //the real-time database
export const auth = firebase.auth(); //the firebase auth namespace

export const storageKey = 'KEY_FOR_LOCAL_STORAGE';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

