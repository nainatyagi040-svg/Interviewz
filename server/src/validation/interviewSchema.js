import { z } from 'zod';

/**
 * A candidate object as it appears in candidates.json. We validate the shape
 * loosely — missions can be either { passed, attempts } or { skipped: true } —
 * and allow extra fields so we never reject a valid-but-richer real dataset.
 */
const missionSchema = z
  .object({
    day: z.number().int().nonnegative().optional(),
    title: z.string().optional(),
    passed: z.boolean().optional(),
    attempts: z.number().int().nonnegative().optional(),
    skipped: z.boolean().optional(),
  })
  .passthrough();

const candidateSchema = z
  .object({
    member: z
      .object({
        id: z.string().optional(),
        name: z.string().min(1, 'candidate.member.name is required'),
        jobRole: z.string().optional(),
        yearsExperience: z.number().optional(),
        education: z.string().optional(),
        status: z.string().optional(),
      })
      .passthrough(),
    missions: z.array(missionSchema).default([]),
    signals: z.record(z.any()).optional(),
  })
  .passthrough();

/** Turn 1 — start the interview. */
const startTurnSchema = z.object({
  sessionId: z.string().min(1, 'sessionId is required'),
  candidate: candidateSchema,
});

/** Turn 2..N — a candidate answer. `message` must be a non-empty string. */
const messageTurnSchema = z.object({
  sessionId: z.string().min(1, 'sessionId is required'),
  message: z.string().min(1, 'message must be a non-empty string').max(8000, 'message too long'),
});

/**
 * Parse a request body into one of the two accepted shapes.
 * Presence of `candidate` => start turn; presence of `message` => message turn.
 * Returns { kind, data } on success, or throws a ZodError.
 */
export function parseInterviewBody(body) {
  const b = body ?? {};
  if (Object.prototype.hasOwnProperty.call(b, 'candidate')) {
    return { kind: 'start', data: startTurnSchema.parse(b) };
  }
  if (Object.prototype.hasOwnProperty.call(b, 'message')) {
    return { kind: 'message', data: messageTurnSchema.parse(b) };
  }
  // Neither shape — surface a clear, single error.
  throw new z.ZodError([
    {
      code: 'custom',
      path: [],
      message: 'Request must include either "candidate" (to start) or "message" (to continue).',
    },
  ]);
}

export { startTurnSchema, messageTurnSchema, candidateSchema };
