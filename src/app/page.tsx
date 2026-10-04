import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { CtaSection } from "@/components/cta/CtaSection";
export default function HomePage() {
  return <><HeroSection /><ServicesSection /><ProjectsSection /><ProcessSection /><PricingSection /><FaqSection /><CtaSection /></>;
}
