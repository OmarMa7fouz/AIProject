# Quiz Master — Local Quiz Games (Frontend Prototype)

Brief: a client-only quiz platform that turns course content into three interactive mini-games (Magic Library, Cat & Rat, AI Robot). Users register locally, play timed quizzes grouped by level, earn points/XP, and view a leaderboard — all persisted in browser `localStorage`.

Quick start

- Open the project folder `FINAL PROJECT` in your file explorer.
- Option A (recommended for local testing): serve files with a simple static server and open the app in a browser:

```powershell
cd "c:\Users\USER\Downloads\Projects\AI\FINALPROJECT\FINALPROJECT\FINAL PROJECT"
python -m http.server 8000
# then open http://localhost:8000/home2.html in your browser
```

- Option B (quick): double-click `home2.html` to open it in your browser (some audio or CORS features may be limited when using `file://`).

What to try

- Register a user: open `home2.html` → `LOGIN` → `REGISTER`. The user is stored in `localStorage` under key `quizUsers` and `currentUser`.
- Play: select a subject (dropdown) and `GO!!` to launch a game. Each game follows: rules → countdown → per-question timed loop → results.
- Verify persistence: after finishing a run the game appends a `match` object to the user and updates `xp`, `level`, and `wtotalPoints` as applicable.
- Stats and leaderboard: open `stats.html` to view the player summary and the aggregated leaderboard.
- Admin shortcut: press Ctrl+Shift+U on `home2.html` to download `users.json` (exports the `quizUsers` data).

Testing & debugging notes

- Inspect `localStorage` (DevTools → Application → Local Storage) to view `quizUsers` and `currentUser` objects. Useful fields: `matches`, `xp`, `level`, `wtotalPoints`.
- If a game appears to hang: open DevTools Console to view logs — modules log flow and verification (e.g., `mag.js` verifies saved `wtotalPoints`).
- Common quick fixes: ensure the selected course folder path is correct in `home2.js` (`launchBtn` sets the target page paths). If frames/images/audio don’t appear, confirm assets exist in each game folder.

Project layout (relevant files)

- `home2.html`, `home2.css`, `home2.js` — app shell, auth, launcher, UI helpers (toasts, dropdown).
- `stats.html`, `stats.css`, `stats.js` — player summary and leaderboard aggregation logic.
- `Quiz(Magic Library)/mag.js` — Magic Library game, score saving logic and defensive localStorage verification.
- `Quiz(Cat&Rat)/cat-rat.js` — Parallel Processing quiz with animated obstacle frames.
- `AIQuiz(ROBOT)/ai2.js` — AI quiz runner; shares the same game pattern.

Key engineering notes

- Persistence: browser `localStorage` used as the single source of truth for users; no backend. This enables an offline demo but is not secure for production.
- Reuse: all games implement a consistent lifecycle (rules → countdown → timed Q/A → results) and reuse a small level/progression state machine (`currentLevel`, `currentGroup`, `groupValues`).
- Aggregation: `stats.js` normalizes different game metrics (e.g., `wtotalPoints` and `xp`) to present a combined leaderboard.

Recommended short-term improvements (prioritized)

1. Backend user service + secure auth (High effort): Move user accounts and matches to a server API; store hashed passwords (bcrypt/argon2). Adds persistence across devices and secures data.
2. Sync & conflict handling (Medium): Add sync strategy for offline play (local queue, server reconciliation) to keep local matches and server records consistent.
3. API contract + validation (Low): Define simple REST endpoints for users, matches, and leaderboard; validate payloads server-side to avoid client-driven corruption.
4. Tests & CI (Low–Medium): Unit tests for persistence helpers and game progression logic; add a simple CI pipeline to run lint/tests.
5. Analytics & telemetry (Low): Emit minimal events (game started, level completed, score) to monitor engagement during early user testing.
6. Small UX fixes (Low): Add server-side error handling, improve accessibility (ARIA labels), and make audio optional.

If you want, I can:

- scaffold a tiny Node/Express backend (endpoints for auth, save match, leaderboard) and wire `home2.js` to it; or
- implement a local dev helper to export/import `quizUsers` JSON with merge semantics.

Files created/updated

- Created: `FINAL PROJECT/README.md`

---

Generated on 2025-12-20 — contact me if you want the server scaffold or testing harness next.
