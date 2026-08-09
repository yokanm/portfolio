import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion, motion } from 'framer-motion';
import {
  ArrowRight, Download, Github, Linkedin,
  Shield, ExternalLink, SquareTerminal, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo, homeStats, engineeringHighlights } from '@/data/portfolio';
import { getFlagship, getSelectedProjects } from '@/lib/projectHelpers';
import { trackEvent } from '@/lib/analytics';
import { SeoTag } from '@/components/shared/SeoTag';
import { MetricChip } from '@/components/shared/CaseStudySections';

// ── Typewriter ────────────────────────────────────────────
function TypewriterText({ words, reduced }: { words: string[]; reduced: boolean }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDisplayed(words[0] ?? '');
      return;
    }
    if (pause) { const t = setTimeout(() => setPause(false), 1600); return () => clearTimeout(t); }
    const current = words[idx % words.length];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) { setPause(true); setDeleting(true); }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, words, pause, reduced]);

  if (reduced) {
    return <span className="text-primary">{words[0] ?? ''}</span>;
  }

  return (
    <span className="text-primary">
      {displayed}
      <span className="inline-block w-0.5 h-[0.85em] bg-primary ml-1 animate-pulse align-middle" aria-hidden="true" />
    </span>
  );
}

const flagship = getFlagship();
const selected = getSelectedProjects(2);

export function HomePage() {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col">
      <SeoTag
        path="/"
        title="Full-Stack Software Engineer"
        description="Ayokanmi Ogunyebi — Full-Stack Software Engineer building secure, production-oriented systems: multi-tenant platforms, e-commerce, and mobile apps."
      />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden grid-bg min-h-[92vh]"
        aria-label="Introduction"
      >
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 pointer-events-none" aria-hidden="true" />

        {/* Decorative status card */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden lg:flex absolute right-12 top-20 w-60 flex-col justify-between gap-6 border-2 border-outline-strong/15 bg-surface-dim p-6 shadow-[6px_6px_0px_#ffd700]"
          aria-hidden="true"
        >
          <div className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-secondary flex items-center gap-2">
            <SquareTerminal size={20} aria-hidden="true" />
            system.status
          </div>
          <div className="font-display font-black uppercase text-lg leading-tight text-on-surface">
            Multi-tenant.<br />Secure.<br />Tested.<br />Shipped.
          </div>
          <div className="w-4 h-8 bg-primary border-2 border-outline-strong/20 animate-pulse -skew-x-6" />
        </motion.div>

        {/* Group 1 — identity */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-success block animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-on-surface-faint">
              Open to remote engineering roles
            </span>
          </div>

          <div className="max-w-5xl">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-4 block" aria-hidden="true">
              01 — Introduction
            </span>
            <h1 className="font-display font-black leading-none tracking-tight block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-on-surface">
              <span className="italic font-light" style={{ textTransform: 'none' }}>{personalInfo.firstName}</span>
            </h1>
          </div>
        </motion.div>

        {/* Group 2 — typewriter + positioning */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-5xl"
        >
          <div className="mt-6 md:mt-8 flex items-center gap-3 flex-wrap">
            <span className="font-display font-bold uppercase text-xl md:text-2xl text-on-surface-muted">I build</span>
            <span className="font-display font-black uppercase text-xl md:text-2xl min-w-[25ch]" aria-live="polite" aria-label="rotating skill descriptions">
              <TypewriterText words={personalInfo.alternativeTitles} reduced={reduced ?? false} />
            </span>
          </div>

          <p className="mt-6 font-body text-on-surface-muted text-base leading-relaxed max-w-xl">
            A Full-Stack Software Engineer building secure, production-oriented systems — from React/Next.js
            frontends to Node.js/Express APIs, database architecture, and deployment infrastructure.
          </p>
        </motion.div>

        {/* Group 3 — CTAs + socials + stats */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="max-w-5xl"
        >
          <div className="flex flex-wrap gap-4 mt-10">
            <Button asChild size="lg">
              <Link to="/projects">View My Work <ArrowRight size={17} aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/resume" onClick={() => trackEvent('resume_download')}>
                <Download size={17} aria-hidden="true" />Resume
              </Link>
            </Button>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click')}
              aria-label="GitHub profile"
              className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors"
            >
              <Github size={13} aria-hidden="true" />github.com/yokanm
            </a>
            <span className="text-outline" aria-hidden="true">·</span>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('linkedin_click')}
              aria-label="LinkedIn profile"
              className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors"
            >
              <Linkedin size={13} aria-hidden="true" />LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-16 pt-8 border-t-2 border-outline-strong/10" aria-label="Key statistics">
            {homeStats.map((stat) => (
              <div key={stat.label} className="border-r border-outline-strong/10 last:border-0 pr-6 last:pr-0">
                <div className="font-display font-black text-3xl text-primary leading-none">{stat.value}</div>
                <div className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── ENGINEERING HIGHLIGHTS ─────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-16 md:py-20" aria-label="Engineering highlights">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-primary tracking-[0.15em] uppercase">02</span>
            <span className="flex-1 max-w-[60px] h-px bg-primary/40" aria-hidden="true" />
            <span className="font-mono text-xs text-on-surface-faint uppercase tracking-[0.12em]">Capabilities</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none mb-4">
            Engineering Highlights
          </h2>
          <p className="font-body text-sm text-on-surface-faint mt-3 max-w-xl leading-relaxed">
            Applied in production repositories — each links to the project where it is demonstrated.
          </p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2">
          {engineeringHighlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={reduced ? undefined : { opacity: 0, scale: 0.9 }} whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.02, duration: 0.2 }}
            >
              <Link
                to={`/projects/${h.projectSlug}`}
                onClick={() => trackEvent('highlight_click', { highlight: h.title })}
                className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest border border-primary/40 text-primary px-3 py-1.5 hover:border-primary hover:bg-primary/5 transition-all duration-100"
              >
                <Check size={11} aria-hidden="true" />{h.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FLAGSHIP SPOTLIGHT ─────────────────────────────── */}
      {flagship && (
        <section className="px-6 md:px-12 lg:px-16 py-10 md:py-14" aria-label="Flagship project">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="border-2 border-primary bg-surface-dim p-8 md:p-12 shadow-[8px_8px_0px_#ffd700]"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-primary">Flagship Project</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint">
                {flagship.category} · {flagship.year}
              </span>
            </div>
            <h2 className="font-display font-black uppercase text-4xl md:text-5xl text-on-surface leading-none">
              {flagship.title}
            </h2>
            <p className="font-display font-bold text-primary uppercase text-xl md:text-2xl mt-2">{flagship.tagline}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
              <div>
                <p className="font-body text-sm text-on-surface-muted leading-relaxed">{flagship.overview}</p>
                <div className="flex flex-wrap gap-2 mt-6" aria-label="Flagship metrics">
                  {flagship.metrics.slice(0, 5).map((m) => <MetricChip key={m} label={m} />)}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="border-l-4 border-primary pl-5">
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-primary block mb-1">Architecture</span>
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-faint leading-relaxed">
                    React SPA → REST API → Express → Prisma → PostgreSQL + Redis → BullMQ → Observability → Docker/CI
                  </p>
                </div>
                <Button asChild size="lg">
                  <Link to={`/projects/${flagship.slug}`}>
                    Read the Case Study <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── SELECTED WORK ──────────────────────────────────── */}
      {selected.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-14 md:py-20" aria-label="Selected work">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-primary tracking-[0.15em] uppercase">03</span>
              <span className="flex-1 max-w-[60px] h-px bg-primary/40" aria-hidden="true" />
              <span className="font-mono text-xs text-on-surface-faint uppercase tracking-[0.12em]">Selected Work</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none">
              Selected Work
            </h2>
          </motion.div>

          <div className="flex flex-col gap-px bg-outline-strong/10">
            {selected.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={reduced ? undefined : { opacity: 0, x: -16 }} whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-background p-8 group hover:bg-surface-dim transition-colors duration-150 flex flex-col md:flex-row md:items-start gap-6"
              >
                <div className="flex-shrink-0 md:w-40">
                  <span className="font-mono text-[0.55rem] text-on-surface-subtle uppercase tracking-widest block mb-1" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[0.55rem] text-on-surface-faint uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-xl uppercase text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-on-surface-muted leading-relaxed max-w-2xl">{project.overview}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.metrics.slice(0, 3).map((m) => <MetricChip key={m} label={m} />)}
                  </div>
                  <div className="flex gap-4 mt-5">
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={() => trackEvent('project_detail_click', { project: project.slug })}
                      className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors"
                    >
                      <ArrowRight size={12} aria-hidden="true" />Case Study
                    </Link>
                    {project.deployment.length > 0 && project.status === 'live' && (
                      <a href={project.deployment[0].url} target="_blank" rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        onClick={() => trackEvent('project_demo_click', { project: project.slug })}
                        className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
                        <ExternalLink size={12} aria-hidden="true" />Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── SECURITY STRIP ─────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 pb-20" aria-label="Security approach">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="border-l-4 border-primary bg-primary/5 px-8 py-7 flex flex-col sm:flex-row items-start gap-6"
        >
          <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <Shield size={22} className="text-on-primary" />
          </div>
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-primary mb-1">
              Security Defaults — Applied in PostBoard + TaskFlow
            </p>
            <h3 className="font-display font-black text-xl uppercase text-on-surface leading-tight mb-2">
              Auth Designed Correctly From the Start
            </h3>
            <p className="font-body text-sm text-on-surface-muted leading-relaxed max-w-2xl">
              Argon2id (OWASP-recommended) over bcrypt. Refresh-token family rotation — a stolen token is
              detected on first reuse. Access token in memory only; refresh token in httpOnly cookie — XSS
              cannot read either. IDOR and authorization test suites enforce multi-tenant isolation. These are
              defaults, not features bolted on later.
            </p>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint mt-3">
              Google Cybersecurity Professional Certificate — conceptual foundation; the repositories verify the implementation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="mx-6 md:mx-12 lg:mx-16 mb-20" aria-label="Call to action">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="border-2 border-primary bg-surface-dim p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[8px_8px_0px_#ffd700]"
        >
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase text-on-surface leading-tight">
              Available for<br /><span className="text-primary">Remote Roles</span>
            </h2>
            <p className="font-body text-on-surface-muted text-sm mt-3 max-w-md leading-relaxed">
              TypeScript-first. Security-aware. Full-stack across React, Next.js, and Node.js — with
              PostgreSQL, Redis, Docker, and CI. Open to full-time and contract positions.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <Button asChild size="lg">
              <Link to="/contact">Start a Conversation <ArrowRight size={17} aria-hidden="true" /></Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}