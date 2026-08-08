import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import pinoHttp from 'pino-http';

import { logger } from './logger.js';
import { referenceData } from './data.js';
import interviewRouter from './routes/interview.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// --- Process-level safety nets: log and stay alive rather than crash the server. ---
process.on('unhandledRejection', (reason) => {
  logger.error({ reason: reason?.message ?? reason }, 'unhandledRejection');
});
process.on('uncaughtException', (err) => {
  logger.error({ err: err?.message, stack: err?.stack }, 'uncaughtException');
});

const app = express();
app.set('trust proxy', 1); // correct client IPs behind Render/other proxies (for rate limiting)

// --- CORS: restrict to the configured frontend origin(s); no wildcard in production. ---
const allowedOrigins = (process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin/non-browser tools (no Origin header) and any explicitly allowed origin.
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

// --- Health check (from the skeleton). ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    cohort: referenceData.curriculum?.cohort ?? null,
    candidates: referenceData.candidates?.candidates?.length ?? 0,
  });
});

// --- Per-IP rate limiting on the interview endpoint (abuse control, generous for real pacing). ---
const interviewLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});
app.use('/api', interviewLimiter, interviewRouter);

// --- 404 + global error handler (must be last). ---
app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  logger.info({ port, allowedOrigins }, 'interview server listening');
});

export default app;
