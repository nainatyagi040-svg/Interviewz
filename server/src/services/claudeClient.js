console.log("claudeClient loaded");
import { GoogleGenAI } from "@google/genai";
import pRetry, { AbortError } from "p-retry";
import { logger } from "../logger.js";

const REQUEST_TIMEOUT_MS = 20_000;
const MAX_ATTEMPTS = 3;

let client = null;

function getClient() {
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Gemini key exists:", !!apiKey);
  if (!apiKey) {
    const err = new Error("GEMINI_API_KEY is not configured");
    err.code = "NO_API_KEY";
    throw err;
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

/** Thrown when the model API is unreachable after all retries — the agent catches this and falls back. */
export class ClaudeUnavailableError extends Error {
  constructor(cause) {
    super("Model API unavailable after retries");
    this.name = "ClaudeUnavailableError";
    this.cause = cause;
  }
}

function isNonRetryable(err) {
  const status = err?.status ?? err?.statusCode;
  if (err?.code === "NO_API_KEY") return true;
  return (
    typeof status === "number" &&
    status >= 400 &&
    status < 500 &&
    status !== 429
  );
}

// Our stored conversation uses Anthropic-style roles ('user'/'assistant').
// Gemini expects 'user'/'model' and a parts[] array instead of plain content.
function toGeminiContents(messages) {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("request timed out")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Send one message to the model with retry + explicit timeout.
 * Resolves to the assistant's text. Throws ClaudeUnavailableError on ultimate failure.
 * (Function name kept as callClaude so interviewAgent.js needs zero changes.)
 */
export async function callClaude({
  system,
  messages,
  maxTokens = 1024,
  temperature = 0.7,
}) {
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";

  const run = async () => {
    try {
      const response = await withTimeout(
        getClient().models.generateContent({
          model,
          contents: toGeminiContents(messages),
          config: {
            systemInstruction: system,
            maxOutputTokens: maxTokens,
            temperature,
          },
        }),
        REQUEST_TIMEOUT_MS,
      );
      const text = (response?.text ?? "").trim();
      if (!text) throw new Error("empty response from Gemini");
      return text;
    } catch (err) {
      if (isNonRetryable(err)) {
        throw new AbortError(err);
      }
      throw err;
    }
  };

  try {
    return await pRetry(run, {
      retries: MAX_ATTEMPTS - 1,
      minTimeout: 500,
      factor: 2,
      onFailedAttempt: (e) => {
        logger.warn(
          {
            attempt: e.attemptNumber,
            retriesLeft: e.retriesLeft,
            err: e.message,
          },
          "gemini call failed, backing off",
        );
      },
    });
  } catch (err) {
    throw new ClaudeUnavailableError(err);
  }
}

/**
 * Pre-written fallback question from a curriculum day, used when the model is unreachable.
 * Keeps the interview moving so the endpoint always returns a valid reply.
 */
export function fallbackQuestion(day) {
  if (!day) {
    return "Let's keep going. Walk me through a project from the cohort you're most proud of, and the hardest problem you solved in it.";
  }
  const objective =
    Array.isArray(day.objectives) && day.objectives[0] ? day.objectives[0] : "";
  const tail = objective ? ` In particular: ${objective.toLowerCase()}.` : "";
  return `Let's talk about Day ${day.day}: ${day.title}.${tail} Walk me through what you learned and how you'd apply it.`;
}
