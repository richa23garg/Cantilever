# PawGress — Task Management App

## ⚠️ Fix this before deploying
Your media folder is named `images&videos`. The `&` character can break on
deployment (Netlify/browsers can misread it in URLs). Rename the folder to
something like `assets` or `images-and-videos`, then update the `src="..."`
paths in `login.html`, `register.html`, and `dashboard.html` to match.

## What's inside
- `login.html` / `login.css` — your original login page, with minimal
  additions (flagged with comments) so JS can hook into it
- `register.html` / `register.css` — same structure/style as login, for
  new accounts
- `dashboard.html` / `dashboard.css` — the actual task manager (add/edit/
  delete/filter/sort tasks)
- `auth.js` — shared by login + register (handles Firebase sign in / sign up)
- `app.js` — dashboard logic (Firestore CRUD, filtering, sorting)
- `firebase-config.js` — **you must edit this** with your real Firebase values

## Step 1 — Firebase setup
You already did this earlier for the Task Management project. Reuse the
exact same `firebaseConfig` values (apiKey, authDomain, projectId, etc.)
you pasted into your other project's config file — paste them into
`firebase-config.js` here too.

If starting fresh:
1. https://console.firebase.google.com → Add project
2. Click the Web icon (`</>`) → register an app → copy the config object
3. Paste it into `firebase-config.js`, replacing the placeholders
4. Authentication → Get Started → enable Email/Password
5. Firestore Database → Create database → Start in test mode

## Step 2 — Test locally
These pages use `type="module"` scripts, so you need Live Server (VS Code
extension) or a local server — double-clicking the HTML file won't work.

Right-click `login.html` → "Open with Live Server". Register an account,
confirm it redirects to the dashboard, add/edit/delete a few tasks, then
log out and log back in to confirm it all persists.

## Step 3 — Push to GitHub + Deploy on Netlify
Same process as your other project:
```bash
git init
git add .
git commit -m "PawGress: task management app"
git branch -M main
git remote add origin https://github.com/<your-username>/Cantilever.git
git push -u origin main
```
Then on Netlify: Add new site → Import from GitHub → pick the repo → set
publish directory to wherever `login.html` lives → Deploy.

## What each requirement maps to
| Requirement | Where |
|---|---|
| Registration/login/logout | `register.html`, `login.html`, `auth.js`, logout button in `dashboard.html` |
| CRUD operations | `app.js` — addDoc, onSnapshot, updateDoc, deleteDoc |
| Filtering/sorting | Pill toggle + dropdown in `dashboard.html`, logic in `app.js` |
| Responsive design | Media query at bottom of `dashboard.css` — note: login/register pages use your original fixed-pixel CSS, which is NOT fully responsive. Revisit if the task requirements grade on this. |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| Deployment | Netlify |
