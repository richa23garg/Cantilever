// firebase-config.js
// Paste your real Firebase project values below.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxXY5034NHFmScq8p01-i8Gh4n5_H5BgI",
  authDomain: "nocturne-76376.firebaseapp.com",
  projectId: "nocturne-76376",
  storageBucket: "nocturne-76376.firebasestorage.app",
  messagingSenderId: "578532221588",
  appId: "1:578532221588:web:e2207e824440cdc6fc8a81"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
