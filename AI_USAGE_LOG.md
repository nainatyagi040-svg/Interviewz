# AI Usage Log — Interviewz (AI Mock Interview Platform)

This document records the major AI-assisted design decisions, prompts, debugging
sessions, and implementation work completed while building Interviewz.

The project was developed iteratively with AI assistance, while all integration,
testing, debugging, deployment, and verification were performed manually.

---

# Backend & Frontend Architecture

## Prompt

Requested complete backend and frontend specifications describing the project
architecture, technology stack, API contracts, folder structure, interview
workflow, error handling strategy, and frontend UI requirements before writing
production code.

## What it produced / how we used it

Generated architecture documents that defined:

- Express.js backend
- React + Vite frontend
- Interview session workflow
- API request/response formats
- Validation strategy
- Candidate data model
- Curriculum data model
- Feedback generation flow
- Error handling and fallback behaviour

These specifications became the implementation blueprint for the project.

---

# Personalized Interview Question Strategy

## Prompt

Asked how interview questions should be selected so every candidate receives
questions based on their actual learning history instead of a fixed sequence.

## What it produced / how we used it

Designed a targeting strategy that prioritizes:

- Weak curriculum areas
- High-attempt missions
- Skipped missions
- High-signal AI topics
- Balanced curriculum coverage

This resulted in interviews that adapt to the selected candidate profile rather
than asking static questions.

---

# Claude API Authentication Failure

## Prompt

Provided backend logs showing repeated Claude API authentication failures and
asked why interview generation always fell back to template questions.

## What it produced / how we used it

Identified an incorrect API configuration caused by:

- Invalid API key
- Incorrect API endpoint
- Leftover relay configuration

After correcting the environment configuration the backend authentication
pipeline was restored.

---

# Migration from Claude API to Google Gemini

## Prompt

Requested a cost-free alternative to Claude while keeping the existing backend
architecture unchanged.

## What it produced / how we used it

Replaced Anthropic SDK with Google's Gemini SDK while preserving the existing
service interface.

Only the model client changed while the interview engine continued calling the
same functions.

Additional improvements included:

- retry handling
- timeout protection
- fallback questions
- model configuration cleanup

without changing interview business logic.

---

# Duplicate Interview Questions

## Prompt

Reported that deployed interviews repeatedly asked the same question and asked
for debugging using logs instead of assumptions.

## What it produced / how we used it

The issue was traced to deployment configuration instead of interview logic.

Fixes included:

- SPA rewrite configuration on Vercel
- Render environment variables
- Gemini API configuration
- deployment verification

After redeployment interviews progressed normally.

---

# Feedback Screen

## Prompt

Requested a proper feedback page instead of displaying raw JSON.

## What it produced / how we used it

Implemented a structured interview summary showing:

- Overall Summary
- Strengths
- Improvement Areas
- Recommended Next Steps

with graceful handling of empty values.

---

# Modern UI & Animation System

## Prompt

Requested a modern interview experience with animated backgrounds and continuous
visual effects similar to modern AI products.

## What it produced / how we used it

Implemented:

- Animated gradient background
- Floating sparkles
- Motion-based page transitions
- Interactive candidate cards
- Enhanced landing page visuals
- A breathing AI orb, cursor-reactive spotlight, and floating context cards on
  the landing hero for a more premium first impression

using Framer Motion while maintaining responsiveness. Iterated after an early
version had floating decorative elements overlapping and obscuring real
content, and after a couple of build-breaking JSX syntax issues introduced
during iteration (a stray import statement placed inside a component body, and
smart-quote corruption from copy-pasting text) — both traced from the exact
build error and fixed directly.

---

# Camera Preview Integration

## Prompt

Requested a floating self-camera preview similar to modern interview platforms,
without recording or transmitting any video.

## What it produced / how we used it

Implemented a browser-based live camera preview using:

- getUserMedia()
- React Hooks
- Video stream lifecycle management

including:

- camera permission handling
- unavailable device handling
- hide camera option
- responsive floating preview

No camera data is uploaded, recorded, or stored — the preview is local and
cosmetic only. An earlier iteration explored adding face-detection-based
attention monitoring on top of this preview; it was reverted after introducing
a build-breaking hook error, in favor of keeping the camera feature simple and
stable.

---

# Speech-enabled Interview Experience

## Prompt

Requested a more realistic interview experience where interviewer questions are
spoken aloud, and where candidates could optionally answer by speaking instead
of typing.

## What it produced / how we used it

Integrated the browser's built-in Speech Synthesis API to read interviewer
questions aloud automatically, and the Speech Recognition API to transcribe a
candidate's spoken answer into the existing text input (typing remains
available as the default/fallback). Both are native browser APIs with no
external service or key required, and degrade silently on unsupported
browsers.

---

# Deployment Debugging

## Prompt

Provided deployment errors occurring only in production and requested diagnosis.

## What it produced / how we used it

Resolved multiple deployment issues involving:

- Vercel routing
- Render environment variables
- API configuration
- frontend deployment
- backend connectivity

resulting in a stable deployed application.

---

# Technologies Used with AI Assistance

- Google Gemini API
- React
- Vite
- Express.js
- Tailwind CSS
- Framer Motion
- Zustand
- Speech Synthesis / Speech Recognition APIs (browser-native)
- Node.js

---

# Development Workflow

AI assistance was primarily used for:

- architecture planning
- implementation guidance
- debugging
- deployment troubleshooting
- prompt engineering
- UI refinement

while all code integration, testing, deployment, verification, and iterative
debugging were completed throughout development.
