import { useEffect, useRef } from "react";
import { PROYECTOS, ProyectoPortafolio } from "../../../data/portafolio";
import { AccionesHero, QueHacemos } from "./HeroComun";

// Concepto C, "La flor": el isotipo de la marca dibujado grande, y los píxeles
// en que se deshace la flor siguen subiendo hasta convertirse en proyectos
// reales. Es el logo contando lo que hace la empresa: algo que crece y se
// vuelve digital.

// La escena mide 700 x 700 unidades; todo se posiciona en porcentaje de ella.
const ESCENA = 700;
// La flor (el isotipo mide 348 x 527) va con la esquina en este punto; el
// tallo se sale por abajo.
const FLOR_X = 40;
const FLOR_Y = 300;

// Los proyectos siguen la misma retícula de los píxeles del logo (paso de 40,
// cuadro de 36), medidos desde la esquina de la flor. Un proyecto ocupa 2x2,
// 3x3 o 4x4 cuadros: la flor se deshace en píxeles cada vez más grandes.
const PASO = 40;
const cuadros = (n: number) => n * PASO - 4;

interface Tesela {
  slug: string;
  col: number;
  fila: number;
  n: number;
  // Qué parte de la captura se ve en el cuadro.
  foco: string;
}

const TESELAS: Tesela[] = [
  { slug: "floristeria-alheli", col: 312, fila: -80, n: 2, foco: "56% 90%" },
  { slug: "movo", col: 232, fila: -160, n: 2, foco: "40% 60%" },
  { slug: "ceiba-psicologia", col: 392, fila: -200, n: 3, foco: "90% 60%" },
  { slug: "arrayan-veterinaria", col: 512, fila: -80, n: 4, foco: "82% 62%" },
  { slug: "piston-motoservicio", col: 432, fila: -280, n: 2, foco: "16% 64%" },
  { slug: "techverse", col: 632, fila: -240, n: 3, foco: "72% 88%" },
  { slug: "reno-motriz", col: 432, fila: 40, n: 2, foco: "28% 42%" },
  { slug: "bunker-force", col: 192, fila: -240, n: 2, foco: "92% 70%" },
];

// Píxeles sueltos del tamaño de los del logo, entre la flor y los proyectos.
const PIXELES_SUELTOS = [
  { col: 352, fila: -120 },
  { col: 472, fila: -40 },
  { col: 552, fila: -160 },
  { col: 312, fila: -200 },
];

const pct = (valor: number) => `${(valor / ESCENA) * 100}%`;
const proyectoDe = (slug: string) =>
  PROYECTOS.find((p) => p.slug === slug) as ProyectoPortafolio;

// El isotipo, redibujado en vector a partir del PNG del manual (348 x 527):
// hoja superior, capullo lila recortado en damero y los píxeles que suben.
const Isotipo = () => (
  <svg
    className="flor-isotipo"
    viewBox="0 0 348 527"
    aria-hidden="true"
    style={{
      left: pct(FLOR_X),
      top: pct(FLOR_Y),
      width: pct(348),
    }}
  >
    <defs>
      <clipPath id="flor-capullo">
        {/* Todo menos el cuadrante que se deshace en píxeles, y los tres
            cuadros del damero que siguen siendo capullo. */}
        <path d="M0 200 H188 V0 H0 Z" />
        <path d="M0 200 H348 V527 H0 Z" />
        <rect x="188" y="160" width="44" height="40" />
        <rect x="232" y="120" width="36" height="40" />
        <rect x="272" y="160" width="40" height="40" />
      </clipPath>
    </defs>
    <circle cx="202" cy="228" r="106" className="flor-lila" clipPath="url(#flor-capullo)" />
    <rect x="312" y="120" width="36" height="36" className="flor-lila" />
    <rect x="272" y="160" width="36" height="36" className="flor-lila" />
    <rect x="232" y="120" width="36" height="36" className="flor-lila" />
    <rect x="272" y="0" width="36" height="36" className="flor-bruma" />
    <rect x="232" y="40" width="36" height="36" className="flor-bruma" />
    <rect x="312" y="40" width="36" height="36" className="flor-bruma" />
    <rect x="192" y="80" width="36" height="36" className="flor-bruma" />
    <rect x="272" y="80" width="36" height="36" className="flor-bruma" />
    <path className="flor-bruma" d="M36 158 C 120 168, 182 236, 186 324 C 108 318, 42 262, 36 158 Z" />
    <path className="flor-bruma" d="M4 328 C 92 330, 166 384, 182 466 C 98 470, 18 422, 4 328 Z" />
    <path className="flor-bruma" d="M344 328 C 256 330, 182 384, 166 466 C 250 470, 330 422, 344 328 Z" />
    <rect x="160" y="318" width="28" height="209" className="flor-bruma" />
  </svg>
);

const HeroFlor = () => {
  const escenaRef = useRef<HTMLDivElement>(null);

  // Con mouse, los proyectos se corren unos píxeles según la profundidad
  // (los grandes, más), como si estuvieran por delante de la flor.
  useEffect(() => {
    const escena = escenaRef.current;
    if (!escena) return;
    const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!conMouse || sinMovimiento) return;

    let cuadro = 0;
    const alMover = (evento: PointerEvent) => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const x = evento.clientX / window.innerWidth - 0.5;
        const y = evento.clientY / window.innerHeight - 0.5;
        escena.style.setProperty("--mx", x.toFixed(3));
        escena.style.setProperty("--my", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <section id="hero" className="hero hero--flor" aria-labelledby="hero-titulo">
      <div className="flor-texto">
        <h1 id="hero-titulo" className="hero-titulo flor-titulo">
          Hacemos crecer negocios de Medellín en internet.
        </h1>
        <QueHacemos className="hero-texto flor-parrafo">
          <span className="solo-escritorio">
            Empieza con un diagnóstico gratuito: te decimos qué te conviene y qué no.
          </span>
        </QueHacemos>
        <AccionesHero />
      </div>

      <div className="flor-marco">
        <div className="flor-escena" ref={escenaRef}>
          <Isotipo />

          {PIXELES_SUELTOS.map((p, i) => (
            <span
              key={i}
              className="flor-pixel"
              aria-hidden="true"
              style={{
                left: pct(FLOR_X + p.col),
                top: pct(FLOR_Y + p.fila),
                width: pct(cuadros(1)),
                ["--orden" as string]: i,
              }}
            />
          ))}

          <ul className="flor-teselas" aria-label="Algunos proyectos nuestros">
            {TESELAS.map((t, i) => {
              const proyecto = proyectoDe(t.slug);
              const base = `/portafolio/${proyecto.imagen}`;
              return (
                <li
                  key={t.slug}
                  className="flor-tesela"
                  style={{
                    left: pct(FLOR_X + t.col),
                    top: pct(FLOR_Y + t.fila),
                    width: pct(cuadros(t.n)),
                    ["--orden" as string]: i + 2,
                    ["--hondo" as string]: (t.n / 4).toFixed(2),
                  }}
                >
                  <img
                    src={`${base}-escritorio-640.webp`}
                    width={640}
                    height={400}
                    alt={proyecto.alt}
                    style={{ objectPosition: t.foco }}
                    loading={t.n > 2 ? "eager" : "lazy"}
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
              <path d="M4 8 C 30 50, 62 50, 84 22" />
              <path d="M70 20 L 85 20 L 84 36" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFlor;
