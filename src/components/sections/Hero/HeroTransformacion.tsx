import { useCallback, useEffect, useRef, useState } from "react";
import { AccionesHero, ListaServicios } from "./HeroComun";

// Concepto B, "Del chat a la web": un mismo negocio (la demo de la
// veterinaria) visto hoy, con los chats sin responder y las citas anotadas en
// un cuaderno, y con su web. El corte entre los dos es una escalera de
// píxeles, como la flor del logo cuando se vuelve digital.
//
// En escritorio (desde 1280 px) el corte sigue al cursor (o se mueve con el
// teclado). En pantallas más angostas un corte vertical no deja leer ninguno de los dos lados:
// ahí hay un conmutador "Hoy / Con su web" y la escalera barre la escena
// entera al cambiar.

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

// Pocos chats y con letra grande: tienen que leerse.
const CHATS = [
  { quien: "Laura M.", texto: "Hola, ¿tienen cita mañana?", hora: "9:42 p. m.", sin: 2 },
  { quien: "Andrés", texto: "¿Cuánto vale la consulta?", hora: "9:51 p. m.", sin: 1 },
  { quien: "Caro", texto: "¿Hacen peluquería para gatos?", hora: "10:07 p. m.", sin: 3 },
  { quien: "Julián", texto: "Buenas???", hora: "11:02 p. m.", sin: 4 },
];

const VETERINARIA = "/portafolio/arrayan-veterinaria";

// Escritorio: el corte arranca a la mitad (así la web se ve desde el primer
// pintado) y hace un solo vaivén hacia el "antes" para mostrar que se mueve.
// (En pantallas de 1280 a 1439 descansa en 56 %, igual que en el CSS.)
const MITAD = 50;
const reposo = () => (window.matchMedia("(min-width: 1440px)").matches ? MITAD : 56);
// Conmutador: la escalera sale de la escena por un lado o por el otro.
const TODO_HOY = 118;
const TODO_WEB = -60;

type Vista = "hoy" | "web";

const conCursor = () => window.matchMedia("(min-width: 1280px)").matches;

const HeroTransformacion = () => {
  const escenarioRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLInputElement>(null);
  const tocado = useRef(false);
  const animacion = useRef(0);
  const [vista, setVista] = useState<Vista>("hoy");

  const mover = useCallback((porcentaje: number, limitar = true) => {
    const escenario = escenarioRef.current;
    if (!escenario) return;
    const valor = limitar ? Math.min(96, Math.max(4, porcentaje)) : porcentaje;
    escenario.style.setProperty("--corte", `${valor}%`);
    if (controlRef.current) controlRef.current.value = String(Math.round(valor));
  }, []);

  // Lleva el corte de un punto a otro con una curva suave.
  const recorrer = useCallback(
    (desde: number, hasta: number, duracion: number, limitar: boolean) => {
      cancelAnimationFrame(animacion.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        mover(hasta, limitar);
        return;
      }
      let inicio = 0;
      const paso = (t: number) => {
        if (!inicio) inicio = t;
        const avance = Math.min(1, (t - inicio) / duracion);
        const suave = avance < 0.5 ? 4 * avance ** 3 : 1 - Math.pow(-2 * avance + 2, 3) / 2;
        mover(desde + (hasta - desde) * suave, limitar);
        if (avance < 1) animacion.current = requestAnimationFrame(paso);
      };
      animacion.current = requestAnimationFrame(paso);
    },
    [mover],
  );

  const vistaActual = useRef<Vista>("hoy");
  const elegir = useCallback(
    (nueva: Vista, manual = true) => {
      if (manual) tocado.current = true;
      if (vistaActual.current === nueva) return;
      vistaActual.current = nueva;
      setVista(nueva);
      recorrer(
        nueva === "web" ? TODO_HOY : TODO_WEB,
        nueva === "web" ? TODO_WEB : TODO_HOY,
        850,
        false,
      );
    },
    [recorrer],
  );

  // Al cargar. Escritorio: vaivén del corte. Tableta y celular: se ve "Hoy"
  // un momento y la escalera pasa sola a "Con su web".
  useEffect(() => {
    let espera = 0;
    if (conCursor()) {
      espera = window.setTimeout(() => {
        if (tocado.current) return;
        const quieto = reposo();
        recorrer(quieto, quieto + 16, 700, true);
        espera = window.setTimeout(() => {
          if (!tocado.current) recorrer(quieto + 16, quieto, 900, true);
        }, 760);
      }, 500);
    } else {
      espera = window.setTimeout(() => {
        if (!tocado.current) elegir("web", false);
      }, 800);
    }
    return () => {
      window.clearTimeout(espera);
      cancelAnimationFrame(animacion.current);
    };
  }, [recorrer, elegir]);

  // Escritorio: el corte sigue al cursor dentro de la escena.
  useEffect(() => {
    const escenario = escenarioRef.current;
    if (!escenario) return;
    const alMover = (evento: PointerEvent) => {
      if (evento.pointerType !== "mouse" || !conCursor()) return;
      tocado.current = true;
      cancelAnimationFrame(animacion.current);
      const caja = escenario.getBoundingClientRect();
      mover(((evento.clientX - caja.left) / caja.width) * 100);
    };
    escenario.addEventListener("pointermove", alMover);
    return () => escenario.removeEventListener("pointermove", alMover);
  }, [mover]);

  return (
    <section id="hero" className="hero hero--cambio" aria-labelledby="hero-titulo">
      <div className="cambio-cabeza">
        <h1 id="hero-titulo" className="hero-titulo cambio-titulo">
          Del chat sin responder a la cita que se agenda sola.
        </h1>
        <div className="cambio-lado">
          <p className="hero-texto cambio-parrafo">
            <span className="cambio-parrafo-extra">
              Tu cliente ve horarios y precios, agenda o pide sin escribirte, y a ti te
              llega el aviso.{" "}
            </span>
            Hacemos <ListaServicios /> para negocios de Medellín.
          </p>
          <AccionesHero />
        </div>
      </div>

      <div className="cambio-conmutador" role="group" aria-label="Ver el negocio">
        <button
          type="button"
          aria-pressed={vista === "hoy"}
          onClick={() => elegir("hoy")}
        >
          Hoy
        </button>
        <button
          type="button"
          aria-pressed={vista === "web"}
          onClick={() => elegir("web")}
        >
          Con su web
        </button>
      </div>

      <div className="cambio-escenario" ref={escenarioRef} data-vista={vista}>
        {/* Después: la web de la demo de la veterinaria. */}
        <div className="cambio-despues">
          <div className="cambio-lamina cambio-lamina--celular">
            <img
              src={`${VETERINARIA}-celular-400.webp`}
              width={390}
              height={844}
              alt="La web de la misma veterinaria en el celular: agenda la cita en línea"
              decoding="async"
              fetchPriority="high"
            />
            <svg className="trazo trazo-tinta" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" style={{ left: "2%", top: "55%", width: "56%", height: "8.5%" }}>
              <path d="M52 3 C 20 2, 3 14, 4 30 C 5 48, 30 58, 56 57 C 82 56, 98 44, 97 28 C 96 12, 74 3, 44 6" pathLength={1} />
            </svg>
            <span className="cambio-nota-web" style={{ left: "60%", top: "57%" }}>
              se agenda sola
            </span>
          </div>
          <div className="cambio-lamina cambio-lamina--web">
            <img
              src={`${VETERINARIA}-escritorio-1080.webp`}
              srcSet={`${VETERINARIA}-escritorio-640.webp 640w, ${VETERINARIA}-escritorio-1080.webp 1080w, ${VETERINARIA}-escritorio-1600.webp 1600w`}
              sizes="(min-width: 1280px) 70vw, (min-width: 641px) 94vw, 1px"
              width={1440}
              height={900}
              alt="La misma veterinaria con su web: horas libres a la vista y la cita se agenda en línea"
              decoding="async"
            />
            <svg className="trazo trazo-tinta" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" style={{ left: "8%", top: "76%", width: "34%", height: "20%" }}>
              <path d="M52 3 C 20 2, 3 14, 4 30 C 5 48, 30 58, 56 57 C 82 56, 98 44, 97 28 C 96 12, 74 3, 44 6" pathLength={1} />
            </svg>
            <span className="cambio-nota-web" style={{ left: "43%", top: "86%" }}>
              se agenda sola
            </span>
          </div>
          <span className="cambio-etiqueta cambio-etiqueta--despues">Con su web</span>
        </div>

        {/* Antes: la bandeja de chats y el cuaderno de citas. */}
        <div className="cambio-antes" style={{ clipPath: RECORTE }} aria-hidden={vista === "web"}>
          <div className="cambio-chats">
            <div className="cambio-chats-cabeza">
              <span>Chats</span>
              <span className="cambio-sin-leer">10 sin responder</span>
            </div>
            <ul>
              {CHATS.map((chat) => (
                <li key={chat.quien}>
                  <span className="cambio-avatar" aria-hidden="true">
                    {chat.quien.charAt(0)}
                  </span>
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
            <p className="cambio-cuaderno-dia">Citas del martes</p>
            <ul>
              <li>
                <span>8:00</span> Toby, vacuna
              </li>
              <li>
                <span>8:30</span> <s>Luna</s> no vino
              </li>
              <li>
                <span>9:00</span> Laura ¿?
              </li>
              <li className="cambio-cuaderno-extra">
                <span>9:30</span> <s>Max</s>
              </li>
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
              <path d="M4 10 H60 M12 3 L4 10 L12 17 M52 3 L60 10 L52 17" pathLength={1} />
            </svg>
            mueve el cursor
          </span>
        </div>

        <input
          ref={controlRef}
          className="cambio-control"
          type="range"
          min={4}
          max={96}
          defaultValue={MITAD}
          aria-label="Comparar el negocio hoy y con su web"
          onChange={(evento) => {
            tocado.current = true;
            cancelAnimationFrame(animacion.current);
            mover(Number(evento.currentTarget.value));
          }}
        />
      </div>
    </section>
  );
};

export default HeroTransformacion;
