import { SectionId } from "../types";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { AVISO_PRIVACIDAD, POLITICA, fechaPolitica } from "../data/privacidad";
import "../components/EternalGrowthLanding.css";
import "./ServicioPage.css";

// Página de la política de datos. Reutiliza la maqueta de las páginas de
// servicio (migas, etiqueta, bloques con línea arriba y viñetas redondas):
// nada de estilos nuevos para un texto legal.
const PrivacidadPage = () => {
  const handleNavigate = (sectionId: SectionId) => {
    window.location.href = sectionId === "blog" ? "/blog" : `/#${sectionId}`;
  };

  return (
    <div className="eternal-growth-container servicio-page">
      <Header activeSection={null} onNavigate={handleNavigate} />

      <main className="servicio-main">
        <nav className="servicio-migas" aria-label="Ruta de navegación">
          <a href="/">Inicio</a>
          <span aria-hidden="true">/</span>
          <span>Privacidad</span>
        </nav>

        <header className="servicio-hero">
          <p className="servicio-kicker">Ley 1581 de 2012</p>
          <h1>Política de tratamiento de datos personales</h1>
          <p className="servicio-entradilla">
            Qué datos nos das en esta web, para qué los usamos, con quién se
            comparten y cómo puedes consultarlos, corregirlos o pedir que los
            borremos.
          </p>
          <p className="servicio-cta-nota">Versión vigente desde el {fechaPolitica}.</p>
        </header>

        <section className="servicio-cierre privacidad-aviso" aria-labelledby="aviso-privacidad">
          <h2 id="aviso-privacidad">Aviso de privacidad</h2>
          {AVISO_PRIVACIDAD.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </section>

        {POLITICA.map((bloque) => (
          <section className="servicio-bloque" key={bloque.id} id={bloque.id}>
            <h2>{bloque.titulo}</h2>
            {bloque.parrafos?.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
            {bloque.lista && (
              <ul className="servicio-vinetas">
                {bloque.lista.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {bloque.cierre?.map((parrafo) => (
              <p key={parrafo} className="privacidad-cierre">
                {parrafo}
              </p>
            ))}
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default PrivacidadPage;
