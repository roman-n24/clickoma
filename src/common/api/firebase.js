import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAy4U_hKA1Lae8vDwAJSPokeBd77QnaBE0",
  authDomain: "gyrp24.firebaseapp.com",
  projectId: "gyrp24",
  storageBucket: "gyrp24.firebasestorage.app",
  messagingSenderId: "638560458203",
  appId: "1:638560458203:web:f899a80cc1c9c7c3eb43fe",
  measurementId: "G-GC23EPXJL6"
};

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
  collection,
  onSnapshot,
  deleteDoc
}