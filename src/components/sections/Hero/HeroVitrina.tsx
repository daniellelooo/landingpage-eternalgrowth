import { PROYECTOS, ProyectoPortafolio } from "../../../data/portafolio";
import { AccionesHero, QueHacemos } from "./HeroComun";

// Concepto A, "Vitrina": el trabajo real es el hero. Una cinta de webs que
// hicimos cruza la pantalla en diagonal, de borde a borde, y avanza despacio.
// Una nota escrita a mano en neón dice de quién son.

interface Pieza {
  slug: string;
  formato: "escritorio" | "celular";
  que: string;
}

// Orden pensado para alternar colores fuertes (menta, azul, negro, crema) y
// formatos (pantalla ancha y celular).
const PIEZAS: Pieza[] = [
  { slug: "arrayan-veterinaria", formato: "escritorio", que: "Agenda de citas" },
  { slug: "ceiba-psicologia", formato: "celular", que: "Consultorio" },
  { slug: "techverse", formato: "escritorio", que: "Tienda con configurador" },
  { slug: "floristeria-alheli", formato: "celular", que: "Pedidos por WhatsApp" },
  { slug: "movo", formato: "escritorio", que: "Software a medida" },
  { slug: "reno-motriz", formato: "escritorio", que: "Agenda del taller" },
  { slug: "piston-motoservicio", formato: "celular", que: "Taller de motos" },
  { slug: "bunker-force", formato: "escritorio", que: "Tienda en línea" },
];

const proyectoDe = (slug: string) =>
  PROYECTOS.find((p) => p.slug === slug) as ProyectoPortafolio;

const Captura = ({ pieza, primera }: { pieza: Pieza; primera: boolean }) => {
  const proyecto = proyectoDe(pieza.slug);
  const base = `/portafolio/${proyecto.imagen}`;
  const esCelular = pieza.formato === "celular";
  return (
    <figure className={`vitrina-pieza vitrina-pieza--${pieza.formato}`}>
      <div className="vitrina-marco">
        <img
          src={esCelular ? `${base}-celular-200.webp` : `${base}-escritorio-640.webp`}
          srcSet={
            esCelular
              ? `${base}-celular-200.webp 200w, ${base}-celular-400.webp 400w`
              : `${base}-escritorio-640.webp 640w, ${base}-escritorio-1080.webp 1080w`
          }
          sizes={esCelular ? "(min-width: 900px) 170px, 118px" : "(min-width: 900px) 440px, 300px"}
          width={esCelular ? 390 : 1440}
          height={esCelular ? 844 : 900}
          alt={primera ? proyecto.alt : ""}
          loading={primera ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <figcaption>
        <span className="vitrina-nombre">{proyecto.nombre}</span>
        <span className="vitrina-que">
          {proyecto.naturaleza === "demo" ? `Demo · ${pieza.que}` : pieza.que}
        </span>
      </figcaption>
    </figure>
  );
};

const HeroVitrina = () => (
  <section id="hero" className="hero hero--vitrina" aria-labelledby="hero-titulo">
    <div className="vitrina-cabeza">
      <h1 id="hero-titulo" className="hero-titulo vitrina-titulo">
        Así se ve un negocio de Medellín cuando llega a internet.
      </h1>
    </div>

    <div className="vitrina-cinta" aria-label="Webs que hemos hecho">
      {/* La lista va dos veces para que la vuelta no tenga corte; la copia no
          la leen los lectores de pantalla. */}
      <div className="vitrina-pista">
        <div className="vitrina-tramo">
          {PIEZAS.map((pieza, i) => (
            <Captura key={pieza.slug} pieza={pieza} primera={i < 4} />
          ))}
        </div>
        <div className="vitrina-tramo" aria-hidden="true">
          {PIEZAS.map((pieza) => (
            <Captura key={pieza.slug} pieza={pieza} primera={false} />
          ))}
        </div>
      </div>

      <div className="vitrina-nota" aria-hidden="true">
        <span>todas estas las hicimos nosotros</span>
        <svg viewBox="0 0 100 130" className="trazo">
          <path d="M6 10 C 52 4, 86 34, 82 118" />
          <path d="M70 104 L 82 120 L 94 102" />
        </svg>
      </div>
    </div>

    <div className="vitrina-pie">
      <QueHacemos className="hero-texto vitrina-texto">
        El primer paso es un diagnóstico gratuito.
      </QueHacemos>
      <AccionesHero />
    </div>
  </section>
);

export default HeroVitrina;
