import { useState } from "react";
import { scrollToSection } from "../../../utils/helpers";

interface Service {
  title: string;
  description: string;
  details: string[];
}

const SERVICES: Service[] = [
  {
    title: "Desarrollo Web",
    description: "Tu negocio merece más que una página bonita",
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
    details: [
      "Diagnóstico digital gratuito de 30 minutos",
      "Análisis de presencia online actual",
      "Hoja de ruta estratégica de 3 a 6 meses",
      "Acompañamiento mensual con el equipo",
    ],
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="servicios" className="services-section" data-theme="dark">
      <div className="services-container">
        <header className="section-head" data-trigger>
          <p className="micro-label rise">03 — Servicios</p>
          <h2 className="display-title">
            <span className="line">
              <span className="line-inner">Todo lo que tu negocio</span>
            </span>
            <span className="line">
              <span className="line-inner">
                necesita para <span className="accent-serif">crecer</span>.
              </span>
            </span>
          </h2>
          <p className="section-lede rise">
            Soluciones integradas de desarrollo, automatización y marketing
            digital para que tu negocio crezca sin depender de ti las 24 horas.
          </p>
        </header>

        <div className="services-list" data-reveal>
          {SERVICES.map((service, index) => {
            const abierto = openIndex === index;
            return (
              <div
                key={index}
                className={`service-row${abierto ? " service-row--open" : ""}`}
              >
                <button
                  type="button"
                  className="service-row-head"
                  aria-expanded={abierto}
                  onClick={() => setOpenIndex(abierto ? -1 : index)}
                >
                  <span className="service-row-num">
                    0{index + 1}
                  </span>
                  <span className="service-row-titles">
                    <span className="service-row-title">{service.title}</span>
                    <span className="service-row-desc">
                      {service.description}
                    </span>
                  </span>
                  <span className="service-row-toggle" aria-hidden="true" />
                </button>
                <div className="service-row-body">
                  <ul className="service-row-details">
                    {service.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-cta" data-reveal>
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
