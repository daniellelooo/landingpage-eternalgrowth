import { useTypewriter } from "../../../hooks/useTypewriter";
import { scrollToSection } from "../../../utils/helpers";
import DotGrid from "../../../fx/DotGrid";

const Hero = () => {
  const { text: typewriterText, isWaiting } = useTypewriter();

  return (
    <section id="hero" className="hero-section" data-theme="dark">
      <div className="hero-bg">
        <DotGrid
          dotSize={3}
          gap={26}
          baseColor="#262138"
          activeColor="#8b5cf6"
          proximity={200}
        />
      </div>
      <div className="hero-fade" aria-hidden="true" />

      <div className="content-container" data-trigger>
        <p className="micro-label hero-label rise">
          Transformación digital — Medellín, Colombia
        </p>

        <h1 className="hero-title">
          <span className="line">
            <span className="line-inner">Cerramos la brecha</span>
          </span>
          <span className="line">
            <span className="line-inner">
              <span className="accent-serif">digital</span> de tu negocio.
            </span>
          </span>
        </h1>

        <div className="typewriter-wrapper rise" aria-live="off">
          <span className="typewriter-prompt" aria-hidden="true">
            &gt;
          </span>
          <span className="typewriter-text">{typewriterText}</span>
          <span
            className={`cursor${isWaiting ? " cursor--blink" : ""}`}
            aria-hidden="true"
          />
        </div>

        <p className="hero-description rise">
          Desarrollo web, automatización y marketing digital para micro y
          pequeñas empresas en Medellín. Un solo sistema, no piezas sueltas.
        </p>

        <div className="hero-cta-buttons rise">
          <button
            className="hero-cta-primary"
            onClick={() => scrollToSection("servicios")}
          >
            Conoce nuestros servicios
          </button>
          <button
            className="hero-cta-secondary"
            onClick={() => scrollToSection("contacto")}
          >
            Contáctanos
          </button>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-indicator-line" />
        <span className="scroll-indicator-text">scroll</span>
      </div>
    </section>
  );
};

export default Hero;
