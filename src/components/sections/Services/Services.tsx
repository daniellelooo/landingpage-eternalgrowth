import { Fragment, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { scrollToSection } from "../../../utils/helpers";

interface ServicioIndice {
  nombre: string;
  lema: string;
  incluye: string[];
  href: string;
}

// Índice en vez de tarjetas: a la izquierda los servicios, a la derecha el
// detalle del que está elegido. En celular se vuelve acordeón con el mismo HTML.
// Todo el detalle va en el HTML aunque no se vea, para que Google lo lea, y cada
// servicio enlaza a su página propia.
const SERVICIOS: ServicioIndice[] = [
  {
    nombre: "Desarrollo web",
    lema: "Tu negocio merece más que una página bonita.",
    incluye: [
      "Landing pages de alto impacto",
      "Webs de varias páginas con catálogo de productos o servicios",
      "Tienda en línea con pedido por WhatsApp o pasarela de pago",
      "SEO técnico básico incluido en todo desarrollo",
    ],
    href: "/servicios/desarrollo-web-medellin",
  },
  {
    nombre: "Automatización de procesos",
    lema: "Tu negocio abierto 24/7 sin contratar a nadie.",
    incluye: [
      "Flujos con n8n entre tus herramientas: WhatsApp, correo, hojas de cálculo, CRM",
      "Confirmación y recordatorio de citas o reservas",
      "Seguimiento a clientes que no han vuelto",
      "Aviso inmediato cuando entra un cliente potencial",
    ],
    href: "/servicios/automatizacion-procesos-medellin",
  },
  {
    nombre: "WhatsApp automatizado",
    lema: "Responde lo de siempre sin estar pegado al celular.",
    incluye: [
      "Respuestas a lo que más te preguntan: precios, horarios, domicilios",
      "Paso a una persona cuando la conversación lo necesita",
      "Agendamiento y recordatorio de citas",
      "Seguimiento a quien cotizó y no respondió",
    ],
    href: "/servicios/chatbot-whatsapp-medellin",
  },
  {
    nombre: "Marketing digital",
    lema: "Que te encuentren cuando están listos para comprar.",
    incluye: [
      "Google Business optimizado y activo",
      "Campañas de Meta Ads segmentadas por zona y tipo de cliente",
      "Plan de contenido mensual para redes sociales",
      "Correos automáticos para quien ya te compró",
    ],
    href: "/servicios/marketing-digital-medellin",
  },
  {
    nombre: "Consultoría y diagnóstico",
    lema: "Primero entendemos tu negocio, luego actuamos.",
    incluye: [
      "Diagnóstico digital gratuito de 30 minutos",
      "Análisis de cómo te encuentran hoy en internet",
      "Hoja de ruta de 3 a 6 meses con prioridades y costos",
      "Acompañamiento mensual con el equipo",
    ],
    href: "/servicios/transformacion-digital-medellin",
  },
];

// Pasar el mouse cambia el servicio solo si la persona lo movió de verdad y se
// quedó un momento. Sin esto, al hacer scroll con el cursor encima de la lista
// el detalle iba cambiando solo, servicio por servicio.
const ESPERA_INTENCION_MS = 120;

const Services = () => {
  const [activo, setActivo] = useState(0);
  const intencion = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const alMoverSobre = (i: number) => (evento: PointerEvent) => {
    if (evento.pointerType !== "mouse") return;
    if (evento.movementX === 0 && evento.movementY === 0) return;
    clearTimeout(intencion.current);
    intencion.current = setTimeout(() => setActivo(i), ESPERA_INTENCION_MS);
  };

  const cancelarIntencion = () => clearTimeout(intencion.current);

  return (
    <section id="servicios" className="services-section indice-seccion">
      <div className="indice-contenedor">
        <header className="indice-cabecera">
          <h2 className="indice-titulo">Nuestros servicios</h2>
          <p className="indice-bajada">
            Desarrollo, automatización y marketing conectados entre sí, para que
            tu negocio crezca sin depender de ti las 24 horas.
          </p>
        </header>

        <div className="indice">
          {SERVICIOS.map((servicio, i) => {
            const abierto = activo === i;
            return (
              <Fragment key={servicio.nombre}>
                <button
                  type="button"
                  id={`servicio-${i}`}
                  className="indice-nombre"
                  style={{ "--fila": i + 1 } as CSSProperties}
                  aria-expanded={abierto}
                  aria-controls={`servicio-detalle-${i}`}
                  onClick={() => {
                    cancelarIntencion();
                    setActivo(i);
                  }}
                  onPointerMove={alMoverSobre(i)}
                  onPointerLeave={cancelarIntencion}
                >
                  <span className="indice-pixeles" aria-hidden="true">
                    <span className="pixel" />
                    <span className="pixel" />
                    <span className="pixel" />
                  </span>
                  <span className="indice-nombre-texto">{servicio.nombre}</span>
                </button>

                <div
                  id={`servicio-detalle-${i}`}
                  role="region"
                  aria-labelledby={`servicio-${i}`}
                  className="indice-detalle"
                  data-abierto={abierto}
                >
                  <p className="indice-lema">{servicio.lema}</p>
                  <ul className="indice-incluye">
                    {servicio.incluye.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="indice-enlace"
                    href={servicio.href}
                    aria-label={`Ver más sobre ${servicio.nombre}`}
                  >
                    Ver más
                  </a>
                </div>
              </Fragment>
            );
          })}
        </div>

        <div className="section-cta indice-cta">
          <button
            className="hero-cta-primary"
            onClick={() => scrollToSection("contacto")}
          >
            Agenda tu diagnóstico gratuito
          </button>
          <p className="section-cta-note">
            Te respondemos en menos de 24 horas hábiles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
