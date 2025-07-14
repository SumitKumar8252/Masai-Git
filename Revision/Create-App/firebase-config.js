import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtA6mBBM5iZnXOJn4x-v0iln8uyzZlyVU",
  authDomain: "notes-app-223c4.firebaseapp.com",
  projectId: "notes-app-223c4",
  storageBucket: "notes-app-223c4.firebasestorage.app",
  messagingSenderId: "198132306591",
  appId: "1:198132306591:web:b0af69776a5570e5c808aa",
  measurementId: "G-X1V4TTKLEW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
