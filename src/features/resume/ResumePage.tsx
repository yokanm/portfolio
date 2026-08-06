import { motion } from 'framer-motion';
import { Download, Printer, Github, Linkedin, Mail, MapPin, ExternalLink, Shield } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { personalInfo, projects, skillGroups, appliedSecuritySkills } from '@/data/portfolio';
import { trackEvent } from '@/lib/analytics';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, duration: 0.4 },
});

export function ResumePage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
        <SectionTitle index="01" label="Resume" title="Curriculum Vitae" className="mb-0" />
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => window.print()} aria-label="Print resume">
            <Printer size={13} aria-hidden="true" />Print
          </Button>
          <Button size="sm" asChild>
            <a
              href="/ayokanmi-ogunyebi-resume.pdf"
              download="Ayokanmi-Ogunyebi-Resume.pdf"
              onClick={() => trackEvent('resume_download')}
              aria-label="Download resume as PDF"
            >
              <Download size={13} aria-hidden="true" />Download PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl border-2 border-outline-strong/15 bg-surface-dim">
        {/* Header */}
        <motion.div {...fadeIn(0)} className="border-b-2 border-primary p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <h1 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface leading-none">
                {personalInfo.firstName}<br />{personalInfo.lastName}
              </h1>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-primary mt-3">
                {personalInfo.title}
              </p>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-on-surface-faint mt-1">
                Security-First Developer · Remote
              </p>
            </div>
            <div className="space-y-2" aria-label="Contact information">
              {[
                { Icon: Mail,     text: personalInfo.email,         href: `mailto:${personalInfo.email}` },
                { Icon: Github,   text: 'github.com/yokanm',        href: personalInfo.githubUrl },
                { Icon: Linkedin, text: 'LinkedIn',                 href: personalInfo.linkedinUrl },
                { Icon: MapPin,   text: personalInfo.location,      href: null },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center justify-end gap-2 text-on-surface-muted">
                  {href ? (
                    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="font-body text-xs hover:text-primary transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="font-body text-xs">{text}</span>
                  )}
                  <Icon size={11} className="text-on-surface-faint flex-shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.section {...fadeIn(0.05)} aria-labelledby="resume-summary"
          className="px-8 md:px-10 py-7 border-b-2 border-outline-strong/10">
          <h2 id="resume-summary"
            className="font-display font-black text-xs uppercase tracking-widest text-primary mb-4">
            Professional Summary
          </h2>
          <p className="font-body text-sm text-on-surface-muted leading-relaxed">
            Full-Stack Engineer with six projects across web, REST API, and mobile — all in TypeScript,
            four live in production and two in active development.
            Auth designed with Argon2id, refresh token rotation, and httpOnly cookies as standard practice,
            not as an add-on. Strongest in Node.js/Express APIs paired with React or Next.js frontends,
            with React Native for cross-platform mobile. Google Cybersecurity Professional Certificate.
            Open to remote roles internationally.
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section {...fadeIn(0.08)} aria-labelledby="resume-skills"
          className="px-8 md:px-10 py-7 border-b-2 border-outline-strong/10">
          <h2 id="resume-skills"
            className="font-display font-black text-xs uppercase tracking-widest text-primary mb-5">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <h3 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface mb-2">
                  {group.category}
                </h3>
                <p className="font-body text-xs text-on-surface-faint leading-relaxed">
                  {group.skills.map((s) => s.name).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section {...fadeIn(0.1)} aria-labelledby="resume-projects"
          className="px-8 md:px-10 py-7 border-b-2 border-outline-strong/10">
          <h2 id="resume-projects"
            className="font-display font-black text-xs uppercase tracking-widest text-primary mb-6">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => {
              const isLive = project.status === 'live' && Boolean(project.liveUrl);
              return (
                <div key={project.id}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <h3 className="font-display font-bold text-sm uppercase text-on-surface">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-primary mt-0.5">
                        {project.category}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          onClick={() => trackEvent('project_repo_click', { project: project.id })}
                          className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
                          <Github size={10} aria-hidden="true" />Source
                        </a>
                      )}
                      {isLive && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          onClick={() => trackEvent('project_demo_click', { project: project.id })}
                          className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
                          <ExternalLink size={10} aria-hidden="true" />Live
                        </a>
                      )}
                      {!isLive && project.status && (
                        <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">
                          {project.status === 'private' ? 'API' : project.status === 'in-development' ? 'WIP' : project.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="font-body text-xs text-on-surface-faint leading-relaxed mb-2">
                    {project.description}
                  </p>
                  {project.metrics && project.metrics.length > 0 && (
                    <p className="font-body text-xs text-primary/60 leading-relaxed mb-2">
                      {project.metrics.join(' · ')}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech}
                        className="font-mono text-[0.5rem] uppercase tracking-widest border border-outline text-on-surface-faint px-1.5 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section {...fadeIn(0.12)} aria-labelledby="resume-certs"
          className="px-8 md:px-10 py-7 border-b-2 border-outline-strong/10">
          <h2 id="resume-certs"
            className="font-display font-black text-xs uppercase tracking-widest text-primary mb-5">
            Certifications
          </h2>
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Shield size={18} className="text-on-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm uppercase text-on-surface">
                Google Cybersecurity Professional Certificate
              </h3>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mt-1">
                Coursera / Google · Completed
              </p>
              <p className="font-body text-xs text-on-surface-faint mt-2 leading-relaxed">
                Applied to auth design across projects: Argon2id, JWT rotation, httpOnly cookies,
                DOMPurify middleware, Redis rate limiting. Conceptual exposure to threat modeling,
                incident response, SIEM, and network security.
              </p>
              <div className="flex flex-wrap gap-1 mt-3" aria-label="Applied security skills">
                {appliedSecuritySkills.slice(0, 6).map((s) => (
                  <span key={s.name}
                    className="font-mono text-[0.5rem] uppercase tracking-widest border border-primary/20 text-primary px-1.5 py-0.5">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div {...fadeIn(0.15)} className="px-8 md:px-10 py-5 flex items-center justify-between">
          <p className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">
            Updated · {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
              GitHub
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
