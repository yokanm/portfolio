import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Download, Github, Linkedin,
  Shield, ExternalLink,
  SquareTerminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo, homeStats } from '@/data/portfolio';
import { getHomepageProjects } from '@/lib/projectHelpers';
import { trackEvent } from '@/lib/analytics';

// ── Typewriter ────────────────────────────────────────────
function TypewriterText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
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
  }, [displayed, deleting, idx, words, pause]);

  return (
    <span className="text-primary">
      {displayed}
      <span className="inline-block w-0.5 h-[0.85em] bg-primary ml-1 animate-pulse align-middle" aria-hidden="true" />
    </span>
  );
}

// Data-driven: visibility controlled by `featured` flag + `status` in portfolio.ts
const selectedProjects = getHomepageProjects(3);

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden grid-bg min-h-[92vh]"
        aria-label="Introduction"
      >
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-48 h-48 border-r-2 border-t-2 border-outline-strong/5 pointer-events-none" aria-hidden="true" />

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
            Secure.<br />Tested.<br />Typed.<br />Shipped.
          </div>
          <div className="w-4 h-8 bg-primary border-2 border-outline-strong/20 animate-pulse -skew-x-6" />
        </motion.div>
        {/* Group 1 — identity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}>

          {/* Availability badge */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-success block animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-on-surface-faint">
              Open to remote engineering roles
            </span>
          </div>

          {/* Name */}
          <div className="max-w-5xl">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-4 block" aria-hidden="true">
              01 — Introduction
            </span>
            <h1 className="font-display font-black leading-none tracking-tight block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-on-surface">
              <span className="italic font-light" style={{ textTransform: 'none' }}>{personalInfo.firstName}</span>
              
            </h1>
          </div>
        </motion.div>

        {/* Group 2 — typewriter + bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-5xl">

          <div className="mt-6 md:mt-8 flex items-center gap-3 flex-wrap">
            <span className="font-display font-bold uppercase text-xl md:text-2xl text-on-surface-muted">I build</span>
            <span className="font-display font-black uppercase text-xl md:text-2xl min-w-[20ch]" aria-live="polite" aria-label="rotating skill descriptions">
              <TypewriterText words={personalInfo.alternativeTitles} />
            </span>
          </div>

          <p className="mt-6 font-body text-on-surface-muted text-base leading-relaxed max-w-xl">
            A full-Stack Developer specializing in modern web applications with security built into the architecture. Experienced with authentication, authorization, API design, database architecture, and production deployments using React, Next.js, Node.js, and TypeScript.
          </p>
        </motion.div>

        {/* Group 3 — CTAs + socials + stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="max-w-5xl">

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

      {/* ── SELECTED WORK ──────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-20 md:py-28" aria-label="Selected work">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-3 block" aria-hidden="true">
            02 — Selected Work
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none">
            What I've Built
          </h2>
          <p className="font-body text-sm text-on-surface-faint mt-4 max-w-xl leading-relaxed">
            Three projects across the full stack. Each one has an engineering decision worth explaining.
          </p>
        </motion.div>

        <div className="flex flex-col gap-px bg-outline-strong/10" role="list">
          {selectedProjects.map((project, i) => (
            <motion.div key={project.id}
              role="listitem"
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-background p-8 group hover:bg-surface-dim transition-colors duration-150 flex flex-col md:flex-row md:items-start gap-6">

              {/* Index + category */}
              <div className="flex-shrink-0 md:w-40">
                <span className="font-mono text-[0.55rem] text-on-surface-subtle uppercase tracking-widest block mb-1" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="font-mono text-[0.55rem] text-on-surface-faint uppercase tracking-widest">
                  {project.category}
                </span>
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-xl uppercase text-on-surface leading-tight mb-3
                  group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {project.engineeringDecision && (
                  <div className="border-l-2 border-primary/40 pl-4 mb-4">
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-primary/60 block mb-1">
                      Engineering Decision
                    </span>
                    <p className="font-body text-xs text-on-surface-muted leading-relaxed">
                      {project.engineeringDecision}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Tech stack">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span key={tech}
                      className="font-mono text-[0.55rem] uppercase tracking-widest border border-outline text-on-surface-faint px-2 py-0.5">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle px-1 py-0.5">
                      +{project.techStack.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      onClick={() => trackEvent('project_repo_click', { project: project.id })}
                      className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
                      <Github size={12} aria-hidden="true" />GitHub
                    </a>
                  )}
                  {project.status === 'live' && project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      onClick={() => trackEvent('project_demo_click', { project: project.id })}
                      className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
                      <ExternalLink size={12} aria-hidden="true" />Live
                    </a>
                  )}
                  {project.status === 'in-development' && (
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-subtle">
                      In Development
                    </span>
                  )}
                  {project.status === 'private' && (
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-subtle">
                      Private / API
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} className="mt-8 flex justify-end">
          <Button asChild variant="outline">
            <Link to="/projects">All Projects <ArrowRight size={15} aria-hidden="true" /></Link>
          </Button>
        </motion.div>
      </section>

      {/* ── SECURITY — code-verified defaults ──────────────── */}
      <section className="px-6 md:px-12 lg:px-16 pb-20" aria-label="Security approach">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="border-l-4 border-primary bg-primary/5 px-8 py-7 flex flex-col sm:flex-row items-start gap-6">
          <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <Shield size={22} className="text-on-primary" />
          </div>
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-primary mb-1">
              Security Defaults — Applied in Job Board API + TaskFlow
            </p>
            <h3 className="font-display font-black text-xl uppercase text-on-surface leading-tight mb-2">
              Auth Designed Correctly From the Start
            </h3>
            <p className="font-body text-sm text-on-surface-muted leading-relaxed max-w-2xl">
              Argon2id (64MiB, OWASP 2024) over bcrypt. Refresh token family revocation —
              stolen token detected on first reuse. Access token in memory only; refresh token
              in httpOnly cookie — XSS cannot read either. DOMPurify middleware applied globally,
              not per-handler. These are defaults, not features bolted on later.
            </p>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint mt-3">
              Google Cybersecurity Professional Certificate — provides the conceptual foundation;
              the repositories verify the implementation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="mx-6 md:mx-12 lg:mx-16 mb-20" aria-label="Call to action">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="border-2 border-primary bg-surface-dim p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[8px_8px_0px_#ffd700]">
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl uppercase text-on-surface leading-tight">
              Available for<br /><span className="text-primary">Remote Roles</span>
            </h2>
            <p className="font-body text-on-surface-muted text-sm mt-3 max-w-md leading-relaxed">
              TypeScript-first. Security-aware. Full-stack across React, Next.js, and Node.js.
              Open to full-time and contract positions.
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
