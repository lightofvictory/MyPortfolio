export const CONTACT_MESSAGE_LIMIT = 5;
export const CONTACT_WINDOW_MS = 60 * 60 * 1000;
const storageKey = 'portfolio-contact-limits';

type EmailLimit = { count: number; resetAt: number };
const memoryLimits = new Map<string, EmailLimit>();

function readLimits(now: number): Map<string, EmailLimit> {
  const limits = new Map(memoryLimits);
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    if (Array.isArray(saved)) {
      for (const entry of saved) {
        if (!Array.isArray(entry) || entry.length !== 2) continue;
        const [email, limit] = entry;
        if (typeof email === 'string' && limit && Number.isInteger(limit.count)
          && limit.count > 0 && Number.isFinite(limit.resetAt)) {
          limits.set(email, limit);
        }
      }
    }
  } catch { /* Keep the in-memory limit when storage is unavailable. */ }
  for (const [email, limit] of limits) {
    if (limit.resetAt <= now) limits.delete(email);
  }
  return limits;
}

export class ContactLimitError extends Error {
  readonly resetAt: number;
  constructor(resetAt: number) {
    const minutes = Math.max(1, Math.ceil((resetAt - Date.now()) / 60000));
    super(`You’ve reached your email limit of 5 messages per hour. Please try again in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}. Your limit resets automatically after one hour.`);
    this.name = 'ContactLimitError';
    this.resetAt = resetAt;
  }
}

/** Count only confirmed sends. A window starts with the first successful message. */
export async function withContactLimit(email: string, send: () => Promise<void>): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  async function attempt() {
    const limit = readLimits(Date.now()).get(normalizedEmail);
    if (limit && limit.count >= CONTACT_MESSAGE_LIMIT) {
      throw new ContactLimitError(limit.resetAt);
    }
    await send();
    const now = Date.now();
    const limits = readLimits(now);
    const current = limits.get(normalizedEmail);
    const next = { count: (current?.count ?? 0) + 1, resetAt: current?.resetAt ?? now + CONTACT_WINDOW_MS };
    limits.set(normalizedEmail, next);
    memoryLimits.set(normalizedEmail, next);
    try { localStorage.setItem(storageKey, JSON.stringify([...limits])); }
    catch { /* The current session still enforces the limit. */ }
  }
  // Serialize submissions across tabs where Web Locks are supported.
  if (typeof navigator !== 'undefined' && navigator.locks) {
    return navigator.locks.request('portfolio-contact-send', attempt);
  }
  return attempt();
}
