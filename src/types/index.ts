export interface Project {
  id: string;
  title: string;
  subtitle: string;
  segment: string;
  badge: "Projeto conceito" | "Estudo de interface" | "Projeto ativo";
  year: string;
  objective: string;
  services: string[];
  description: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
  aspectRatio: string;
  theme: "light" | "dark";
  previewUrl?: string;
  proof?: {
    clientName: string;
    clientLogoSrc?: string;
    testimonial?: { quote: string; author: string; role?: string };
    verifiedOutcome?: string;
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  deliverable: string;
  impact: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  startingPrice: string;
  previousStartingPrice?: string;
  period?: string;
  tagline: string;
  description: string;
  scope: string[];
  idealFor: string;
  firstYearHosting?: string;
  renewalTerms?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AudienceSegment {
  id: string;
  title: string;
  tagline: string;
  context: string;
}
