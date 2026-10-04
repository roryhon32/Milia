export interface SimulationData {
  monthlyBill: number;
  propertyType: 'residencial' | 'comercial' | 'industrial' | 'rural';
  state: string;
  city: string;
  roofArea: number;
  connectionType: 'monofasico' | 'bifasico' | 'trifasico';
}

export interface SimulationResult {
  annualSavings: number;
  savings25Years: number;
  paybackYears: number;
  co2AvoidedTons: number;
  recommendedSystemKwp: number;
  panelsCount: number;
  yearlyAccumulated: { year: number; savings: number }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  city: string;
  state: string;
  category: 'Residencial' | 'Comercial' | 'Industrial' | 'Fazenda Solar';
  powerKwp: number;
  panelsCount: number;
  annualSavings: string;
  image: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  city: string;
  state: string;
  rating: number;
  text: string;
  avatar: string;
  savingsPercent: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
