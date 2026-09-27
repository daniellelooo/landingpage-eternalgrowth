import { useCallback, useEffect, useRef } from "react";
import { AccionesHero, QueHacemos } from "./HeroComun";

// Concepto B, "Del chat a la web": un mismo negocio (la demo de la
// veterinaria) visto hoy, atendiendo por chat y anotando citas en un
// cuaderno, y con su web. El corte entre los dos no es una línea: es una
// escalera de píxeles, como la flor del logo cuando se vuelve digital. Se
// mueve con el cursor, arrastrando en el celular o con el teclado.

// Tamaño del píxel del corte y cuánto se sale cada fila (en píxeles).
const PIXEL = 26;
const SALTOS = [0, 1, 0, -1, 1, 2, 1, 0, -1, 0, 1, 0, 2, 1, -1, 0, 1, 0, 0, 1, -1, 0, 2, 1, 0, -1, 1, 0, 1, 2, 0, -1, 0, 1, 0, 1, -1, 0, 1, 0, 2, 1, 0, 1, -1, 0];

// El recorte del "antes": todo lo que queda a la izquierda de la escalera.
// Usa var(--corte), así mover el corte no vuelve a dibujar React.
const RECORTE = (() => {
  const puntos = ["0 0"];
  SALTOS.forEach((salto, fila) => {
    const x = `calc(var(--corte) + ${salto * PIXEL}px)`;
    puntos.push(`${x} ${fila * PIXEL}px`, `${x} ${(fila + 1) * PIXEL}px`);
  });
  puntos.push(`0 ${SALTOS.length * PIXEL}px`);
  return `polygon(${puntos.join(", ")})`;
})();

// El mismo borde, trazado en neón.
const BORDE = (() => {
  const origen = 3 * PIXEL;
  let d = "";
  SALTOS.forEach((salto, fila) => {
    const x = origen + salto * PIXEL;
    d += `${fila === 0 ? "M" : "L"}${x} ${fila * PIXEL} L${x} ${(fila + 1) * PIXEL} `;
  });
  return d.trim();
})();

// Píxeles que se desprenden del corte hacia el lado de la web.
const DESPRENDIDOS = [
  { dx: 2, fila: 3 },
  { dx: 3, fila: 8 },
  { dx: 2, fila: 12 },
  { dx: 3, fila: 18 },
];

const CHATS = [
  { quien: "Laura M.", texto: "Hola, ¿tienen cita mañana en la mañana?", hora: "9:42 p. m.", sin: 2 },
  { quien: "Andrés", texto: "¿Cuánto vale la consulta general?", hora: "9:51 p. m.", sin: 1 },
  { quien: "Caro", texto: "¿Hacen peluquería para gatos?", hora: "10:07 p. m.", sin: 3 },
  { quien: "+57 312 ···", texto: "¿Siguen abiertos? Es urgente", hora: "10:30 p. m.", sin: 1 },
  { quien: "Julián", texto: "Buenas???", hora: "11:02 p. m.", sin: 4 },
  { quien: "Mónica", texto: "¿Me pueden mover la cita del jueves?", hora: "ayer", sin: 2 },
];

const CUADERNO = [
  { hora: "8:00", texto: "Toby, vacuna", tachado: false },
  { hora: "8:30", texto: "Luna — ¿confirmó?", tachado: true },
  { hora: "9:00", texto: "llamar a la señora del gato", tachado: false },
  { hora: "9:30", texto: "Max, control", tachado: true },
  { hora: "10:00", texto: "¿? (quedó de escribir)", tachado: false },
];

const VETERINARIA = "/portafolio/arrayan-veterinaria";
const INICIO = 90;
// En escritorio la web ocupa el 60 % derecho de la escena: el corte se queda
// justo donde empieza, para que se vea entera.
const destino = () => (window.matchMedia("(max-width: 900px)").matches ? 50 : 40);

const HeroTransformacion = () => {
  const escenarioRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLInputElement>(null);
  const tocado = useRef(false);

  const mover = useCallback((porcentaje: number) => {
    const escenario = escenarioRef.current;
    if (!escenario) return;
    const valor = Math.min(96, Math.max(4, porcentaje));
    escenario.style.setProperty("--corte", `${valor}%`);
    if (controlRef.current) controlRef.current.value = String(Math.round(valor));
  }, []);

  // Al cargar, el corte recorre la escena una vez y deja ver la web.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mover(destino());
      return;
    }
    let cuadro = 0;
    let inicio = 0;
    const duracion = 1500;
    const final = destino();
    const paso = (t: number) => {
      if (tocado.current) return;
      if (!inicio) inicio = t;
      const avance = Math.min(1, (t - inicio) / duracion);
      const suave = 1 - Math.pow(1 - avance, 3);
      mover(INICIO + (final - INICIO) * suave);
      if (avance < 1) cuadro = requestAnimationFrame(paso);
    };
    const espera = window.setTimeout(() => {
      cuadro = requestAnimationFrame(paso);
    }, 500);
    return () => {
      window.clearTimeout(espera);
      cancelAnimationFrame(cuadro);
    };
  }, [mover]);

  // Con mouse el corte sigue al cursor; con el dedo, se arrastra.
  useEffect(() => {
    const escenario = escenarioRef.current;
    if (!escenario) return;
    let arrastrando = false;
    const aPorcentaje = (evento: PointerEvent) => {
      const caja = escenario.getBoundingClientRect();
      return ((evento.clientX - caja.left) / caja.width) * 100;
    };
    const alMover = (evento: PointerEvent) => {
      if (evento.pointerType === "mouse" || arrastrando) {
        tocado.current = true;
        mover(aPorcentaje(evento));
      }
    };
    const alBajar = (evento: PointerEvent) => {
      if (evento.pointerType === "mouse") return;
      arrastrando = true;
      tocado.current = true;
      mover(aPorcentaje(evento));
    };
    const alSoltar = () => {
      arrastrando = false;
    };
    escenario.addEventListener("pointermove", alMover);
    escenario.addEventListener("pointerdown", alBajar);
    window.addEventListener("pointerup", alSoltar);
    window.addEventListener("pointercancel", alSoltar);
    return () => {
      escenario.removeEventListener("pointermove", alMover);
      escenario.removeEventListener("pointerdown", alBajar);
      window.removeEventListener("pointerup", alSoltar);
      window.removeEventListener("pointercancel", alSoltar);
    };
  }, [mover]);

  return (
    <section id="hero" className="hero hero--cambio" aria-labelledby="hero-titulo">
      <div className="cambio-cabeza">
        <h1 id="hero-titulo" className="hero-titulo cambio-titulo">
          Llevamos tu negocio del chat a internet.
        </h1>
        <div className="cambio-lado">
          <QueHacemos className="hero-texto cambio-parrafo" />
          <AccionesHero />
        </div>
      </div>

      <div
        className="cambio-escenario"
        ref={escenarioRef}
        style={{ ["--corte" as string]: `${INICIO}%` }}
      >
        {/* Después: la web de la demo de la veterinaria. */}
        <div className="cambio-despues">
          <img
            className="cambio-celular"
            src={`${VETERINARIA}-celular-400.webp`}
            width={390}
            height={844}
            alt="La web de la misma veterinaria en el celular"
            decoding="async"
          />
          <img
            className="cambio-web"
            src={`${VETERINARIA}-escritorio-1080.webp`}
            srcSet={`${VETERINARIA}-escritorio-640.webp 640w, ${VETERINARIA}-escritorio-1080.webp 1080w, ${VETERINARIA}-escritorio-1600.webp 1600w`}
            sizes="(min-width: 901px) 60vw, (min-width: 641px) 94vw, 1px"
            width={1440}
            height={900}
            alt="La misma veterinaria con su web: horas libres a la vista y la cita se agenda en línea"
            decoding="async"
          />
          <span className="cambio-etiqueta cambio-etiqueta--despues">Con su web</span>
        </div>

        {/* Antes: la bandeja de chats y el cuaderno de citas. */}
        <div className="cambio-antes" style={{ clipPath: RECORTE }} aria-hidden="true">
          <div className="cambio-chats">
            <div className="cambio-chats-cabeza">
              <span>Chats</span>
              <span className="cambio-sin-leer">13 sin leer</span>
            </div>
            <ul>
              {CHATS.map((chat) => (
                <li key={chat.quien}>
                  <span className="cambio-avatar">{chat.quien.charAt(0) === "+" ? "#" : chat.quien.charAt(0)}</span>
                  <span className="cambio-chat-texto">
                    <b>{chat.quien}</b>
                    <span>{chat.texto}</span>
                  </span>
                  <span className="cambio-chat-meta">
                    <span>{chat.hora}</span>
                    <span className="cambio-contador">{chat.sin}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cambio-cuaderno">
            <p className="cambio-cuaderno-dia">Martes</p>
            <ul>
              {CUADERNO.map((linea) => (
                <li key={linea.hora} className={linea.tachado ? "tachado" : undefined}>
                  <span>{linea.hora}</span> {linea.texto}
                </li>
              ))}
            </ul>
          </div>
          <span className="cambio-etiqueta cambio-etiqueta--antes">Hoy</span>
        </div>

        <div className="cambio-borde" aria-hidden="true">
          <svg width={PIXEL * 8} height={SALTOS.length * PIXEL}>
            <path d={BORDE} />
          </svg>
          {DESPRENDIDOS.map((p, i) => (
            <span
              key={i}
              className="cambio-suelto"
              style={{ left: `${(3 + p.dx) * PIXEL}px`, top: `${p.fila * PIXEL}px` }}
            />
          ))}
          <span className="cambio-pista">
            <svg viewBox="0 0 64 20" className="trazo">
              <path d="M4 10 H60 M12 3 L4 10 L12 17 M52 3 L60 10 L52 17" />
            </svg>
            <span className="cambio-pista-tactil">desliza</span>
            <span className="cambio-pista-mouse">mueve el cursor</span>
          </span>
        </div>

        <input
          ref={controlRef}
          className="cambio-control"
          type="range"
          min={4}
          max={96}
          defaultValue={INICIO}
          aria-label="Comparar el negocio hoy y con su web"
          onChange={(evento) => {
            tocado.current = true;
            mover(Number(evento.currentTarget.value));
          }}
        />
      </div>
    </section>
  );
};

export default HeroTransformacion;
