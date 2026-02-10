import { NavItem, SectionId } from "../../../types";

interface SidebarProps {
  isOpen: boolean;
  activeSection: SectionId;
  onClose: () => void;
  onNavigate: (sectionId: SectionId) => void;
  onToggle: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "¿Qué es EternalGrowth?" },
  { id: "servicios", label: "Servicios / Soluciones" },
  { id: "contacto", label: "Contacto" },
];

const Sidebar = ({
  isOpen,
  activeSection,
  onClose,
  onNavigate,
  onToggle,
}: SidebarProps) => {
  return (
    <>
      <nav className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h3>NAVEGACIÓN</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>
        <ul className="sidebar-menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => onNavigate(item.id as SectionId)}
              >
                <span className="nav-icon"></span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="sidebar-toggle"
        onClick={onToggle}
        style={{
          opacity: isOpen ? 0 : 1,
          visibility: isOpen ? "hidden" : "visible",
        }}
      >
        ☰
      </button>
    </>
  );
};

export default Sidebar;
