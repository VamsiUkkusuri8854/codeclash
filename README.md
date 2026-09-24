# CodeClash
Gamified Coding Battle Platform — *Code. Battle. Level Up.*

## Features
- Challenges (19 mock problems) with search, difficulty + category filters, details page and hints
- Coding Arena: editor, language dropdown, simulated Run / Submit, console output
- XP, levels, streaks, weekly calendar, daily challenge with countdown
- Achievements that unlock automatically, level-up + toast notifications
- Battle Arena vs simulated opponents (Quick / Practice / Ranked), countdown, victory/defeat screen
- Leaderboard (Global / Weekly / Monthly / Friends), profile game card, statistics charts
- Settings: theme, notifications, sound, animations, default language, reset demo progress
- **Multi-user accounts**: Register / Login / Logout, per-user XP, level, challenges, achievements, streak, stats, settings (LocalStorage; demo account `demo@codeclash.dev` / `demo1234`)
- Progress persisted in LocalStorage · responsive layout · skeleton loaders · 404 page

## Tech Stack
React 18 · Vite · JavaScript · React Router · CSS3 · LocalStorage

## Security note
Authentication here is a **frontend-only simulation** (users + weakly hashed passwords in LocalStorage). It is NOT secure. v2 moves it to Spring Security + JWT + MySQL; only `src/utils/storage.js` and `src/services/api.js` need replacing.

## Tests
`npm test` runs the multi-user scenario (register A/B, separate progress, logout/login, refresh, reset).

## Screenshots
_Add screenshots here_ (`/docs/landing.png`, `/docs/dashboard.png`, `/docs/arena.png`, `/docs/battle.png`)

## Installation
```bash
npm install
npm run dev
```

## Future Architecture
React → Spring Boot REST API → MySQL (Spring Security + JWT). All data access goes through `src/services/api.js`, so swapping mock data for `fetch('/api/...')` calls is a change in one file.

## Future Development
Spring Boot backend · MySQL · JWT auth · real code execution service · multiplayer battles · admin panel
