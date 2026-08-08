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

using Framer Motion while maintaining responsiveness.

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

No camera data is uploaded or stored.

---

# Face Detection using MediaPipe

## Prompt

Requested face detection to monitor whether the candidate remains visible during
the interview.

## What it produced / how we used it

Integrated Google's MediaPipe Tasks Vision library.

Implemented:

- Face detector initialization
- Video stream analysis
- Face presence detection
- Real-time status updates

showing:

- Face Detected
- No Face

inside the interview interface.

---

# Head Direction Detection

## Prompt

Requested detection of candidate head direction to determine whether the user
is facing the interview screen.

## What it produced / how we used it

Implemented landmark-based head direction estimation using MediaPipe facial
landmarks.

Current supported states include:

- CENTER
- LEFT
- RIGHT
- UP
- DOWN
- NO_FACE

This provides the foundation for future interview attention monitoring.

---

# Attention Monitoring Prototype

## Prompt

Requested an interview monitoring prototype capable of tracking repeated
attention loss.

## What it produced / how we used it

Implemented the first-stage monitoring logic including:

- warning counter
- direction monitoring
- interview block state
- cooldown timer between warnings

This forms the base for future automated interview supervision features.

---

# Speech-enabled Interview Experience

## Prompt

Requested a more realistic interview experience where interviewer questions are
spoken aloud.

## What it produced / how we used it

Integrated browser Speech Synthesis to read interviewer questions automatically,
making the interaction closer to a real interview.

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
- MediaPipe Tasks Vision
- Speech Synthesis API
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
