import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { projects, personalInfo } from '@/data/portfolio';
import { getFeaturedProjects } from '@/lib/projectHelpers';
import type { ProjectStatus } from '@/types';

type FilterValue = 'all' | ProjectStatus;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all',            label: 'All'            },
  { value: 'live',           label: 'Live'           },
  { value: 'private',        label: 'Private / API'  },
  { value: 'in-development', label: 'In Development' },
];

export function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const featured = getFeaturedProjects();
  const others = projects.filter((p) => !p.featured);

  const applyFilter = (list: typeof projects) =>
    filter === 'all' ? list : list.filter((p) => p.status === filter);

  const visibleFeatured = applyFilter(featured);
  const visibleOthers   = applyFilter(others);

  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <SectionTitle
        index="01"
        label="Projects"
        title="Selected Work"
        description="Each project has an engineering decision worth explaining — not just a tech stack list."
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

      {/* Featured */}
      {visibleFeatured.length > 0 && (
        <section aria-label="Featured projects" className="mb-16">
          <h2 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-6">
            Featured — {visibleFeatured.length} project{visibleFeatured.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleFeatured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Others */}
      {visibleOthers.length > 0 && (
        <section aria-label="Other projects" className="mb-16">
          <h2 className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-6">
            Earlier Work — {visibleOthers.length} project{visibleOthers.length !== 1 ? 's' : ''}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleOthers.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={visibleFeatured.length + i} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {visibleFeatured.length === 0 && visibleOthers.length === 0 && (
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
            Explore more repositories, experiments, and open-source contributions.
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
