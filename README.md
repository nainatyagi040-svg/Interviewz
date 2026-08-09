# Interviewz — AI Mock Interview Platform

Interviewz is a full-stack AI-powered mock interview platform that simulates realistic technical interviews using Google's Gemini AI.

Instead of asking fixed questions, the interviewer dynamically generates contextual follow-up questions based on the candidate's previous responses, creating a conversational interview experience similar to real technical interviews.

The platform also includes a live camera preview, speech synthesis and speech recognition, an animated interface, and structured AI-generated interview feedback.

🔗 **Live Demo:** https://interviewz-three.vercel.app

---

# Features

### 🤖 AI Interview

- AI-powered interviewer using Google Gemini
- Dynamic follow-up questions
- Candidate-specific interview flow
- Context-aware conversations
- Adaptive questioning strategy
- Minimum interview question flow before completion

---

### 👤 Candidate Management

- Candidate profile selection
- Personalized interview targeting
- Curriculum-based question selection
- Mission history analysis

---

### 🎤 AI Feedback

- Interview summary
- Strengths
- Improvement areas
- Recommended next steps
- Structured feedback cards

---

### 🎥 Camera Preview

- Live, floating self-camera preview during the interview
- Browser-based camera access (`getUserMedia`)
- Graceful handling of denied permission or no camera available
- Purely cosmetic — the stream is processed locally and is **not recorded, uploaded, or analyzed**

---

### 🔊 Speech Features

- AI interviewer questions read aloud automatically (Speech Synthesis)
- Candidates can answer by speaking, transcribed into the text input (Speech Recognition), with typing always available as well
- Both built on free, native browser APIs — no external service or key required

---

### ✨ Modern UI

- Animated landing page with a glowing AI orb, cursor-reactive spotlight, and floating context cards
- Floating sparkles and animated gradients across every page
- Framer Motion transitions
- Responsive design
- Modern, dark-themed interview interface

---

# Project Architecture

```
Interviewz
│
├── client
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── store
│   └── data
│
└── server
    ├── routes
    ├── services
    ├── validation
    ├── config
    ├── logger
    └── data
```

---

# Interview Flow

```
Candidate Selection
        │
        ▼
Start Interview
        │
        ▼
Gemini Generates Question
        │
        ▼
Candidate Response
        │
        ▼
Context-aware Follow-up
        │
        ▼
Interview Complete
        │
        ▼
AI Feedback Generation
```

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI | Google Gemini 3.5 Flash |
| State Management | Zustand |
| Animation | Framer Motion |
| Camera | Browser MediaDevices API (`getUserMedia`) |
| Icons | Lucide React |
| Speech | Web Speech API (Speech Synthesis + Speech Recognition) |
| Deployment | Vercel + Render |

---

# AI Features

- Dynamic Interview Generation
- Context-aware Follow-up Questions
- Candidate-specific Prompt Engineering
- AI Feedback Generation
- Adaptive Conversation Flow
- Interview State Management
- Curriculum-aware Question Selection

---

# Installation

## Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-3.5-flash
PORT=5000
FRONTEND_URL=http://localhost:5173
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

# Deployment

### Frontend

Vercel

https://interviewz-three.vercel.app

### Backend

Render

https://interviewz-backend.onrender.com

---

# AI Usage

The project was developed with AI-assisted planning, implementation, debugging, deployment support, prompt engineering, and UI refinement.

Detailed prompt history is available in:

```
PROMPTS.md
```

---

# Future Improvements

- Face/attention detection during the interview
- Interview analytics dashboard
- Admin panel
- Interview history
- Performance analytics over multiple sessions

---

# Screenshots

- Landing Page
- Candidate Selection
- Live AI Interview
- Camera Preview
- Interview Feedback

---

# License

MIT License

---

# Author

**Naina Tyagi**

GitHub: https://github.com/nainatyagi040-svg

LinkedIn: https://www.linkedin.com/in/nainatyagighaziabad
