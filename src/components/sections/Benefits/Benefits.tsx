import { ReactElement } from "react";

interface Benefit {
  title: string;
  description: string;
  icon: ReactElement;
}

const BENEFITS: Benefit[] = [
  {
    title: "Empatía",
    description:
      "Entendemos las necesidades únicas de tu negocio y creamos soluciones personalizadas que se adaptan a tu realidad.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Practicidad",
    description:
      "Herramientas y soluciones que producen resultados tangibles y medibles, diseñadas para implementarse de forma rápida y efectiva.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
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
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
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
      "Utilizamos las últimas tecnologías y metodologías para mantener tu negocio a la vanguardia del mercado digital.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="benefits-section">
      <div className="benefits-container">
        <h2 className="benefits-title">¿Por Qué Elegir EternalGrowth?</h2>
        <p className="benefits-subtitle">
          Transformamos pequeñas empresas en gigantes digitales
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
      </div>
    </section>
  );
};

export default Benefits;
