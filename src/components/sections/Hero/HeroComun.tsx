import type { ReactNode } from "react";
import { PORTAFOLIO_PATH } from "../../../data/portafolio";
import { scrollToSection } from "../../../utils/helpers";

// Lo que hace Eternal, dicho en una frase y con cada servicio enlazado a su
// página (Google sigue esos enlaces desde la primera pantalla). Va como texto
// corrido, no como fila de etiquetas.
export const QueHacemos = ({ className, children }: { className: string; children?: ReactNode }) => (
  <p className={className}>
    Hacemos <a href="/servicios/desarrollo-web-medellin">páginas web</a>,{" "}
    <a href="/servicios/transformacion-digital-medellin">software a medida</a>, tu ficha de{" "}
    <a href="/servicios/marketing-digital-medellin">Google Business</a>,{" "}
    <a href="/servicios/automatizacion-procesos-medellin">automatizaciones</a> y campañas en{" "}
    <a href="/servicios/marketing-digital-medellin">Meta Ads</a> para negocios locales de
    Medellín.{children ? " " : ""}
    {children}
  </p>
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
