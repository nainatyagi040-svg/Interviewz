# AI Usage Log — Loop (AI Interview Agent)

This log documents real prompts and AI-assisted decisions made while building
this project, in the order features were built.

## Backend & Frontend Architecture

### Prompt
Asked for two complete reference specs (BACKEND.md, FRONTEND.md) to hand to an
AI coding agent, covering tech stack, the required POST /api/interview API
contract, data models matching the provided curriculum.json/candidates.json,
error handling/fallback requirements, and a YC-style landing page spec for
the frontend.

### What it produced / how we used it
Generated two full markdown specs locking in: Node/Express + Supabase +
Google Gemini backend, React/Vite + Tailwind frontend, exact request/response
formats from the technical spec, and a fallback-question strategy so the
interview never hard-fails if the model API is unreachable. These became the
project brief handed to the coding agent that scaffolded the app.

## Interview Question Targeting Logic

### Prompt
Asked how to select which curriculum days to interview a candidate on, given
their missions array (passed/attempts/skipped), so questions are personalized
rather than random.

### What it produced / how we used it
A targeting strategy: prioritize days the candidate struggled on (high
attempts), days they skipped, and high-signal modules (RAG, Agentic AI, MCP)
passed on the first try — spread across at least 4 distinct days, minimum 8
questions, before the interview is allowed to end.

## Debugging: Claude API 401 / AgentRouter misconfiguration

### Prompt
Provided terminal error logs showing repeated 401 "invalid x-api-key" errors
and asked why the AI interviewer kept falling back to template questions
instead of generating real ones.

### What it produced / how we used it
Diagnosed a leftover `ANTHROPIC_BASE_URL` pointing at a third-party relay
service instead of Anthropic directly, and a placeholder/empty API key in
`.env`. Cleaned the environment file and confirmed the client code itself was
already correct.

## Pivot: Claude → Gemini API

### Prompt
Explained no budget was available for Anthropic API credits and asked for the
fastest working alternative, given the hackathon rules allow any AI model.

### What it produced / how we used it
A drop-in replacement for the model-calling module (`claudeClient.js`) that
swapped Anthropic's SDK for Google's `@google/genai` SDK, keeping the exact
same function signature (`callClaude`, `fallbackQuestion`) so no other file in
the app needed to change. Also caught and fixed a deprecated model ID
(`gemini-2.5-flash` → `gemini-3.5-flash`) via a standalone test script that
isolated the API call from the rest of the app.

## Bug: repeated/duplicate interview questions on live deployment

### Prompt
Reported that after deploying, the live site kept repeating the same question
instead of progressing, and asked to find the exact cause using terminal/
network logs rather than guessing.

### What it produced / how we used it
Traced it to two separate misconfigurations: (1) a missing SPA rewrite rule
on Vercel causing `/interview` to 404 on direct load/refresh, fixed by adding
`client/vercel.json`; (2) the deployed backend on Render was missing the
`GEMINI_API_KEY` and other environment variables that only existed locally,
so it was silently running on fallback questions. Added the missing env vars
to both Render and Vercel and redeployed.

## Feedback screen & completion logic

### Prompt
Asked for the frontend to render the final feedback object (summary,
strengths, gaps, next steps) as designed cards instead of raw JSON, with
sensible empty states.

### What it produced / how we used it
Feedback screen implementation matching the technical spec's required fields,
verified end-to-end on the live deployment with a real interview transcript.
