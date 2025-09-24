import { useTypewriter } from "../hooks/useTypewriter";
import { useGlitchEffect } from "../hooks/useGlitchEffect";
import { useState, useEffect } from "react";
import logoImage from "../assets/logo.jpeg";
import "./EternalGrowthLanding.css";
import MedellinClock from "./MedellinClock";

const EternalGrowthLanding = () => {
  const typewriterText = useTypewriter();
  const isGlitching = useGlitchEffect();
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTitleMouseEnter = () => {
    setIsTitleHovered(true);
  };

  const handleTitleMouseLeave = () => {
    setIsTitleHovered(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const aboutSection = document.getElementById("about");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (heroSection && scrollPosition < heroSection.offsetHeight) {
        setActiveSection("hero");
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="eternal-growth-container">
      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3>NAVEGACIÓN</h3>
          <button
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button
              className={`nav-item ${activeSection === "hero" ? "active" : ""}`}
              onClick={() => scrollToSection("hero")}
            >
              <span className="nav-icon"></span>
              <span>Inicio</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              <span className="nav-icon"></span>
              <span>¿Qué es EternalGrowth?</span>
            </button>
          </li>
          {/* Diagnostic removed from sidebar until functionality is ready */}
        </ul>
      </nav>

      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Global Effects Layer */}
      <div className="global-effects">
        {/* CRT Effects Layer */}
        <div className="tv-static">
          <div className="scanlines"></div>
          <div className="horizontal-sweep"></div>
          <div className="crt-glow"></div>
        </div>

        {/* Noise Layer */}
        <div className="noise-layer">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence baseFrequency="0.7" numOctaves={3} result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter="url(#noise)"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <MedellinClock />
        {/* Background Logo */}
        <div className="background-logo">
          <img src={logoImage} alt="EternalGrowth" />
        </div>

        {/* Main Content */}
        <div className="content-container">
          <div className="logo-container">
            <h1
              className={`logo ${isGlitching ? "glitch" : ""} ${
                isTitleHovered ? "hovered" : ""
              }`}
              onMouseEnter={handleTitleMouseEnter}
              onMouseLeave={handleTitleMouseLeave}
            >
              EternalGrowth
            </h1>
          </div>

          <div className="message-container">
            <div className="typewriter-wrapper">
              <span className="typewriter-text">{typewriterText}</span>
              <span className="cursor">|</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <span>↓</span>
          </div>
          <div className="scroll-text">Scroll para saber más</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">¿QUÉ ES ETERNALGROWTH?</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-paragraph">
                <span className="highlight">EternalGrowht</span> es una startup
                y movimiento de transformación digital que busca reducir la
                brecha tecnológica en las micro y pequeñas empresas de Medellín.
                Su enfoque va más allá de la simple venta de servicios, como la
                creación de páginas web; en cambio, se posicionan como una
                comunidad que ofrece soluciones prácticas y adaptables. Su
                método se basa en la empatía, para comprender las necesidades
                únicas de cada negocio, y en la practicidad, para entregar
                herramientas que produzcan resultados tangibles y medibles.
              </p>
            </div>

            {/* aside removed as requested */}
          </div>
        </div>
      </section>

      {/* Diagnostic section removed until functionality is ready */}
    </div>
  );
};

export default EternalGrowthLanding;
