import { SectionId } from "../types";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Servicio } from "../data/servicios";
import { SITE } from "../seo/site";
import "../components/EternalGrowthLanding.css";
import "./ServicioPage.css";

interface ServicioPageProps {
  servicio: Servicio;
}

const ServicioPage = ({ servicio }: ServicioPageProps) => {
  const handleNavigate = (sectionId: SectionId) => {
    window.location.href = sectionId === "blog" ? "/blog" : `/#${sectionId}`;
  };

  return (
    <div className="eternal-growth-container servicio-page">
      <Header activeSection="servicios" onNavigate={handleNavigate} />

      <main className="servicio-main">
        <nav className="servicio-migas" aria-label="Ruta de navegación">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span>{servicio.nombre}</span>
        </nav>

        <header className="servicio-hero">
          <p className="servicio-kicker">Servicio</p>
          <h1>{servicio.titulo}</h1>
          <p className="servicio-entradilla">{servicio.entradilla}</p>
          <a className="servicio-cta" href="/#contacto">
            Agenda tu diagnóstico gratuito
          </a>
          <p className="servicio-cta-nota">
            Te respondemos en menos de 24 horas hábiles.
          </p>
        </header>

        <section className="servicio-bloque">
          {servicio.intro.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </section>

        <section className="servicio-bloque">
          <h2>Qué incluye</h2>
          <div className="servicio-lista">
            {servicio.incluye.map((item) => (
              <div className="servicio-item" key={item.titulo}>
                <h3>{item.titulo}</h3>
                <p>{item.detalle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="servicio-bloque">
          <h2>Para quién es</h2>
          <ul className="servicio-vinetas">
            {servicio.paraQuien.map((caso) => (
              <li key={caso}>{caso}</li>
            ))}
          </ul>
        </section>

        <section className="servicio-bloque">
          <h2>Preguntas frecuentes</h2>
          <div className="servicio-faq">
            {servicio.preguntas.map((item) => (
              <div className="servicio-faq-item" key={item.pregunta}>
                <h3>{item.pregunta}</h3>
                <p>{item.respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="servicio-cierre">
          <h2>Hablemos de tu negocio</h2>
          <p>
            Treinta minutos para entender qué necesitas y decirte con honestidad
            si podemos ayudarte. Sin compromiso.
          </p>
          <a className="servicio-cta" href="/#contacto">
            Agendar diagnóstico gratuito
          </a>
          <p className="servicio-cta-nota">
            O escríbenos a{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o por{" "}
            <a href={SITE.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicioPage;
