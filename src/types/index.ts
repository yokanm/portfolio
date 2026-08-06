// ============================================
// PORTFOLIO TYPE DEFINITIONS
// ============================================

export type ProjectStatus = 'live' | 'private' | 'in-development' | 'archived';

export interface ProjectImages {
  thumbnail?: string;
  hero?: string;
  gallery?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  year?: number;
  highlights?: string[];
  engineeringDecision?: string;
  /** Explicit status — controls which UI affordances are shown */
  status?: ProjectStatus;
  /** Quantified impact metrics displayed on the project card */
  metrics?: string[];
  /** Optional images for visual project showcase */
  images?: ProjectImages;
}

export interface SkillGroup {
  id: string;
  category: string;
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

export interface Service {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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
