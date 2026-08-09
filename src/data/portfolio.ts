import type { Project, EngineeringHighlight, PersonalInfo } from '@/types';
import { skillGroups, appliedSecuritySkills, conceptualSecuritySkills } from './skills';

export { skillGroups, appliedSecuritySkills, conceptualSecuritySkills };

// ============================================================
// PERSONAL INFORMATION
// ============================================================
export const personalInfo: PersonalInfo = {
  name: 'Ayokanmi Ogunyebi',
  firstName: 'Ayokanmi',
  lastName: 'Ogunyebi',
  title: 'Full-Stack Software Engineer',
  alternativeTitles: [
    'MULTI-TENANT PLATFORMS',
    'SECURE FULL-STACK SYSTEMS',
    'SOFTWARE THAT USERS TRUST',
    'PRODUCTION-READY APPS',
  ],
  bio: `I'm a Full-Stack Software Engineer based in Akure, Nigeria, building secure, production-oriented systems across React/Next.js frontends, Node.js/Express APIs, database architecture, and deployment infrastructure.

My strongest work is a multi-tenant recruitment platform — five role portals, 101 API endpoints, 82 frontend routes — with authentication, RBAC, background workers, containerized CI, and load testing designed in from the start. That project is the proof I design, build, secure, test, and ship software rather than assemble features.

Security influences how I design software. With a Google Cybersecurity Professional Certificate and hands-on implementation, I build authentication, authorization, validation, rate limiting, and secure data handling into the foundation — not appended at the end.`,
  location: 'Akure, Nigeria (Remote)',
  email: 'ogunyebiayokanmi@gmail.com',
  githubUrl: 'https://github.com/yokanm',
  linkedinUrl: 'https://linkedin.com/in/ayokanmi-ogunyebi',
  availableForWork: true,
};

// ============================================================
// ENGINEERING DECISIONS (Experience/Approach page)
// ============================================================
export const engineeringDecisions: string[] = [
  'Argon2id over bcrypt in JobBoard API — memory-hard algorithm; GPU cracking costs ~10x more compute. OWASP 2024 recommended, not habit.',
  'Dual-entity JWT in JobBoard API — Users and Companies use separate signing keys; a company token physically cannot authenticate as a candidate.',
  'Refresh-token family rotation — a reused stale token revokes the whole family, turning theft into a detectable event.',
  'Multi-tenant RBAC in PostBoard — five actor surfaces, isolation enforced and tested via IDOR/authorization suites, not assumed.',
  'Background email via BullMQ — queued jobs with retries + DLQ, never inline request work.',
  'Redis-based rate limiting — per-role tunable limits protecting hot endpoints without skewing local state.',
  'httpOnly cookie + in-memory access token in TaskFlow — XSS can read neither; session restores silently from the cookie.',
  'Optimistic task updates in TaskFlow — UI responds immediately; API runs behind; failure reverts automatically.',
  'pg_trgm + GIN indexes in JobBoard API — full-text search at scale without LIKE table scans.',
  'URL-persisted filters in Cyber Gadget — useSearchParams + router.replace survive refresh and sharing.',
];

// ============================================================
// PROJECTS — SINGLE SOURCE OF TRUTH
// ============================================================
// Every claim is backed by the public repositories:
//   postboard → github.com/yokanm/postboard   (frontend, React 19)
//   jobboard  → github.com/yokanm/jobboard    (backend API, Express 5)
//   Cyber-gadget → github.com/yokanm/Cyber-gadget
//   taskflow  → github.com/yokanm/taskflow    (React Native + Expo)
//   van-life  → github.com/yokanm/van-life
//   React-Admin-DashBoard → github.com/yokanm/React-Admin-DashBoard
// See docs/PORTFOLIO_CONTENT_GUIDE.md before editing any number.

// ═══════════ POSTBOARD — FLAGSHIP ═══════════
const postboard: Project = {
  slug: 'postboard',
  title: 'PostBoard',
  tagline: 'Full-Stack Multi-Tenant Recruitment Platform',
  category: 'Full-Stack Platform',
  isFlagship: true,
  year: 2026,
  status: 'frontend-live',
  demoNote:
    'The React frontend is live. The API needs a deployed PostgreSQL + Redis environment; production deployment is tracked in-repo.',
  overview:
    'A multi-tenant job board and applicant tracking system connecting Candidates, Recruiters, Companies, and a platform Super-Admin through five role portals. One React client talks to a versioned Express REST API built on PostgreSQL, Redis, and BullMQ background workers.',
  problem:
    'Recruitment platforms blur the boundary between candidate, recruiter, and employer. PostBoard enforces that separation — each actor logs in against its own principal and sees only its own surface, with jobs, applications, analytics, interviews, and billing flowing through one secure API contract.',
  goals: [
    'Five isolated role surfaces served by one API with strict role-based access control',
    'Secure auth: per-principal JWT signing, refresh-token family rotation, Argon2id hashing',
    'Background email delivery via BullMQ — never inline in request handlers',
    'Containerized API + worker + Postgres + Redis via Docker Compose with health checks',
    'A CI pipeline that spins up real Postgres and Redis to run unit, integration, and E2E tests',
    'Production observability: Sentry, Winston, request tracing, Bull-Board',
  ],
  architecture: [
    { label: 'React SPA', kind: 'source', detail: 'Five role portals · 82 routes' },
    { label: 'REST API /api/v1', kind: 'layer', detail: '101 versioned Express endpoints' },
    { label: 'Express + Middleware', kind: 'layer', detail: 'Auth, RBAC, rate-limit, sanitize, Helmet, requestId' },
    { label: 'Prisma ORM', kind: 'layer', detail: 'Typed queries · 9 migrations' },
    { label: 'PostgreSQL', kind: 'data', detail: '17 models · 8 enums · pg_trgm search' },
    { label: 'Redis', kind: 'data', detail: 'Rate limiting · queue backing' },
    { label: 'BullMQ Workers', kind: 'worker', detail: 'email-worker · retries · DLQ' },
    { label: 'Monitoring', kind: 'observability', detail: 'Sentry · Winston · Bull-Board · health checks' },
    { label: 'Deployment', kind: 'deploy', detail: 'Docker Compose · GitHub Actions CI' },
  ],
  technologyGroups: [
    { technology: 'Express 5 + Node', why: 'Mature middleware ecosystem and the canonical layered service/controller pattern this codebase uses.' },
    { technology: 'Prisma + PostgreSQL', why: 'Typed schema is the source of truth with first-class migrations; 17 models stay consistent as the domain grows.' },
    { technology: 'Redis + BullMQ', why: 'Redis-backed queues decouple email/background work from request handlers, with retries and a DLQ.' },
    { technology: 'TanStack Query', why: 'Server-state caching and key invalidation remove a whole class of stale-data client bugs.' },
    { technology: 'Zustand', why: 'Minimal store for auth + UI state, kept separate from server state by lifecycle.' },
    { technology: 'Zod', why: 'One schema shared client/server so the client and API cannot disagree on input shape.' },
    { technology: 'Vite + React 19', why: 'Fast dev server and first-class React 19 + tailwind support on the client build.' },
  ],
  engineeringDecisions: [
    { title: 'Dual-entity JWT signing', explanation: 'Users and Companies have separate signing keys — a company token physically cannot authenticate as a candidate. Enforced at the authorization guard, not by convention.' },
    { title: 'Refresh-token family rotation', explanation: 'Each refresh rotates the token; a reused stale token revokes the whole family, turning theft into a detectable event.' },
    { title: 'Argon2id password hashing', explanation: 'Memory-hard (OWASP-recommended) algorithm; GPU cracking is orders of magnitude more expensive than bcrypt.' },
    { title: 'Background email via BullMQ', explanation: 'Emails are queued jobs with exponential-backoff retries and a dead-letter queue — never inline request work.' },
    { title: 'RBAC across five actors', explanation: 'Authorization enforced in middleware per role; explicit IDOR and authorization test suites prove tenants cannot cross each other.' },
    { title: 'Containerized CI with real services', explanation: 'GitHub Actions spins up Postgres 16 + Redis 7 to run unit, integration, and E2E suites, and fails on high-severity npm audit.' },
  ],
  tradeoffs: [
    { choice: 'TanStack Query over Redux', alternative: 'Redux for server state', rationale: 'Query is purpose-built for server cache + invalidation; Redux adds boilerplate for state the server already owns.' },
    { choice: 'BullMQ over cron jobs', alternative: 'Scheduled cron', rationale: 'Queue workers give retries, concurrency, and observability; cron is fire-and-forget.' },
    { choice: 'Prisma over raw SQL', alternative: 'Hand-written top of SQL', rationale: 'Type safety + migrations win at a small runtime cost for this domain.' },
    { choice: 'REST over GraphQL', alternative: 'GraphQL schema', rationale: 'A clear cacheable API contract; GraphQL tooling was not justified for the client surface.' },
  ],
  challenges: [
    'Five-portal RBAC: enforcing that a recruiter token can never read a candidate resource, with tests that assert the negative (IDOR).',
    'Synchronizing the API contract across two codebases — the frontend parallel-refresh queue must never issue duplicate token refreshes.',
    'Splitting transport: httpOnly cookie for refresh tokens vs in-memory bearer for access tokens, so XSS cannot read either.',
  ],
  testing: [
    'Backend: 34 Jest suites · ~7,230 LOC across unit and integration (auth, authorization, candidate/recruiter/company journeys, IDOR).',
    'Frontend: Vitest + MSW for API-mocked route tests; Playwright E2E (auth setup, access-control, companies, jobs, dashboards).',
    'Load: k6 scenarios (auth, jobs, applications, notifications, user-journey) + autocannon benchmark.',
    'Security: explicit IDOR and authorization suites assert cross-tenant isolation.',
  ],
  performance: [
    'Route-level code splitting and lazy pages across the five portals.',
    'TanStack Query server-state caching reduces duplicate fetches.',
    'Redis-backed rate limiting protects hot endpoints without skewing in-memory state.',
  ],
  security: [
    'Argon2id password hashing; JWT access/refresh rotation with family revocation.',
    'RBAC enforced in dedicated per-role authorization middleware.',
    'Helmet HTTP headers; Zod + express-validator input validation; DOMPurify sanitization.',
    'Rate limiting backed by rate-limit-redis with per-role tunable limits.',
    'CI security gate: npm audit at high-severity blocks the build.',
  ],
  lessonsLearned: [
    'Multi-tenancy is a security property, not a feature — isolation must be enforced and tested, not assumed.',
    'Writing the API contract down first makes a two-repo stack tractable to test and iterate.',
    'Queueing from day one fixed a fragile in-request email path; background processing was not an afterthought.',
  ],
  futureRoadmap: [
    'Deploy the API (Postgres + Redis) behind a live demo with TLS and a reverse proxy.',
    'Real-time notifications via WebSockets / SSE.',
    'OpenTelemetry distributed traces across API + workers.',
    'Feature-flag delivery for the role-portal surface.',
  ],
  productionReadiness: [
    { category: 'Authentication', evidence: 'JWT access/refresh rotation · Argon2id' },
    { category: 'Authorization', evidence: 'Per-role RBAC middleware · IDOR-tested' },
    { category: 'Validation', evidence: 'Zod client+server · express-validator' },
    { category: 'Security', evidence: 'Helmet · rate-limit-redis · sanitize · CI audit' },
    { category: 'Monitoring', evidence: 'Sentry · Bull-Board · health checks' },
    { category: 'Logging', evidence: 'Winston + request context · morgan' },
    { category: 'Health Checks', evidence: '/health + Docker healthcheck clauses' },
    { category: 'CI / CD', evidence: 'lint · typecheck · prisma · test · build · security · e2e' },
    { category: 'Docker', evidence: 'Multi-stage Dockerfile + worker · Compose' },
    { category: 'Testing', evidence: '34 Jest · Vitest · MSW · Playwright · k6' },
    { category: 'Performance', evidence: 'Route splitting · caching · load benchmarks' },
    { category: 'Observability', evidence: 'Request-id tracing · structured logs · Sentry' },
  ],
  metrics: ['101 API endpoints', '82 frontend routes', '5 RBAC portals', '17 DB models', '34 Jest suites', 'Playwright E2E'],
  deployment: [{ label: 'Frontend (Vercel)', url: 'https://postboard-ruby.vercel.app/' }],
  demoStatus: 'Frontend live · API deployment tracked',
  repositories: [
    { label: 'Frontend :: yokanm/postboard', url: 'https://github.com/yokanm/postboard' },
    { label: 'Backend :: yokanm/jobboard', url: 'https://github.com/yokanm/jobboard' },
  ],
  documentation: [
    { label: 'API Contract', url: 'https://github.com/yokanm/jobboard/blob/main/API_CONTRACT.md' },
    { label: 'Deployment Guide', url: 'https://github.com/yokanm/jobboard/blob/main/DEPLOYMENT.md' },
  ],
  seo: {
    title: 'PostBoard — Full-Stack Multi-Tenant Recruitment Platform',
    description:
      'PostBoard: a 5-role multi-tenant recruitment platform — 101 API endpoints, 82 routes, RBAC, Redis+BullMQ, Docker CI, and 34 Jest suites.',
  },
};

// ═══════════ CYBER GADGET ═══════════
const cyberGadget: Project = {
  slug: 'cyber-gadget',
  title: 'Cyber Gadget',
  tagline: 'Production E-Commerce Store',
  category: 'Web Application',
  year: 2025,
  status: 'live',
  overview:
    'A full-stack electronics store with Next.js 15 App Router, TypeScript, and Supabase (PostgreSQL) — 200+ products, URL-persisted multi-parameter filters, debounced search, and a 3-step checkout.',
  problem:
    'Online stores need filterable catalogs that scale without a dedicated backend team. Cyber Gadget proves SSR + client interactivity can ship a large catalog on a serverless Postgres store with no separate API layer.',
  goals: [
    '200+ product catalog with server-side rendering for fast first paint',
    'Filters that survive refresh, support bookmarking, and can be shared as links',
    'A 3-step checkout with Luhn card validation and ARIA live regions',
    'A single Next.js App Router codebase crossing the server/client boundary correctly',
  ],
  architecture: [
    { label: 'Next.js App Router', kind: 'source', detail: 'SSR wrapper gives instant first paint' },
    { label: 'Server + client clients', kind: 'layer', detail: 'lib/api.ts abstraction over boundary' },
    { label: 'Supabase (PostgreSQL)', kind: 'data', detail: 'Products, cart, filters, auth' },
    { label: 'Context providers', kind: 'layer', detail: 'Toast → Auth → Cart → Wishlist' },
    { label: 'Checkout', kind: 'layer', detail: '3-step · Luhn validation · ARIA live' },
  ],
  technologyGroups: [
    { technology: 'Next.js 15', why: 'App Router gives a single codebase with SSR for storefront + client interactivity.' },
    { technology: 'Supabase (PostgreSQL)', why: 'Hosted relational store with auth and edge deployment — no backend team required.' },
    { technology: 'Tailwind v4', why: 'Utility-first styling that matches the brutalist design without a config file.' },
  ],
  engineeringDecisions: [
    { title: 'URL-persisted filter state', explanation: 'Filters live in search params via router.replace, so refresh, bookmarking, and sharing work by URL — component state could not.' },
    { title: 'Two-phase localStorage mount', explanation: 'Cart state is mounted in a controlled two-phase effect to prevent a Next.js SSR/client hydration mismatch.' },
  ],
  tradeoffs: [
    { choice: 'Supabase over a custom API', alternative: 'Separate Node API', rationale: 'Removes backend surface for a catalog use case; tradeoff is less custom control over edge cases.' },
  ],
  challenges: [
    'Keeping 200+ product rows fast under multi-parameter filtering with debounced search (setTimeout debounce).',
    'Splitting Suspense boundaries so product grid sections load independently on slow networks.',
  ],
  testing: ['Component + integration of the checkout and filter flows in the client package.'],
  performance: [
    'Debounced search (300ms default) to reduce filter churn.',
    'Server Components for initial product load (SSR) vs client components for interactivity.',
    'Suspense boundaries per grid section.',
  ],
  security: [
    'Luhn card-number validation in checkout; field-level touch tracking.',
    'ARIA live regions for screen-reader feedback during checkout.',
    'Known debt — localStorage plaintext password auth for demo; documented migration to Supabase Auth is tracked in-repo.',
  ],
  lessonsLearned: [
    'URL as state is underrated for filters — it is free deep-linking and shareability.',
    'Owning the auth debt publicly is honest engineering; transparent remediation beats hiding it.',
  ],
  futureRoadmap: [
    'Migrate auth to Supabase Auth (bcrypt + session) and remove localStorage passwords.',
    'Add server-side paginated search with full-text.',
  ],
  productionReadiness: [
    { category: 'Authentication', evidence: 'Supabase client auth (demo) — migration tracked' },
    { category: 'Validation', evidence: 'Luhn checkout + Zod schema on auth' },
    { category: 'Monitoring', evidence: 'Next.js telemetry in dev; deployment on Vercel' },
    { category: 'Performance', evidence: 'SSR + Suspense + debounced search' },
    { category: 'CI / CD', evidence: 'Vercel preview deployments' },
  ],
  metrics: ['200+ products', 'URL-persisted filters', '3-step checkout'],
  deployment: [{ label: 'Live', url: 'https://cyber-gadget-v2.vercel.app/' }],
  demoStatus: 'Live',
  repositories: [{ label: 'yokanm/Cyber-gadget', url: 'https://github.com/yokanm/Cyber-gadget' }],
  documentation: [],
  seo: {
    title: 'Cyber Gadget — Production E-Commerce Store',
    description:
      'Cyber Gadget: Next.js 15 + Supabase store — 200+ products, URL-persisted filters, server components, and a 3-step checkout.',
  },
};

// ═══════════ TASKFLOW ═══════════
const taskflow: Project = {
  slug: 'taskflow',
  title: 'TaskFlow',
  tagline: 'Cross-Platform Mobile Task Manager',
  category: 'Mobile Application',
  year: 2026,
  status: 'live',
  overview:
    'A cross-platform (iOS · Android · web) task manager — React Native + Expo client with its own Express/Prisma backend. httpOnly refresh cookies, in-memory access tokens, and optimistic status updates.',
  problem:
    'Mobile apps often leak tokens to AsyncStorage or refetch everything on every tap. TaskFlow demonstrates a mobile auth model (access token in memory only) plus optimistic UI on slow connections.',
  goals: [
    'Token hygiene: access token lives in memory (never in storage); refresh token in httpOnly cookie that JS cannot read',
    'Optimistic task-status updates with automatic revert on failure',
    'Six accent themes persisted server-side so they follow the user across reinstalls',
  ],
  architecture: [
    { label: 'React Native (Expo) client', kind: 'source', detail: 'iOS + Android + web' },
    { label: 'REST API', kind: 'layer', detail: 'Express 5 + Prisma' },
    { label: 'SQLite', kind: 'data', detail: 'Local + Prisma persistence' },
    { label: 'Auth', kind: 'layer', detail: 'httpOnly refresh cookie + in-memory access token' },
  ],
  technologyGroups: [
    { technology: 'Expo + React Native', why: 'One TypeScript codebase ships iOS, Android, and web with Expo Router.' },
    { technology: 'Express + Prisma', why: 'A real backend with the author proven in the PostBoard ecosystem.' },
    { technology: 'Zustand', why: 'Minimal observable store for UI + auth state; server data fetched separately.' },
  ],
  engineeringDecisions: [
    { title: 'In-memory access token', explanation: 'The access token is never persisted to AsyncStorage; a refresh-only httpOnly cookie restores the session silently on startup.' },
    { title: 'Optimistic updates', explanation: 'Tapping a status updates UI immediately, calls API in background, and reverts on failure — instant on slow connections.' },
  ],
  tradeoffs: [
    { choice: 'Optimistic updates over wait-for-confirm', alternative: 'Disabled until confirmed', rationale: 'Lower latency at the cost of a revert path; the revert is well-tested.' },
    { choice: 'Local SQLite + API', alternative: 'Fully server-render server', rationale: 'Offline-capable local state with server sync for multi-device truth.' },
  ],
  challenges: [
    'Keeping auth tokens out of device storage while still restoring sessions after a cold start.',
    'Cross-platform theme + optimistic-state sync between the store and API.',
  ],
  testing: [
    'Client unit tests for the store logic and optimistic cycle.',
  ],
  performance: ['Optimistic UI removes a network round-trip from the critical path.'],
  security: [
    'httpOnly refresh cookie (XSS cannot read); access token in memory only',
    'Zod schemas mirrored on client and server to prevent client/server drift',
  ],
  lessonsLearned: [
    'Mobile auth requires an explicit token-transport decision — "just use a token" is not enough.',
    'Sharing Zod schema client/server is a cheap, high-value drift guard.',
  ],
  futureRoadmap: [
    'Add offline queue for offline-first task sync.',
    'Push notifications for due tasks.',
  ],
  productionReadiness: [
    { category: 'Authentication', evidence: 'httpOnly cookie + in-memory token' },
    { category: 'Validation', evidence: 'Zod client+server' },
    { category: 'Testing', evidence: 'Client unit tests' },
  ],
  metrics: ['iOS + Android + web', 'httpOnly auth', 'Optimistic UI'],
  deployment: [],
  demoStatus: null,
  repositories: [{ label: 'yokanm/taskflow', url: 'https://github.com/yokanm/taskflow' }],
  documentation: [],
  seo: {
    title: 'TaskFlow — Cross-Platform Mobile Task Manager',
    description:
      'TaskFlow: React Native + Expo with an Express/Prisma backend — httpOnly cookies, in-memory access tokens, and optimistic updates.',
  },
};

// ══════════════════════════════════════════════════════════
// PRE-ORDERED LIST (flagship first, then by year)
// ══════════════════════════════════════════════════════════
export const projects: Project[] = [postboard, cyberGadget, taskflow];

// ═══════════ ENGINEERING HIGHLIGHTS (homepage) ═══════════
export const engineeringHighlights: EngineeringHighlight[] = [
  { title: 'Multi-Tenant Architecture', projectSlug: 'postboard' },
  { title: 'Role-Based Access Control', projectSlug: 'postboard' },
  { title: 'JWT Refresh Rotation', projectSlug: 'postboard' },
  { title: 'Argon2id Hashing', projectSlug: 'postboard' },
  { title: 'Docker + Compose', projectSlug: 'postboard' },
  { title: 'PostgreSQL', projectSlug: 'postboard' },
  { title: 'Prisma ORM', projectSlug: 'postboard' },
  { title: 'Redis', projectSlug: 'postboard' },
  { title: 'BullMQ Workers', projectSlug: 'postboard' },
  { title: 'GitHub Actions CI', projectSlug: 'postboard' },
  { title: 'Sentry + Winston', projectSlug: 'postboard' },
  { title: 'k6 Load Testing', projectSlug: 'postboard' },
  { title: 'Playwright E2E', projectSlug: 'postboard' },
  { title: 'Vitest', projectSlug: 'postboard' },
  { title: 'Zod Validation', projectSlug: 'postboard' },
  { title: 'Optimistic UI (Mobile)', projectSlug: 'taskflow' },
];

// ═══════════ HOME STATS (verified) ═══════════
export const homeStats = [
  { value: '1', label: 'Flagship platform' },
  { value: '101', label: 'API endpoints' },
  { value: '82', label: 'Frontend routes' },
  { value: '5', label: 'RBAC portals' },
];

export { postboard };