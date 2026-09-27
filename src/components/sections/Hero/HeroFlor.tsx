import type { CSSProperties } from "react";
import { PROYECTOS, ProyectoPortafolio } from "../../../data/portafolio";
import { AccionesHero, ListaServicios } from "./HeroComun";

// Concepto C, "La flor": el isotipo de la marca, tal cual viene en el manual
// (el PNG de 348 x 527, sin redibujar ni estirar), y los píxeles de su corola
// siguen subiendo por la misma retícula hasta volverse proyectos reales.
//
// Todo se mide en píxeles del isotipo original. La corola está en una
// retícula que empieza en x = 191, y = 0, con paso 39,75 y cuadros de 37,5
// (medido sobre el archivo). Los proyectos ocupan 2x2, 3x3 o 4x3 celdas de esa
// misma retícula, así que parecen píxeles de la flor que crecieron.
//
// Hay dos composiciones: escritorio (flor abajo a la izquierda y la escalera
// subiendo en diagonal) y celular (más ancha que alta, menos proyectos y más
// grandes). Ninguna pieza sale de la escena: la escena mide lo que ocupan
// entre todas y se ajusta a la pantalla sin recortarse.

const ISO_ANCHO = 348;
const ISO_ALTO = 527;
const ORIGEN_X = 191;
const PASO = 39.75;
const HUECO = PASO - 37.5;

interface Escena {
  // Columnas a la derecha del origen de la corola y filas por encima de la flor.
  columnas: number;
  filasArriba: number;
}

const ESCRITORIO: Escena = { columnas: 15, filasArriba: 6 };
const CELULAR: Escena = { columnas: 10, filasArriba: 4 };

const medidas = (e: Escena) => ({
  ancho: ORIGEN_X + e.columnas * PASO,
  alto: e.filasArriba * PASO + ISO_ALTO,
  florY: e.filasArriba * PASO,
});

const M_ESC = medidas(ESCRITORIO);
const M_CEL = medidas(CELULAR);

// Una celda (c, r) de la retícula: c desde la primera columna de la corola,
// r desde la primera fila (r negativa = por encima de la flor).
interface Lugar {
  c: number;
  r: number;
  w: number;
  h: number;
}

interface Tesela {
  slug: string;
  foco: string;
  escritorio?: Lugar;
  celular?: Lugar;
}

// Escritorio: los proyectos crecen hacia arriba y a la derecha (el más grande,
// arriba del todo). Celular: dos proyectos grandes junto a la corola.
const TESELAS: Tesela[] = [
  { slug: "arrayan-veterinaria", foco: "84% 60%", escritorio: { c: 9, r: -6, w: 6, h: 4 }, celular: { c: 4, r: -4, w: 6, h: 4 } },
  { slug: "ceiba-psicologia", foco: "88% 56%", escritorio: { c: 5, r: -6, w: 3, h: 4 } },
  { slug: "techverse", foco: "70% 86%", escritorio: { c: 10, r: -1, w: 5, h: 3 }, celular: { c: 4, r: 1, w: 6, h: 4 } },
  { slug: "movo", foco: "40% 58%", escritorio: { c: 5, r: -1, w: 4, h: 3 } },
  { slug: "floristeria-alheli", foco: "55% 92%", escritorio: { c: 5, r: 3, w: 3, h: 3 } },
  { slug: "reno-motriz", foco: "30% 40%", escritorio: { c: 9, r: 3, w: 4, h: 3 } },
];

// Píxeles sueltos del tamaño de los del logo, entre la corola y los proyectos.
const PIXELES: { escritorio?: [number, number]; celular?: [number, number]; lila: boolean }[] = [
  { escritorio: [4, -1], celular: [3, -1], lila: true },
  { escritorio: [3, -2], celular: [2, -2], lila: false },
  { escritorio: [4, -3], celular: [3, -3], lila: false },
  { escritorio: [8, -2], lila: true },
  { escritorio: [4, 1], lila: false },
  { escritorio: [9, 2], lila: false },
];

const pct = (valor: number, total: number) => `${((valor / total) * 100).toFixed(3)}%`;

// Variables CSS con la posición en cada composición.
const posicion = (esc?: Lugar, cel?: Lugar): CSSProperties => {
  const estilo: Record<string, string> = {};
  if (esc) {
    estilo["--x"] = pct(ORIGEN_X + esc.c * PASO, M_ESC.ancho);
    estilo["--y"] = pct(M_ESC.florY + esc.r * PASO, M_ESC.alto);
    estilo["--w"] = pct(esc.w * PASO - HUECO, M_ESC.ancho);
    estilo["--ar"] = `${esc.w * PASO - HUECO} / ${esc.h * PASO - HUECO}`;
  }
  if (cel) {
    estilo["--xm"] = pct(ORIGEN_X + cel.c * PASO, M_CEL.ancho);
    estilo["--ym"] = pct(M_CEL.florY + cel.r * PASO, M_CEL.alto);
    estilo["--wm"] = pct(cel.w * PASO - HUECO, M_CEL.ancho);
    estilo["--arm"] = `${cel.w * PASO - HUECO} / ${cel.h * PASO - HUECO}`;
  }
  return estilo as CSSProperties;
};

const clasesDe = (base: string, esc?: Lugar | [number, number], cel?: Lugar | [number, number]) =>
  [base, esc ? "" : "flor-no-escritorio", cel ? "" : "flor-no-celular"].filter(Boolean).join(" ");

const proyectoDe = (slug: string) =>
  PROYECTOS.find((p) => p.slug === slug) as ProyectoPortafolio;

const estiloEscena: CSSProperties = {
  ["--ancho" as string]: M_ESC.ancho,
  ["--alto" as string]: M_ESC.alto,
  ["--flor-x" as string]: "0%",
  ["--flor-y" as string]: pct(M_ESC.florY, M_ESC.alto),
  ["--flor-w" as string]: pct(ISO_ANCHO, M_ESC.ancho),
  ["--ancho-m" as string]: M_CEL.ancho,
  ["--alto-m" as string]: M_CEL.alto,
  ["--flor-y-m" as string]: pct(M_CEL.florY, M_CEL.alto),
  ["--flor-w-m" as string]: pct(ISO_ANCHO, M_CEL.ancho),
};

const HeroFlor = () => (
  <section id="hero" className="hero hero--flor" aria-labelledby="hero-titulo">
    <div className="flor-texto">
      <h1 id="hero-titulo" className="hero-titulo flor-titulo">
        Tu negocio ya creció en el barrio. Ahora, en internet.
      </h1>
      <p className="hero-texto flor-parrafo">
        Hacemos <ListaServicios /> para que te encuentre quien ya te está buscando en
        Medellín.
      </p>
      <AccionesHero />
    </div>

    <div className="flor-marco">
      <div className="flor-escena" style={estiloEscena}>
        <img
          className="flor-isotipo"
          src="/marca/isotipo-color.webp"
          width={ISO_ANCHO}
          height={ISO_ALTO}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
        />

        {PIXELES.map((p, i) => {
          const lugar = (x?: [number, number]) => (x ? { c: x[0], r: x[1], w: 1, h: 1 } : undefined);
          return (
            <span
              key={i}
              className={clasesDe(`flor-pixel${p.lila ? " flor-pixel--lila" : ""}`, p.escritorio, p.celular)}
              aria-hidden="true"
              style={{ ...posicion(lugar(p.escritorio), lugar(p.celular)), ["--orden" as string]: i }}
            />
          );
        })}

        <ul className="flor-teselas" aria-label="Algunos proyectos nuestros">
          {TESELAS.map((t, i) => {
            const proyecto = proyectoDe(t.slug);
            return (
              <li
                key={t.slug}
                className={clasesDe("flor-tesela", t.escritorio, t.celular)}
                style={{ ...posicion(t.escritorio, t.celular), ["--orden" as string]: i + 3 }}
              >
                <img
                  src={`/portafolio/${proyecto.imagen}-escritorio-640.webp`}
                  width={640}
                  height={400}
                  alt={proyecto.alt}
                  style={{ objectPosition: t.foco }}
                  decoding="async"
                />
                <span className="flor-tesela-nombre" aria-hidden="true">
                  {proyecto.nombre}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flor-nota" aria-hidden="true">
          <span>cada píxel es un proyecto real</span>
          <svg viewBox="0 0 90 60" className="trazo">
            <path d="M4 8 C 30 50, 62 50, 84 22" pathLength={1} />
            <path d="M70 20 L 85 20 L 84 36" pathLength={1} />
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default HeroFlor;
