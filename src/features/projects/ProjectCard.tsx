import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock, Wrench, Archive } from 'lucide-react';
import type { Project } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Status badge — never renders a dead link */
function StatusBadge({ status }: { status: Project['status'] }) {
  if (!status || status === 'live') return null;

  const config = {
    'private':        { label: 'Private / API', Icon: Lock,    color: '#606060' },
    'in-development': { label: 'In Development', Icon: Wrench, color: '#ffd700' },
    'archived':       { label: 'Archived',       Icon: Archive, color: '#3a3a3a' },
  } as const;

  const { label, Icon, color } = config[status];
  return (
    <span
      className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-widest px-2 py-1 border"
      style={{ borderColor: `${color}60`, color }}
      aria-label={`Project status: ${label}`}
    >
      <Icon size={10} aria-hidden="true" />
      {label}
    </span>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isLive = project.status === 'live' && Boolean(project.liveUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
      className="group border-2 border-outline-strong/15 bg-surface-dim hover:border-primary hover:shadow-[6px_6px_0px_#ffd700] transition-all duration-150 flex flex-col"
      aria-label={project.title}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b-2 border-outline-strong/10 group-hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="w-2.5 h-2.5 bg-secondary border border-secondary/50" />
          <span className="w-2.5 h-2.5 bg-primary border border-primary/50" />
          <span className="w-2.5 h-2.5 bg-success border border-success/50" />
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">
          {project.category}
        </span>
        <h3 className="font-display font-black text-2xl uppercase text-on-surface leading-tight">
          {project.title}
        </h3>
        <p className="font-body text-sm text-on-surface-faint leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <ul className="flex flex-wrap gap-2 pt-1" aria-label="Project metrics">
            {project.metrics.map((metric) => (
              <li key={metric}
                className="font-mono text-[0.55rem] uppercase tracking-widest bg-primary/8 border border-primary/20 text-primary/80 px-2 py-0.5">
                {metric}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span key={tech}
              className="font-mono text-[0.55rem] uppercase tracking-widest border border-outline text-on-surface-faint px-2 py-0.5 group-hover:border-primary/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        {/* Engineering Decision */}
        {project.engineeringDecision && (
          <div className="pt-2 border-t border-outline-strong/5">
            <span className="font-mono text-[0.5rem] uppercase tracking-widest text-primary mb-1 block">
              Engineering Decision
            </span>
            <p className="font-body text-xs text-on-surface-faint leading-relaxed">
              {project.engineeringDecision}
            </p>
          </div>
        )}
      </div>

      {/* Footer links — status-driven, no dead links */}
      <div className="flex items-center border-t-2 border-outline-strong/10 group-hover:border-primary/30 transition-colors">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            onClick={() => trackEvent('project_repo_click', { project: project.id })}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary hover:bg-primary/5 border-r border-outline-strong/10 transition-all duration-100"
          >
            <Github size={13} aria-hidden="true" />Source
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-subtle border-r border-outline-strong/10">
            <Github size={13} aria-hidden="true" />Private
          </span>
        )}

        {isLive ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            onClick={() => trackEvent('project_demo_click', { project: project.id })}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary hover:bg-primary/5 transition-all duration-100"
          >
            <ExternalLink size={13} aria-hidden="true" />Live
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-subtle cursor-default select-none">
            {project.status === 'in-development'
              ? <><Wrench size={13} aria-hidden="true" />In Progress</>
              : project.status === 'archived'
              ? <><Archive size={13} aria-hidden="true" />Archived</>
              : <><Lock size={13} aria-hidden="true" />API Only</>
            }
          </span>
        )}
      </div>
    </motion.article>
  );
}
