/**
 * Small fetch wrapper around the interview API.
 * - Base URL from VITE_API_URL
 * - 25s timeout via AbortController
 * - one retry on transient/network failure
 * - normalized errors (never throws a raw fetch error at the UI)
 * - defensive response-shape guarding (never assume fields exist)
 */

const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const TIMEOUT_MS = 25_000;

/** A normalized error the UI can rely on. */
export class ApiError extends Error {
  constructor(message, { kind = 'unknown', status } = {}) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind; // 'timeout' | 'network' | 'http' | 'shape' | 'unknown'
    this.status = status;
  }
}

function timeoutSignal(ms) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

async function rawPost(path, body) {
  if (!BASE_URL) {
    throw new ApiError('API URL is not configured. Set VITE_API_URL.', { kind: 'network' });
  }
  const { signal, clear } = timeoutSignal(TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      // Non-JSON response body.
      data = null;
    }

    if (!res.ok) {
      const message =
        (data && typeof data.error === 'string' && data.error) ||
        `Request failed (${res.status})`;
      throw new ApiError(message, { kind: 'http', status: res.status });
    }
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === 'AbortError') {
      throw new ApiError('The request timed out.', { kind: 'timeout' });
    }
    throw new ApiError('Network error — please check your connection.', { kind: 'network' });
  } finally {
    clear();
  }
}

/** Should we retry this error once? Only transient failures, never a 4xx. */
function isRetryable(err) {
  if (!(err instanceof ApiError)) return false;
  if (err.kind === 'network') return true;
  if (err.kind === 'http' && err.status >= 500) return true;
  return false;
}

/** Validate the minimal contract shape and normalize it. Throws ApiError('shape') if broken. */
function normalizeTurn(data) {
  if (!data || typeof data !== 'object') {
    throw new ApiError('Unexpected response from the server.', { kind: 'shape' });
  }
  const reply = typeof data.reply === 'string' ? data.reply : '';
  const done = data.done === true;
  if (!reply && !done) {
    throw new ApiError('The server returned an incomplete response.', { kind: 'shape' });
  }
  const result = { reply, done };
  if (done) {
    const fb = data.feedback && typeof data.feedback === 'object' ? data.feedback : {};
    result.feedback = {
      summary: typeof fb.summary === 'string' ? fb.summary : '',
      strengths: Array.isArray(fb.strengths) ? fb.strengths.filter((s) => typeof s === 'string') : [],
      gaps: Array.isArray(fb.gaps) ? fb.gaps.filter((s) => typeof s === 'string') : [],
      next: Array.isArray(fb.next) ? fb.next.filter((s) => typeof s === 'string') : [],
    };
  }
  return result;
}

/** POST to /api/interview with one retry on transient failure. Returns a normalized turn. */
export async function postInterview(body) {
  try {
    const data = await rawPost('/api/interview', body);
    return normalizeTurn(data);
  } catch (err) {
    if (isRetryable(err)) {
      // brief pause, then one retry
      await new Promise((r) => setTimeout(r, 700));
      const data = await rawPost('/api/interview', body);
      return normalizeTurn(data);
    }
    throw err;
  }
}
