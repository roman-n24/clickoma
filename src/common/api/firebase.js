// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy4U_hKA1Lae8vDwAJSPokeBd77QnaBE0",
  authDomain: "gyrp24.firebaseapp.com",
  projectId: "gyrp24",
  storageBucket: "gyrp24.firebasestorage.app",
  messagingSenderId: "638560458203",
  appId: "1:638560458203:web:f899a80cc1c9c7c3eb43fe",
  measurementId: "G-GC23EPXJL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { 
  db, 
  auth,
  doc, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  setDoc,
  addDoc,
  getDocs,
  collection
}