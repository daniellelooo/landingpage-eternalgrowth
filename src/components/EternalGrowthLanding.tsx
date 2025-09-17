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
      const diagnosticSection = document.getElementById("diagnostic");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (heroSection && scrollPosition < heroSection.offsetHeight) {
        setActiveSection("hero");
      } else if (
        aboutSection &&
        diagnosticSection &&
        scrollPosition >= aboutSection.offsetTop &&
        scrollPosition < diagnosticSection.offsetTop
      ) {
        setActiveSection("about");
      } else if (
        diagnosticSection &&
        scrollPosition >= diagnosticSection.offsetTop
      ) {
        setActiveSection("diagnostic");
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
              <span className="nav-icon">🏠</span>
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
              <span className="nav-icon">👥</span>
              <span>Sobre Nosotros</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${
                activeSection === "diagnostic" ? "active" : ""
              }`}
              onClick={() => scrollToSection("diagnostic")}
            >
              <span className="nav-icon">📊</span>
              <span>Diagnóstico Digital</span>
            </button>
          </li>
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
          <h2 className="about-title">SOBRE NOSOTROS</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-paragraph">
                En <span className="highlight">EternalGrowth</span>, creemos que
                el crecimiento personal es un viaje eterno que trasciende los
                límites convencionales. Somos una comunidad dedicada a explorar
                las fronteras del potencial humano.
              </p>
              <p className="about-paragraph">
                Nuestro enfoque combina metodologías tradicionales con
                tecnologías emergentes, creando experiencias transformadoras que
                desafían la percepción de lo posible.
              </p>
              <p className="about-paragraph">
                Unidos por la pasión de evolucionar constantemente, construimos
                el futuro del desarrollo personal, una innovación a la vez.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Posibilidades</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2025</div>
                <div className="stat-label">Fundación</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∆</div>
                <div className="stat-label">Evolución</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Diagnostic Section */}
      <section id="diagnostic" className="diagnostic-section">
        <div className="diagnostic-container">
          <h2 className="diagnostic-title">DIAGNÓSTICO DIGITAL GRATUITO</h2>
          <p className="diagnostic-subtitle">
            Descubre el estado de tu presencia digital en solo 3 minutos
          </p>

          <div className="diagnostic-content">
            <div className="diagnostic-intro">
              <h3>
                ¿Tu negocio está perdiendo clientes por una presencia digital
                deficiente?
              </h3>
              <p>
                Nuestro <span className="highlight">Diagnóstico Digital</span>{" "}
                analiza instantáneamente tu presencia online y te proporciona un
                reporte personalizado con recomendaciones específicas para tu
                negocio.
              </p>
              <div className="diagnostic-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Análisis completo de tu sitio web</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Evaluación de redes sociales</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Revisión de Google My Business</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Reporte PDF descargable</span>
                </div>
              </div>
              <button className="start-diagnostic-btn">
                Comenzar Diagnóstico →
              </button>
            </div>

            <div className="diagnostic-preview">
              <div className="preview-card">
                <h4>Vista previa del reporte</h4>
                <div className="preview-metrics">
                  <div className="metric">
                    <span className="metric-label">Sitio Web</span>
                    <div className="metric-bar">
                      <div
                        className="metric-fill"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <span className="metric-score">75/100</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Redes Sociales</span>
                    <div className="metric-bar">
                      <div
                        className="metric-fill"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <span className="metric-score">60/100</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">SEO Local</span>
                    <div className="metric-bar">
                      <div
                        className="metric-fill"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <span className="metric-score">45/100</span>
                  </div>
                </div>
                <div className="overall-score">
                  <span className="score-label">Puntuación General</span>
                  <span className="score-value">60/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EternalGrowthLanding;
