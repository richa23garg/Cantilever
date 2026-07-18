// firebase-config.js
// Paste your real Firebase project values below, replacing the placeholders.
// (Same Firebase project you already set up earlier — reuse those exact values.)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQTczJfkXWC0AhZ_Evk1hKfrFlXrxGEFQ",
  authDomain: "pawgress-e9e4a.firebaseapp.com",
  projectId: "pawgress-e9e4a",
  storageBucket: "pawgress-e9e4a.firebasestorage.app",
  messagingSenderId: "97509787277",
  appId: "1:97509787277:web:cf35dc243aa7bd3a4fc4c4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
