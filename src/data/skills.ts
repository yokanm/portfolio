import type { SkillGroup, SecuritySkill } from '@/types';

// ============================================================
// SKILLS — grouped by ACTUAL ENGINEERING USAGE
// ============================================================
// No duplicate entries, no unsupported technologies. Every group
// notes WHERE it is used so stack claims stay anchored to repos.

export const skillGroups: SkillGroup[] = [
  {
    id: 'fullstack',
    category: 'Full Stack',
    usedIn: 'PostBoard, Cyber Gadget, TaskFlow',
    icon: 'layers',
    skills: [
      { name: 'TypeScript', level: 'core' },
      { name: 'React 19', level: 'core' },
      { name: 'Next.js 15 (App Router)', level: 'core' },
      { name: 'Node.js', level: 'core' },
      { name: 'Express 5', level: 'core' },
      { name: 'PostgreSQL', level: 'core' },
      { name: 'Prisma ORM', level: 'core' },
      { name: 'Vite', level: 'core' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend & Mobile',
    usedIn: 'PostBoard client, Cyber Gadget, TaskFlow',
    icon: 'monitor',
    skills: [
      { name: 'Tailwind CSS v4', level: 'core' },
      { name: 'TanStack Query', level: 'proficient' },
      { name: 'Zustand', level: 'proficient' },
      { name: 'React Router', level: 'core' },
      { name: 'Radix UI / shadcn', level: 'proficient' },
      { name: 'React Hook Form + Zod', level: 'proficient' },
      { name: 'React Native + Expo', level: 'proficient' },
      { name: 'NativeWind', level: 'proficient' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Data',
    usedIn: 'JobBoard API, TaskFlow API',
    icon: 'server',
    skills: [
      { name: 'REST API Design', level: 'core' },
      { name: 'Redis (ioredis)', level: 'proficient' },
      { name: 'BullMQ', level: 'proficient' },
      { name: 'JWT + Refresh Rotation', level: 'core' },
      { name: 'Argon2id / bcrypt', level: 'proficient' },
      { name: 'Swagger / OpenAPI', level: 'proficient' },
      { name: 'Cloudinary', level: 'proficient' },
    ],
  },
  {
    id: 'infrastructure',
    category: 'Infrastructure & DevOps',
    usedIn: 'JobBoard API Docker + CI, PostBoard deployment',
    icon: 'tool',
    skills: [
      { name: 'Docker + Docker Compose', level: 'proficient' },
      { name: 'GitHub Actions (CI/CD)', level: 'proficient' },
      { name: 'Vercel / Netlify', level: 'proficient' },
      { name: 'Sentry', level: 'proficient' },
      { name: 'Winston (logging)', level: 'proficient' },
      { name: 'Health Checks', level: 'proficient' },
    ],
  },
  {
    id: 'security',
    category: 'Security (Applied)',
    usedIn: 'JobBoard API, TaskFlow',
    icon: 'shield',
    skills: [
      { name: 'Argon2id Password Hashing', level: 'core' },
      { name: 'JWT Rotation + Family Revocation', level: 'core' },
      { name: 'httpOnly Refresh Cookies', level: 'core' },
      { name: 'In-Memory Access Tokens', level: 'proficient' },
      { name: 'Redis-Backed Rate Limiting', level: 'proficient' },
      { name: 'DOMPurify XSS Middleware', level: 'proficient' },
      { name: 'IDOR / Authorization Testing', level: 'proficient' },
      { name: 'Zod Input Validation', level: 'core' },
    ],
  },
  {
    id: 'testing',
    category: 'Testing & Tooling',
    usedIn: 'PostBoard + JobBoard API',
    icon: 'check',
    skills: [
      { name: 'Jest + ts-jest', level: 'proficient' },
      { name: 'Vitest', level: 'proficient' },
      { name: 'Playwright (E2E)', level: 'proficient' },
      { name: 'MSW (API mocking)', level: 'proficient' },
      { name: 'k6 (load testing)', level: 'familiar' },
      { name: 'autocannon (benchmark)', level: 'familiar' },
      { name: 'npm audit (security gate)', level: 'proficient' },
    ],
  },
];

// Code-verified: each item exists in a public repository.
export const appliedSecuritySkills: SecuritySkill[] = [
  { name: 'Argon2id Password Hashing', category: 'applied' },
  { name: 'JWT Rotation + Family Revocation', category: 'applied' },
  { name: 'httpOnly Refresh Cookies', category: 'applied' },
  { name: 'In-Memory Access Tokens', category: 'applied' },
  { name: 'DOMPurify XSS Middleware', category: 'applied' },
  { name: 'Redis-Backed Rate Limiting', category: 'applied' },
  { name: 'Zod Input Validation (server + client)', category: 'applied' },
  { name: 'IDOR / Authorization Test Suites', category: 'applied' },
];

// Google Cybersecurity Certificate — conceptual exposure.
export const conceptualSecuritySkills: SecuritySkill[] = [
  { name: 'Threat Modeling', category: 'conceptual' },
  { name: 'Incident Response', category: 'conceptual' },
  { name: 'SIEM Concepts', category: 'conceptual' },
  { name: 'Vulnerability Assessment', category: 'conceptual' },
  { name: 'Network Security', category: 'conceptual' },
  { name: 'Risk Assessment', category: 'conceptual' },
];