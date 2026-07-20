// firebase-config.js
//
// IMPORTANT: paste your EXISTING real Firebase config here — the same
// project you already set up, where your posts currently live. Do NOT
// create a new Firebase project for this, or your existing posts/accounts
// won't show up (they're tied to the specific project these keys point to).
//
// If you're not sure where your old config values are, check any earlier
// version of this file on your computer, or go to your Firebase console →
// Project settings (gear icon) → scroll to "Your apps" → find your web app
// → the config object is shown there again, you can re-copy it anytime.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB36QXWI2z4cfPpWD8t1hcJ8EenBygB7Cw",
  authDomain: "nocturne-a21ed.firebaseapp.com",
  projectId: "nocturne-a21ed",
  storageBucket: "nocturne-a21ed.firebasestorage.app",
  messagingSenderId: "574421149660",
  appId: "1:574421149660:web:4e3dc04208878871411119"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
