// ============================================
// PORTFOLIO TYPE DEFINITIONS
// ============================================
// The project metadata model is the SINGLE SOURCE OF TRUTH for all project
// content. All pages (home, projects index, project detail, SEO, structured
// data) consume this model. Nothing project-specific is hardcoded in a
// component.

export type ProjectStatus = 'live' | 'frontend-live' | 'in-development' | 'private';

/** A single layer / node in a flow-based architecture diagram. */
export interface ArchitectureNode {
  label: string;
  detail?: string;
  kind?: 'source' | 'layer' | 'data' | 'worker' | 'observability' | 'deploy';
}

/** Why a technology was chosen (not merely what was used). */
export interface TechnologyChoice {
  technology: string;
  why: string;
}

/** A documented architectural trade-off. */
export interface Tradeoff {
  choice: string;
  alternative: string;
  rationale: string;
}

/** A numbered engineering decision with its reason. */
export interface EngineeringDecision {
  title: string;
  explanation: string;
}

/** A production-readiness capability with repository evidence. */
export interface ReadinessItem {
  category: string;
  evidence: string;
}

/** A repository / documentation link. */
export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectSeo {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  isFlagship?: boolean;
  year: number;
  status: ProjectStatus;
  demoNote?: string;
  /** 3-5 compact "what it is" — used on cards + indexes. */
  overview: string;
  problem: string;
  goals: string[];
  /** Architecture diagram node list (rendered by <ArchitectureDiagram>). */
  architecture: ArchitectureNode[];
  /** Where each technology appears (grouped), with a "why". */
  technologyGroups: TechnologyChoice[];
  engineeringDecisions: EngineeringDecision[];
  tradeoffs: Tradeoff[];
  challenges: string[];
  testing: string[];
  performance: string[];
  security: string[];
  lessonsLearned: string[];
  futureRoadmap: string[];
  productionReadiness: ReadinessItem[];
  metrics: string[];
  deployment: ProjectLink[];
  demoStatus: string | null;
  repositories: ProjectLink[];
  documentation: ProjectLink[];
  seo: ProjectSeo;
}

// ============================================
// SKILLS
// ============================================

export interface SkillGroup {
  id: string;
  category: string;
  /** Short note on WHERE this group is used (anchors stack to evidence). */
  usedIn: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'core' | 'proficient' | 'familiar';
}

export interface SecuritySkill {
  name: string;
  category?: 'applied' | 'conceptual';
}

// ============================================
// PERSONAL / MISC
// ============================================

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  alternativeTitles: string[];
  bio: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  availableForWork: boolean;
}

export type Theme = 'dark' | 'light';

export interface HomeStat {
  value: string;
  label: string;
}

export interface EngineeringHighlight {
  /** Short label, e.g. "JWT Refresh Rotation". */
  title: string;
  /** Project slug the capability is demonstrated in (link target). */
  projectSlug: string;
}