import { scrollToSection } from "../../../utils/helpers";
import { ReactElement } from "react";

interface Package {
  name: string;
  tag: string;
  icon: ReactElement;
  items: string[];
  highlighted?: boolean;
  note?: string;
}

const SeedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const PACKAGES: Package[] = [
  {
    icon: <SeedIcon />,
    name: "Paquete Semilla",
    tag: "Para negocios que quieren dar el primer paso",
    items: [
      "Landing page de 1 página responsive",
      "1 flujo de automatización básico (WhatsApp o formulario)",
      "Google My Business configurado y optimizado",
      "3 copies listos para publicar en redes sociales",
      "Diagnóstico inicial del negocio",
      "Soporte técnico el primer mes",
    ],
  },
  {
    icon: <RocketIcon />,
    name: "Paquete Escala",
    tag: "Para pymes que necesitan sistematizar y crecer",
    highlighted: true,
    items: [
      "Web multipágina hasta 5 secciones",
      "2–3 flujos de automatización con n8n",
      "CRM básico conectado a los flujos",
      "Google My Business completo + estrategia de reseñas",
      "Plan de contenido mensual + 8 copies",
      "1 campaña de Meta Ads configurada",
      "Diagnóstico completo + recomendaciones estratégicas",
      "Soporte técnico mensual",
    ],
  },
  {
    icon: <ZapIcon />,
    name: "Paquete Impulso",
    tag: "Para pymes listas para transformación completa",
    items: [
      "Web robusta con catálogo, reservas y redirección a pago",
      "Hasta 5 flujos de automatización con n8n",
      "CRM con seguimiento de clientes y reportes",
      "Estrategia de contenido 2 meses + 15 copies + visual de feed",
      "Gestión mensual de Meta Ads (hasta 2 campañas)",
      "SEO on-page + Google My Business avanzado",
      "Email marketing: bienvenida + newsletter mensual",
      "Consultoría mensual de 2 horas",
      "Hoja de ruta estratégica de 6 meses",
      "Soporte prioritario mensual",
    ],
  },
  {
    icon: <GraduationIcon />,
    name: "Paquete Universidad",
    tag: "Solo para emprendedores universitarios activos",
    note: "Requiere acreditar matrícula activa",
    items: [
      "Landing page de 1 página responsive",
      "1 flujo de automatización básico con n8n",
      "Google My Business básico configurado",
      "3 copies para redes sociales",
      "Diagnóstico express de 30 minutos",
      "Soporte básico el primer mes",
    ],
  },
];

const Packages = () => {
  return (
    <section id="paquetes" className="packages-section">
      <div className="packages-container">
        <h2 className="packages-title">Paquetes</h2>
        <p className="packages-subtitle">
          Soluciones pensadas para cada etapa de tu negocio. Empieza donde
          puedas y escala cuando estés listo.
        </p>

        <div className="packages-grid">
          {PACKAGES.map((pkg, index) => (
            <div
              key={index}
              className={`package-card${pkg.highlighted ? " package-card--highlighted" : ""}`}
            >
              {pkg.highlighted && (
                <div className="package-badge">Más popular</div>
              )}
              <div className="package-icon-wrapper">
                <div className="package-icon">{pkg.icon}</div>
              </div>
              <h3 className="package-name">{pkg.name}</h3>
              <p className="package-tag">{pkg.tag}</p>
              <ul className="package-items">
                {pkg.items.map((item, i) => (
                  <li key={i} className="package-item">
                    <span className="package-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              {pkg.note && <p className="package-note">* {pkg.note}</p>}
              <button
                className="package-cta"
                onClick={() => scrollToSection("contacto")}
              >
                Quiero este paquete
              </button>
            </div>
          ))}
        </div>

        <div className="packages-footer-note">
          <p>
            Todos los paquetes incluyen implementación (pago único) +
            mensualidad (MRR).{" "}
            <button
              className="packages-footer-link"
              onClick={() => scrollToSection("contacto")}
            >
              Agenda tu diagnóstico gratuito
            </button>{" "}
            y te asesoramos en cuál es el ideal para tu negocio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
