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
  { id: "about", label: "Nosotros" },
  { id: "beneficios", label: "Beneficios" },
  { id: "servicios", label: "Servicios" },
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

        {/* Clock */}
        <div className="header-clock">
          <MedellinClock />
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
