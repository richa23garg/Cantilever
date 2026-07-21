# PawGress 🐾

A task management app I built for my Cantilever internship. Also my cat
was very involved in the design process (see: the videos everywhere).

## What it does
- Sign up / log in / log out
- Add, edit, delete, and check off tasks
- Filter by all / pending / completed
- Sort by date or priority

## Tech I used
- HTML, CSS, JS (no framework — wanted to actually understand what's
  happening under the hood before reaching for React)
- Firebase for auth + database (Firestore)
- Deployed on Netlify

## Why Firebase instead of a "real" backend
Honestly, because I only knew HTML/CSS/JS going into this, and Node.js +
Express + MongoDB felt like too much new stuff to learn on a 4-week
deadline. Firebase let me get real authentication and a real database
without writing backend code — it's just JS functions I call from the
frontend. Was a good tradeoff for where I was at skill-wise.

## Running it yourself
You'll need Live Server (or any local server) — the pages use JS modules,
which browsers block if you just double-click the HTML file.

You'll also need your own Firebase project — auth and Firestore both set
to test mode is enough. Paste your config into `firebase-config.js`.

## What I'd do differently next time
- Better responsiveness — the login/register pages especially are still
  a bit rigid on smaller screens, built before I really had `clamp()`
  and media queries figured out
- A light/dark theme toggle
- A calendar view, not just a flat task/post list
- Stronger password handling — right now it just checks length (6+
  characters), but I'd want a real strength check that warns you if
  your password is weak instead of just accepting anything past the
  minimum
- General visual polish — there's a lot more I'd do with the aesthetic
  given more time
