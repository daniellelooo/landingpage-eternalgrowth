import { useState } from "react";
import { NavItem, SectionId } from "../../../types";
import MedellinClock from "../../MedellinClock";
import logoImage from "../../../assets/logocorregido-removebg-preview.png";

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Inicio" },
  { id: "beneficios", label: "¿Por qué elegirnos?" },
  { id: "paquetes", label: "Paquetes" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <button
          type="button"
          className="header-brand"
          onClick={() => onNavigate("hero")}
        >
          <img src={logoImage} alt="EternalGrowth" className="brand-logo" />
          <span className="brand-text">EternalGrowth</span>
        </button>

        <nav className="header-nav desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link link-wipe ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id as SectionId)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={`nav-link link-wipe ${activeSection === "blog" ? "active" : ""}`}
            onClick={() => onNavigate("blog")}
          >
            Blog
          </button>
        </nav>

        <div className="header-quick-actions">
          <div className="header-clock">
            <MedellinClock />
          </div>
        </div>

        <button
          type="button"
          className={`mobile-menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="header-nav mobile-nav">
          {NAV_ITEMS.map((item) => (
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
          ))}
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
