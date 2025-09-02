import { useTypewriter } from "../hooks/useTypewriter";
import { useGlitchEffect } from "../hooks/useGlitchEffect";
import { useState, useEffect } from "react";
import logoImage from "../assets/logo.jpeg";
import "./EternalGrowthLanding.css";

const EternalGrowthLanding = () => {
  const typewriterText = useTypewriter();
  const isGlitching = useGlitchEffect();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Limpiar timeout anterior
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    const handleMouseLeave = () => {
      // Usar timeout para dar tiempo a que el cursor regrese
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 100);
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setIsVisible(true);
    };

    // Detectar cuando la ventana pierde el foco
    const handleBlur = () => {
      setIsVisible(false);
    };

    // Detectar cuando la ventana recupera el foco
    const handleFocus = () => {
      setIsVisible(true);
    };

    // Agregar listeners al documento completo
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleTitleMouseEnter = () => {
    setIsTitleHovered(true);
  };

  const handleTitleMouseLeave = () => {
    setIsTitleHovered(false);
  };

  return (
    <div className="eternal-growth-container">
      {/* Background Logo */}
      <div className="background-logo">
        <img src={logoImage} alt="EternalGrowth" />
      </div>

      {/* Cursor Glow Effect */}
      <div 
        className={`cursor-glow ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      ></div>

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
            className={`logo ${isGlitching ? "glitch" : ""} ${isTitleHovered ? "hovered" : ""}`}
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
