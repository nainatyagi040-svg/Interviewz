# Backend Build Spec — AI Interview Agent

You are building the backend for a hackathon submission: an AI agent that conducts a
realistic, multi-turn technical interview with a candidate, based on their learning
history in a 31-day AI engineering cohort. This document is your complete reference.
Follow it exactly — do not invent requirements not stated here, and do not change the
API contract in section 2 under any circumstances (it is graded by an automated
evaluator that calls it directly).

Build this as a **production-grade service**: assume real traffic, real failures, and
real judges hammering the endpoint. Every failure mode below must be handled so the
API never returns a 500 or hangs indefinitely.

---

## 1. Tech Stack (use exactly this — do not substitute)

- **Runtime:** Node.js (LTS), CommonJS or ESM — match whatever the existing `server/`
  folder already uses (check `package.json` `"type"` field before assuming).
- **Framework:** Express
- **LLM Provider:** Anthropic Claude API via the official `@anthropic-ai/sdk` package.
  Use model `claude-sonnet-4-5` unless told otherwise. Do NOT use OpenAI, Ollama, or
  any other provider — this must run on the Claude API.
- **Database:** Supabase (Postgres) via `@supabase/supabase-js` — reuse the existing
  project already connected in this repo. Do not create a new Supabase project.
- **Validation:** `zod` for all incoming request body validation.
- **Logging:** `pino` (structured JSON logs) — no bare `console.log` in request handlers.
- **Rate limiting:** `express-rate-limit`.
- **Env config:** `dotenv`, already in use in this repo.

---

## 2. API Contract — NON-NEGOTIABLE

This is dictated by the hackathon's technical specification. It must match exactly,
byte-for-byte on field names. This is the ONLY endpoint this service exposes for the
interview feature (in addition to the existing `/api/health` from the skeleton).

```
POST /api/interview
```

No authentication.

### Turn 1 — Start interview
Request:
```json
{
  "sessionId": "abc-123",
  "candidate": { ...full candidate object, matching candidates.json schema... }
}
```
Response:
```json
{ "reply": "Welcome. Let's begin your interview.", "done": false }
```

### Turn 2..N — Conversation
Request:
```json
{ "sessionId": "abc-123", "message": "the candidate's latest answer" }
```
Response:
```json
{ "reply": "...next question or follow-up...", "done": false }
```

### Final turn — Interview complete
Response:
```json
{
  "reply": "Interview completed.",
  "done": true,
  "feedback": {
    "summary": "string",
    "strengths": ["string", "..."],
    "gaps": ["string", "..."],
    "next": ["string", "..."]
  }
}
```

**Rules:**
- `sessionId` is provided by the client and must be used to persist and retrieve state.
  Never lose state between requests — see Section 5 (this must survive server restarts).
- Every response is exactly one JSON object with `reply` and `done` at minimum.
- `feedback` only appears on the final response.
- Minimum 8 questions asked across at least 4 distinct curriculum `day` values before
  `done: true` is allowed to be returned.

---

## 3. Provided Data — schemas (already uploaded to the repo, do not modify)

### `curriculum.json`
```json
{
  "cohort": "AI Cohort · 31 days · 8 modules",
  "modules": [
    { "n": 1, "title": "Environment & Tooling", "days": [1, 3] }
    // ...8 modules total, "days" is an inclusive [start, end] range
  ],
  "days": [
    {
      "day": 1,
      "title": "VS Code & Python Environment Setup",
      "type": "SETUP",            // SETUP | BUILD | CAPSTONE (others may appear)
      "tools": ["VS Code", "Python", "..."],
      "objectives": ["...", "..."]
    }
    // ...31 day entries total
  ]
}
```

### `candidates.json`
```json
{
  "candidates": [
    {
      "member": {
        "id": "CAND-002",
        "name": "Alex Turner",
        "jobRole": "Backend Software Engineer",
        "yearsExperience": 5,
        "education": "B.Tech Computer Science",
        "status": "COMPLETED"
      },
      "missions": [
        { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 3 },
        { "day": 29, "title": "Monitoring, Logging & Observability", "skipped": true }
        // "passed" + "attempts" OR "skipped": true — handle both shapes
      ],
      "signals": {
        "commitDays": 22,
        "missionsCompleted": 29,
        "missionsFirstTry": 10
      }
    }
    // 20 candidates total
  ]
}
```

Load both JSON files at server startup into memory (they are static reference data,
not per-request data) — do not re-read from disk on every request.

---

## 4. Interview Agent Logic — the actual product

This is the core intellectual work of the project. Build it as a distinct module
(`services/interviewAgent.js` or similar), not inline in the route handler.

### 4.1 Question targeting strategy
- Cross-reference the candidate's `missions` array against `curriculum.json` `days`.
- Prioritize days where the candidate:
  1. Passed with many `attempts` (struggled but got there → good for a "how did you
     eventually solve X" question)
  2. Skipped (worth probing gently — did they actually learn it elsewhere?)
  3. Passed on first try in a high-signal module (RAG, Agentic AI, MCP) → go deeper
- Select at least 4 distinct `day` values to cover, spread across different modules
  where possible — don't cluster all questions in one module.

### 4.2 System prompt (write this carefully — it defines interview quality)
The system prompt sent to Claude must instruct it to:
- Act as a real senior technical interviewer, not a quiz generator.
- Reference the specific curriculum day/topic/objectives when asking a question.
- Generate a genuine follow-up based on what the candidate just said — not a
  pre-scripted next question. If the candidate's answer is shallow, probe deeper on
  the same topic before moving on. If it's strong, move to the next targeted day.
- Never reveal it's counting questions or tracking state internally — stay in
  character as an interviewer throughout.
- At the end, synthesize the full conversation (not just the last message) into the
  `feedback` object.

### 4.3 State machine per session
Track, per `sessionId`, at minimum:
- `candidate` (the full object from turn 1)
- `conversationHistory` (array of `{role, content}` — pass this whole array to Claude
  on every turn as context, this is how "maintain context" is satisfied)
- `daysCovered` (array of curriculum `day` numbers already asked about)
- `questionCount`
- `status`: `IN_PROGRESS` | `COMPLETE`

Completion condition: `questionCount >= 8 AND daysCovered.length >= 4`. Once met, the
next model call should be instructed to wrap up naturally and produce the feedback
object instead of another question.

---

## 5. Persistence — Supabase (required, not optional)

Do NOT store session state in an in-memory JS object/Map. This breaks the moment
Render restarts the instance or scales to a second instance — and it will look like
a random, unreproducible bug to judges, which is worse than a visible error.

Create a table:

```sql
create table interview_sessions (
  session_id text primary key,
  candidate jsonb not null,
  conversation jsonb not null default '[]',
  days_covered jsonb not null default '[]',
  question_count int not null default 0,
  status text not null default 'IN_PROGRESS',
  feedback jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Every request: read session by `session_id` → mutate in memory for that request →
write back the full updated row → respond. Use the Supabase JS client already
configured in this repo (`SUPABASE_URL` / `SUPABASE_SERVICE_KEY` env vars already set).

---

## 6. Error Handling & Resilience — this is graded, take it seriously

The endpoint must **never** return a raw 500 or hang. Implement all of the following:

- **Request validation:** validate the incoming body with `zod` before touching
  anything else. On failure, return `400` with `{ "error": "description" }` — never
  let a malformed request reach the Claude API call or the DB.
- **Claude API resilience:**
  - Wrap every Claude API call in a retry with exponential backoff (2–3 attempts,
    e.g. via a small custom wrapper or a library like `p-retry`).
  - Set an explicit request timeout (e.g. 20s) — do not let a hung upstream call hang
    the whole request indefinitely.
  - **Fallback path:** if Claude's API is unreachable/erroring after retries, do not
    fail the interview. Fall back to a pre-written question pulled directly from
    `curriculum.json` for the next uncovered target day (a simple template like
    `"Let's talk about Day {day}: {title}. {objectives[0]}"`). This keeps the
    interview moving and the endpoint always returns `200` with a valid `reply`.
  - Log every fallback trigger (structured log, not silent) so it's visible in Render
    logs, but never expose internal errors in the API response.
- **Database resilience:** if a Supabase read/write fails, retry once; if it still
  fails, return a clear `503 { "error": "temporarily unavailable, please retry" }`
  rather than crashing.
- **Global error handler:** an Express error-handling middleware as the last
  middleware in the chain, catching anything unhandled and always returning valid
  JSON, never an HTML stack trace.
- **Process-level safety nets:** handle `unhandledRejection` and `uncaughtException`
  at the process level — log and keep the process alive rather than crashing the
  whole server on one bad request.
- **Unknown `sessionId` on a non-start turn:** return `400` with a clear error rather
  than crashing — this is a real case judges may hit if they retest.

---

## 7. Security

- **CORS:** restrict to the deployed frontend's exact origin via `FRONTEND_URL` env
  var (already set up in this repo) — do not use `origin: "*"` in production.
- **Rate limiting:** apply per-IP rate limiting to `/api/interview` (e.g. 30
  requests/minute) to prevent abuse without blocking normal interview pacing.
- **No secrets in responses:** never echo back API keys, internal error stacks, or
  raw DB errors to the client.
- **Input sanitization:** treat `message` as untrusted text — pass it to Claude as
  data, never interpolate it into a system prompt in a way that lets it override
  instructions (standard prompt-injection hygiene: keep user input in a clearly
  delimited user-turn message, not concatenated into the system prompt string).

---

## 8. Folder structure (extend the existing `server/` — don't restructure what exists)

```
server/
├── src/
│   ├── index.js                 # existing entry point — mount new route here
│   ├── routes/
│   │   └── interview.js         # POST /api/interview handler
│   ├── services/
│   │   ├── interviewAgent.js    # question targeting + prompt construction + Claude calls
│   │   ├── claudeClient.js      # Anthropic SDK wrapper with retry/timeout/fallback
│   │   └── sessionStore.js      # Supabase read/write for interview_sessions
│   ├── data/
│   │   ├── curriculum.json      # copied in at build/deploy time, loaded at startup
│   │   └── candidates.json
│   ├── validation/
│   │   └── interviewSchema.js   # zod schemas for request bodies
│   └── middleware/
│       └── errorHandler.js
```

---

## 9. Environment variables (add to `.env.example` and Render)

```
ANTHROPIC_API_KEY=
CLAUDE_MODEL=claude-sonnet-4-5
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
FRONTEND_URL=
PORT=5000
```

---

## 10. Acceptance checklist (verify all before considering this done)

- [ ] `POST /api/interview` matches the contract in Section 2 exactly
- [ ] A full interview run asks ≥8 questions covering ≥4 distinct curriculum days
- [ ] Follow-up questions visibly reference the candidate's previous answer, not generic
- [ ] Session state survives a server restart (test by redeploying mid-interview)
- [ ] Killing the Claude API key temporarily still returns valid `200` responses
      (fallback path works)
- [ ] Malformed request body returns `400`, never a crash
- [ ] Unknown `sessionId` returns a clean `400`, never a crash
- [ ] Final response includes well-formed `feedback` with all 4 required fields
- [ ] CORS only allows the real frontend origin in production
- [ ] No API keys or stack traces ever appear in a response body
