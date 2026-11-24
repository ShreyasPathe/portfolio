export interface NavItem {
  label: string;
  to: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location?: string;
  image?: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  tags: string[];
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date?: string;
  image: string; // URL to certificate image
  credentialUrl?: string;
}
