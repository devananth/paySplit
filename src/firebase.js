import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc6mkE9MtGIjD_JvGxnxwjfswxV5N8ypc",
  authDomain: "pay-split-3ff11.firebaseapp.com",
  projectId: "pay-split-3ff11",
  storageBucket: "pay-split-3ff11.appspot.com",
  messagingSenderId: "462854870330",
  appId: "1:462854870330:web:f6fceddf547f64a4aeac03",
  measurementId: "G-CDZBBWE3LP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  app,
  auth,
  db,
  collection,
  addDoc,
  signOut,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
};
