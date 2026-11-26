import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_fbXf6ewBPYK0PysLno44c9yE0cksS0M",
  authDomain: "lmi-library.firebaseapp.com",
  projectId: "lmi-library",
  storageBucket: "lmi-library.firebasestorage.app",
  messagingSenderId: "276101090447",
  appId: "1:276101090447:web:0ed3d7afbbb75162f8b4fa",
  measurementId: "G-82X206JPBX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);