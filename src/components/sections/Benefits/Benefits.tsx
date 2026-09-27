import { scrollToSection } from "../../../utils/helpers";

interface Razon {
  title: string;
  description: string;
}

// Son razones, no pasos: por eso no van numeradas. El marcador es el píxel de
// la flor del logo, el mismo motivo que recorre el resto de la página.
const RAZONES: Razon[] = [
  {
    title: "Tecnología que funciona de verdad",
    description:
      "No usamos plantillas genéricas. Elegimos la herramienta según lo que tu negocio necesita y construimos sobre ella: webs que cargan rápido y aguantan crecer, y automatizaciones que trabajan mientras tú atiendes tu negocio.",
  },
  {
    title: "Todo conectado, no servicios sueltos",
    description:
      "Conectamos tu web con automatizaciones de WhatsApp, tu CRM, tus redes y tus campañas de pauta, para que todo funcione como un sistema y no como piezas separadas.",
  },
  {
    title: "Resultados medibles, no promesas",
    description:
      "Cada peso invertido tiene un canal de retorno claro: clientes que llegan por Google, mensajes de WhatsApp que se responden mientras duermes, campañas que traen visitas reales. Medimos todo.",
  },
  {
    title: "Acompañamiento real",
    description:
      "Tienes un equipo con nombre y apellido, no un ticket de soporte. Desde el diagnóstico hasta el soporte mensual estamos contigo, y cuando algo falla lo resolvemos rápido.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="benefits-section razones">
      <div className="razones-contenedor">
        <header className="razones-cabecera">
          <h2 className="razones-titulo">¿Por qué elegirnos?</h2>
          <p className="razones-bajada">
            La digitalización completa que tu negocio necesita, en un solo
            equipo. No somos una agencia que entrega archivos: conectamos tu web,
            tus automatizaciones y tu marketing en un solo sistema, y te
            acompañamos hasta que funcione.
          </p>
          <button
            className="hero-cta-primary razones-cta"
            onClick={() => scrollToSection("contacto")}
          >
            Agenda tu diagnóstico gratuito
          </button>
        </header>

        <ul className="razones-lista">
          {RAZONES.map((razon) => (
            <li className="razon" key={razon.title}>
              <span className="pixel razon-pixel" aria-hidden="true" />
              <h3 className="razon-titulo">{razon.title}</h3>
              <p className="razon-texto">{razon.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
