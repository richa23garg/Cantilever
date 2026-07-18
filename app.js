// app.js — runs only on dashboard.html

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection, addDoc, deleteDoc, doc, updateDoc,
  query, where, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser = null;
let allTasks = [];
let activeFilter = "all";
let activeSort = "date";

const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");
const userEmailEl = document.getElementById("user-email");

// ---------- Auth guard ----------
// If nobody is logged in, send them back to login.html — this is what stops
// someone from typing dashboard.html directly into the address bar without logging in.
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  currentUser = user;
  userEmailEl.textContent = user.email;
  listenToTasks();
});

document.getElementById("logout-btn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// ---------- Create ----------
const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("task-name").value.trim();
  const date = document.getElementById("task-date").value;
  const priority = document.getElementById("task-priority").value;

  if (!name || !date) return;

  await addDoc(collection(db, "tasks"), {
    uid: currentUser.uid,
    name,
    date,
    priority,
    completed: false,
    createdAt: serverTimestamp()
  });

  taskForm.reset();
  document.getElementById("task-priority").value = "medium";
});

// ---------- Read (real-time) ----------
function listenToTasks() {
  const q = query(collection(db, "tasks"), where("uid", "==", currentUser.uid));
  onSnapshot(q, (snapshot) => {
    allTasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    render();
  });
}

// ---------- Update ----------
async function toggleComplete(taskId, currentValue) {
  await updateDoc(doc(db, "tasks", taskId), { completed: !currentValue });
}

async function editTask(taskId, currentName, currentDate) {
  const newName = prompt("Edit task name:", currentName);
  if (newName === null) return;
  const newDate = prompt("Edit due date (YYYY-MM-DD):", currentDate);
  if (newDate === null) return;

  await updateDoc(doc(db, "tasks", taskId), {
    name: newName.trim() || currentName,
    date: newDate.trim() || currentDate
  });
}

// ---------- Delete ----------
async function deleteTask(taskId) {
  if (!confirm("Delete this task?")) return;
  await deleteDoc(doc(db, "tasks", taskId));
}

// ---------- Filter + Sort controls ----------
document.getElementById("filter-toggle").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#filter-toggle button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  activeFilter = btn.dataset.filter;
  render();
});

document.getElementById("sort-select").addEventListener("change", (e) => {
  activeSort = e.target.value;
  render();
});

// ---------- Render ----------
const priorityRank = { high: 0, medium: 1, low: 2 };

function render() {
  let visible = allTasks.filter((t) => {
    if (activeFilter === "pending") return !t.completed;
    if (activeFilter === "completed") return t.completed;
    return true;
  });

  visible.sort((a, b) => {
    if (activeSort === "priority") {
      return priorityRank[a.priority] - priorityRank[b.priority];
    }
    return (a.date || "").localeCompare(b.date || "");
  });

  document.getElementById("stat-total").textContent = allTasks.length;
  document.getElementById("stat-pending").textContent = allTasks.filter((t) => !t.completed).length;
  document.getElementById("stat-completed").textContent = allTasks.filter((t) => t.completed).length;

  emptyStateEl.style.display = visible.length === 0 ? "block" : "none";

  taskListEl.innerHTML = visible.map((t) => `
    <div class="task-card ${t.completed ? "completed" : ""}" data-id="${t.id}">
      <div class="task-check ${t.completed ? "checked" : ""}" data-action="toggle">
        ${t.completed ? "✓" : ""}
      </div>
      <div class="task-info">
        <div class="task-name">${escapeHtml(t.name)}</div>
        <div class="task-date">${formatDate(t.date)}</div>
      </div>
      <span class="priority-tag priority-${t.priority}">${t.priority}</span>
      <div class="task-actions">
        <button class="icon-btn" data-action="edit" title="Edit">✎</button>
        <button class="icon-btn delete" data-action="delete" title="Delete">🗑</button>
      </div>
    </div>
  `).join("");
}

taskListEl.addEventListener("click", (e) => {
  const actionEl = e.target.closest("[data-action]");
  if (!actionEl) return;
  const card = e.target.closest(".task-card");
  const taskId = card.dataset.id;
  const task = allTasks.find((t) => t.id === taskId);
  if (!task) return;

  const action = actionEl.dataset.action;
  if (action === "toggle") toggleComplete(taskId, task.completed);
  if (action === "edit") editTask(taskId, task.name, task.date);
  if (action === "delete") deleteTask(taskId);
});

// ---------- Helpers ----------
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
