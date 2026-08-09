import type { Project } from '@/types';
import { projects } from '@/data/portfolio';

/** All projects in declaration order (flagship first). */
export function getAllProjects(): Project[] {
  return projects;
}

/** The single flagship (PostBoard) — undefined if none flagged. */
export function getFlagship(): Project | undefined {
  return projects.find((p) => p.isFlagship);
}

/** Projects excluding the flagship, for the "selected work" rows. */
export function getSelectedProjects(limit?: number): Project[] {
  const rest = projects.filter((p) => !p.isFlagship);
  return limit ? rest.slice(0, limit) : rest;
}

/** Resolve a project by slug (case-insensitive). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug.toLowerCase());
}

/** Quick stat line for the flagship card. */
export function getFlagshipMetrics(): string[] {
  return getFlagship()?.metrics.slice(0, 4) ?? [];
}