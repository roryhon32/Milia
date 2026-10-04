import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import Solutions from './components/Solutions';
import SavingsCalculator from './components/SavingsCalculator';
import HowItWorks from './components/HowItWorks';
import Segments from './components/Segments';
import FeaturedProject from './components/FeaturedProject';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import ProjectsGallery from './components/ProjectsGallery';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import ProjectModal from './components/ProjectModal';
import WhatsAppFloating from './components/WhatsAppFloating';
import type { ProjectItem } from './types/solar';

export const App: React.FC = () => {
  // Modal states
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadSummaryData, setLeadSummaryData] = useState<{
    monthlyBill: number;
    annualSavings: number;
    savings25Years: number;
    paybackYears: number;
    co2Avoided: number;
    propertyType: string;
    location: string;
  } | null>(null);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollToSimulador = useCallback(() => {
    const el = document.getElementById('simulador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollToSolutions = useCallback(() => {
    const el = document.getElementById('solucoes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handlers for interactive actions
  const handleOpenStudyModal = useCallback((summary: {
    monthlyBill: number;
    annualSavings: number;
    savings25Years: number;
    paybackYears: number;
    co2Avoided: number;
    propertyType: string;
    location: string;
  }) => {
    setLeadSummaryData(summary);
    setIsLeadModalOpen(true);
  }, []);

  const handleOpenGenericContact = useCallback(() => {
    setLeadSummaryData(null);
    setIsLeadModalOpen(true);
  }, []);

  const handleOpenFeaturedProject = useCallback(() => {
    setSelectedProject({
      id: 'destaque-industrial',
      title: 'Complexo Fabril Metalúrgico de Grande Porte',
      city: 'Triângulo Mineiro',
      state: 'MG',
      category: 'Industrial',
      powerKwp: 3430,
      panelsCount: 6236,
      annualSavings: 'R$ 3,8 Milhões/ano',
      image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=85',
      description: 'Engenharia completa, fornecimento de módulos de alta potência e conexão com subestação para complexo fabril de manufatura pesada. O projeto garantiu autossuficiência e blindagem tarifária contra bandeiras de escassez hídrica.'
    });
    setIsProjectModalOpen(true);
  }, []);

  const handleSelectPortfolioProject = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  }, []);

  const handleSelectSolution = useCallback((solutionTitle: string) => {
    // Open simulator or study modal for that solution
    handleScrollToSimulador();
  }, [handleScrollToSimulador]);

  const handleSelectSegment = useCallback((segmentTitle: string) => {
    handleScrollToSimulador();
  }, [handleScrollToSimulador]);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col antialiased">
      
      {/* 1. Header (Sticky) */}
      <Header 
        onOpenSimulador={handleScrollToSimulador} 
        onOpenContactModal={handleOpenGenericContact}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero 
          onSimulateClick={handleScrollToSimulador}
          onExploreSolutionsClick={handleScrollToSolutions}
        />

        {/* 3. Trusted Companies Logos */}
        <TrustedCompanies />

        {/* 4. Solutions Section */}
        <Solutions onSelectSolution={handleSelectSolution} />

        {/* 5. Savings Calculator */}
        <SavingsCalculator onOpenStudyModal={handleOpenStudyModal} />

        {/* 6. How It Works Timeline */}
        <HowItWorks />

        {/* 7. Segments */}
        <Segments onSelectSegment={handleSelectSegment} />

        {/* 8. Featured Project */}
        <FeaturedProject onOpenProjectModal={handleOpenFeaturedProject} />

        {/* 9. Stats Banner */}
        <Stats />

        {/* 10. Testimonials */}
        <Testimonials />

        {/* 11. Projects across Brazil (Carousel & Filters) */}
        <ProjectsGallery onSelectProject={handleSelectPortfolioProject} />

        {/* 12. FAQ Accordion */}
        <FAQ onContactClick={handleOpenGenericContact} />

        {/* 13. Final CTA */}
        <FinalCTA onSimulateClick={handleScrollToSimulador} />

      </main>

      {/* 14. Footer */}
      <Footer 
        onOpenPrivacyModal={handleOpenGenericContact}
        onOpenTermsModal={handleOpenGenericContact}
        onOpenContactModal={handleOpenGenericContact}
        onNavigateSection={handleScrollToSection}
      />

      {/* Interactive Modals */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        summaryData={leadSummaryData}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
        onSimulateClick={handleScrollToSimulador}
      />

      {/* Floating WhatsApp Contact */}
      <WhatsAppFloating />

    </div>
  );
};

export default App;
