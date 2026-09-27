import { PORTAFOLIO_PATH, PROYECTOS_DESTACADOS } from "../../../data/portafolio";
import MockupProyecto from "./MockupProyecto";
import "./portafolio.css";

// Bloque corto de la home: tres webs en producción y el enlace a la página
// completa. Las capturas son lo principal; el texto se queda en nombre, qué
// negocio es y el enlace al sitio.
const Portafolio = () => {
  return (
    <section id="portafolio" className="portafolio-home" aria-labelledby="portafolio-home-titulo">
      <div className="portafolio-home-contenedor">
        <div className="portafolio-home-cabecera">
          <h2 id="portafolio-home-titulo" className="portafolio-home-titulo">
            Webs que ya están en línea
          </h2>
          <a className="portafolio-enlace" href={PORTAFOLIO_PATH}>
            Ver el portafolio completo
          </a>
        </div>

        <ul className="portafolio-home-lista">
          {PROYECTOS_DESTACADOS.map((proyecto) => (
            <li className="proyecto proyecto--tarjeta" key={proyecto.slug}>
              <MockupProyecto
                proyecto={proyecto}
                tamanoEscritorio="(min-width: 1240px) 350px, (min-width: 901px) 28vw, (min-width: 641px) 52vw, 88vw"
                tamanoCelular="(min-width: 901px) 90px, 24vw"
              />
              <div className="proyecto-texto">
                <h3 className="proyecto-nombre">{proyecto.nombre}</h3>
                <p className="proyecto-meta">
                  {proyecto.sector}, {proyecto.ciudad}
                </p>
                <a
                  className="proyecto-enlace"
                  href={proyecto.url}
                  target="_blank"
                  rel="noopener"
                >
                  Ver sitio
                  <span className="sr-only"> de {proyecto.nombre} (abre en una pestaña nueva)</span>
                  <span className="proyecto-flecha" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Portafolio;
