import { scrollToSection } from "../../../utils/helpers";
import { ReactElement } from "react";

interface Benefit {
  title: string;
  description: string;
  icon: ReactElement;
}

const BENEFITS: Benefit[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Tecnología que funciona de verdad",
    description:
      "No usamos plantillas genéricas. Cada web corre en Next.js — rápida y escalable. Cada automatización vive en n8n — flujos reales que trabajan mientras tú atiendes tu negocio.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Todo conectado, no servicios sueltos",
    description:
      "Conectamos tu web con automatizaciones de WhatsApp, tu CRM, tus redes y tus campañas de pauta — para que todo funcione como un sistema, no como piezas separadas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Resultados medibles, no promesas",
    description:
      "Cada peso invertido tiene un canal de retorno claro: clientes que llegan por Google, leads que responde WhatsApp mientras duermes, campañas que traen tráfico real. Medimos todo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Acompañamiento real",
    description:
      "Tienes un equipo con nombre y apellido, no un ticket de soporte. Desde el diagnóstico hasta el soporte mensual, estamos contigo — y cuando algo falla, lo resolvemos rápido.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="benefits-section">
      <div className="benefits-container">
        <h2 className="benefits-title">¿Por qué elegirnos?</h2>
        <p className="benefits-headline">
          La digitalización completa que tu negocio necesita, en un solo equipo
        </p>
        <p className="benefits-subtitle">
          No somos una agencia que entrega archivos. Conectamos tu web, tus
          automatizaciones y tu marketing en un solo sistema — y te acompañamos
          hasta que funcione.
        </p>

        <div className="benefits-grid">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon-wrapper">
                <div className="benefit-icon">{benefit.icon}</div>
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
              <div className="benefit-card-glow"></div>
            </div>
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

export default Benefits;
