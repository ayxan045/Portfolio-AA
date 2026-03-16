// ── Portfolio Item ──────────────────────────────────────────────
export interface PortfolioItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

// ── Skill ──────────────────────────────────────────────────────
export interface Skill {
  name: string;
  percent: number;
}

// ── Timeline Item ──────────────────────────────────────────────
export interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
}

// ── Service ────────────────────────────────────────────────────
export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// ── Skin Color ─────────────────────────────────────────────────
export interface SkinColor {
  id: string;
  value: string;
}

// ── Nav Item ───────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

// ── Personal Info ──────────────────────────────────────────────
export interface PersonalInfo {
  name: string;
  title: string[];
  bio: string;
  birthday: string;
  age: number;
  email: string;
  phone: string;
  city: string;
  photo: string;
}

// ── Section Props ──────────────────────────────────────────────
export interface SectionProps {
  isActive: boolean;
  isBack: boolean;
  isOpen: boolean;
}

// ── Contact Form ───────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';