// auth.js — handles BOTH login.html and register.html.
// Whichever page loads this, only the matching block below runs
// (login page has #login-btn, register page has #register-btn — never both).

import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const errorBox = document.getElementById("auth-error");

// Shows a message in the #auth-error <p> we added to the HTML
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("visible");
}

// Turns Firebase's technical error codes into plain, readable messages
function friendlyError(error) {
  const code = error.code || "";
  if (code.includes("email-already-in-use")) return "That email is already registered. Try logging in instead.";
  if (code.includes("invalid-email")) return "That email address doesn't look right.";
  if (code.includes("weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("user-not-found") || code.includes("wrong-password") || code.includes("invalid-credential")) {
    return "Incorrect email or password.";
  }
  return "Something went wrong. Please try again.";
}

// ---------- Login page ----------
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // stops the page from reloading, since button sits near inputs
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showError("Please fill in both fields.");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(friendlyError(error));
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
    }
  });
}

// ---------- Register page ----------
const registerBtn = document.getElementById("register-btn");
if (registerBtn) {
  registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      showError("Please fill in both fields.");
      return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = "Creating account...";

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(friendlyError(error));
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
    }
  });
}
