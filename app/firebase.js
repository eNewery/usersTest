// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBem55O2LSFZu5OoEdAr36sDS86qHOmUN8",

  authDomain: "userslist-87b15.firebaseapp.com",

  projectId: "userslist-87b15",

  storageBucket: "userslist-87b15.appspot.com",

  messagingSenderId: "93560401250",

  appId: "1:93560401250:web:a761307f31774672d7d03b",

  measurementId: "G-PMF0X9NF4X"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword };