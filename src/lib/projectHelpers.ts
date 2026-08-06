import type { Project } from '@/types';
import { projects } from '@/data/portfolio';

/**
 * Returns all featured projects, ordered by year descending.
 * Visibility is controlled entirely by the `featured` flag in portfolio.ts.
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

/**
 * Returns at most `limit` featured projects for the homepage "Selected Work" section.
 * Excludes WIP projects (status: 'in-development') from the homepage showcase
 * unless they have a live URL — keeps the homepage presenting shipped work.
 */
export function getHomepageProjects(limit = 3): Project[] {
  return getFeaturedProjects()
    .filter((p) => p.status === 'live' || p.liveUrl)
    .slice(0, limit);
}
