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
  { id: "servicios", label: "Servicios" },
  { id: "paquetes", label: "Paquetes" },
  { id: "contacto", label: "Contacto" },
];

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="main-header">
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id as SectionId)}
            >
              {item.label}
            </button>
          ))}
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
        </nav>
      )}
    </header>
  );
};

export default Header;
