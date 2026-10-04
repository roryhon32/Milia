"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutStudioPhilosophy from "@/components/AboutStudioPhilosophy";
import ArchitectSection from "@/components/ArchitectSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import MaterialDetails from "@/components/MaterialDetails";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ImageCreditsModal from "@/components/ImageCreditsModal";
import ContactModal from "@/components/ContactModal";

export default function HomePage() {
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Header onOpenContact={() => setContactOpen(true)} />

      <main className="min-h-screen bg-[#FBF9F5]">
        {/* 01. Hero */}
        <Hero
          onExploreProjects={() => {
            const section = document.getElementById("projetos");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 02. Featured Projects & Concept Disclaimer */}
        <FeaturedProjects onOpenCredits={() => setCreditsOpen(true)} />

        {/* 03. About Studio & Philosophy (3-column layout) */}
        <AboutStudioPhilosophy />

        {/* 04. Architect Section (Lucas Andrade) */}
        <ArchitectSection onOpenContact={() => setContactOpen(true)} />

        {/* 05. Services Section (Interactive preview) */}
        <ServicesSection />

        {/* 06. Process Section (4 Stages) */}
        <ProcessSection />

        {/* 07. Materiality Section (Horizontal tiles) */}
        <MaterialDetails />

        {/* 08. Contact & Final CTA */}
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* 09. Footer */}
      <Footer onOpenCredits={() => setCreditsOpen(true)} />

      {/* Modals */}
      <ImageCreditsModal
        isOpen={creditsOpen}
        onClose={() => setCreditsOpen(false)}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
