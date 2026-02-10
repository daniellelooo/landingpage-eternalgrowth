import { useState, useEffect } from "react";
import { SectionId } from "../types";
import { scrollToSection } from "../utils/helpers";
import GlobalEffects from "./layout/GlobalEffects";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import "./EternalGrowthLanding.css";

const EternalGrowthLanding = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (sectionId: SectionId) => {
    scrollToSection(sectionId);
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const aboutSection = document.getElementById("about");
      const servicesSection = document.getElementById("servicios");
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const backgroundLogo = document.querySelector(".background-logo");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Hide scroll indicator after first scroll
      if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.classList.add("hidden");
      } else if (scrollIndicator) {
        scrollIndicator.classList.remove("hidden");
      }

      // Parallax effect on background logo
      if (backgroundLogo) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.3;
        (backgroundLogo as HTMLElement).style.transform =
          `translate(-50%, calc(-50% + ${scrolled * parallaxSpeed}px))`;
      }

      // Update active section
      if (heroSection && scrollPosition < heroSection.offsetHeight) {
        setActiveSection("hero");
      } else if (
        aboutSection &&
        scrollPosition >= aboutSection.offsetTop &&
        scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight
      ) {
        setActiveSection("about");
      } else if (
        servicesSection &&
        scrollPosition >= servicesSection.offsetTop
      ) {
        setActiveSection("servicios");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="eternal-growth-container">
      <GlobalEffects />
      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Hero />
      <About />
      <Services />
      <Footer />
    </div>
  );
};

export default EternalGrowthLanding;
