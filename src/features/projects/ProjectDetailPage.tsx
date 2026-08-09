import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { SeoTag } from '@/components/shared/SeoTag';
import { ArchitectureDiagram } from '@/components/shared/ArchitectureDiagram';
import { ProductionReadiness } from '@/components/shared/ProductionReadiness';
import {
  SectionHeading,
  TechnologyChoices,
  EngineeringDecisions,
  Tradeoffs,
  ListSection,
  MetricChip,
} from '@/components/shared/CaseStudySections';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/lib/projectHelpers';
import { NotFoundPage } from '@/features/home/NotFoundPage';
import { trackEvent } from '@/lib/analytics';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  const { seo } = project;

  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 max-w-6xl">
      <SeoTag path={`/projects/${project.slug}`} title={seo.title} description={seo.description} />

      {/* Back + header */}
      <div className="mb-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors"
        >
          <ArrowLeft size={13} aria-hidden="true" /> All Projects
        </Link>
      </div>

      <div className="mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-primary">
            {String(project.year)} · {project.category}
          </span>
          {project.isFlagship && (
            <span className="font-mono text-[0.55rem] uppercase tracking-widest border border-primary/40 text-primary px-2 py-0.5">
              Flagship
            </span>
          )}
        </div>
        <h1 className="font-display font-black uppercase leading-none tracking-tight text-5xl md:text-6xl lg:text-7xl text-on-surface">
          {project.title}
          {project.tagline && (
            <span className="block text-primary text-2xl md:text-3xl mt-3">{project.tagline}</span>
          )}
        </h1>

        <p className="mt-6 font-body text-base text-on-surface-muted leading-relaxed max-w-2xl">
          {project.overview}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6" aria-label="Project metrics">
            {project.metrics.map((m) => <MetricChip key={m} label={m} />)}
          </div>
        )}

        {/* Demo + source */}
        <div className="flex flex-wrap gap-3 mt-8">
          {project.deployment.length > 0 && (
            <Button asChild>
              <a href={project.deployment[0].url} target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('project_demo_click', { project: project.slug })}>
                <ExternalLink size={15} aria-hidden="true" /> {project.deployment[0].label}
              </a>
            </Button>
          )}
          {project.repositories.map((repo) => (
            <Button asChild key={repo.url} variant="outline">
              <a href={repo.url} target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('project_repo_click', { project: project.slug })}>
                <Github size={15} aria-hidden="true" /> {repo.label}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* ═══════════ CASE STUDY BODY ═══════════ */}
      <div className="space-y-20">
        {/* Overview / Problem / Goals */}
        <section aria-label="Overview, problem, and goals">
          <SectionHeading index="01" label="Overview" title="What & Why" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="border-l-4 border-primary pl-6">
              <h4 className="font-display font-bold text-xs uppercase text-primary mb-2">Problem</h4>
              <p className="font-body text-sm text-on-surface-muted leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-xs uppercase text-primary mb-3">Goals</h4>
              <ul className="space-y-2">
                {project.goals.map((g) => (
                  <li key={g} className="flex items-start gap-2 font-body text-sm text-on-surface-muted leading-relaxed">
                    <span className="text-primary mt-1" aria-hidden="true">✓</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture */}
        {project.architecture.length > 0 && (
          <section aria-label="Architecture">
            <SectionHeading index="02" label="Architecture" title="System Flow" />
            <ArchitectureDiagram nodes={project.architecture} ariaLabel={`${project.title} architecture`} />
          </section>
        )}

        <TechnologyChoices items={project.technologyGroups} />
        <EngineeringDecisions items={project.engineeringDecisions} />
        <Tradeoffs items={project.tradeoffs} />

        <ListSection index="06" label="Challenges" title="Hardest Parts" items={project.challenges} icon="challenge" />
        <ListSection index="07" label="Testing" title="Testing Strategy" items={project.testing} icon="test" />
        <ListSection index="08" label="Performance" title="Performance Work" items={project.performance} icon="gauge" />
        <ListSection index="09" label="Security" title="Security Architecture" items={project.security} icon="shield" />

        <ProductionReadiness items={project.productionReadiness} />

        <ListSection index="10" label="Lessons Learned" title="What This Taught Me" items={project.lessonsLearned} icon="bulb" />
        <ListSection index="11" label="Future Roadmap" title="What Comes Next" items={project.futureRoadmap} icon="map" accent="secondary" />

        {/* Docs + React */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          aria-label="Repositories and documentation"
          className="border-t-2 border-outline-strong/10 pt-10"
        >
          <SectionHeading index="12" label="Repositories & Docs" title="Sources" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-3">Code</h4>
              <ul className="space-y-2">
                {project.repositories.map((repo) => (
                  <li key={repo.url}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-primary hover:text-primary-dim transition-colors">
                      <Github size={13} aria-hidden="true" /> {repo.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {project.documentation.length > 0 && (
              <div>
                <h4 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-3">Documentation</h4>
                <ul className="space-y-2">
                  {project.documentation.map((doc) => (
                    <li key={doc.url}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-primary hover:text-primary-dim transition-colors">
                        <ExternalLink size={13} aria-hidden="true" /> {doc.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {project.demoNote && (
            <div className="mt-8 border-l-4 border-secondary bg-secondary/5 px-6 py-4" role="note">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-secondary block mb-1">Demo status</span>
              <p className="font-body text-xs text-on-surface-muted leading-relaxed">{project.demoNote}</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}