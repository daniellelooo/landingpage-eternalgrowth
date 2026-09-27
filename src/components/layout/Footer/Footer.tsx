import logoImage from "../../../assets/logocorregido-removebg-preview.png";
import { NEWS_BASE_PATH } from "../../../data/news";
import { PORTAFOLIO_PATH } from "../../../data/portafolio";
import { SERVICIOS, SERVICIOS_BASE_PATH } from "../../../data/servicios";
import { SITE } from "../../../seo/site";
import "./footer.css";

// Footer tradicional: columnas alineadas a la izquierda y una franja abajo.
// Todo son enlaces reales (<a href>), que Google sigue. Las secciones de la
// home van con /#id para que funcionen también desde las otras páginas.
const NAVEGACION = [
  { href: "/", texto: "Inicio" },
  { href: "/#beneficios", texto: "¿Por qué elegirnos?" },
  { href: "/#servicios", texto: "Servicios" },
  { href: PORTAFOLIO_PATH, texto: "Portafolio" },
  { href: NEWS_BASE_PATH, texto: "Blog" },
  { href: "/eternalgrowth", texto: "Nuestra historia" },
  { href: "/#contacto", texto: "Contacto" },
];

const Footer = () => {
  return (
    <footer className="pie">
      <div className="pie-contenedor">
        <div className="pie-marca">
          <a className="pie-logo" href="/" aria-label="EternalGrowth, ir al inicio">
            <img src={logoImage} alt="" width={36} height={36} />
            <span>EternalGrowth</span>
          </a>
          <p className="pie-lema">Transformación digital para tu negocio</p>
          <p className="pie-descripcion">
            Agencia de software en Medellín: desarrollo web, automatización y
            WhatsApp para micro y pequeñas empresas.
          </p>
        </div>

        <nav className="pie-columna" aria-labelledby="pie-navegacion">
          <h2 id="pie-navegacion" className="pie-titulo">
            Navegación
          </h2>
          <ul>
            {NAVEGACION.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href}>{enlace.texto}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="pie-columna" aria-labelledby="pie-servicios">
          <h2 id="pie-servicios" className="pie-titulo">
            Servicios
          </h2>
          <ul>
            {SERVICIOS.map((servicio) => (
              <li key={servicio.slug}>
                <a href={`${SERVICIOS_BASE_PATH}/${servicio.slug}`}>{servicio.nombre}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pie-columna">
          <h2 className="pie-titulo">Contacto</h2>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              {SITE.city}, {SITE.region}, Colombia
            </li>
            <li>Respondemos en menos de 24 horas hábiles</li>
          </ul>

          <h2 className="pie-titulo pie-titulo--redes">Redes</h2>
          <ul>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noreferrer">
                Instagram @eternalgrowth__
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pie-franja">
        <div className="pie-franja-contenedor">
          <p>© 2026 EternalGrowth. Todos los derechos reservados.</p>
          <p>Medellín, Colombia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
