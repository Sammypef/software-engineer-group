// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDG2e5WyYXR4tE5FA9NMOKNvSVR1822xsY",
  authDomain: "lyricalingo-001.firebaseapp.com",
  projectId: "lyricalingo-001",
  storageBucket: "lyricalingo-001.firebasestorage.app",
  messagingSenderId: "966862026163",
  appId: "1:966862026163:web:1e1e6394fdfb42fa1f47c6",
  measurementId: "G-3B397GPPMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider, signInWithPopup, signOut };
