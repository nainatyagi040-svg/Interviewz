import { referenceData } from '../data.js';
import { logger } from '../logger.js';
import { callClaude, fallbackQuestion, ClaudeUnavailableError } from './claudeClient.js';

// Completion gate (BACKEND.md §4.3): both must be true before we may return done:true.
const MIN_QUESTIONS = 8;
const MIN_DISTINCT_DAYS = 4;
// ~2 questions per targeted day → guarantees ≥4 distinct days by question 8.
const QUESTIONS_PER_DAY = 2;

// Modules worth probing deeper when a candidate breezed through them first try.
const HIGH_SIGNAL_KEYWORDS = ['rag', 'agent', 'mcp'];

const KICKOFF = 'Please begin the interview now.';

// ---------------------------------------------------------------------------
// 4.1 Question targeting
// ---------------------------------------------------------------------------

function isHighSignalModule(day) {
  const mod = referenceData.moduleForDay(day);
  if (!mod) return false;
  const title = String(mod.title || '').toLowerCase();
  return HIGH_SIGNAL_KEYWORDS.some((k) => title.includes(k));
}

/**
 * Score a candidate's missions against the curriculum and return a prioritized,
 * module-diverse list of target day objects (always ≥ MIN_DISTINCT_DAYS).
 */
export function selectTargetDays(candidate) {
  const missions = Array.isArray(candidate?.missions) ? candidate.missions : [];
  const scored = [];

  for (const m of missions) {
    const day = referenceData.getDay(m.day);
    if (!day) continue; // mission references a day not in the curriculum — skip

    let score = 0;
    let reason = '';
    if (m.skipped === true) {
      score = 80;
      reason = 'skipped this mission — probe whether they learned it elsewhere';
    } else if (m.passed === true && typeof m.attempts === 'number' && m.attempts >= 2) {
      score = 100 + m.attempts; // struggled but got there — great "how did you solve it" material
      reason = `passed only after ${m.attempts} attempts — explore how they worked through it`;
    } else if (m.passed === true && (m.attempts ?? 1) <= 1 && isHighSignalModule(m.day)) {
      score = 70; // strong on a high-signal topic — go deeper
      reason = 'passed first try in a high-signal module — go deep to find the ceiling';
    } else if (m.passed === true) {
      score = 30;
      reason = 'passed comfortably — confirm depth of understanding';
    } else {
      score = 20;
      reason = 'incomplete — assess current understanding';
    }
    scored.push({ day, score, reason, module: referenceData.moduleForDay(m.day)?.n ?? null });
  }

  scored.sort((a, b) => b.score - a.score);

  // First pass: pick highest-scoring days while spreading across distinct modules.
  const picked = [];
  const usedDays = new Set();
  const usedModules = new Set();
  for (const s of scored) {
    if (usedDays.has(s.day.day)) continue;
    if (s.module != null && usedModules.has(s.module)) continue;
    picked.push(s);
    usedDays.add(s.day.day);
    if (s.module != null) usedModules.add(s.module);
  }
  // Second pass: fill from remaining high scorers even if module repeats.
  for (const s of scored) {
    if (picked.length >= 6) break;
    if (usedDays.has(s.day.day)) continue;
    picked.push(s);
    usedDays.add(s.day.day);
  }

  // Pad with curriculum days from not-yet-used modules so we always have enough.
  if (picked.length < MIN_DISTINCT_DAYS + 1) {
    for (const day of referenceData.curriculum.days ?? []) {
      if (picked.length >= MIN_DISTINCT_DAYS + 1) break;
      if (usedDays.has(day.day)) continue;
      const modN = referenceData.moduleForDay(day.day)?.n ?? null;
      if (modN != null && usedModules.has(modN)) continue;
      picked.push({ day, score: 10, reason: 'core cohort topic', module: modN });
      usedDays.add(day.day);
      if (modN != null) usedModules.add(modN);
    }
  }

  return picked.map((p) => ({ ...p.day, _reason: p.reason }));
}

// ---------------------------------------------------------------------------
// Focus-day scheduling — deterministic so coverage is guaranteed regardless of
// what the model does. Question n (1-based) targets targetDays[floor((n-1)/2)].
// ---------------------------------------------------------------------------

function focusForQuestion(targetDays, questionNumber) {
  const idx = Math.min(Math.floor((questionNumber - 1) / QUESTIONS_PER_DAY), targetDays.length - 1);
  const isFollowUp = (questionNumber - 1) % QUESTIONS_PER_DAY !== 0;
  return { day: targetDays[idx], isFollowUp };
}

// ---------------------------------------------------------------------------
// 4.2 Prompt construction
// ---------------------------------------------------------------------------

function candidateBrief(candidate) {
  const mem = candidate?.member ?? {};
  const sig = candidate?.signals ?? {};
  const parts = [
    `Name: ${mem.name ?? 'the candidate'}`,
    mem.jobRole ? `Target role: ${mem.jobRole}` : null,
    mem.yearsExperience != null ? `Experience: ${mem.yearsExperience} years` : null,
    mem.education ? `Education: ${mem.education}` : null,
    sig.commitDays != null ? `Active on ${sig.commitDays} days of the cohort` : null,
    sig.missionsCompleted != null ? `Completed ${sig.missionsCompleted} missions` : null,
    sig.missionsFirstTry != null ? `${sig.missionsFirstTry} passed on the first try` : null,
  ].filter(Boolean);
  return parts.join('\n');
}

function dayBrief(day) {
  const mod = referenceData.moduleForDay(day.day);
  const objectives = Array.isArray(day.objectives) ? day.objectives.join('; ') : '';
  const tools = Array.isArray(day.tools) ? day.tools.join(', ') : '';
  return [
    `Day ${day.day}: ${day.title}${mod ? ` (Module ${mod.n} — ${mod.title})` : ''}`,
    objectives ? `Learning objectives: ${objectives}` : null,
    tools ? `Tools/topics: ${tools}` : null,
    day._reason ? `Why this is worth asking about: ${day._reason}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function questionSystemPrompt({ candidate, focusDay, isFollowUp, isFirst }) {
  return `You are a senior technical interviewer conducting a live, spoken-style technical interview. You are experienced, warm but rigorous, and you never sound like a quiz bot.

The candidate just finished a 31-day AI engineering cohort. Here is their profile:
${candidateBrief(candidate)}

Focus this question on:
${dayBrief(focusDay)}

Instructions:
- Ask exactly ONE question. Keep it to 1–3 sentences. Speak naturally, as a person would out loud — no headings, no bullet lists, no markdown.
- Ground the question in the specific topic above; make it clear you know what they studied.
${
  isFirst
    ? '- This is the very first question. Open with a brief, friendly one-sentence greeting, then ask your first question.'
    : isFollowUp
      ? "- This is a FOLLOW-UP. Read the candidate's most recent answer and dig deeper into it specifically — if it was shallow or hand-wavy, press for concrete detail; if it was strong, push to a harder edge of the same topic. Reference something they actually said."
      : "- Move to this new topic. You may briefly acknowledge their previous answer in a few words, then ask the new question."
}
- Stay fully in character as the interviewer. Never mention that you are an AI, never mention question counts, targets, days, or any internal tracking.
- Output only what you would say to the candidate — nothing else.`;
}

function feedbackSystemPrompt({ candidate }) {
  return `You are a senior technical interviewer who has just finished interviewing this candidate:
${candidateBrief(candidate)}

Review the ENTIRE conversation above (not just the last answer) and produce a fair, specific evaluation.

Respond with ONLY a single valid JSON object, no prose before or after, in exactly this shape:
{
  "summary": "2–4 sentence overall assessment of how the candidate performed",
  "strengths": ["specific strength grounded in what they said", "..."],
  "gaps": ["specific gap or area to improve, grounded in the conversation", "..."],
  "next": ["concrete, actionable next step for their preparation", "..."]
}

Rules:
- Reference specifics from the conversation — topics discussed, quality of reasoning — not generic filler.
- 2–4 items per array. If they were genuinely strong with no notable gaps, it is fine to say so in one honest item rather than inventing weaknesses.
- Output must be valid JSON and nothing else.`;
}

// ---------------------------------------------------------------------------
// Conversation formatting for the Anthropic Messages API
// ---------------------------------------------------------------------------

function buildMessages(conversation) {
  // Anthropic requires the first message to be a user turn and roles to alternate.
  // Our stored conversation is [assistant, user, assistant, ...]; prepend a synthetic
  // user kickoff so the sequence is always valid.
  return [{ role: 'user', content: KICKOFF }, ...conversation];
}

// ---------------------------------------------------------------------------
// Feedback parsing + deterministic fallback
// ---------------------------------------------------------------------------

function coerceStringArray(value, fallback) {
  if (Array.isArray(value)) {
    const cleaned = value.map((v) => String(v)).filter((v) => v.trim().length > 0);
    if (cleaned.length) return cleaned;
  }
  return fallback;
}

function parseFeedback(text, candidate) {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) throw new Error('no JSON object found');
    const obj = JSON.parse(text.slice(start, end + 1));
    return {
      summary:
        typeof obj.summary === 'string' && obj.summary.trim()
          ? obj.summary.trim()
          : deterministicFeedback(candidate).summary,
      strengths: coerceStringArray(obj.strengths, deterministicFeedback(candidate).strengths),
      gaps: coerceStringArray(obj.gaps, deterministicFeedback(candidate).gaps),
      next: coerceStringArray(obj.next, deterministicFeedback(candidate).next),
    };
  } catch (err) {
    logger.warn({ err: err.message }, 'feedback parse failed — using deterministic fallback');
    return deterministicFeedback(candidate);
  }
}

/** Feedback derived purely from candidate signals — used when Claude is down or output is unparseable. */
function deterministicFeedback(candidate) {
  const name = candidate?.member?.name ?? 'The candidate';
  const missions = Array.isArray(candidate?.missions) ? candidate.missions : [];
  const firstTry = missions.filter((m) => m.passed && (m.attempts ?? 1) <= 1);
  const struggled = missions.filter((m) => m.passed && (m.attempts ?? 1) >= 2);
  const skipped = missions.filter((m) => m.skipped);

  const strengths = [];
  if (firstTry.length) strengths.push(`Strong first-pass grasp of topics like ${firstTry.slice(0, 3).map((m) => m.title).join(', ')}.`);
  if ((candidate?.signals?.commitDays ?? 0) >= 20) strengths.push('Consistent engagement across the cohort — showed up and put in the reps.');
  if (!strengths.length) strengths.push('Completed the interview and engaged with each topic.');

  const gaps = [];
  if (struggled.length) gaps.push(`Topics that took several attempts (${struggled.slice(0, 3).map((m) => m.title).join(', ')}) are worth reinforcing.`);
  if (skipped.length) gaps.push(`Skipped material such as ${skipped.slice(0, 3).map((m) => m.title).join(', ')} should be revisited.`);
  if (!gaps.length) gaps.push('Nothing notable — solid across the board.');

  const next = [
    'Rebuild one project from the cohort end to end without notes to cement the fundamentals.',
    'Write short explanations of your two weakest topics as if teaching them — teaching exposes gaps.',
    'Do a timed mock interview focused on the areas that felt least comfortable.',
  ];

  return {
    summary: `${name} completed a full technical interview spanning several curriculum topics, showing a working command of the material with clear areas to sharpen before a real on-site.`,
    strengths,
    gaps,
    next,
  };
}

// ---------------------------------------------------------------------------
// Public API — one call per turn
// ---------------------------------------------------------------------------

function isComplete(session) {
  return session.questionCount >= MIN_QUESTIONS && (session.daysCovered?.length ?? 0) >= MIN_DISTINCT_DAYS;
}

/**
 * Start turn. Creates a fresh session object (not yet persisted) and produces
 * the first interviewer question. Returns { session, reply, done }.
 */
export async function startInterview(sessionId, candidate) {
  const targetDays = selectTargetDays(candidate);
  const session = {
    sessionId,
    candidate,
    conversation: [],
    daysCovered: [],
    questionCount: 0,
    status: 'IN_PROGRESS',
    feedback: null,
    // targetDays are derived deterministically from the candidate each turn, so
    // we don't need to persist them — but caching avoids recompute within a turn.
  };

  const { day: focusDay } = focusForQuestion(targetDays, 1);
  const system = questionSystemPrompt({ candidate, focusDay, isFollowUp: false, isFirst: true });

  let reply;
  try {
    reply = await callClaude({ system, messages: buildMessages(session.conversation) });
  } catch (err) {
    if (err instanceof ClaudeUnavailableError) {
      logger.warn({ sessionId, day: focusDay.day }, 'claude unavailable on start — using fallback question');
      reply = fallbackQuestion(focusDay);
    } else {
      throw err;
    }
  }

  session.conversation.push({ role: 'assistant', content: reply });
  session.questionCount = 1;
  session.daysCovered = [focusDay.day];

  return { session, reply, done: false };
}

/**
 * Message turn. Appends the candidate's answer, then either wraps up with
 * feedback (if the completion gate is met) or asks the next question.
 * Mutates and returns the given session. Returns { session, reply, done, feedback? }.
 */
export async function continueInterview(session, message) {
  const candidate = session.candidate;
  const targetDays = selectTargetDays(candidate);

  session.conversation.push({ role: 'user', content: message });

  // Wrap-up path.
  if (isComplete(session)) {
    const system = feedbackSystemPrompt({ candidate });
    let feedback;
    try {
      const raw = await callClaude({
        system,
        messages: buildMessages(session.conversation),
        maxTokens: 1200,
        temperature: 0.4,
      });
      feedback = parseFeedback(raw, candidate);
    } catch (err) {
      if (err instanceof ClaudeUnavailableError) {
        logger.warn({ sessionId: session.sessionId }, 'claude unavailable on wrap-up — using deterministic feedback');
        feedback = deterministicFeedback(candidate);
      } else {
        throw err;
      }
    }

    const reply = 'Interview completed.';
    session.conversation.push({ role: 'assistant', content: reply });
    session.status = 'COMPLETE';
    session.feedback = feedback;
    return { session, reply, done: true, feedback };
  }

  // Next-question path.
  const nextNumber = session.questionCount + 1;
  const { day: focusDay, isFollowUp } = focusForQuestion(targetDays, nextNumber);
  const system = questionSystemPrompt({ candidate, focusDay, isFollowUp, isFirst: false });

  let reply;
  try {
    reply = await callClaude({ system, messages: buildMessages(session.conversation) });
  } catch (err) {
    if (err instanceof ClaudeUnavailableError) {
      logger.warn({ sessionId: session.sessionId, day: focusDay.day }, 'claude unavailable — using fallback question');
      reply = fallbackQuestion(focusDay);
    } else {
      throw err;
    }
  }

  session.conversation.push({ role: 'assistant', content: reply });
  session.questionCount = nextNumber;
  if (!session.daysCovered.includes(focusDay.day)) session.daysCovered.push(focusDay.day);

  return { session, reply, done: false };
}
