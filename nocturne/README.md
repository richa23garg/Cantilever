# Nocturne 🌆

My blog website for the Cantilever internship. Named it after the mood
I was going for — dusk skylines, frosted glass, that kind of vibe.

## What it does
- Anyone can read posts without an account
- Log in to write, edit, or delete YOUR OWN posts (not other people's —
  learned that ownership-checking is a real thing you have to build,
  not just assume)
- Posts can have an image (paste a URL, not an upload — kept it simple)

## Tech I used
- HTML, CSS, JS
- Firebase Authentication + Firestore
- Deployed on Netlify

## The part that was actually new for me
My task manager was fully private — every user only ever saw their own
stuff. A blog is the opposite: everyone should see all posts, but only
the person who wrote something should be able to edit or delete it. That
meant learning to tag each post with who wrote it and checking that on
the frontend before showing the edit/delete buttons. Small concept, took
me a minute to actually get right.

## Running it yourself
Same as any Firebase + Live Server project — you'll need your own
Firebase project (Auth + Firestore, test mode is fine), your config
pasted into `firebase-config.js`, and a local server since the pages use
JS modules.

## Honest gap
No real image upload — you paste a link to an image already hosted
somewhere. Actual file uploads need Firebase Storage, which felt like
one more thing to debug on a deadline. Will learn more.
