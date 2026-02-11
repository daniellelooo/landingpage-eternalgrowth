import { useTypewriter } from "../../../hooks/useTypewriter";
import { useGlitchEffect } from "../../../hooks/useGlitchEffect";
import { useState } from "react";
import logoImage from "../../../assets/logo.jpeg";
import { scrollToSection } from "../../../utils/helpers";

const Hero = () => {
  const typewriterText = useTypewriter();
  const isGlitching = useGlitchEffect();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  return (
    <section id="hero" className="hero-section">
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
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
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

        <p className="hero-description">
          Cerramos la brecha digital para micro y pequeñas empresas en Medellín
        </p>

        <div className="hero-cta-buttons">
          <button
            className="hero-cta-primary"
            onClick={() => scrollToSection("servicios")}
          >
            Conoce Nuestros Servicios
          </button>
          <button
            className="hero-cta-secondary"
            onClick={() => scrollToSection("contacto")}
          >
            Contáctanos
          </button>
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
  );
};

export default Hero;
