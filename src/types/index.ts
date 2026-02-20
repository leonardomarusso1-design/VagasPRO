export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  photoUrl?: string;
  linkedin?: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}

export interface ResumeContent {
  optimizedSummary: string;
  optimizedExperiences: Experience[];
  atsScore: number;
  keywordsFound: string[];
}

export enum PlanType {
  NONE = "NONE",
  BASIC = "BASIC",
  PRO = "PRO",
}

export enum AppStep {
  LANDING = "LANDING",
  QUIZ = "QUIZ",
  ANALYZING = "ANALYZING",
  PREVIEW = "PREVIEW",
  CHECKOUT = "CHECKOUT",
  DASHBOARD = "DASHBOARD",
}
