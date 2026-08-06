// ─────────────────────────────────────────────────────────────
// Analytics — thin event-tracking abstraction
// Provider: Umami (free, privacy-friendly, no cookie banner needed)
//
// Why Umami:
//   - Free Umami Cloud tier covers a personal portfolio easily.
//   - Open source — self-host later for full data ownership.
//   - One script tag, no cookies, GDPR/CCPA-friendly by default.
//   - `window.umami.track(event, data)` is a near drop-in
//     replacement for the previous Plausible `window.plausible`.
//
// To activate:
//   1. Sign up at https://umami.is (or self-host).
//   2. Create a website and copy its Website ID.
//   3. Set the following in your .env (see .env.example):
//        VITE_UMAMI_WEBSITE_ID=your-website-id
//        VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js   (optional — default shown)
//   4. initAnalytics() (called once from main.tsx) injects the
//      tracking script only when VITE_UMAMI_WEBSITE_ID is set.
//
// Switching providers later: this module is the only place that
// needs to change. trackEvent() callers don't need to know which
// provider is active.
//
// Events tracked:
//   resume_download     — resume PDF downloaded
//   github_click        — GitHub profile link clicked
//   linkedin_click      — LinkedIn profile link clicked
//   contact_click_*     — contact sidebar links clicked
//   contact_form_submit — contact form submitted successfully
//   project_demo_click  — live demo button clicked
//   project_repo_click  — GitHub repo button clicked
// ─────────────────────────────────────────────────────────────

type UmamiFn = (event: string, data?: Record<string, string | number | boolean>) => void;

declare global {
  interface Window {
    umami?: { track: UmamiFn };
  }
}

const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const UMAMI_SCRIPT_URL =
  (import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined) || 'https://cloud.umami.is/script.js';

/**
 * Injects the Umami tracking script once, if a website ID is configured.
 * Safe to call multiple times — no-ops after the first successful injection.
 * Call this once during app startup (see main.tsx).
 */
export function initAnalytics(): void {
  if (typeof document === 'undefined') return;
  if (!UMAMI_WEBSITE_ID) return;
  if (document.querySelector('script[data-website-id]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = UMAMI_SCRIPT_URL;
  script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  // Umami
  if (typeof window !== 'undefined' && typeof window.umami?.track === 'function') {
    window.umami.track(event, props);
    return;
  }

  // Dev-mode logging so you can verify events during development
  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, props ?? '');
  }
}
