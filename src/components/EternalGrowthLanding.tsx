import { useTypewriter } from "../hooks/useTypewriter";
import { useGlitchEffect } from "../hooks/useGlitchEffect";
import { useState } from "react";
import logoImage from "../assets/logo.jpeg";
import "./EternalGrowthLanding.css";
import MedellinClock from "./MedellinClock";

const EternalGrowthLanding = () => {
  const typewriterText = useTypewriter();
  const isGlitching = useGlitchEffect();
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const handleTitleMouseEnter = () => {
    setIsTitleHovered(true);
  };

  const handleTitleMouseLeave = () => {
    setIsTitleHovered(false);
  };

  return (
    <div className="eternal-growth-container">
      <MedellinClock />
      {/* Background Logo */}
      <div className="background-logo">
        <img src={logoImage} alt="EternalGrowth" />
      </div>

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
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4" />
        </svg>
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
    </div>
  );
};

export default EternalGrowthLanding;
