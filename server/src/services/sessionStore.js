import { createClient } from '@supabase/supabase-js';
import { logger } from '../logger.js';
import { ServiceUnavailableError } from '../errors.js';

const TABLE = 'interview_sessions';

let client = null;

/** Lazily create the Supabase client so the server can boot even before .env is filled. */
function getClient() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new ServiceUnavailableError('temporarily unavailable, please retry');
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

/** Retry a Supabase operation once before giving up. */
async function withRetry(fn, label) {
  try {
    return await fn();
  } catch (err) {
    logger.warn({ label, err: err?.message }, 'supabase op failed, retrying once');
    try {
      return await fn();
    } catch (err2) {
      logger.error({ label, err: err2?.message }, 'supabase op failed after retry');
      throw new ServiceUnavailableError('temporarily unavailable, please retry', err2);
    }
  }
}

/** DB row -> in-memory session shape used by the agent. */
function rowToSession(row) {
  if (!row) return null;
  return {
    sessionId: row.session_id,
    candidate: row.candidate,
    conversation: row.conversation ?? [],
    daysCovered: row.days_covered ?? [],
    questionCount: row.question_count ?? 0,
    status: row.status ?? 'IN_PROGRESS',
    feedback: row.feedback ?? null,
  };
}

/** Read a session by id. Returns null if it does not exist. */
export async function getSession(sessionId) {
  return withRetry(async () => {
    const { data, error } = await getClient()
      .from(TABLE)
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();
    if (error) throw error;
    return rowToSession(data);
  }, 'getSession');
}

/** Insert or update the full session row (upsert on the primary key). */
export async function saveSession(session) {
  return withRetry(async () => {
    const row = {
      session_id: session.sessionId,
      candidate: session.candidate,
      conversation: session.conversation ?? [],
      days_covered: session.daysCovered ?? [],
      question_count: session.questionCount ?? 0,
      status: session.status ?? 'IN_PROGRESS',
      feedback: session.feedback ?? null,
    };
    const { error } = await getClient().from(TABLE).upsert(row, { onConflict: 'session_id' });
    if (error) throw error;
    return session;
  }, 'saveSession');
}
