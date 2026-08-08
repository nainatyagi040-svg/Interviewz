# Frontend Build Spec — AI Interview Agent

You are building the frontend for a hackathon submission: a polished, production-feel
SaaS-style web app that lets a candidate go through an AI-conducted technical
interview. This document is your complete reference — follow it exactly. The backend
API contract is fixed (see Section 4) and must not be changed.

Build this to look and feel like a real YC-style SaaS product — confident, clean,
modern — not a hackathon prototype. Take design seriously; it's part of what's judged.

---

## 1. Tech Stack (use exactly this — do not substitute)

- **Framework:** React + Vite (already the existing `client/` setup — extend it,
  don't replace it)
- **Routing:** `react-router-dom`
- **Styling:** Tailwind CSS (set up if not already present in this repo)
- **Animation:** `framer-motion` for hero/page transitions and micro-interactions
- **Icons:** `lucide-react`
- **State management:** React Context + `useReducer`, or `zustand` if state gets
  complex — no need for Redux
- **HTTP:** native `fetch`, wrapped in a small API client module with retry handling
  (see Section 6) — no axios needed unless you prefer it

---

## 2. Routes

```
/                    → Landing page (public, YC-SaaS style)
/interview           → Candidate picker + live interview experience
```

Keep it to these two routes. Do not build auth, dashboards, or admin pages — explicitly
out of scope per the hackathon brief.

---

## 3. Landing Page (`/`) — detailed section spec

This is a marketing page for the product concept ("AI Interview Agent" / working
product name up to you, keep it sharp). Build these sections top to bottom:

1. **Nav bar** — logo/wordmark left, minimal links (e.g. "How it works", "Start
   Interview" CTA button) right. Sticky, subtle blur/border on scroll.
2. **Hero** — large, confident headline (something like *"The AI interviewer that
   actually knows what you learned"*), one-line subheadline explaining the concept in
   plain language, a single primary CTA button ("Start Your Interview" →
   `/interview`), and a secondary lighter CTA if useful. Include a visual — a mocked
   chat/interview snippet, an abstract gradient, or an animated element — something
   with visual weight, not just text on a blank background.
3. **Social proof / stat strip** — a thin row of a few punchy numbers (e.g. "31-day
   curriculum," "8 modules," "20 learner profiles") styled like trust badges — this is
   mocked/illustrative, not real usage stats, and that's fine.
4. **How it works** — 3-step horizontal or vertical flow: (1) We read your learning
   journey → (2) You get a live, adaptive interview → (3) You get structured,
   actionable feedback. Use icons + short copy per step.
5. **Feature grid** — 3–4 cards: "Adaptive follow-ups," "Grounded in your real
   progress," "Structured feedback," "Realistic interview flow" — icon, title, one
   sentence each.
6. **Callout / quote block** — one well-styled pull-quote or highlighted stat about
   why interview prep matters after a technical cohort — this can be a designed
   text block, doesn't need to be a fake testimonial with a fake name/photo.
7. **Final CTA band** — full-width contrasting section, one more push to
   `/interview`.
8. **Footer** — minimal: wordmark, one line of text, maybe a GitHub icon link to the
   repo.

Design direction: generous whitespace, one confident accent color plus neutrals, large
clean type for the headline, rounded-corner cards with soft shadows, smooth scroll-
triggered fade/slide-in on sections (via Framer Motion). Fully responsive — build
mobile-first, then verify desktop layout.

---

## 4. Interview Page (`/interview`) — the actual product

### 4.1 Candidate selection step (before the interview starts)
- Fetch/import the provided `candidates.json` (bundle it into the frontend as static
  data, same file the backend uses).
- Show a clean picker: a searchable list or grid of candidates by `name` + `jobRole`.
- On selection, generate a `sessionId` (use `crypto.randomUUID()`), and send the
  **first** request per the contract below to kick off the interview.

### 4.2 Live interview UI
- Chat-style transcript: interviewer messages left-aligned, candidate's typed answers
  right-aligned, distinct bubble styles.
- A persistent input box at the bottom (textarea, grows with content, Enter to send /
  Shift+Enter for newline).
- **Progress indicator** — subtly show interview progress (e.g. "Question 4 of ~8+")
  without breaking immersion — this is UI-only, not sent to/from the backend as a
  literal count field, just reflects how many turns have happened client-side.
- **Typing/thinking indicator** while waiting for the backend response (animated
  dots or similar) — critical, since Claude API calls take a few seconds and a static
  UI will feel broken without this.
- Auto-scroll to the latest message.

### 4.3 Completion / feedback screen
When a response comes back with `done: true`:
- Transition (animated) from the chat view into a **feedback summary screen**.
- Render the `feedback` object as designed cards, not raw JSON:
  - `summary` — a highlighted paragraph at the top
  - `strengths` — green-accented list/cards
  - `gaps` — amber-accented list/cards
  - `next` — a clear "recommended next steps" list, visually distinct as actionable
- Offer a "Start another interview" button that resets state and returns to candidate
  selection.

---

## 5. API contract (fixed — matches the backend exactly, do not deviate)

```
POST /api/interview
```

**Start:**
```json
// Request
{ "sessionId": "uuid-generated-client-side", "candidate": { ...full candidate object... } }
// Response
{ "reply": "string", "done": false }
```

**Each turn:**
```json
// Request
{ "sessionId": "same-uuid", "message": "candidate's typed answer" }
// Response
{ "reply": "string", "done": false }
```

**Final turn:**
```json
{
  "reply": "string",
  "done": true,
  "feedback": { "summary": "string", "strengths": [], "gaps": [], "next": [] }
}
```

Base URL comes from `VITE_API_URL` (already set up in this repo's `.env`).

---

## 6. Error handling & resilience (required, not optional)

The UI must never show a blank screen, a raw error, or an infinite spinner.

- **Network/API failure on any turn:** show an inline, styled error message in the
  transcript (e.g. "Something went wrong — retry?") with a **Retry** button that
  resends the same last request. Do not lose the conversation state on a failed call.
- **Timeout:** if a request takes longer than ~25s, show a friendly "still thinking,
  hang tight" state rather than nothing, and only show the error/retry option after
  that.
- **Malformed/unexpected response shape:** guard all field access (don't assume
  `reply` or `feedback` always exist exactly as expected) — fail gracefully into the
  error state above rather than crashing the React tree. Wrap the interview page in
  an error boundary as a last line of defense.
- **Empty/edge states:**
  - No candidates loaded → show a clear empty state, not a blank picker.
  - Feedback arrays (`strengths`/`gaps`/`next`) could theoretically be empty — design
    each card to look intentional even with zero items (e.g. "Nothing notable —
    solid across the board" for an empty gaps list), not a broken-looking empty box.

---

## 7. State management

Keep interview state in a single context/store with roughly this shape:

```js
{
  sessionId: string | null,
  candidate: object | null,
  messages: [{ role: 'interviewer' | 'candidate', content: string }],
  status: 'idle' | 'in_progress' | 'loading' | 'error' | 'complete',
  feedback: object | null,
}
```

Persist nothing to localStorage — a fresh reload is allowed to reset to candidate
selection, per the hackathon's explicit "no persistent accounts" scope.

---

## 8. Folder structure (extend existing `client/` — don't restructure what exists)

```
client/
├── src/
│   ├── main.jsx
│   ├── App.jsx                    # router setup
│   ├── pages/
│   │   ├── Landing.jsx
│   │   └── Interview.jsx
│   ├── components/
│   │   ├── landing/                # Hero, FeatureGrid, HowItWorks, etc.
│   │   ├── interview/
│   │   │   ├── CandidatePicker.jsx
│   │   │   ├── ChatTranscript.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── TypingIndicator.jsx
│   │   │   └── FeedbackScreen.jsx
│   │   └── ui/                     # shared Button, Card, Badge primitives
│   ├── data/
│   │   └── candidates.json
│   ├── lib/
│   │   └── apiClient.js            # fetch wrapper with retry + error normalization
│   ├── store/
│   │   └── interviewStore.js
│   └── index.css                   # Tailwind entry
```

---

## 9. Environment variables

```
VITE_API_URL=
```

---

## 10. Acceptance checklist (verify all before considering this done)

- [ ] Landing page has all 8 sections from Section 3, fully responsive at 390px width
- [ ] Interview flow works end-to-end against the real deployed backend
- [ ] Typing/thinking indicator shows during every backend call
- [ ] A killed/slow backend produces a visible retry state, never a blank screen or
      infinite spinner
- [ ] Feedback screen renders all 4 fields (`summary`, `strengths`, `gaps`, `next`)
      with sensible empty-state design
- [ ] No console errors in a full run-through
- [ ] Works on both mobile viewport (390px) and desktop
