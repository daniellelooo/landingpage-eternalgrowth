import { ServiceCard as ServiceCardType } from "../../../types";
import ServiceCard from "../../common/Card/ServiceCard.tsx";

const SERVICES: ServiceCardType[] = [
  {
    title: "Desarrollo Web",
    description:
      "Creación de páginas web modernas y funcionales para tu negocio.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    details: [
      "Landing pages responsive",
      "E-commerce",
      "Sitios corporativos",
      "SEO optimizado",
    ],
  },
  {
    title: "Automatización",
    description:
      "Implementación de herramientas para optimizar procesos y ahorrar tiempo.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
    details: [
      "Integración de APIs",
      "Chatbots inteligentes",
      "Workflows automatizados",
      "Reportes automáticos",
    ],
  },
  {
    title: "Consultoría",
    description:
      "Asesoría personalizada para la transformación digital de tu empresa.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    details: [
      "Análisis digital",
      "Estrategia tecnológica",
      "Optimización de procesos",
      "Acompañamiento continuo",
    ],
  },
  {
    title: "Marketing Digital",
    description:
      "Estrategias de marketing digital para aumentar la visibilidad y atraer clientes.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    details: [
      "Gestión de redes sociales",
      "Publicidad online",
      "Email marketing",
      "Content marketing",
    ],
  },
];

const Services = () => {
  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">
          Soluciones completas para la transformación digital de tu empresa
        </p>
        <div className="services-list">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              details={service.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
