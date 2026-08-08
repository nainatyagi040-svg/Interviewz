import { ZodError } from 'zod';
import { ApiError } from '../errors.js';
import { logger } from '../logger.js';

/**
 * Final middleware in the chain. Always returns valid JSON — never an HTML stack
 * trace — and never leaks internal error detail or secrets to the client.
 */
// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity (4 args)
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const msg = err.errors?.[0]?.message ?? 'Invalid request body';
    logger.warn({ err: msg }, 'validation error');
    return res.status(400).json({ error: msg });
  }

  if (err instanceof ApiError) {
    if (err.statusCode >= 500) {
      logger.error({ err: err.message, cause: err.cause?.message }, 'service error');
    } else {
      logger.warn({ err: err.publicMessage }, 'client error');
    }
    return res.status(err.statusCode).json({ error: err.publicMessage });
  }

  // Malformed JSON body (thrown by express.json before the route runs) → 400, not 500.
  if (err?.type === 'entity.parse.failed' || (err instanceof SyntaxError && 'body' in err)) {
    logger.warn('malformed JSON body');
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  // Payload too large.
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body too large.' });
  }

  // Anything unexpected: log the detail server-side, return a generic message.
  logger.error({ err: err?.message, stack: err?.stack }, 'unhandled error in request');
  return res.status(500).json({ error: 'Internal server error' });
}

/** 404 for unknown routes — still valid JSON. */
export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not found' });
}
