import { ServiceCard as ServiceCardType } from "../../../types";
import ServiceCard from "../../common/Card/ServiceCard.tsx";
import { scrollToSection } from "../../../utils/helpers";

const SERVICES: ServiceCardType[] = [
  {
    title: "Desarrollo Web",
    description: "Tu negocio merece más que una página bonita",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    details: [
      "Landing pages de alto impacto",
      "Webs multipágina con catálogo de productos o servicios",
      "E-commerce con redirección a WhatsApp o pasarela de pago",
      "SEO técnico básico incluido en todo desarrollo",
    ],
  },
  {
    title: "Automatización con n8n",
    description: "Tu negocio abierto 24/7 sin contratar a nadie",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
    details: [
      "Respuesta automática por WhatsApp",
      "Confirmación y recordatorio de citas o reservas",
      "Reactivación de clientes que no han vuelto",
      "Notificación de nuevos leads en tiempo real",
    ],
  },
  {
    title: "Marketing Digital",
    description: "Que te encuentren cuando están listos para comprar",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    details: [
      "Google My Business optimizado y activo",
      "Campañas de Meta Ads segmentadas por nicho",
      "Plan de contenido mensual para redes sociales",
      "Email marketing con secuencias automatizadas",
    ],
  },
  {
    title: "Consultoría y Diagnóstico",
    description: "Primero entendemos tu negocio, luego actuamos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    details: [
      "Diagnóstico digital gratuito de 30 minutos",
      "Análisis de presencia online actual",
      "Hoja de ruta estratégica de 3 a 6 meses",
      "Acompañamiento mensual con el equipo",
    ],
  },
];

const Services = () => {
  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">
          Soluciones integradas de desarrollo, automatización y marketing digital
          para que tu negocio crezca sin depender de ti las 24 horas.
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

        <div className="section-cta">
          <button
            className="hero-cta-primary"
            onClick={() => scrollToSection("contacto")}
          >
            Agenda tu diagnóstico gratuito
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
