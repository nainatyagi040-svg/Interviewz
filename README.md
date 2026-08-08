# Loop — AI Interview Agent

Loop is a full-stack AI interviewer that reads a learner's real cohort progress (a 31-day AI
engineering curriculum) and runs a live, adaptive technical interview — real follow-ups, not a
quiz — then returns structured feedback.

🔗 **Live app:** https://interviewz-three.vercel.app

- **`client/`** — React + Vite + Tailwind. YC-style landing page and the interview experience
  (candidate picker → live chat → animated feedback).
- **`server/`** — Express + Google Gemini + Supabase. Stateless HTTP contract with
  server-side session state.

## Features

- **Personalized targeting** — questions are chosen from the candidate's actual mission history
  (struggled topics, skipped days, first-try passes on high-signal modules), covering at least
  4 distinct curriculum days across a minimum of 8 questions.
- **Real adaptive follow-ups** — every next question is generated from what the candidate just
  said, not a pre-scripted tree.
- **Structured feedback** — a final summary with strengths, gaps, and concrete next steps,
  rendered as designed UI, not raw JSON.
- **Fails gracefully, never hard-fails** — if the model API is slow or unreachable, the server
  falls back to a curriculum-derived question instead of erroring out.

## Architecture at a glance

1. **Client (React)** sends `POST /api/interview` to the server
2. **Server (Express)** routes the request to three parts:
   - `interviewAgent` — question targeting, prompt building, state machine
   - `sessionStore` — Supabase table for session state
   - `geminiClient` — Gemini calls with retry, timeout, and curriculum fallback

The frontend holds no interview logic. It sends `{ sessionId, candidate }` on the first turn and
`{ sessionId, message }` on every turn after. The server owns question count, phase, and the
completion decision, and replies with `{ reply, done, feedback? }`.

## Tech stack

| Layer | Tech |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI model | Google Gemini (`gemini-3.5-flash`) |
| Database | Supabase (Postgres) — session state |
| Hosting | Vercel (frontend), Render (backend) |

## Prerequisites

- Node.js 18+ (the server uses the global `fetch` and Web Crypto).
- A Google Gemini API key (free tier — no billing required, from [aistudio.google.com](https://aistudio.google.com/app/apikey)).
- A Supabase project (URL + service role key).

## 1. Backend setup (`server/`)

```bash
cd server
cp .env.example .env      # then fill in the values (see below)
npm install
```

Fill `server/.env`:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini API key. Without it, the server falls back to curriculum-derived questions. |
| `GEMINI_MODEL` | Model id (defaults to `gemini-3.5-flash`). |
| `SUPABASE_URL` | Supabase project URL. |
| `SUPABASE_SERVICE_KEY` | Service role key (server-side only — never ship to the client). |
| `FRONTEND_URL` | Allowed CORS origin(s), comma-separated. E.g. `http://localhost:5173`. |
| `PORT` | Defaults to `5000`. |

Create the session table by running `server/db/schema.sql` in the Supabase SQL editor.

Then:

```bash
npm run dev      # or: npm start
```

Health check: `GET http://localhost:5000/api/health`.

## 2. Real data

Placeholder `candidates.json` and `curriculum.json` ship in `server/src/data/` (and a copy of
`candidates.json` in `client/src/data/`) so the app runs immediately. Replace them with the real
cohort files, keeping the same shape. If you change the candidate list, update **both** copies.

## 3. Frontend setup (`client/`)

```bash
cd client
cp .env.example .env      # set VITE_API_URL to the backend URL
npm install
npm run dev               # http://localhost:5173
```

## Resilience notes

- The Gemini call has a timeout, one retry, and a curriculum-based fallback question, so a slow or
  failed model call never hangs or 500s the request.
- The API client mirrors this: 25s timeout, one retry on transient errors, normalized error
  objects, and defensive response-shape guarding.
- The UI keeps the conversation intact on error and offers an inline **Retry**; a React error
  boundary catches any render crash.

## Security notes

- `POST /api/interview` is intentionally **unauthenticated** per the challenge spec. CORS is
  restricted to `FRONTEND_URL` and the endpoint is rate-limited per IP to compensate. Do not expose
  this publicly without adding auth.
- The Supabase **service role key** stays server-side only.

## Live deployment

- Frontend: https://interviewz-three.vercel.app
- Backend: https://interviewz-backend.onrender.com

## AI usage

This project was built with AI assistance throughout — see [`PROMPTS.md`](./PROMPTS.md) for the
full log of prompts and how they were used.

## Production build

```bash
cd client && npm run build     # outputs client/dist
cd server && npm start         # serve behind your platform of choice
```
