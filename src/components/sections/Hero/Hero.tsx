import { useEffect, useState } from "react";
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

// Marca a mano sobre un elemento de la captura. Las coordenadas son píxeles de
// la captura de escritorio (1440 x 900), medidos sobre la imagen: el SVG usa
// ese mismo lienzo y el mismo recorte que la foto (cubre y arranca arriba),
// así que el trazo queda encima del elemento en cualquier ancho.
interface Marca {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  nota: string;
}

interface Pieza {
  slug: string;
  formato: "escritorio" | "celular";
  que: string;
  // Color de la captura (arriba, medio, abajo) mientras carga: el marco nunca
  // se ve vacío.
  tono: [string, string, string];
  marca?: Marca;
}

// Orden pensado para alternar colores (menta, azul, negro, crema) y formatos.
// Cada celular se monta un poco sobre la pantalla anterior.
const PIEZAS: Pieza[] = [
  {
    slug: "arrayan-veterinaria",
    formato: "escritorio",
    que: "Agenda de citas",
    tono: ["#bfd0c6", "#c3d9cb", "#d0ddcd"],
    // Las horas libres para agendar (etiqueta y las cuatro horas).
    marca: { cx: 355, cy: 752, rx: 272, ry: 96, nota: "agenda en línea" },
  },
  { slug: "ceiba-psicologia", formato: "celular", que: "Consultorio", tono: ["#7d85d4", "#414ec4", "#626dd2"] },
  { slug: "techverse", formato: "escritorio", que: "Tienda con configurador", tono: ["#151313", "#696a69", "#444444"] },
  { slug: "piston-motoservicio", formato: "celular", que: "Taller de motos", tono: ["#5e6056", "#403c29", "#a78c25"] },
  {
    slug: "floristeria-alheli",
    formato: "escritorio",
    que: "Catálogo",
    tono: ["#d9d6d1", "#f0ede6", "#d7ccc0"],
    // El botón flotante de WhatsApp (1360-1415 x 820-875).
    marca: { cx: 1388, cy: 848, rx: 47, ry: 46, nota: "pedidos por WhatsApp" },
  },
  {
    slug: "movo",
    formato: "escritorio",
    que: "Software para talleres",
    tono: ["#ccdeea", "#cbdeeb", "#e7eff4"],
    // El panel: título "Dashboard" y los filtros del reporte.
    marca: { cx: 578, cy: 798, rx: 305, ry: 74, nota: "software a medida" },
  },
  { slug: "reno-motriz", formato: "escritorio", que: "Agenda del taller", tono: ["#cbcac9", "#fcfcfc", "#fdfdfd"] },
  { slug: "bunker-force", formato: "escritorio", que: "Tienda en línea", tono: ["#1d1d1c", "#2e3025", "#2f3027"] },
];

const proyectoDe = (slug: string) =>
  PROYECTOS.find((p) => p.slug === slug) as ProyectoPortafolio;

// Óvalo a mano: da una vuelta y un poco más, arrancando arriba a la izquierda,
// y el radio crece apenas al final, de modo que el remate pasa por fuera del
// comienzo en vez de cerrar exacto, como cuando se encierra algo con un
// marcador. Mismo pulso que el subrayado del titular.
const ovaloAMano = ({ cx, cy, rx, ry }: Marca) => {
  const pasos = 14;
  const inicio = (-115 * Math.PI) / 180;
  const vuelta = (372 * Math.PI) / 180;
  const puntos = Array.from({ length: pasos + 1 }, (_, i) => {
    const t = i / pasos;
    const a = inicio + vuelta * t;
    const k = 0.97 + 0.08 * t + 0.015 * Math.sin(t * 9);
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  });
  // Catmull-Rom a curvas de Bézier: trazo continuo que pasa por cada punto.
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(puntos[0][0])} ${f(puntos[0][1])}`;
  for (let i = 0; i < pasos; i++) {
    const p0 = puntos[Math.max(0, i - 1)];
    const p1 = puntos[i];
    const p2 = puntos[i + 1];
    const p3 = puntos[Math.min(pasos, i + 2)];
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}, ${f(
      p2[0] - (p3[0] - p1[0]) / 6,
    )} ${f(p2[1] - (p3[1] - p1[1]) / 6)}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
};

// Qué archivo baja cada pieza. En celular se declara menos ancho del real a
// propósito: con 266 px un teléfono de 3x baja la de 800 (no la de 1080) y uno
// de 2x la de 640. En una cinta que se mueve no se nota y pesa la mitad.
const SIZES_ESCRITORIO = "(max-width: 640px) 266px, (max-width: 900px) min(50vh, 544px), min(45vh, 496px)";
const SIZES_CELULAR = "(max-width: 640px) 140px, (max-width: 900px) 170px, 160px";

// Las dos últimas (Reno y Bunker) no se ven al abrir en ningún ancho: se
// piden cuando la página terminó de cargar, para que no le quiten ancho de
// banda a las primeras. Mientras tanto el marco muestra su color.
const PIEZAS_AL_ABRIR = 6;

const Captura = ({
  pieza,
  orden,
  copia,
  resto,
}: {
  pieza: Pieza;
  orden: number;
  copia: boolean;
  resto: boolean;
}) => {
  const proyecto = proyectoDe(pieza.slug);
  const base = `/portafolio/${proyecto.imagen}`;
  const esCelular = pieza.formato === "celular";
  const { marca } = pieza;
  // Nada de loading="lazy": la cinta se mueve con transform dentro de un
  // recorte y el navegador pedía las diferidas cuando ya estaban entrando, así
  // que se veían vacías un rato. La primera va con prioridad alta (es el LCP
  // en el celular); el resto, baja, para no quitarle ancho de banda. Con
  // alta en las tres primeras el LCP de Lighthouse empeoraba ~250 ms. La
  // copia de la vuelta usa las mismas URL y sale de la caché.
  const prioridad = !copia && orden === 0 ? "high" : "low";
  const conImagen = orden < PIEZAS_AL_ABRIR || resto;
  return (
    // Nombres de clase completos: PurgeCSS borra los que se arman por partes.
    <figure className={esCelular ? "vitrina-pieza vitrina-pieza--celular" : "vitrina-pieza vitrina-pieza--escritorio"}>
      <div className="vitrina-lienzo">
        <div
          className="vitrina-marco"
          style={{ background: `linear-gradient(${pieza.tono[0]}, ${pieza.tono[1]} 45%, ${pieza.tono[2]})` }}
        >
          {conImagen && (
            <img
              src={esCelular ? `${base}-celular-200.webp` : `${base}-escritorio-640.webp`}
              srcSet={
                esCelular
                  ? `${base}-celular-200.webp 200w, ${base}-celular-400.webp 400w`
                  : `${base}-escritorio-640.webp 640w, ${base}-escritorio-800.webp 800w, ${base}-escritorio-1080.webp 1080w`
              }
              sizes={esCelular ? SIZES_CELULAR : SIZES_ESCRITORIO}
              width={esCelular ? 390 : 1440}
              height={esCelular ? 844 : 900}
              alt={copia ? "" : proyecto.alt}
              fetchPriority={prioridad}
              decoding="async"
            />
          )}
        </div>
        {marca && (
          <svg
            className="trazo vitrina-marca"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMin slice"
            aria-hidden="true"
          >
            <path d={ovaloAMano(marca)} pathLength={1} />
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

const Hero = () => {
  const [resto, setResto] = useState(false);
  useEffect(() => {
    const cargar = () => setResto(true);
    if (document.readyState === "complete") cargar();
    else window.addEventListener("load", cargar, { once: true });
    return () => window.removeEventListener("load", cargar);
  }, []);

  return (
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
              <Captura key={pieza.slug} pieza={pieza} orden={i} copia={false} resto={resto} />
            ))}
          </div>
          <div className="vitrina-tramo" aria-hidden="true">
            {PIEZAS.map((pieza, i) => (
              <Captura key={pieza.slug} pieza={pieza} orden={i} copia resto={resto} />
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
          contestes.{" "}
          {/* En el celular el párrafo queda en esta primera frase; los servicios
              siguen en el HTML (mismo texto para Google en todos los anchos) y
              enlazados también desde la sección de servicios. */}
          <span className="vitrina-texto-servicios">
            Hacemos <ListaServicios /> para negocios de Medellín.
          </span>
        </p>
        <AccionesHero />
      </div>
    </section>
  );
};

export default Hero;
