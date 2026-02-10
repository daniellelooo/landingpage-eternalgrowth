import { useTypewriter } from "../../../hooks/useTypewriter";
import { useGlitchEffect } from "../../../hooks/useGlitchEffect";
import { useState } from "react";
import logoImage from "../../../assets/logo.jpeg";
import MedellinClock from "../../MedellinClock";

const Hero = () => {
  const typewriterText = useTypewriter();
  const isGlitching = useGlitchEffect();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  return (
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
