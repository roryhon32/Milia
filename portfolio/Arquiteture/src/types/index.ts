export interface Project {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: "Residencial" | "Comercial" | "Interiores" | "Hospitalidade";
  location: string;
  state: string;
  year: string;
  area: string;
  coverImage: string;
  gallery: {
    url: string;
    caption: string;
    orientation?: "landscape" | "portrait" | "wide";
  }[];
  overview: string;
  concept: string;
  materials: string[];
  specs: {
    label: string;
    value: string;
  }[];
  architecturalFeatures: string[];
  layoutType: "wide" | "portrait" | "full" | "split";
  published: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  timeframe: string;
  description: string;
  details: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  subtitle: string;
  body: string;
}

export interface ArchitecturalDetail {
  id: string;
  title: string;
  category: "Materialidade" | "Luz & Sombra" | "Croqui" | "Elemento Construtivo";
  description: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  client: string;
  project: string;
  location: string;
}
