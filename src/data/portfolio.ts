import type {
  PersonalInfo, Project, SkillGroup, SecuritySkill,
} from '@/types';

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo: PersonalInfo = {
  name: 'Ayokanmi Ogunyebi',
  firstName: 'Ayokanmi',
  lastName: 'Ogunyebi',
  title: 'Full-Stack Software Developer',
  alternativeTitles: [
    'SCALABLE WEB APPLICATIONS',
    'SECURE FULL-STACK SYSTEMS',
    'SOFTWARE THAT USERS TRUST',
    'Secure-by-Default Systems',
  ],
  bio: `I'm a Full-Stack Software Developer based in Akure, Nigeria, working with React, Next.js, Node.js, TypeScript, PostgreSQL, and modern cloud technologies.

I build products end-to-end—from intuitive user experiences and scalable APIs to database architecture, authentication systems, background processing, and deployment workflows. My projects include e-commerce platforms, backend services, and cross-platform mobile applications used as practical solutions to real-world problems.

Security influences how I design software. With a Google Cybersecurity Professional Certificate and hands-on implementation experience, I build authentication, authorization, validation, rate limiting, and secure data handling directly into the foundation of every application.

I care about clean architecture, maintainable code, performance, and creating products that teams can confidently scale and support over time.

This version feels more like someone companies would hire as a Full-Stack Developer while still highlighting your cybersecurity background. It focuses on capabilities and outcomes rather than listing tools.`,
  location: 'Akure, Nigeria (Remote)',
  email: 'ogunyebiayokanmi@gmail.com',
  githubUrl: 'https://github.com/yokanm',
  linkedinUrl: 'https://linkedin.com/in/ayokanmi-ogunyebi',
  availableForWork: true,
};

// ============================================
// PROJECTS — status-driven, no hardcoded IDs in UI
// ============================================
export const projects: Project[] = [
  {
    id: 'job-board-api',
    title: 'Job Board API',
    category: 'REST API — Backend',
    description:
      'Production recruitment platform API supporting separate company and candidate authentication, secure token rotation, background email processing, Redis caching, and automated testing.',
    longDescription: `Dual-entity auth treats Users and Companies as separate principals with separate JWT signing keys — a company token physically cannot authenticate as a user, enforced at the authorization guard level.

Argon2id (64MiB memory cost) replaces bcrypt — memory-hard algorithm chosen because GPU hash-cracking attacks cost ~10x more compute. OWASP 2024 recommended.

Redis caching uses TTL differentiation by resource volatility: job listings (60s), job detail (300s), tag list (600s). Cache is invalidated on write, not just expired passively.

BullMQ processes emails as background jobs — never inline in request handlers. Exponential backoff retries. Worker runs as a separate process (Docker Compose wiring is a documented known gap).

PostgreSQL uses pg_trgm extension with GIN indexes for full-text trigram search on job title and description — no LIKE table scans at scale.`,
    techStack: ['Node.js', 'Express 5', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'BullMQ', 'Argon2id', 'JWT', 'Docker', 'Jest', 'Swagger'],
    githubUrl: 'https://github.com/yokanm/job-board-api',
    liveUrl: '',
    status: 'live',
    featured: true,
    year: 2025,
    metrics: ['35+ REST endpoints', 'Role-based access control', 'Token family revocation', '60%+ test coverage'],
    engineeringDecision:
      "Argon2id over bcrypt — OWASP-recommended memory-hard hashing with stronger GPU resistance.",
  },
  {
    id: 'cyber-gadgets',
    title: 'Cyber Gadget',
    category: 'E-Commerce Platform',
    description:
      'Full-stack electronics store — Next.js 15 App Router, TypeScript, Supabase PostgreSQL, 200+ products. URL-persisted multi-param filtering, cursor pagination, 3-step checkout with Luhn algorithm card validation.',
    longDescription: `Product fetching uses a lib/api.ts abstraction with separate server and browser Supabase clients — correctly mirrors the Next.js App Router server/client boundary. Server Components handle initial product load for SSR.

Filter state lives in URL params via useSearchParams/router.replace. Filters survive page refresh, support bookmarking, and can be shared as links — behaviour that component state cannot provide.

The 3-step checkout (Address → Shipping → Payment) includes Luhn algorithm card number validation, expiry date checking, field-level touch tracking, and ARIA live regions for screen reader feedback.

Four contexts composed in dependency order: Toast → Auth → Cart → Wishlist. Cart uses a two-phase useEffect mount to prevent Next.js SSR/client hydration mismatch on localStorage state. Suspense boundaries wrap each product grid section independently.

Known security debt: auth uses localStorage plaintext passwords. Documented migration to Supabase Auth tracked in repo.`,
    techStack: ['Next.js 15', 'TypeScript', 'Supabase (PostgreSQL)', 'React 19', 'Tailwind CSS v4', 'Framer Motion', 'Radix UI', 'shadcn/ui'],
    githubUrl: 'https://github.com/yokanm/Cyber-gadget',
    liveUrl: 'https://cyber-gadget-v2.vercel.app/',
    status: 'live',
    featured: true,
    year: 2024,
    metrics: ['200+ products', 'SSR + CSR hybrid', '3-step checkout', 'URL-persisted filters'],
    engineeringDecision:
      'Filter state in URL params (useSearchParams + router.replace), not React state — filters survive refresh, support bookmarking, and can be shared as links.',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    category: 'Full-Stack Mobile App',
    description:
      'Cross-platform task manager (iOS, Android, web) — React Native + Expo frontend with its own Express/Prisma backend. httpOnly refresh cookies, optimistic updates, Offline-capable state and silent session restore.',
    longDescription: `Owns both ends of the stack: React Native client and Express/Prisma/SQLite backend, both in TypeScript.

Auth pattern: access token lives only in Zustand memory (never localStorage or AsyncStorage); refresh token is httpOnly cookie inaccessible to JavaScript. XSS cannot steal either token. On app startup, silent re-auth uses the cookie to restore session without user action.

Optimistic updates on task status cycling — tapping a status immediately updates the UI; API call runs in background; on failure, state reverts. Makes the app feel instant on slow connections.

Zod schemas are mirrored server/client — same validation on both Express and React Native. Eliminates the class of bugs where the client allows something the server rejects.

Six accent themes are stored in the user's DB row, not device storage — theme preference follows the user across reinstalls.`,
    techStack: ['React Native', 'Expo SDK 54', 'Expo Router v6', 'TypeScript', 'NativeWind v4', 'Zustand', 'Zod', 'Express.js 5', 'Prisma 7', 'SQLite', 'JWT', 'bcrypt'],
    githubUrl: 'https://github.com/yokanm/taskflow',
    liveUrl: '',
    status: 'private',
    featured: true,
    year: 2025,
    metrics: ['iOS + Android + Web', '6 DB-persisted themes', 'Optimistic UI updates', 'httpOnly auth'],
    engineeringDecision:
      'Access token in memory only; refresh token in httpOnly cookie — XSS cannot read either. Silent re-auth on startup restores session from the cookie without user action.',
  },
  {
    id: 'postboard',
    title: 'PostBoard',
    category: 'SaaS Frontend (WIP)',
    description:
      'Multi-role recruitment SaaS with separate candidate, company, and admin experiences. Features silent authentication recovery, server-state caching, analytics dashboards, and protected route architecture.',
    longDescription: `Frontend client for the Job Board API with four role portals: CANDIDATE, RECRUITER, ADMIN, SUPERADMIN — each with its own route-grouped layout.

apiFetch wrapper catches 401s, silently requests a new access token, then replays the original request. A parallel refresh queue prevents race conditions when multiple requests 401 simultaneously — all queued requests wait for one refresh, then continue.

Three distinct state categories in three distinct homes: server state in TanStack Query (jobs, applications, profiles), auth state in Zustand authStore, UI state in Zustand uiStore. Mixing them creates stale data bugs.

All TanStack Query keys defined in a centralized registry — prevents duplicate keys and simplifies cache invalidation across features.

Note: Several dashboard pages (saved jobs, notifications, settings, audit-logs) are currently scaffold stubs. WIP.`,
    techStack: ['React 19', 'TypeScript', 'Vite', 'React Router', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'Recharts', 'Radix UI', 'Tailwind CSS v4'],
    githubUrl: 'https://github.com/yokanm/postboard',
    liveUrl: 'https://postboard-ruby.vercel.app/',
    status: 'in-development',
    featured: true,
    year: 202,
    metrics: ['4 role portals', '26 routes', '102 source files', 'Parallel refresh queue'],
    engineeringDecision:
      'Server state (TanStack Query), auth state (Zustand authStore), and UI state (Zustand uiStore) in three separate homes — different caching lifecycles require different tools.',
  },
  {
    id: 'van-life',
    title: 'Van Life',
    category: 'Travel Rental Application',
    description:
      'React SPA with Firebase auth, protected routes, and a Mirage.js API mock layer — the full frontend built and tested before any real backend existed.',
    longDescription: `Mirage.js intercepts real HTTP fetch calls and fulfils a defined API contract locally. The same frontend code runs against the mock and a real server — switching to a real backend requires zero frontend changes.

Firebase handles real authentication: sign-up/sign-in, session persistence via onAuthStateChanged, and a RequireAuth component blocking private routes at the router level. React Router v6 loader functions handle route-level data fetching.

Faker.js generates realistic mock data (names, prices, descriptions, images) for a production-realistic development environment.`,
    techStack: ['React', 'Vite', 'React Router v6', 'Firebase (Auth + Firestore)', 'Mirage.js', 'Faker.js'],
    githubUrl: 'https://github.com/yokanm/van-life',
    liveUrl: 'https://verdant-malabi-1b8b1b.netlify.app/',
    status: 'live',
    featured: false,
    year: 2024,
    engineeringDecision:
      'Mirage.js over hardcoded arrays because it intercepts real HTTP fetch calls — the same code path validates the API contract, not just the UI.',
  },
  {
    id: 'react-dashboard',
    title: 'React Admin Dashboard',
    category: 'Data Visualization Dashboard',
    description:
      '11-route admin dashboard with a custom MUI two-layer token system (tokens → themeSettings) and five integrated data visualization libraries.',
    longDescription: `tokens(mode) maps semantic color names to values; themeSettings(mode) assembles the full MUI theme from those tokens. One color change propagates automatically across all 11 routes — no per-component overrides needed.

Five chart libraries integrated: Nivo Bar, Line, Pie, Geography, and FullCalendar. Each required its own data normalization layer since their input shapes differ.`,
    techStack: ['React', 'Material UI', 'Nivo Charts', 'FullCalendar', 'Formik + Yup', 'React Router DOM'],
    githubUrl: 'https://github.com/yokanm/React-Admin-DashBoard',
    liveUrl: 'https://velvety-bonbon-3fb0ce.netlify.app/',
    status: 'live',
    featured: false,
    year: 2023,
    engineeringDecision:
      'Two-layer theme system (tokens → themeSettings) so one color change propagates across all 11 routes — flat overrides would require touching each scene individually.',
  },
];

// ============================================
// ENGINEERING DECISIONS (for ExperiencePage)
// ============================================
export const engineeringDecisions: string[] = [
  'Argon2id over bcrypt in Job Board API — memory-hard algorithm; GPU cracking costs ~10x more. OWASP 2024 recommended, not habit.',
  'Dual-entity JWT in Job Board API — Users and Companies have separate signing keys. A company token physically cannot authenticate as a user.',
  'Refresh token family revocation — a stolen token is detected on the next legitimate use and revokes the entire family.',
  'URL-persisted filter state in Cyber Gadget — useSearchParams + router.replace. Filters survive refresh, support bookmarking and sharing.',
  'httpOnly cookie + in-memory access token in TaskFlow — XSS cannot read either token. Session restores silently from cookie on startup.',
  'Optimistic task updates in TaskFlow — UI updates immediately; API runs in background; failure reverts state automatically.',
  'BullMQ email queue in Job Board API — emails never sent inline in request handlers. Exponential backoff retries, separate worker process.',
  'pg_trgm + GIN indexes in Job Board API — full-text search at scale without LIKE table scans.',
  'Cursor pagination in Cyber Gadget and Job Board API — no page drift on concurrent inserts, unlike offset pagination.',
  'Two-phase localStorage mount in Cyber Gadget — prevents Next.js SSR/client hydration mismatch on cart state initialization.',
];

// ============================================
// SKILLS — accurate and clean
// ============================================
export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    category: 'Core Stack',
    icon: 'zap',
    skills: [
      { name: 'TypeScript', level: 'core' },
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Node.js', level: 'core' },
      { name: 'Express.js', level: 'core' },
      { name: 'PostgreSQL', level: 'core' },
      { name: 'Supabase', level: 'core' },
      { name: 'Vite', level: 'core' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend & Mobile',
    icon: 'monitor',
    skills: [
      { name: 'Tailwind CSS v4', level: 'core' },
      { name: 'Framer Motion', level: 'core' },
      { name: 'React Router', level: 'core' },
      { name: 'React Native + Expo', level: 'proficient' },
      { name: 'TanStack Query', level: 'proficient' },
      { name: 'React Router', level: 'proficient' },
      { name: 'Zustand', level: 'proficient' },
      { name: 'Radix UI / shadcn', level: 'proficient' },
      { name: 'React Hook Form + Zod', level: 'proficient' },
      { name: 'Redux', level: 'proficient' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Data',
    icon: 'server',
    skills: [
      { name: 'Prisma ORM', level: 'core' },
      { name: 'Redis (ioredis)', level: 'proficient' },
      { name: 'BullMQ', level: 'proficient' },
      { name: 'JWT + Refresh Rotation', level: 'core' },
      { name: 'Argon2id / bcrypt', level: 'proficient' },
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'Mongo DB', level: 'proficient' },
      { name: 'Firebase (Auth + Firestore)', level: 'proficient' },
      { name: 'Cloudinary', level: 'proficient' },
      { name: 'REST API Design', level: 'core' },
      { name: 'Docker + Docker Compose', level: 'proficient' },
    ],
  },
  {
    id: 'tooling',
    category: 'Tooling & Testing',
    icon: 'tool',
    skills: [
      { name: 'Git / GitHub', level: 'core' },
      { name: 'Vite', level: 'core' },
      { name: 'Jest + ts-jest', level: 'proficient' },
      { name: 'Swagger / OpenAPI 3.0', level: 'proficient' },
      { name: 'Postman', level: 'proficient' },
      { name: 'Vercel / Netlify', level: 'proficient' },
      { name: 'Winston (logging)', level: 'proficient' },
    ],
  },
];

// ============================================
// SECURITY SKILLS — split by evidence type
// ============================================

// Code-verified: every item below exists in a public repository
export const appliedSecuritySkills: SecuritySkill[] = [
  { name: 'Argon2id Password Hashing', category: 'applied' },
  { name: 'JWT Rotation + Family Revocation', category: 'applied' },
  { name: 'httpOnly Refresh Cookies', category: 'applied' },
  { name: 'In-Memory Access Tokens', category: 'applied' },
  { name: 'DOMPurify XSS Middleware', category: 'applied' },
  { name: 'Redis-Backed Rate Limiting', category: 'applied' },
  { name: 'Zod Input Validation (server + client)', category: 'applied' },
  { name: 'DB-Level Duplicate Constraints', category: 'applied' },
];

// Google Cybersecurity Certificate — conceptual exposure, not in project code
export const conceptualSecuritySkills: SecuritySkill[] = [
  { name: 'Threat Modeling', category: 'conceptual' },
  { name: 'Incident Response', category: 'conceptual' },
  { name: 'SIEM Concepts', category: 'conceptual' },
  { name: 'SIEM Tools', category: 'conceptual' },
  { name: 'Vulnerability Assessment', category: 'conceptual' },
  { name: 'Network Security', category: 'conceptual' },
  { name: 'Risk Assessment', category: 'conceptual' },
  { name: 'Endpoint Security,Protection and Monitoring', category: 'conceptual' },
];

// ============================================
// HOME STATS
// ============================================
export const homeStats = [
  { value: '4', label: 'Projects shipped' },
  { value: '60%+', label: 'Test coverage (Job Board API)' },
  { value: '2', label: 'In active development' },
];
