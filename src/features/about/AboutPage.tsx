import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, Shield, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { Link } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, duration: 0.45, ease: 'easeOut' },
});

const bioParagraphs = personalInfo.bio.split('\n\n').filter(Boolean);

const decisions = [
  {
    number: '01',
    title: 'Pick the algorithm with a reason, not a habit.',
    description:
      'I chose Argon2id over bcrypt not because it\'s newer but because it\'s memory-hard — GPU cracking costs ~10x more compute. Every technical choice should have a reason that survives a senior engineer asking "why."',
  },
  {
    number: '02',
    title: 'Treat types as design documentation.',
    description:
      'TypeScript strict mode on every project. Zod schemas mirrored server and client. Types tell the next engineer exactly what a function expects and what it returns — that\'s design, not ceremony.',
  },
  {
    number: '03',
    title: 'Async by default, not on exception.',
    description:
      'Email in a BullMQ queue, not inline in request handlers. Optimistic UI updates with automatic revert on failure. The architecture should assume network failure before assuming success.',
  },
  {
    number: '04',
    title: 'Acknowledge the gaps explicitly.',
    description:
      'Every project in this portfolio includes known limitations. An engineer who can\'t articulate gaps in their own work can\'t be trusted to articulate gaps in the team\'s work.',
  },
];

export function AboutPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-6xl">
      <SectionTitle index="01" label="About" title="The Engineer Behind the Code"
        description="Full-stack, security-conscious, and driven by craft." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left: Bio */}
        <div className="lg:col-span-3 space-y-6">
          {bioParagraphs.map((para, i) => (
            <motion.p key={i} {...fadeIn(i * 0.08)}
              className="font-body text-on-surface-muted leading-relaxed text-base">{para}</motion.p>
          ))}
          <motion.div {...fadeIn(0.35)} className="flex flex-wrap gap-4 pt-4">
            <Button asChild>
              <Link to="/projects">See My Projects <ArrowRight size={15} /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Work Together</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: Info card */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div {...fadeIn(0.15)} className="border-2 border-outline-strong/20 p-6 space-y-4">
            <div className="pb-4 border-b-2 border-outline-strong/10">
              <h2 className="font-display font-black text-xl uppercase text-on-surface leading-tight">
                {personalInfo.firstName}<br />{personalInfo.lastName}
              </h2>
              <p className="font-mono text-[0.65rem] text-primary uppercase tracking-widest mt-1">
                {personalInfo.title}
              </p>
            </div>
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: personalInfo.location, href: null },
                { Icon: Mail, text: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { Icon: Github, text: 'github.com/yokanm', href: personalInfo.githubUrl },
                { Icon: Linkedin, text: 'LinkedIn Profile', href: personalInfo.linkedinUrl },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 text-on-surface-muted">
                  <Icon size={13} className="text-on-surface-faint flex-shrink-0" />
                  {href ? (
                    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-body text-sm hover:text-primary transition-colors">{text}</a>
                  ) : (
                    <span className="font-body text-sm">{text}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-3 border-t-2 border-outline-strong/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-success animate-pulse" />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-success">
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Cert badge */}
          <motion.div {...fadeIn(0.25)}
            className="border-2 border-primary/30 bg-primary/5 p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-on-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm uppercase text-primary leading-tight">
                Google Cybersecurity
              </h3>
              <p className="font-mono text-[0.6rem] text-on-surface-faint uppercase tracking-widest mt-0.5">
                Professional Certificate
              </p>
              <p className="font-body text-xs text-on-surface-muted mt-2 leading-relaxed">
                Security-first development across the full software lifecycle.
              </p>
            </div>
          </motion.div>

          {/* Portfolio link */}
          <motion.div {...fadeIn(0.3)}>
            <a href="https://kanmiportfolio.netlify.app" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between border-2 border-outline-strong/10 px-4 py-3.5 hover:border-primary hover:shadow-[4px_4px_0px_#ffd700] transition-all duration-150 group">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-faint group-hover:text-primary transition-colors block">
                  Portfolio site
                </span>
                <p className="font-body text-xs text-on-surface-subtle mt-0.5">kanmiportfolio.netlify.app</p>
              </div>
              <ArrowRight size={13} className="text-on-surface-faint group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* How I Make Decisions */}
      <div className="mt-24">
        <motion.div {...fadeIn(0)} className="mb-12">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-3 block">
            02 — Philosophy
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none">
            How I Make Decisions
          </h2>
        </motion.div>
        <div className="flex flex-col gap-px bg-outline-strong/5">
          {decisions.map((d, i) => (
            <motion.div key={d.number} {...fadeIn(i * 0.08)}
              className="bg-background p-8 hover:bg-surface-dim transition-colors group flex items-start gap-6">
              <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle flex-shrink-0 pt-1">
                {d.number}
              </span>
              <div>
                <h3 className="font-display font-bold text-base uppercase text-on-surface mb-2
                  group-hover:text-primary transition-colors">
                  {d.title}
                </h3>
                <p className="font-body text-sm text-on-surface-faint leading-relaxed">{d.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
