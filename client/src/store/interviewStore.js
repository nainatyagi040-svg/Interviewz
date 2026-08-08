import { create } from 'zustand';
import { postInterview, ApiError } from '../lib/apiClient.js';

/**
 * Single source of truth for the interview flow.
 * Shape mirrors FRONTEND.md §7. Nothing is persisted to localStorage — a reload
 * resets to candidate selection, per the hackathon scope.
 *
 * status: 'idle' | 'in_progress' | 'loading' | 'error' | 'complete'
 */

// We remember the last request payload so a failed turn can be retried verbatim
// without losing conversation state.
const initialState = {
  sessionId: null,
  candidate: null,
  messages: [], // [{ role: 'interviewer' | 'candidate', content }]
  status: 'idle',
  feedback: null,
  error: null, // { message, kind } | null
  _lastPayload: null, // internal: the last body sent, for retry
};

export const useInterviewStore = create((set, get) => ({
  ...initialState,

  reset: () => set({ ...initialState }),

  /** Kick off an interview for a chosen candidate. */
  startInterview: async (candidate) => {
    const sessionId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

    const payload = { sessionId, candidate };
    set({
      sessionId,
      candidate,
      messages: [],
      feedback: null,
      error: null,
      status: 'loading',
      _lastPayload: payload,
    });

    await runTurn(set, get, payload, /* appendCandidateMessage */ null);
  },

  /** Send the candidate's typed answer. */
  sendMessage: async (text) => {
    const content = text.trim();
    const { sessionId, status } = get();
    if (!content || !sessionId || status === 'loading' || status === 'complete') return;

    const payload = { sessionId, message: content };
    set((s) => ({
      messages: [...s.messages, { role: 'candidate', content }],
      status: 'loading',
      error: null,
      _lastPayload: payload,
    }));

    await runTurn(set, get, payload, null);
  },

  /** Retry the last failed turn using the exact same payload. */
  retryLast: async () => {
    const { _lastPayload, status } = get();
    if (!_lastPayload || status === 'loading') return;
    set({ status: 'loading', error: null });
    await runTurn(set, get, _lastPayload, null);
  },
}));

/**
 * Execute one API turn and fold the result into state.
 * On success: append interviewer reply (or transition to feedback on done).
 * On failure: set status 'error' with a normalized message — conversation is kept.
 */
async function runTurn(set, get, payload) {
  try {
    const result = await postInterview(payload);

    if (result.done) {
      set((s) => ({
        messages: result.reply
          ? [...s.messages, { role: 'interviewer', content: result.reply }]
          : s.messages,
        feedback: result.feedback ?? null,
        status: 'complete',
        error: null,
      }));
      return;
    }

    set((s) => ({
      messages: [...s.messages, { role: 'interviewer', content: result.reply }],
      status: 'in_progress',
      error: null,
    }));
  } catch (err) {
    const message =
      err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
    const kind = err instanceof ApiError ? err.kind : 'unknown';
    set({ status: 'error', error: { message, kind } });
  }
}
