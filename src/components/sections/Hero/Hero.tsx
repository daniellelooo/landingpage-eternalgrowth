import { useTypewriter } from "../../../hooks/useTypewriter";
import { useEffect, useRef, useState } from "react";
import logoImage from "../../../assets/logo.jpeg";
import { scrollToSection } from "../../../utils/helpers";
import GlobalEffects from "../../layout/GlobalEffects";

// Accesos directos a cada servicio desde la primera pantalla: quien llega sabe
// de un vistazo qué hacemos, y cada página de servicio queda enlazada arriba.
const SERVICIOS_HERO = [
  { nombre: "Desarrollo web", href: "/servicios/desarrollo-web-medellin" },
  { nombre: "Automatización", href: "/servicios/automatizacion-procesos-medellin" },
  { nombre: "WhatsApp", href: "/servicios/chatbot-whatsapp-medellin" },
  { nombre: "Marketing digital", href: "/servicios/marketing-digital-medellin" },
  { nombre: "Transformación digital", href: "/servicios/transformacion-digital-medellin" },
];

// La flor del fondo sigue al puntero unos pocos píxeles, en sentido contrario,
// como si estuviera detrás del texto. Solo con mouse y sin "reducir movimiento".
const DESPLAZAMIENTO_MAXIMO = 18;

const Hero = () => {
  const typewriterText = useTypewriter();
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const fondoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fondo = fondoRef.current;
    if (!fondo) return;
    const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!conMouse || sinMovimiento) return;

    let cuadro = 0;
    const alMover = (evento: PointerEvent) => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const x = (evento.clientX / window.innerWidth - 0.5) * -2 * DESPLAZAMIENTO_MAXIMO;
        const y = (evento.clientY / window.innerHeight - 0.5) * -2 * DESPLAZAMIENTO_MAXIMO;
        fondo.style.setProperty("--px", `${x.toFixed(1)}px`);
        fondo.style.setProperty("--py", `${y.toFixed(1)}px`);
      });
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <GlobalEffects />
      {/* Background Logo */}
      <div className="background-logo" ref={fondoRef}>
        <img src={logoImage} alt="EternalGrowth" />
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div className="logo-container">
          <h1
            className={`logo ${isTitleHovered ? "hovered" : ""}`}
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

        <nav className="hero-servicios" aria-label="Servicios">
          {SERVICIOS_HERO.map((servicio) => (
            <a key={servicio.href} href={servicio.href}>
              <span className="pixel" aria-hidden="true" />
              {servicio.nombre}
            </a>
          ))}
        </nav>
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
