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
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const backgroundLogo = document.querySelector(".background-logo");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Ocultar scroll indicator después del primer scroll
      if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.classList.add("hidden");
      } else if (scrollIndicator) {
        scrollIndicator.classList.remove("hidden");
      }

      // Efecto parallax en el logo de fondo
      if (backgroundLogo) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.3;
        (
          backgroundLogo as HTMLElement
        ).style.transform = `translate(-50%, calc(-50% + ${
          scrolled * parallaxSpeed
        }px))`;
      }

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
          <li>
            <button
              className={`nav-item ${
                activeSection === "servicios" ? "active" : ""
              }`}
              onClick={() => scrollToSection("servicios")}
            >
              <span className="nav-icon"></span>
              <span>Servicios / Soluciones</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-item ${
                activeSection === "contacto" ? "active" : ""
              }`}
              onClick={() => scrollToSection("contacto")}
            >
              <span className="nav-icon"></span>
              <span>Contacto</span>
            </button>
          </li>
          {/* Diagnostic removed from sidebar until functionality is ready */}
        </ul>
      </nav>

      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          opacity: isSidebarOpen ? 0 : 1,
          visibility: isSidebarOpen ? "hidden" : "visible",
        }}
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

      {/* Servicios / Soluciones */}
      <section id="servicios" className="services-section">
        <div className="services-container">
          <h2 className="services-title">Nuestros Servicios</h2>
          <div className="services-list">
            <div className="service-card">
              <h3>Desarrollo Web</h3>
              <p>
                Creación de páginas web modernas y funcionales para tu negocio.
              </p>
            </div>
            <div className="service-card">
              <h3>Automatización</h3>
              <p>
                Implementación de herramientas para optimizar procesos y ahorrar
                tiempo.
              </p>
            </div>
            <div className="service-card">
              <h3>Capacitación Digital</h3>
              <p>
                Formación en tecnología y marketing digital para equipos y
                emprendedores.
              </p>
            </div>
            <div className="service-card">
              <h3>Consultoría</h3>
              <p>
                Asesoría personalizada para la transformación digital de tu
                empresa.
              </p>
            </div>
            <div className="service-card">
              <h3>Marketing Digital</h3>
              <p>
                Estrategias de marketing digital para aumentar la visibilidad y
                atraer clientes.
              </p>
            </div>
            <div className="service-card">
              <h3>Rebranding</h3>
              <p>
                Renovación de la imagen y comunicación de tu marca para destacar
                en el mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="footer-logo">EternalGrowth</h2>
            <p className="footer-tagline">
              Transformación digital para tu negocio
            </p>
          </div>

          <div className="footer-contact">
            <h3 className="footer-title">Contáctanos</h3>
            <div className="footer-links">
              <a
                href="mailto:eternalgrowth00@gmail.com"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="footer-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                eternalgrowth00@gmail.com
              </a>
              <a
                href="https://www.instagram.com/eternalgrowth__/"
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="footer-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
                @eternalgrowth__
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 EternalGrowth. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Diagnostic section removed until functionality is ready */}
    </div>
  );
};

export default EternalGrowthLanding;
