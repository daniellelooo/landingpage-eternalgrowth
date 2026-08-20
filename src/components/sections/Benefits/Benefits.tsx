import { scrollToSection } from "../../../utils/helpers";

interface Benefit {
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    title: "Tecnología que funciona de verdad",
    description:
      "No usamos plantillas genéricas. Cada web corre en Next.js — rápida y escalable. Cada automatización vive en n8n — flujos reales que trabajan mientras tú atiendes tu negocio.",
  },
  {
    title: "Todo conectado, no servicios sueltos",
    description:
      "Conectamos tu web con automatizaciones de WhatsApp, tu CRM, tus redes y tus campañas de pauta — para que todo funcione como un sistema, no como piezas separadas.",
  },
  {
    title: "Resultados medibles, no promesas",
    description:
      "Cada peso invertido tiene un canal de retorno claro: clientes que llegan por Google, leads que responde WhatsApp mientras duermes, campañas que traen tráfico real. Medimos todo.",
  },
  {
    title: "Acompañamiento real",
    description:
      "Tienes un equipo con nombre y apellido, no un ticket de soporte. Desde el diagnóstico hasta el soporte mensual, estamos contigo — y cuando algo falla, lo resolvemos rápido.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="benefits-section" data-theme="dark">
      <div className="benefits-container">
        <header className="section-head" data-trigger>
          <p className="micro-label rise">01 — Por qué elegirnos</p>
          <h2 className="display-title">
            <span className="line">
              <span className="line-inner">La digitalización completa,</span>
            </span>
            <span className="line">
              <span className="line-inner">
                en un solo <span className="accent-serif">equipo</span>.
              </span>
            </span>
          </h2>
          <p className="section-lede rise">
            No somos una agencia que entrega archivos. Conectamos tu web, tus
            automatizaciones y tu marketing en un solo sistema — y te
            acompañamos hasta que funcione.
          </p>
        </header>

        <div className="stack">
          {BENEFITS.map((benefit, index) => (
            <article
              key={index}
              className="benefit-card"
              style={{ "--card-index": index } as React.CSSProperties}
              data-trigger
            >
              <span className="ghost-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="micro-label benefit-index rise">
                0{index + 1} / 04
              </p>
              <h3 className="benefit-title rise">{benefit.title}</h3>
              <p className="benefit-description rise">{benefit.description}</p>
            </article>
          ))}
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

export default Benefits;
