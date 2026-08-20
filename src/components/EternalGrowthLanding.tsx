import { useState, useEffect } from "react";
import { SectionId } from "../types";
import { scrollToSection } from "../utils/helpers";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import GlobalEffects from "./layout/GlobalEffects";
import MotionEngine from "../fx/MotionEngine";
import Marquee from "../fx/Marquee";
import Hero from "./sections/Hero";
import Benefits from "./sections/Benefits";
import Services from "./sections/Services";
import Packages from "./sections/Packages";
import Contact from "./sections/Contact";
import "./EternalGrowthLanding.css";

const EternalGrowthLanding = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === "blog") {
      window.location.href = "/blog";
      return;
    }

    scrollToSection(sectionId);
  };

  useEffect(() => {
    const sectionIds: SectionId[] = [
      "hero",
      "beneficios",
      "paquetes",
      "servicios",
      "contacto",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      window.setTimeout(() => scrollToSection(sectionId), 100);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="eternal-growth-container">
      <MotionEngine />
      <GlobalEffects />
      <div className="progress-bar" aria-hidden="true" />
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      <Hero />
      <Marquee />
      <Benefits />
      <Packages />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default EternalGrowthLanding;
