import { scrollToSection } from "../../../utils/helpers";
import { useRef, useState, useEffect } from "react";

interface Package {
  name: string;
  tag: string;
  items: string[];
  highlighted?: boolean;
  note?: string;
}

const PACKAGES: Package[] = [
  {
    name: "Semilla",
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
    name: "Escala",
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
    name: "Impulso",
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
    name: "Universidad",
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const handleScroll = () => {
      const cardWidth = grid.firstElementChild
        ? (grid.firstElementChild as HTMLElement).offsetWidth
        : grid.scrollWidth / PACKAGES.length;
      const index = Math.round(grid.scrollLeft / (cardWidth + 14));
      setActiveIndex(Math.min(index, PACKAGES.length - 1));
    };
    grid.addEventListener("scroll", handleScroll, { passive: true });
    return () => grid.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="paquetes" className="packages-section" data-theme="light">
      <div className="packages-container">
        <header className="section-head" data-trigger>
          <p className="micro-label rise">02 — Paquetes</p>
          <h2 className="display-title">
            <span className="line">
              <span className="line-inner">Empieza donde puedas,</span>
            </span>
            <span className="line">
              <span className="line-inner">
                escala cuando estés <span className="accent-serif">listo</span>.
              </span>
            </span>
          </h2>
          <p className="section-lede rise">
            Soluciones pensadas para cada etapa de tu negocio.
          </p>
        </header>

        <div className="packages-grid" ref={gridRef} data-reveal>
          {PACKAGES.map((pkg, index) => (
            <article
              key={index}
              className={`package-card${pkg.highlighted ? " package-card--highlighted" : ""}`}
            >
              {pkg.highlighted && (
                <span className="package-badge">Más popular</span>
              )}
              <p className="micro-label package-index">
                0{index + 1} / 0{PACKAGES.length}
              </p>
              <h3 className="package-name">{pkg.name}</h3>
              <p className="package-tag">{pkg.tag}</p>
              <ul className="package-items">
                {pkg.items.map((item, i) => (
                  <li key={i} className="package-item">
                    {item}
                  </li>
                ))}
              </ul>
              {pkg.note && <p className="package-note">{pkg.note}</p>}
              <button
                className="package-cta"
                onClick={() => scrollToSection("contacto")}
              >
                Quiero este paquete
                <span className="package-cta-arrow" aria-hidden="true">
                  <span>&rarr;</span>
                  <span>&rarr;</span>
                </span>
              </button>
            </article>
          ))}
        </div>

        {/* Dots indicadores — solo visibles en mobile */}
        <div className="packages-dots" aria-hidden="true">
          {PACKAGES.map((_, i) => (
            <span
              key={i}
              className={`packages-dot${i === activeIndex ? " packages-dot--active" : ""}`}
            />
          ))}
        </div>

        <div className="packages-footer-note" data-reveal>
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
