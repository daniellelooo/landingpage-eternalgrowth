import { useState, useEffect } from "react";
import { SectionId } from "../types";
import { scrollToSection } from "../utils/helpers";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Benefits from "./sections/Benefits";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import "./EternalGrowthLanding.css";

const EternalGrowthLanding = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === "news") {
      window.location.href = "/news";
      return;
    }

    scrollToSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const backgroundLogo = document.querySelector(".background-logo");
      const globalEffects = document.querySelector(".global-effects");

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

      if (globalEffects && heroSection) {
        const inHero = scrollPosition < heroSection.offsetHeight;
        globalEffects.classList.toggle("paused", !inHero);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const sectionIds: SectionId[] = [
      "hero",
      "about",
      "beneficios",
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
    handleScroll();

    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      window.setTimeout(() => scrollToSection(sectionId), 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="eternal-growth-container">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      <Hero />
      <About />
      <Benefits />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default EternalGrowthLanding;
