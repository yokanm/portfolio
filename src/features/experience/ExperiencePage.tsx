import { motion } from 'framer-motion';
import { Shield, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SeoTag } from '@/components/shared/SeoTag';
import { Button } from '@/components/ui/button';
import { engineeringDecisions, personalInfo } from '@/data/portfolio';
import { Link } from 'react-router-dom';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, duration: 0.4, ease: 'easeOut' },
});

const approach = [
  {
    icon: <Shield size={19} />,
    title: 'Security-First',
    desc: 'Auth design, input validation, access control, and threat modeling — applied at architecture level, not added as a final checklist item.',
  },
  {
    icon: <Code2 size={19} />,
    title: 'TypeScript Strict',
    desc: 'Typed API clients, Zod validation, no any in domain logic. Types are design documentation — they tell the next engineer exactly what a function expects and returns.',
  },
  {
    icon: <CheckCircle2 size={19} />,
    title: 'Decisions Over Features',
    desc: 'Every architectural choice has a reason. I can explain why I picked TanStack Query over Zustand for server state, and what tradeoff I accepted.',
  },
];

export function ExperiencePage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-5xl">
      <SeoTag
        title="Engineering Approach"
        description="The architectural decisions behind Ayokanmi Ogunyebi's projects — Argon2id, JWT rotation, RBAC, BullMQ, and why each technical choice was made."
      />
      <SectionTitle
        index="01"
        label="Approach"
        title="Engineering Decisions"
        description="The architectural choices behind the projects — and why those choices were made."
      />

      {/* Engineering decisions */}
      <motion.div {...fadeIn(0)} className="mb-16">
        <div className="border-2 border-outline-strong/15 overflow-hidden">
          <div className="bg-primary px-6 py-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-display font-black text-lg uppercase text-on-primary">
                Full-Stack Software Engineer
              </h3>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-on-primary mt-0.5">
                Remote · Worldwide · TypeScript + Next.js + Supabase
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-on-primary">
                {personalInfo.location}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 divide-y divide-outline-strong/5">
            {engineeringDecisions.map((decision, i) => {
              const [first, ...rest] = decision.split(' — ');
              const hasReason = rest.length > 0;
              return (
                <motion.div key={i} {...fadeIn(i * 0.04)}
                  className="flex items-start gap-4 py-4 group">
                  <div className="flex-shrink-0 w-6 h-6 border border-outline flex items-center justify-center mt-0.5 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <span className="font-mono text-[0.5rem] text-on-surface-faint group-hover:text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    {hasReason ? (
                      <>
                        <p className="font-body text-sm text-on-surface leading-relaxed font-medium">
                          {first}
                        </p>
                        <p className="font-body text-sm text-on-surface-faint leading-relaxed mt-0.5">
                          — {rest.join(' — ')}
                        </p>
                      </>
                    ) : (
                      <p className="font-body text-sm text-on-surface-muted leading-relaxed group-hover:text-on-surface transition-colors">
                        {decision}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Approach cards */}
      <motion.div {...fadeIn(0.1)} className="mb-16">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-8 block">
          02 — Principles
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {approach.map((item, i) => (
            <motion.div key={item.title} {...fadeIn(i * 0.08)}
              className="border-2 border-outline-strong/10 p-6 hover:border-primary/40 hover:shadow-[4px_4px_0px_#ffd700] transition-all duration-150 group">
              <div className="w-10 h-10 border-2 border-outline flex items-center justify-center text-primary mb-4 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                {item.icon}
              </div>
              <h4 className="font-display font-bold text-sm uppercase text-on-surface mb-2">{item.title}</h4>
              <p className="font-body text-xs text-on-surface-faint leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certification */}
      <motion.div {...fadeIn(0.15)}>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary mb-8 block">
          03 — Certification
        </span>
        <div className="border-2 border-primary p-8 flex flex-col sm:flex-row items-start gap-8 shadow-[6px_6px_0px_#ffd700]">
          <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
            <Shield size={30} className="text-on-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-display font-black text-xl uppercase text-on-surface leading-tight">
                  Google Cybersecurity
                </h3>
                <h4 className="font-display font-bold text-base uppercase text-primary leading-tight mt-0.5">
                  Professional Certificate
                </h4>
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-widest border border-primary/40 text-primary px-3 py-1">
                Completed
              </span>
            </div>
            <p className="font-body text-sm text-on-surface-muted mt-3 leading-relaxed max-w-xl">
              Applied to production code — not listed as a credential then forgotten.
              Auth design, input validation, access control patterns, and threat-aware architecture
              are standard practice in every project.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['Threat Modeling', 'Incident Response', 'Network Security', 'SIEM Concepts', 'Vulnerability Assessment', 'Access Control'].map((skill) => (
                <span key={skill}
                  className="font-mono text-[0.55rem] uppercase tracking-widest border border-primary/30 text-primary px-2 py-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeIn(0.2)} className="mt-16 flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/projects">See the Projects <ArrowRight size={15} /></Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Work With Me</Link>
        </Button>
      </motion.div>
    </div>
  );
}
