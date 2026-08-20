import logoImage from "../assets/logocorregido-removebg-preview.png";
import "./AboutPage.css";

const VALUES = [
  {
    title: "Empatía",
    description:
      "Entendemos las necesidades únicas de cada negocio antes de proponer cualquier solución. Sin moldes genéricos.",
  },
  {
    title: "Practicidad",
    description:
      "Herramientas y soluciones que producen resultados tangibles y medibles, diseñadas para implementarse de forma rápida y efectiva.",
  },
  {
    title: "Comunidad",
    description:
      "Más que un proveedor, somos tu aliado estratégico. Te acompañamos en cada paso de tu transformación digital.",
  },
  {
    title: "Innovación",
    description:
      "Utilizamos las últimas tecnologías para mantener tu negocio a la vanguardia del mercado digital sin que tengas que entender el código.",
  },
];

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-page-header">
        <button
          className="about-back-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Volver
        </button>
        <div className="about-page-brand-group">
          <img src={logoImage} alt="EternalGrowth" className="about-page-logo" />
          <span className="about-page-brand">EternalGrowth</span>
        </div>
      </header>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="micro-label about-hero-eyebrow">Quiénes somos</p>
          <h1 className="about-hero-title">
            Transformación digital{" "}
            <span className="accent-serif">para todos</span>.
          </h1>
          <p className="about-hero-desc">
            EternalGrowth es una startup y movimiento de transformación digital
            que busca reducir la brecha tecnológica en las micro y pequeñas
            empresas de Medellín. Nuestro enfoque va más allá de la simple venta
            de servicios — somos una comunidad que ofrece soluciones prácticas y
            adaptables a la realidad de cada negocio.
          </p>
        </div>
      </section>

      {/* Misión */}
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-card">
              <h2 className="micro-label about-section-label">Nuestra misión</h2>
              <p className="about-mission-text">
                Cerrar la brecha digital para micro y pequeñas empresas en
                Medellín, entregando tecnología que funciona de verdad y
                acompañamiento que dura más allá del lanzamiento.
              </p>
            </div>
            <div className="about-mission-card">
              <h2 className="micro-label about-section-label">Nuestra visión</h2>
              <p className="about-mission-text">
                Ser el aliado tecnológico de referencia para los negocios
                colombianos que quieren crecer sin depender de ellos mismos las
                24 horas.
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
                <p className="micro-label about-value-index">
                  0{i + 1} / 0{VALUES.length}
                </p>
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
          <h2 className="about-cta-title">
            ¿Listo para <span className="accent-serif">empezar</span>?
          </h2>
          <p className="about-cta-desc">
            Agenda un diagnóstico gratuito de 30 minutos y te mostramos
            exactamente qué necesita tu negocio.
          </p>
          <button
            className="about-cta-btn"
            onClick={() => {
              window.location.href = "/#contacto";
            }}
          >
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
