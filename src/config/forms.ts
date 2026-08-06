// ─────────────────────────────────────────────────────────────
// Formspree configuration
// Set VITE_FORMSPREE_ID in your .env file to activate contact form.
// Sign up at https://formspree.io (free), create a form, and copy the ID.
// e.g. VITE_FORMSPREE_ID=xpzvwklr
// ─────────────────────────────────────────────────────────────

export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

export const hasFormspree = Boolean(FORMSPREE_ID && FORMSPREE_ID !== 'YOUR_FORM_ID');
