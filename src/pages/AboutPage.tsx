import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logocorregido-removebg-preview.png";
import "./AboutPage.css";

const VALUES = [
  {
    title: "Empatía",
    description:
      "Entendemos las necesidades únicas de cada negocio antes de proponer cualquier solución. Sin moldes genéricos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Practicidad",
    description:
      "Herramientas y soluciones que producen resultados tangibles y medibles, diseñadas para implementarse de forma rápida y efectiva.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Comunidad",
    description:
      "Más que un proveedor, somos tu aliado estratégico. Te acompañamos en cada paso de tu transformación digital.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Innovación",
    description:
      "Utilizamos las últimas tecnologías para mantener tu negocio a la vanguardia del mercado digital sin que tengas que entender el código.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-page-header">
        <button className="about-back-btn" onClick={() => navigate("/")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver
        </button>
        <img src={logoImage} alt="EternalGrowth" className="about-page-logo" />
        <span className="about-page-brand">EternalGrowth</span>
      </header>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-hero-eyebrow">Quiénes somos</p>
          <h1 className="about-hero-title">
            Transformación digital <span className="about-accent">para todos</span>
          </h1>
          <p className="about-hero-desc">
            EternalGrowth es una startup y movimiento de transformación digital que busca
            reducir la brecha tecnológica en las micro y pequeñas empresas de Medellín.
            Nuestro enfoque va más allá de la simple venta de servicios — somos una
            comunidad que ofrece soluciones prácticas y adaptables a la realidad de cada negocio.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-card">
              <h2 className="about-section-label">Nuestra misión</h2>
              <p className="about-mission-text">
                Cerrar la brecha digital para micro y pequeñas empresas en Medellín,
                entregando tecnología que funciona de verdad y acompañamiento que
                dura más allá del lanzamiento.
              </p>
            </div>
            <div className="about-mission-card">
              <h2 className="about-section-label">Nuestra visión</h2>
              <p className="about-mission-text">
                Ser el aliado tecnológico de referencia para los negocios colombianos
                que quieren crecer sin depender de ellos mismos las 24 horas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="about-values">
        <div className="about-container">
          <h2 className="about-values-title">Nuestros valores</h2>
          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="about-value-card">
                <div className="about-value-icon-wrapper">
                  <div className="about-value-icon">{v.icon}</div>
                </div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="about-container about-cta-inner">
          <h2 className="about-cta-title">¿Listo para empezar?</h2>
          <p className="about-cta-desc">
            Agenda un diagnóstico gratuito de 30 minutos y te mostramos exactamente qué necesita tu negocio.
          </p>
          <button className="about-cta-btn" onClick={() => navigate("/#contacto")}>
            Agenda tu diagnóstico gratuito
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>© 2026 EternalGrowth · Medellín, Colombia</p>
      </footer>
    </div>
  );
};

export default AboutPage;
