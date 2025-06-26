import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth';
import data from '../../../data.json'

const firebaseConfig = {
  ...data.firebase
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