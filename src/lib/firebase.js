// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API Key",
  authDomain: "Auth Domain",
  projectId: "Auth Domain",
  storageBucket: "Storage Bucket ID",
  messagingSenderId: "Messaging sender ID from google",
  appId: "Firebase App ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
