import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { SeoTag } from '@/components/shared/SeoTag';
import { ProjectCard } from './ProjectCard';
import { projects, personalInfo } from '@/data/portfolio';

type FilterValue = 'all' | 'live' | 'frontend-live' | 'in-development';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'live', label: 'Live' },
  { value: 'frontend-live', label: 'Frontend Live' },
  { value: 'in-development', label: 'In Development' },
];

// Declared order already puts the flagship first.
const flagship = projects.filter((p) => p.isFlagship);
const others = projects.filter((p) => !p.isFlagship);

export function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const apply = (list: typeof projects) =>
    filter === 'all' ? list : list.filter((p) => p.status === filter);

  const visibleFlagship = apply(flagship);
  const visibleOthers = apply(others);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <SeoTag
        path="/projects"
        title="Projects"
        description="Full-stack engineering case studies: PostBoard (multi-tenant platform), Cyber Gadget (e-commerce), TaskFlow (mobile). Each project documents architecture, decisions, security, and testing."
      />
      <SectionTitle
        index="01"
        label="Projects"
        title="Engineering Work"
        description="Full engineering case studies — architecture, decisions, trade-offs, security, and testing — not just a tech-stack list."
      />

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects by status">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={[
              'font-mono text-[0.6rem] uppercase tracking-widest px-4 py-2 border-2 transition-all duration-100',
              filter === value
                ? 'bg-primary text-on-primary border-primary font-black'
                : 'border-outline text-on-surface-faint hover:border-primary hover:text-on-surface',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Flagship */}
      {visibleFlagship.length > 0 && (
        <section aria-label="Flagship project" className="mb-16">
          {visibleFlagship.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </section>
      )}

      {/* Others */}
      {visibleOthers.length > 0 && (
        <section aria-label="Other projects" className="mb-16">
          <h2 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-6">
            Selected Work — {visibleOthers.length} project{visibleOthers.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleOthers.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {visibleFlagship.length === 0 && visibleOthers.length === 0 && (
        <div className="py-20 text-center" role="status">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-subtle">
            No projects match the selected filter.
          </p>
          <button onClick={() => setFilter('all')}
            className="mt-4 font-mono text-[0.6rem] uppercase tracking-widest text-primary hover:underline">
            Clear filter
          </button>
        </div>
      )}

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-2 border-outline-strong/10 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <h3 className="font-display font-black text-2xl uppercase text-on-surface leading-tight">More on GitHub</h3>
          <p className="font-body text-sm text-on-surface-faint mt-2 max-w-md">
            Explore more repositories, experiments, and open-source work.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={15} aria-hidden="true" />View GitHub
          </a>
        </Button>
      </motion.div>
    </div>
  );
}