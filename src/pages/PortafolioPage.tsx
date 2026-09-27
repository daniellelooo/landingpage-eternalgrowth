import { SectionId } from "../types";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import MockupProyecto from "../components/sections/Portafolio/MockupProyecto";
import {
  GRUPOS_PORTAFOLIO,
  GrupoPortafolio,
  ProyectoPortafolio,
  getProyectosPorGrupo,
} from "../data/portafolio";
import { SITE } from "../seo/site";
import "../components/EternalGrowthLanding.css";
import "./ServicioPage.css";
import "../components/sections/Portafolio/portafolio.css";

const EnlaceSitio = ({ proyecto }: { proyecto: ProyectoPortafolio }) => (
  <a className="proyecto-enlace" href={proyecto.url} target="_blank" rel="noopener">
    {proyecto.grupo === "demo" ? "Ver demo" : "Ver sitio"}
    <span className="sr-only"> de {proyecto.nombre} (abre en una pestaña nueva)</span>
    <span className="proyecto-flecha" aria-hidden="true">
      ↗
    </span>
  </a>
);

const Etiquetas = ({ etiquetas }: { etiquetas: string[] }) => (
  <ul className="proyecto-etiquetas" aria-label="Qué incluye">
    {etiquetas.map((etiqueta) => (
      <li key={etiqueta}>
        <span className="pixel" aria-hidden="true" />
        {etiqueta}
      </li>
    ))}
  </ul>
);

const CabeceraGrupo = ({ grupo }: { grupo: GrupoPortafolio }) => (
  <div className="portafolio-grupo-cabecera">
    <h2 id={`grupo-${grupo}`} className="portafolio-grupo-titulo">
      {GRUPOS_PORTAFOLIO[grupo].titulo}
    </h2>
    <p className="portafolio-grupo-descripcion">{GRUPOS_PORTAFOLIO[grupo].descripcion}</p>
  </div>
);

const PortafolioPage = () => {
  const handleNavigate = (sectionId: SectionId) => {
    window.location.href = sectionId === "blog" ? "/blog" : `/#${sectionId}`;
  };

  const enProduccion = getProyectosPorGrupo("produccion");
  const demos = getProyectosPorGrupo("demo");

  return (
    <div className="eternal-growth-container servicio-page portafolio-page">
      <Header activeSection="portafolio" onNavigate={handleNavigate} />

      <main className="portafolio-main">
        <nav className="servicio-migas" aria-label="Ruta de navegación">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span>Portafolio</span>
        </nav>

        <header className="portafolio-cabecera">
          <h1>Portafolio de páginas web en Medellín</h1>
          <p className="portafolio-entradilla">
            Webs que desarrollamos para negocios de Medellín y el Valle de Aburrá, y demos
            por sector para que veas cómo podría quedar la tuya. Cada una abre el sitio
            real, para que la pruebes en tu celular.
          </p>
        </header>

        <section className="portafolio-grupo" aria-labelledby="grupo-produccion">
          <CabeceraGrupo grupo="produccion" />
          <ul className="portafolio-produccion">
            {enProduccion.map((proyecto, i) => (
              <li className="proyecto proyecto--fila" key={proyecto.slug}>
                <MockupProyecto
                  proyecto={proyecto}
                  tamanoEscritorio="(min-width: 1240px) 640px, (min-width: 901px) 52vw, 88vw"
                  tamanoCelular="(min-width: 901px) 160px, 24vw"
                  prioritaria={i === 0}
                />
                <div className="proyecto-texto">
                  <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
                  <p className="proyecto-meta">
                    {proyecto.sector}, {proyecto.ciudad}
                  </p>
                  <p className="proyecto-tipo">{proyecto.tipo}</p>
                  <p className="proyecto-resultado">{proyecto.resultado}</p>
                  <Etiquetas etiquetas={proyecto.etiquetas} />
                  <EnlaceSitio proyecto={proyecto} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="portafolio-grupo" aria-labelledby="grupo-demo">
          <CabeceraGrupo grupo="demo" />
          <ul className="portafolio-demos">
            {demos.map((proyecto) => (
              <li className="proyecto proyecto--tarjeta" key={proyecto.slug}>
                <MockupProyecto
                  proyecto={proyecto}
                  tamanoEscritorio="(min-width: 1240px) 350px, (min-width: 1025px) 28vw, (min-width: 641px) 44vw, 88vw"
                  tamanoCelular="(min-width: 641px) 90px, 24vw"
                />
                <div className="proyecto-texto">
                  <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
                  <p className="proyecto-meta">Demo de {proyecto.sector.toLowerCase()}</p>
                  <p className="proyecto-tipo">{proyecto.tipo}</p>
                  <p className="proyecto-resultado">{proyecto.resultado}</p>
                  <EnlaceSitio proyecto={proyecto} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="servicio-cierre portafolio-cierre">
          <h2>¿Quieres una web así para tu negocio?</h2>
          <p>
            Treinta minutos para entender qué necesitas y decirte con honestidad qué te
            conviene hacer primero. Sin compromiso.
          </p>
          <a className="servicio-cta" href="/#contacto">
            Agendar diagnóstico gratuito
          </a>
          <p className="servicio-cta-nota">
            O escríbenos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o por{" "}
            <a href={SITE.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            . Te respondemos en menos de 24 horas hábiles.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortafolioPage;
