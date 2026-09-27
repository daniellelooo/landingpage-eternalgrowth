import { useEffect, useState } from "react";
import { NavItem, SectionId } from "../../../types";
import MedellinClock from "../../MedellinClock";
import logoImage from "../../../assets/logocorregido-removebg-preview.png";
import { PORTAFOLIO_PATH } from "../../../data/portafolio";
import "./header.css";

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Inicio" },
  { id: "beneficios", label: "¿Por qué elegirnos?" },
  { id: "servicios", label: "Servicios" },
  { id: "portafolio", label: "Portafolio", href: PORTAFOLIO_PATH },
  { id: "contacto", label: "Contacto" },
];

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Al bajar, el header se vuelve un poco más opaco y gana un borde: es el
  // único cambio de estado que tiene. En la home quien desplaza es el <body>,
  // no la ventana, así que se escucha el scroll de cualquier elemento.
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const leer = () => {
      const y = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );
      setConScroll(y > 8);
    };
    leer();
    document.addEventListener("scroll", leer, { passive: true, capture: true });
    return () => document.removeEventListener("scroll", leer, { capture: true });
  }, []);

  // Con el menú de celular abierto, la página de atrás no se desplaza: el
  // panel la tapa entera y el scroll no debe moverla por debajo.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setIsMobileMenuOpen(false);
    };
    const anterior = [document.documentElement.style.overflow, document.body.style.overflow];
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      [document.documentElement.style.overflow, document.body.style.overflow] = anterior;
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`main-header${conScroll ? " con-scroll" : ""}${
        isMobileMenuOpen ? " menu-abierto" : ""
      }`}
    >
      <div className="header-container">
        {/* Logo/Brand */}
        <button
          type="button"
          className="header-brand"
          onClick={() => onNavigate("hero")}
        >
          <img src={logoImage} alt="EternalGrowth" className="brand-logo" />
          <span className="brand-text">EternalGrowth</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id as SectionId)}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="header-quick-actions">
          <button
            type="button"
            className={`header-news-icon ${activeSection === "blog" ? "active" : ""}`}
            onClick={() => onNavigate("blog")}
            aria-label="Ir al Blog"
            title="Blog"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <line x1="7" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="7" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <rect x="14.5" y="7.2" width="3.5" height="2.8" rx="0.4" fill="currentColor" />
            </svg>
            <span className="header-news-label">Blog</span>
          </button>

          <div className="header-clock">
            <MedellinClock />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-icon">
            {isMobileMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="header-nav mobile-nav">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <a
                key={item.id}
                href={item.href}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => {
                  onNavigate(item.id as SectionId);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ),
          )}
          <button
            type="button"
            className={`nav-link ${activeSection === "blog" ? "active" : ""}`}
            onClick={() => {
              onNavigate("blog");
              setIsMobileMenuOpen(false);
            }}
          >
            Blog
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
