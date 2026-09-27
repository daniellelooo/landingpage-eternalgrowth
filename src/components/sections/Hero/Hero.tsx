import { PORTAFOLIO_PATH, PROYECTOS, ProyectoPortafolio } from "../../../data/portafolio";
import { scrollToSection } from "../../../utils/helpers";
import "./hero.css";

// El hero de la home, "Vitrina": el trabajo real es el hero. Una cinta de webs
// que hicimos cruza la pantalla inclinada, de borde a borde, y avanza despacio.
// Encima, notas escritas a mano en neón señalan en tres de ellas lo que hace
// la web por el negocio (la agenda, el pedido, el software). Los otros dos
// conceptos que se probaron quedaron en la rama diseno/hero-conceptos.

// Los cinco servicios, cada uno enlazado a su página (Google sigue esos
// enlaces desde la primera pantalla). Va dentro de una frase, no como fila de
// etiquetas: "... páginas web, software a medida, tu ficha de Google Business,
// automatizaciones y campañas en Meta Ads ...".
const ListaServicios = () => (
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
const AccionesHero = () => (
  <div className="hero-acciones">
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
const Subrayado = () => (
  <svg className="trazo subrayado" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
    <path d="M3 12 C 60 5, 130 4, 200 8 S 280 13, 297 6" pathLength={1} />
  </svg>
);

// Marca a mano sobre una zona de la captura, en % de la captura.
interface Marca {
  forma: "circulo" | "ovalo";
  x: number;
  y: number;
  ancho: number;
  alto: number;
  nota: string;
}

interface Pieza {
  slug: string;
  formato: "escritorio" | "celular";
  que: string;
  marca?: Marca;
}

// Orden pensado para alternar colores (menta, azul, negro, crema) y formatos.
// Cada celular se monta un poco sobre la pantalla anterior.
const PIEZAS: Pieza[] = [
  {
    slug: "arrayan-veterinaria",
    formato: "escritorio",
    que: "Agenda de citas",
    marca: { forma: "ovalo", x: 8, y: 72, ancho: 36, alto: 24, nota: "agenda en línea" },
  },
  { slug: "ceiba-psicologia", formato: "celular", que: "Consultorio" },
  { slug: "techverse", formato: "escritorio", que: "Tienda con configurador" },
  { slug: "piston-motoservicio", formato: "celular", que: "Taller de motos" },
  {
    slug: "floristeria-alheli",
    formato: "escritorio",
    que: "Catálogo",
    marca: { forma: "circulo", x: 89.5, y: 86, ancho: 11, alto: 17, nota: "pedidos por WhatsApp" },
  },
  {
    slug: "movo",
    formato: "escritorio",
    que: "Software para talleres",
    marca: { forma: "ovalo", x: 18, y: 74, ancho: 78, alto: 30, nota: "software a medida" },
  },
  { slug: "reno-motriz", formato: "escritorio", que: "Agenda del taller" },
  { slug: "bunker-force", formato: "escritorio", que: "Tienda en línea" },
];

const proyectoDe = (slug: string) =>
  PROYECTOS.find((p) => p.slug === slug) as ProyectoPortafolio;

// Trazos a mano: un óvalo que no cierra del todo y un círculo apretado.
const TRAZO_MARCA = {
  ovalo: "M52 3 C 20 2, 3 14, 4 30 C 5 48, 30 58, 56 57 C 82 56, 98 44, 97 28 C 96 12, 74 3, 44 6",
  circulo: "M50 4 C 22 3, 4 20, 5 36 C 6 54, 28 58, 52 57 C 78 56, 96 42, 95 26 C 94 10, 70 1, 38 8",
};

const Captura = ({ pieza, primera }: { pieza: Pieza; primera: boolean }) => {
  const proyecto = proyectoDe(pieza.slug);
  const base = `/portafolio/${proyecto.imagen}`;
  const esCelular = pieza.formato === "celular";
  const { marca } = pieza;
  return (
    // Nombres de clase completos: PurgeCSS borra los que se arman por partes.
    <figure className={esCelular ? "vitrina-pieza vitrina-pieza--celular" : "vitrina-pieza vitrina-pieza--escritorio"}>
      <div className="vitrina-lienzo">
        <div className="vitrina-marco">
          <img
            src={esCelular ? `${base}-celular-200.webp` : `${base}-escritorio-640.webp`}
            srcSet={
              esCelular
                ? `${base}-celular-200.webp 200w, ${base}-celular-400.webp 400w`
                : `${base}-escritorio-640.webp 640w, ${base}-escritorio-1080.webp 1080w`
            }
            sizes={esCelular ? "(min-width: 900px) 170px, 118px" : "(min-width: 900px) 460px, 320px"}
            width={esCelular ? 390 : 1440}
            height={esCelular ? 844 : 900}
            alt={primera ? proyecto.alt : ""}
            loading={primera ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
        {marca && (
          <svg
            className="trazo vitrina-marca"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              left: `${marca.x}%`,
              top: `${marca.y}%`,
              width: `${marca.ancho}%`,
              height: `${marca.alto}%`,
            }}
          >
            <path d={TRAZO_MARCA[marca.forma]} pathLength={1} />
          </svg>
        )}
      </div>
      <figcaption>
        <span className="vitrina-nombre">{proyecto.nombre}</span>
        {marca ? (
          <span className="vitrina-nota-pieza">
            <svg className="trazo" viewBox="0 0 30 26" aria-hidden="true">
              <path d="M24 24 C 12 22, 6 14, 7 3" pathLength={1} />
              <path d="M2 9 L 7 2 L 12 8" pathLength={1} />
            </svg>
            {marca.nota}
          </span>
        ) : (
          <span className="vitrina-que">
            {proyecto.naturaleza === "demo" ? `Demo · ${pieza.que}` : pieza.que}
          </span>
        )}
      </figcaption>
    </figure>
  );
};

const Hero = () => (
  <section id="hero" className="hero hero--vitrina" aria-labelledby="hero-titulo">
    <div className="vitrina-cabeza">
      <h1 id="hero-titulo" className="hero-titulo vitrina-titulo">
        Tu local cierra a las 7. Tu web{" "}
        <span className="con-trazo">
          sigue atendiendo.
          <Subrayado />
        </span>
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
        {/* La flor de la marca firma la nota: el isotipo tal cual (348 x 527),
            sin redibujar. */}
        <img
          className="vitrina-flor"
          src="/marca/isotipo-color.webp"
          width={348}
          height={527}
          alt=""
          decoding="async"
        />
        <span>todas estas las hicimos nosotros</span>
        <svg viewBox="0 0 100 130" className="trazo">
          <path d="M6 10 C 52 4, 86 34, 82 118" pathLength={1} />
          <path d="M70 104 L 82 120 L 94 102" pathLength={1} />
        </svg>
      </div>
    </div>

    <div className="vitrina-pie">
      <p className="hero-texto vitrina-texto">
        Te encuentran en Google, ven tus precios y agendan o piden sin esperar a que
        contestes. Hacemos <ListaServicios /> para negocios de Medellín.
      </p>
      <AccionesHero />
    </div>
  </section>
);

export default Hero;
