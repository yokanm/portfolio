# Ayokanmi Ogunyebi — Portfolio

A modern, production-ready portfolio website for a Full-Stack Software Engineer with a Security-First focus.
Built with the **Nocturnal Bauhaus** Neo-Brutalist design system: sharp geometry, offset shadows, yellow accents, and a dark-first aesthetic.

---

## ✦ Design System

| Token | Value |
|---|---|
| Background | `#0a0a0a` (dark) / `#f5f0e8` (light) |
| Primary | `#ffd700` — Bauhaus Yellow |
| Surface | `#1a1a1a` |
| On Surface | `#ffffff` / `#a0a0a0` (muted) |
| Display Font | Archivo Narrow — Bold, Uppercase |
| Body Font | Inter |
| Code Font | JetBrains Mono |
| Border | 2px solid |
| Shadow | 6px 6px 0px (hard offset, no blur) |
| Radius | 0px — strict right angles |

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Build | Vite 6 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui primitives (Radix UI) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |

---

## ✦ Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, typewriter, services, CTA |
| `/about` | About — Bio, values, contact info |
| `/projects` | Projects — 3 featured projects with links |
| `/experience` | Experience — Responsibilities, approach, cert |
| `/skills` | Skills — Tabbed skill groups + security cloud |
| `/contact` | Contact — Form (RHF + Zod), contact info |
| `/resume` | Resume — Printable CV layout |
| `/*` | 404 — Not found |

---

## ✦ Project Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── shared/              # Layout, Navbar, Footer, SectionTitle
│   └── ui/                  # Button, Card, Input, Textarea, Label, Badge, Toast
├── data/
│   └── portfolio.ts         # ← ALL content lives here (single source of truth)
├── features/
│   ├── home/                # HomePage, NotFoundPage
│   ├── about/               # AboutPage
│   ├── projects/            # ProjectsPage, ProjectCard
│   ├── experience/          # ExperiencePage
│   ├── skills/              # SkillsPage
│   ├── contact/             # ContactPage
│   └── resume/              # ResumePage
├── hooks/
│   ├── useTheme.ts          # Dark/light mode toggle + persistence
│   └── useScrollProgress.ts # Scroll progress tracking
├── lib/
│   └── utils.ts             # cn(), formatDate(), truncate(), slugify()
├── types/
│   └── index.ts             # All TypeScript interfaces
├── App.tsx                  # Router + lazy loading + Suspense
├── main.tsx                 # Entry point + theme init
├── index.css                # Tailwind v4 + design system tokens
└── vite-env.d.ts
```

---

## ✦ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# 1. Navigate into the project
cd ayokanmi-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## ✦ Customisation

### Updating Content

All personal information, projects, skills, and services live in a **single file**:

```
src/data/portfolio.ts
```

Edit this file to update:
- `personalInfo` — name, title, bio, email, GitHub, LinkedIn
- `projects` — add/remove/edit projects
- `skillGroups` — adjust skill categories and levels
- `securitySkills` — certifications and security competencies
- `services` — what you offer
- `techStackMarquee` — technologies in the scrolling banner

### Updating Theme

Design tokens are defined in `src/index.css` under `@theme { }`.
Change colour values, font stacks, or shadow styles there.

### Adding Projects

In `src/data/portfolio.ts`, add a new object to the `projects` array:

```ts
{
  id: 'my-new-project',
  title: 'My New Project',
  category: 'Web Application',
  description: 'Short description...',
  techStack: ['React', 'TypeScript', 'Node.js'],
  githubUrl: 'https://github.com/yokanm/...',
  liveUrl: 'https://...',
  featured: true,
  year: 2025,
}
```

---

## ✦ Deployment

The `dist/` folder is a standard static site — deploy anywhere:

```bash
# Netlify
netlify deploy --dir=dist --prod

# Vercel
vercel --prod

# GitHub Pages (with base path if needed)
# Set base: '/repo-name/' in vite.config.ts
```

For client-side routing (React Router), configure your host to serve `index.html` for all routes:

**Netlify** — create `public/_redirects`:
```
/*  /index.html  200
```

**Vercel** — create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## ✦ Features

- **Dark / Light Mode** — Nocturnal Bauhaus (dark) ↔ Bauhaus (light), persisted in `localStorage`
- **Scroll progress bar** — thin yellow line at the top of every page
- **Page transitions** — fade + slide via Framer Motion `AnimatePresence`
- **Lazy loading** — all pages are code-split with `React.lazy` + `Suspense`
- **Contact form** — validated with React Hook Form + Zod, submit feedback toast
- **Print-ready resume** — the `/resume` page prints cleanly
- **Accessible** — semantic HTML, `aria-label` attributes, `:focus-visible` styles
- **SEO** — `<title>`, `<meta description>`, Open Graph, Twitter Card, canonical URL

---

## ✦ License

MIT — use freely, attribution appreciated.
