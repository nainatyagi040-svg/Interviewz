import { Router } from 'express';
import { ZodError } from 'zod';
import { parseInterviewBody } from '../validation/interviewSchema.js';
import { getSession, saveSession } from '../services/sessionStore.js';
import { startInterview, continueInterview } from '../services/interviewAgent.js';
import { ValidationError, SessionNotFoundError } from '../errors.js';
import { logger } from '../logger.js';

const router = Router();

router.post('/interview', async (req, res, next) => {
  let parsed;
  try {
    parsed = parseInterviewBody(req.body);
  } catch (err) {
    if (err instanceof ZodError) {
      const msg = err.errors?.[0]?.message ?? 'Invalid request body';
      return next(new ValidationError(msg, err));
    }
    return next(err);
  }

  try {
    if (parsed.kind === 'start') {
      const { sessionId, candidate } = parsed.data;
      const { session, reply, done } = await startInterview(sessionId, candidate);
      await saveSession(session);
      logger.info({ sessionId, turn: 'start' }, 'interview started');
      return res.json({ reply, done });
    }

    // message turn
    const { sessionId, message } = parsed.data;
    const existing = await getSession(sessionId);
    if (!existing) {
      return next(new SessionNotFoundError());
    }
    if (existing.status === 'COMPLETE') {
      // Idempotent-ish: the interview is already done; return the stored feedback again.
      return res.json({ reply: 'Interview completed.', done: true, feedback: existing.feedback ?? null });
    }

    const result = await continueInterview(existing, message);
    await saveSession(result.session);
    logger.info(
      { sessionId, turn: 'message', questionCount: result.session.questionCount, done: result.done },
      'interview turn processed'
    );

    const payload = { reply: result.reply, done: result.done };
    if (result.done) payload.feedback = result.feedback;
    return res.json(payload);
  } catch (err) {
    return next(err);
  }
});

export default router;
