// dashboard.js — runs on dashboard.html
// Public read, gated write — same model as before: nobody gets redirected
// away, we just show/hide admin buttons based on login state.

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection, addDoc, deleteDoc, doc, updateDoc,
  onSnapshot, serverTimestamp, orderBy, query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser = null;
let allPosts = [];
let editingPostId = null;

const postListEl = document.getElementById("post-list");
const emptyStateEl = document.getElementById("empty-state");
const formPanel = document.getElementById("post-form-panel");

// ---------- Auth state: toggle UI only, never redirect ----------
onAuthStateChanged(auth, (user) => {
  currentUser = user;

  const loggedInControls = document.getElementById("logged-in-controls");
  const loggedOutControls = document.getElementById("logged-out-controls");
  const newPostBtn = document.getElementById("new-post-btn");

  if (user) {
    loggedInControls.style.display = "flex";
    loggedOutControls.style.display = "none";
    newPostBtn.style.display = "inline-block";
    document.getElementById("user-email").textContent = user.email;
  } else {
    loggedInControls.style.display = "none";
    loggedOutControls.style.display = "flex";
    newPostBtn.style.display = "none";
    formPanel.classList.remove("visible");
  }

  render();
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await signOut(auth);
});

// ---------- Fetch all posts, no uid filter — public data ----------
function listenToPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    allPosts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    render();
  });
}
listenToPosts();

// ---------- New post form ----------
document.getElementById("new-post-btn").addEventListener("click", () => {
  editingPostId = null;
  document.getElementById("post-title").value = "";
  document.getElementById("post-image").value = "";
  document.getElementById("post-body").value = "";
  formPanel.classList.add("visible");
});

document.getElementById("cancel-post-btn").addEventListener("click", () => {
  formPanel.classList.remove("visible");
  editingPostId = null;
});

// ---------- Save (create or edit) ----------
document.getElementById("save-post-btn").addEventListener("click", async () => {
  const title = document.getElementById("post-title").value.trim();
  const imageUrl = document.getElementById("post-image").value.trim();
  const body = document.getElementById("post-body").value.trim();

  if (!title || !body) return;

  if (editingPostId) {
    await updateDoc(doc(db, "posts", editingPostId), { title, imageUrl, body });
  } else {
    await addDoc(collection(db, "posts"), {
      title,
      imageUrl,
      body,
      authorUid: currentUser.uid,
      authorEmail: currentUser.email,
      createdAt: serverTimestamp()
    });
  }

  formPanel.classList.remove("visible");
  editingPostId = null;
});

// ---------- Edit / Delete ----------
postListEl.addEventListener("click", (e) => {
  const actionEl = e.target.closest("[data-action]");
  if (!actionEl) return;
  const postId = actionEl.dataset.id;
  const post = allPosts.find((p) => p.id === postId);
  if (!post) return;

  if (actionEl.dataset.action === "edit") {
    editingPostId = postId;
    document.getElementById("post-title").value = post.title;
    document.getElementById("post-image").value = post.imageUrl || "";
    document.getElementById("post-body").value = post.body;
    formPanel.classList.add("visible");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (actionEl.dataset.action === "delete") {
    if (confirm("Delete this post?")) {
      deleteDoc(doc(db, "posts", postId));
    }
  }
});

// ---------- Render ----------
function render() {
  emptyStateEl.style.display = allPosts.length === 0 ? "block" : "none";

  postListEl.innerHTML = allPosts.map((post) => {
    const isOwner = currentUser && post.authorUid === currentUser.uid;

    return `
      <div class="post-card frosty">
        ${post.imageUrl ? `<img src="${escapeHtml(post.imageUrl)}" class="post-image" alt="">` : ""}
        <div class="post-title">${escapeHtml(post.title)}</div>
        <div class="post-meta">${escapeHtml(post.authorEmail || "")} · ${formatDate(post.createdAt)}</div>
        <div class="post-body">${escapeHtml(post.body)}</div>
        ${isOwner ? `
          <div class="post-owner-actions">
            <button class="icon-btn" data-action="edit" data-id="${post.id}">Edit</button>
            <button class="icon-btn delete" data-action="delete" data-id="${post.id}">Delete</button>
          </div>
        ` : ""}
      </div>
    `;
  }).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

function formatDate(timestamp) {
  if (!timestamp || !timestamp.toDate) return "";
  return timestamp.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
