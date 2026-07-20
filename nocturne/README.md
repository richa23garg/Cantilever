# Nocturne — Blog Website (flat structure)

## Structure — everything loose at the root, one media subfolder
- login.html, register.html, index.html
- login.css, dashboard.css
- auth.js, dashboard.js, firebase-config.js
- images-videos/ — put nyc.mp4 and nocturne.png here

No more `../` paths anywhere — every file references its neighbors directly
by name (e.g. `href="login.css"`, `src="images-videos/nyc.mp4"`). This
avoids the whole class of path bugs from the nested folder structure.

## ⚠️ About your "posts disappeared" issue
Your Firestore data is almost certainly still safe — check your Firebase
console → Firestore Database → posts collection directly to confirm. If
it's still there, the problem was firebase-config.js pointing to the wrong
project (or placeholder values), not actual data loss.

**Critical: paste your EXISTING real Firebase config into firebase-config.js
below — the SAME project you already used, not a new one.** Creating a new
Firebase project here would explain both symptoms you saw: login failing
(no real auth backend) and posts missing (empty new database instead of
your real one).

## Testing
1. Open login.html via Live Server (not double-click — same file:// module
   restriction as before)
2. Try logging in with an account you already created
3. Check index.html shows your existing posts

If login still fails after confirming the config is correct, check
DevTools Console for the specific error and we'll go from there.

## Deploying this flat version
Since everything is at one level now, Netlify settings are simpler:
- Base directory: whatever folder contains these files
- Publish directory: same as base directory (no subfolder needed)
- Bare URL will now load index.html automatically — no more /html/ prefix needed
