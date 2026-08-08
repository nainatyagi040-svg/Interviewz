# Loop — AI Interview Agent

Loop is a full-stack AI interviewer that reads a learner's real cohort progress (a 31-day AI
engineering curriculum) and runs a live, adaptive technical interview — real follow-ups, not a
quiz — then returns structured feedback.

- **`client/`** — React + Vite + Tailwind. YC-style landing page and the interview experience
  (candidate picker → live chat → animated feedback).
- **`server/`** — Express + Anthropic Claude + Supabase. Stateless HTTP contract with
  server-side session state.

## Architecture at a glance

```
client (React)  ──POST /api/interview──▶  server (Express)
                                             │
                        ┌────────────────────┼─────────────────────┐
                        ▼                    ▼                     ▼
                 interviewAgent        sessionStore            claudeClient
              (targeting, prompt,     (Supabase table)       (retry + timeout,
               state machine)                                 curriculum fallback)
```

The frontend holds no interview logic. It sends `{ sessionId, candidate }` on the first turn and
`{ sessionId, message }` on every turn after. The server owns question count, phase, and the
completion decision, and replies with `{ reply, done, feedback? }`.

## Prerequisites

- Node.js 18+ (the server uses the global `fetch` and Web Crypto).
- An Anthropic API key.
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
| `ANTHROPIC_API_KEY` | Claude API key. Without it, the server falls back to curriculum-derived questions. |
| `CLAUDE_MODEL` | Model id (defaults to `claude-sonnet-4-5`). |
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

- The Claude call has a timeout, one retry, and a curriculum-based fallback question, so a slow or
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

## Production build

```bash
cd client && npm run build     # outputs client/dist
cd server && npm start         # serve behind your platform of choice
```
