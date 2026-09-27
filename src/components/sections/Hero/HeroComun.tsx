import { PORTAFOLIO_PATH } from "../../../data/portafolio";
import { scrollToSection } from "../../../utils/helpers";

// Los cinco servicios, cada uno enlazado a su página (Google sigue esos
// enlaces desde la primera pantalla). Va dentro de una frase, no como fila de
// etiquetas: "... páginas web, software a medida, tu ficha de Google Business,
// automatizaciones y campañas en Meta Ads ...".
export const ListaServicios = () => (
  <>
    <a href="/servicios/desarrollo-web-medellin">páginas web</a>,{" "}
    <a href="/servicios/transformacion-digital-medellin">software a medida</a>, tu ficha de{" "}
    <a href="/servicios/marketing-digital-medellin">Google Business</a>,{" "}
    <a href="/servicios/automatizacion-procesos-medellin">automatizaciones</a> y campañas en{" "}
    <a href="/servicios/marketing-digital-medellin">Meta Ads</a>
  </>
);

// Una sola acción principal (el diagnóstico) y el portafolio como enlace al
// lado, no como segundo botón.
export const AccionesHero = ({ className = "" }: { className?: string }) => (
  <div className={`hero-acciones ${className}`}>
    <button
      type="button"
      className="hero-cta-primary hero-boton"
      onClick={() => scrollToSection("contacto")}
    >
      Agenda tu diagnóstico gratuito
    </button>
    <a className="hero-enlace" href={PORTAFOLIO_PATH}>
      Ver el portafolio
    </a>
  </div>
);

// Subrayado hecho a mano, en neón, bajo una frase del titular.
export const Subrayado = () => (
  <svg className="trazo subrayado" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
    <path d="M3 12 C 60 5, 130 4, 200 8 S 280 13, 297 6" />
  </svg>
);
