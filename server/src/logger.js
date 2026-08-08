import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  // Redact anything that could leak a secret if an object is ever logged whole.
  redact: {
    paths: ['req.headers.authorization', 'apiKey', 'ANTHROPIC_API_KEY', 'SUPABASE_SERVICE_KEY'],
    censor: '[redacted]',
  },
});
