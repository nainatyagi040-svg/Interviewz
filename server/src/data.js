import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Static reference data, loaded once at startup and held in memory.
 * These files are not per-request data — never re-read them on a request.
 */
function loadJson(relativePath) {
  const full = join(__dirname, relativePath);
  const raw = readFileSync(full, 'utf-8');
  return JSON.parse(raw);
}

let curriculum;
let candidates;

try {
  curriculum = loadJson('./data/curriculum.json');
  candidates = loadJson('./data/candidates.json');
} catch (err) {
  // Fail loudly at startup (not per-request) if the reference data is missing/corrupt.
  throw new Error(`Failed to load reference data: ${err.message}`);
}

/** Map of day number -> day object for O(1) lookups. */
const daysByNumber = new Map((curriculum.days ?? []).map((d) => [d.day, d]));

/** Find the module that contains a given day number. */
function moduleForDay(day) {
  return (curriculum.modules ?? []).find(
    (m) => Array.isArray(m.days) && day >= m.days[0] && day <= m.days[1]
  );
}

export const referenceData = {
  curriculum,
  candidates,
  daysByNumber,
  moduleForDay,
  getDay: (n) => daysByNumber.get(n) ?? null,
};
