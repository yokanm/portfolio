import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';
import { trackEvent } from '@/lib/analytics';
import { MetricChip } from '@/components/shared/CaseStudySections';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/** Status affordance derived entirely from metadata — no dead links. */
function DemoBadge({ project }: { project: Project }) {
if (project.status === 'live') {
    return (
      <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">
        {project.demoStatus ?? 'Live'}
      </span>
    );
  }
  if (project.status === 'frontend-live') {
    return (
      <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">
        <span className="w-1.5 h-1.5 bg-success" aria-hidden="true" />
        Frontend live
      </span>
    );
  }
  if (project.status === 'in-development') {
    return (
      <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">
        <Wrench size={10} aria-hidden="true" /> In development
      </span>
    );
  }
  return <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle">Private</span>;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
          <DemoBadge project={project} />
          {project.isFlagship && (
            <span className="font-mono text-[0.55rem] uppercase tracking-widest border border-primary/40 text-primary px-2 py-0.5">
              Flagship
            </span>
          )}
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
          {truncate(project.overview, 220)}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1" aria-label="Project metrics">
            {project.metrics.slice(0, 4).map((m) => (
              <MetricChip key={m} label={m} />
            ))}
          </div>
        )}
      </div>

      {/* Footer: detail link + demo */}
      <div className="flex items-center border-t-2 border-outline-strong/10 group-hover:border-primary/30 transition-colors">
        <Link
          to={`/projects/${project.slug}`}
          onClick={() => trackEvent('project_detail_click', { project: project.slug })}
          aria-label={`Open the ${project.title} case study`}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary hover:bg-primary/5 border-r border-outline-strong/10 transition-all duration-100"
        >
          <ArrowRight size={13} aria-hidden="true" /> Case Study
        </Link>
        {project.deployment.length > 0 && project.status === 'live' ? (
          <a
            href={project.deployment[0].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            onClick={() => trackEvent('project_demo_click', { project: project.slug })}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary hover:bg-primary/5 transition-all duration-100"
          >
            <ExternalLink size={13} aria-hidden="true" /> Live
          </a>
        ) : (
          <span className="flex-1 flex items-center justify-center py-4 px-5 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-subtle cursor-default">
            {project.demoStatus ?? 'Demo pending'}
          </span>
        )}
      </div>
    </motion.article>
  );
}

function truncate(str: string, max: number) {
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + '…';
}