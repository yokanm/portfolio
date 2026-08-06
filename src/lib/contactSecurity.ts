// ─────────────────────────────────────────────────────────────
// Contact form security — lightweight, client-side abuse mitigation
//
// This is a static site with no backend of its own (submissions go
// straight to Formspree), so "security" here means raising the cost
// of automated abuse and keeping garbage out of the inbox — not
// replacing server-side validation, which Formspree also applies.
//
// Layers:
//   1. Honeypot field   — invisible to humans, bots fill it in.
//   2. Time-trap        — forms filled in under MIN_FILL_TIME_MS are
//                          almost always scripted submissions.
//   3. Rate limiting    — localStorage cooldown prevents rapid
//                          repeat submissions from the same browser.
//   4. Sanitization     — strips control characters and caps length
//                          before anything leaves the browser.
// ─────────────────────────────────────────────────────────────

const RATE_LIMIT_KEY = 'ayokanmi-portfolio-contact-last-submit';
export const RATE_LIMIT_WINDOW_MS = 60_000; // 1 submission per minute
export const MIN_FILL_TIME_MS = 2_500; // forms filled faster than this are treated as bots

/** Strip control/zero-width characters and collapse excess whitespace. */
export function sanitizeText(value: string): string {
  return value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u200B-\u200F\uFEFF]/g, '')
    .trim();
}

/** Returns the number of milliseconds remaining before another submission is allowed (0 if allowed now). */
export function getRateLimitRemaining(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const last = Number(window.localStorage.getItem(RATE_LIMIT_KEY) ?? 0);
    const elapsed = Date.now() - last;
    return elapsed < RATE_LIMIT_WINDOW_MS ? RATE_LIMIT_WINDOW_MS - elapsed : 0;
  } catch {
    return 0;
  }
}

/** Record a successful submission timestamp for rate limiting. */
export function recordSubmission(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    // localStorage unavailable (private mode etc.) — fail open, Formspree
    // applies its own server-side rate limiting regardless.
  }
}

/** Detects whether the form was likely filled in by a bot/script. */
export function isLikelyBot(params: { honeypot: string; renderedAt: number }): boolean {
  if (params.honeypot.trim().length > 0) return true;
  if (Date.now() - params.renderedAt < MIN_FILL_TIME_MS) return true;
  return false;
}
