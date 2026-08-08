# Interviewz — AI Mock Interview Platform

Interviewz is a full-stack AI-powered mock interview platform that simulates realistic technical interviews using Google's Gemini AI.

Instead of asking fixed questions, the interviewer dynamically generates contextual follow-up questions based on the candidate's previous responses, creating a conversational interview experience similar to real technical interviews.

The platform also includes live camera preview, face detection, head-direction monitoring, speech synthesis, animated UI, and structured AI-generated interview feedback.

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

### 🎥 Camera Monitoring

- Live camera preview
- Browser-based camera access
- Face detection
- Head direction detection
- Face presence monitoring
- Interview attention monitoring prototype
- Warning counter foundation

---

### 🔊 Speech Features

- AI interviewer speech synthesis
- Automatic question narration

---

### ✨ Modern UI

- Animated landing page
- Floating sparkles
- Animated gradients
- Framer Motion transitions
- Responsive design
- Modern interview interface

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
│   ├── utils
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
| Camera | MediaPipe Tasks Vision |
| Icons | Lucide React |
| Speech | Web Speech API |
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

# Camera & Presence Detection

The interview interface includes browser-based camera monitoring.

Current implementation includes:

- Live Camera Preview
- Face Detection
- Head Direction Detection
- Face Presence Detection
- Warning Counter Prototype

The camera stream is processed locally inside the browser and is **not uploaded or stored**.

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

- Voice-based candidate responses
- Multiple face detection
- Eye gaze tracking
- Automatic interview termination
- Interview analytics dashboard
- Admin panel
- Interview history
- Performance analytics

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
