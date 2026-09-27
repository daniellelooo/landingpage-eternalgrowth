// Los proyectos del portafolio. De aquí salen la página /portafolio, el bloque
// de la home, los datos estructurados y la fecha del sitemap.
//
// Para agregar un proyecto:
// 1. Capturas: `node scripts/capturar-portafolio.mjs <slug> <url>` (ver el
//    encabezado del script). Deja los WebP en public/portafolio/.
// 2. Agregar el objeto en PROYECTOS, en el grupo que corresponda.
// 3. Cambiar PORTAFOLIO_ACTUALIZADO a la fecha del cambio: es el `lastmod` que
//    ve Google en el sitemap, así que tiene que ser verdad.
//
// Reglas del texto: `resultado` cuenta qué gana el negocio con la web, sin
// cifras que no se puedan demostrar. Las demos tienen que decir que son demos.

export const PORTAFOLIO_PATH = "/portafolio";

// Última vez que cambió el contenido de la página (formato AAAA-MM-DD).
export const PORTAFOLIO_ACTUALIZADO = "2026-09-26";

export type GrupoPortafolio = "produccion" | "demo";

export interface ProyectoPortafolio {
  slug: string;
  nombre: string;
  // Qué es el negocio, dicho como lo diría el dueño.
  sector: string;
  ciudad: string;
  // Qué tipo de web es.
  tipo: string;
  // Lo que el negocio consigue con la web. Sin cifras inventadas.
  resultado: string;
  url: string;
  grupo: GrupoPortafolio;
  etiquetas: string[];
  // Base de los archivos en public/portafolio/: <imagen>-escritorio-<ancho>.webp
  // y <imagen>-celular-<ancho>.webp. Normalmente igual al slug.
  imagen: string;
  // Texto alternativo de la captura de escritorio.
  alt: string;
}

export const GRUPOS_PORTAFOLIO: Record<
  GrupoPortafolio,
  { titulo: string; descripcion: string }
> = {
  produccion: {
    titulo: "Proyectos en producción",
    descripcion:
      "Webs que desarrollamos para negocios reales y que hoy están en línea, atendiendo a sus clientes.",
  },
  demo: {
    titulo: "Demos por sector",
    descripcion:
      "Negocios de demostración que armamos para mostrar cómo quedaría una web en cada sector. El nombre, los datos y las reseñas son ficticios; el funcionamiento es el que tendría la tuya.",
  },
};

export const PROYECTOS: ProyectoPortafolio[] = [
  {
    slug: "reno-motriz",
    nombre: "Reno Motriz",
    sector: "Taller de latonería y pintura",
    ciudad: "Medellín",
    tipo: "Sitio web con agenda de citas",
    resultado:
      "Sus clientes agendan en línea la cita de valoración o de ingreso del vehículo sobre los horarios que el taller tiene realmente libres, sin tener que llamar. La web está hecha para aparecer cuando alguien busca latonería y pintura en Medellín.",
    url: "https://www.renomotriz.com",
    grupo: "produccion",
    etiquetas: ["Agenda en línea", "SEO local", "Diseño a la medida"],
    imagen: "reno-motriz",
    alt: "Página de inicio de Reno Motriz, taller de latonería y pintura en Medellín, con el botón para agendar la cita de valoración",
  },
  {
    slug: "techverse",
    nombre: "Techverse",
    sector: "Tienda de tecnología en el C.C. Monterrey",
    ciudad: "Medellín",
    tipo: "Catálogo con configurador de PC",
    resultado:
      "El cliente arma su PC pieza por pieza con la compatibilidad revisada, o elige uno ya armado, y la cotización le llega a la tienda por WhatsApp con su nombre y su celular. La tienda sube productos y ve las cotizaciones desde su propio panel.",
    url: "https://techversemed.com",
    grupo: "produccion",
    etiquetas: ["Configurador de PC", "Cotización por WhatsApp", "Panel de administración"],
    imagen: "techverse",
    alt: "Página de inicio de Techverse con el lema Arma tu PC o llévalo listo y un equipo armado destacado",
  },
  {
    slug: "bunker-force",
    nombre: "Bunker Force",
    sector: "Ropa y equipo táctico",
    ciudad: "Bello",
    tipo: "Tienda en línea",
    resultado:
      "La tienda vende fuera del local: catálogo por categorías, carrito de compras y aviso por correo de cada pedido nuevo para despacharlo a tiempo.",
    url: "https://bunkerforcebello.com",
    grupo: "produccion",
    etiquetas: ["Tienda en línea", "Carrito de compras", "Avisos por correo"],
    imagen: "bunker-force",
    alt: "Página de inicio de Bunker Force Bello con el titular Reforzado para el campo, diseñado para la ciudad",
  },
  {
    slug: "floristeria-alheli",
    nombre: "Floristería Alhelí",
    sector: "Floristería",
    ciudad: "Medellín",
    tipo: "Catálogo con pedidos por WhatsApp",
    resultado:
      "Catálogo de ramos, arreglos y plantas con precio, donde el cliente elige y el pedido le llega a la floristería por WhatsApp, listo para confirmar la entrega.",
    url: "https://demo-floristeria.eternalgrowth.xyz",
    grupo: "demo",
    etiquetas: ["Catálogo", "Pedidos por WhatsApp"],
    imagen: "floristeria-alheli",
    alt: "Demo de la floristería Alhelí con el titular Ramos del día, armados a mano en Laureles y fotos de ramos",
  },
  {
    slug: "arrayan-veterinaria",
    nombre: "Arrayán Veterinaria",
    sector: "Veterinaria",
    ciudad: "Medellín",
    tipo: "Agenda de citas en línea",
    resultado:
      "El cliente ve las horas libres, agenda la cita en un minuto y recibe la confirmación por correo y un recordatorio un día y dos horas antes, para que no se pierdan turnos.",
    url: "https://demo-veterinaria.eternalgrowth.xyz",
    grupo: "demo",
    etiquetas: ["Agenda en línea", "Recordatorios"],
    imagen: "arrayan-veterinaria",
    alt: "Demo de Arrayán Veterinaria con el titular Cuidamos a tu perro o gato como en casa y las próximas horas libres",
  },
  {
    slug: "ceiba-psicologia",
    nombre: "Ceiba Psicología",
    sector: "Consultorio de psicología",
    ciudad: "Medellín",
    tipo: "Página informativa",
    resultado:
      "Servicios, precios desde, equipo, ubicación y preguntas frecuentes en una sola página, con la primera cita a un toque por WhatsApp. Pensada para que el consultorio aparezca en las búsquedas de su barrio.",
    url: "https://demo-consultorio.eternalgrowth.xyz",
    grupo: "demo",
    etiquetas: ["Página informativa", "SEO local"],
    imagen: "ceiba-psicologia",
    alt: "Demo de Ceiba Psicología con el titular Hablar ayuda y la foto de un psicólogo sobre fondo azul",
  },
];

export const getProyectosPorGrupo = (grupo: GrupoPortafolio) =>
  PROYECTOS.filter((proyecto) => proyecto.grupo === grupo);

// Los que salen en la home: los tres primeros en producción.
export const PROYECTOS_DESTACADOS = getProyectosPorGrupo("produccion").slice(0, 3);

// Dominio legible para la barra del navegador del mockup.
export const dominioDe = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

const RUTA_IMAGENES = "/portafolio";

export const imagenesDe = (proyecto: ProyectoPortafolio) => {
  const base = `${RUTA_IMAGENES}/${proyecto.imagen}`;
  return {
    escritorio: {
      src: `${base}-escritorio-1080.webp`,
      srcSet: [640, 1080, 1600].map((w) => `${base}-escritorio-${w}.webp ${w}w`).join(", "),
      // Para la imagen social y los datos estructurados.
      grande: `${base}-escritorio-1600.webp`,
    },
    celular: {
      src: `${base}-celular-200.webp`,
      srcSet: [200, 400].map((w) => `${base}-celular-${w}.webp ${w}w`).join(", "),
    },
  };
};
