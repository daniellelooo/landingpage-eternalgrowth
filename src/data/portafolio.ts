// Los proyectos del portafolio. De aquí salen la página /portafolio, el bloque
// de la home, los datos estructurados y la fecha del sitemap.
//
// Para agregar un proyecto:
// 1. Capturas: `node scripts/capturar-portafolio.mjs <imagen> <url>` (ver el
//    encabezado del script). Deja los WebP en public/portafolio/. Conviene
//    capturar la pantalla más fuerte del sitio (catálogo, agenda...), no
//    siempre la portada.
// 2. Agregar el objeto en PROYECTOS con su `naturaleza` y su `seccion`.
// 3. Cambiar PORTAFOLIO_ACTUALIZADO a la fecha del cambio: es el `lastmod` que
//    ve Google en el sitemap, así que tiene que ser verdad.
//
// Reglas del texto: `resultado` cuenta qué gana el negocio con la web, sin
// cifras que no se puedan demostrar. Las demos tienen que decir que son demos,
// y un producto de terceros no se presenta como producto de EternalGrowth.

export const PORTAFOLIO_PATH = "/portafolio";

// Última vez que cambió el contenido de la página (formato AAAA-MM-DD).
export const PORTAFOLIO_ACTUALIZADO = "2026-09-26";

// Qué es el proyecto. Decide cómo se presenta y qué se afirma de él:
// - cliente: web que EternalGrowth desarrolló para un negocio real.
// - producto: producto de otros dueños que desarrolló nuestro equipo. No es de
//   EternalGrowth y nunca se dice que lo sea.
// - demo: negocio ficticio de demostración.
export type NaturalezaProyecto = "cliente" | "producto" | "demo";

// Dónde se muestra en /portafolio. Independiente de la naturaleza: una demo
// puede ir en Destacados y otra en "Más demos por sector".
export type SeccionPortafolio = "destacados" | "produccion" | "demos";

export interface ProyectoPortafolio {
  slug: string;
  nombre: string;
  // Qué es el negocio o el producto, dicho como lo diría el dueño.
  sector: string;
  ciudad: string;
  // Qué tipo de web es.
  tipo: string;
  // Lo que el negocio consigue con la web. Sin cifras inventadas.
  resultado: string;
  url: string;
  naturaleza: NaturalezaProyecto;
  seccion: SeccionPortafolio;
  // La pieza grande de Destacados. Solo uno.
  principal?: boolean;
  etiquetas: string[];
  // Base de los archivos en public/portafolio/: <imagen>-escritorio-<ancho>.webp
  // y <imagen>-celular-<ancho>.webp.
  imagen: string;
  // Texto alternativo de la captura de escritorio.
  alt: string;
}

export const SECCIONES_PORTAFOLIO: Record<
  SeccionPortafolio,
  { titulo: string; descripcion: string }
> = {
  destacados: {
    titulo: "Destacados",
    descripcion:
      "Lo que mejor muestra cómo trabajamos: dos demos por sector y un software desarrollado por nuestro equipo. En las demos, el negocio, los datos y las reseñas son ficticios; el funcionamiento es el que tendría tu web.",
  },
  produccion: {
    titulo: "En producción",
    descripcion:
      "Webs que desarrollamos para negocios reales y que hoy están en línea, atendiendo a sus clientes. De cada una mostramos la pantalla que más trabaja.",
  },
  demos: {
    titulo: "Más demos por sector",
    descripcion:
      "Negocios de demostración para ver cómo quedaría una web en otros sectores. El nombre, los datos y las reseñas son ficticios.",
  },
};

export const PROYECTOS: ProyectoPortafolio[] = [
  {
    slug: "arrayan-veterinaria",
    nombre: "Arrayán Veterinaria",
    sector: "Veterinaria",
    ciudad: "Medellín",
    tipo: "Agenda de citas en línea",
    resultado:
      "El cliente ve las horas libres, agenda la cita en un minuto y recibe la confirmación por correo y un recordatorio un día y dos horas antes, para que no se pierdan turnos.",
    url: "https://demo-veterinaria.eternalgrowth.xyz",
    naturaleza: "demo",
    seccion: "destacados",
    principal: true,
    etiquetas: ["Agenda en línea", "Recordatorios", "Precios desde"],
    imagen: "arrayan-veterinaria",
    alt: "Demo de Arrayán Veterinaria con el titular Cuidamos a tu perro o gato como en casa y las próximas horas libres",
  },
  {
    slug: "movo",
    nombre: "movo",
    sector: "Software para talleres de latonería y pintura",
    ciudad: "Colombia",
    tipo: "Software de gestión para talleres",
    resultado:
      "El taller ve en qué fase va cada carro y cuánto lleva esperando a la aseguradora, pasa a la cuenta con IA el PDF de la autorización y cuadra la comisión de cada operario al cerrar la quincena.",
    url: "https://www.movo.software",
    naturaleza: "producto",
    seccion: "destacados",
    etiquetas: ["Seguimiento de vehículos", "Lectura de PDF con IA", "Comisiones"],
    imagen: "movo",
    alt: "Página de movo, software de gestión de talleres, con el titular Dónde está cada carro y cuánto se le paga a cada quien y el panel del sistema",
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
    naturaleza: "demo",
    seccion: "destacados",
    etiquetas: ["Catálogo", "Pedidos por WhatsApp"],
    imagen: "floristeria-alheli",
    alt: "Demo de la floristería Alhelí con el titular Ramos del día, armados a mano en Laureles y fotos de ramos",
  },
  {
    slug: "reno-motriz",
    nombre: "Reno Motriz",
    sector: "Taller de latonería y pintura",
    ciudad: "Medellín",
    tipo: "Sitio web con agenda de citas",
    resultado:
      "Sus clientes agendan en línea la cita de valoración o de ingreso del vehículo sobre los horarios que el taller tiene realmente libres, sin tener que llamar.",
    url: "https://www.renomotriz.com",
    naturaleza: "cliente",
    seccion: "produccion",
    etiquetas: ["Agenda en línea", "SEO local"],
    imagen: "reno-motriz-agenda",
    alt: "Agenda en línea de Reno Motriz: cita de valoración con los días y las horas que el taller tiene libres",
  },
  {
    slug: "techverse",
    nombre: "Techverse",
    sector: "Tienda de tecnología en el C.C. Monterrey",
    ciudad: "Medellín",
    tipo: "Catálogo con configurador de PC",
    resultado:
      "Catálogo con filtros por categoría y marca y un configurador que revisa la compatibilidad de las piezas. La cotización le llega a la tienda por WhatsApp con el nombre y el celular del cliente.",
    url: "https://techversemed.com",
    naturaleza: "cliente",
    seccion: "produccion",
    etiquetas: ["Catálogo", "Configurador de PC", "Cotización por WhatsApp"],
    imagen: "techverse-tienda",
    alt: "Catálogo de Techverse con equipos armados, filtros por categoría y marca y botón para preguntar por WhatsApp",
  },
  {
    slug: "bunker-force",
    nombre: "Bunker Force",
    sector: "Ropa y equipo táctico",
    ciudad: "Bello",
    tipo: "Tienda en línea",
    resultado:
      "La tienda vende fuera del local: catálogo con filtros por talla y color, carrito de compras y aviso por correo de cada pedido nuevo para despacharlo a tiempo.",
    url: "https://bunkerforcebello.com",
    naturaleza: "cliente",
    seccion: "produccion",
    etiquetas: ["Tienda en línea", "Carrito de compras"],
    imagen: "bunker-force-catalogo",
    alt: "Catálogo de Bunker Force con filtros por talla y color y prendas tácticas con su precio",
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
    naturaleza: "demo",
    seccion: "demos",
    etiquetas: ["Página informativa", "SEO local"],
    imagen: "ceiba-psicologia",
    alt: "Demo de Ceiba Psicología con el titular Hablar ayuda y la foto de un psicólogo sobre fondo azul",
  },
  {
    slug: "piston-motoservicio",
    nombre: "Pistón Motoservicio",
    sector: "Taller de motos",
    ciudad: "Itagüí",
    tipo: "Página informativa",
    resultado:
      "Servicios con tiempo aproximado y precio desde, horario que avisa si el taller está abierto, ubicación y cotización directa por WhatsApp, para que el cliente llegue sabiendo cuánto le va a costar.",
    url: "https://demo-taller-motos.eternalgrowth.xyz",
    naturaleza: "demo",
    seccion: "demos",
    etiquetas: ["Página informativa", "Cotización por WhatsApp"],
    imagen: "taller-motos",
    alt: "Demo de Pistón Motoservicio, taller de motos en Itagüí, con el titular Su moto, lista el mismo día",
  },
];

export const getProyectosPorSeccion = (seccion: SeccionPortafolio) =>
  PROYECTOS.filter((proyecto) => proyecto.seccion === seccion);

const porSlug = (slug: string) => {
  const proyecto = PROYECTOS.find((p) => p.slug === slug);
  if (!proyecto) throw new Error(`portafolio: no existe el proyecto "${slug}"`);
  return proyecto;
};

// Los que salen en la home, en este orden.
export const PROYECTOS_DESTACADOS = ["arrayan-veterinaria", "movo", "techverse"].map(porSlug);

// Línea corta bajo el nombre: deja claro qué es cada cosa.
export const lineaDe = (proyecto: ProyectoPortafolio) => {
  if (proyecto.naturaleza === "demo") return `Demo de ${proyecto.sector.toLowerCase()}`;
  if (proyecto.naturaleza === "producto") return "Producto desarrollado por nuestro equipo";
  return `${proyecto.sector}, ${proyecto.ciudad}`;
};

export const textoEnlaceDe = (proyecto: ProyectoPortafolio) =>
  proyecto.naturaleza === "demo" ? "Ver demo" : "Ver sitio";

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
      // Para los datos estructurados.
      grande: `${base}-escritorio-1600.webp`,
    },
    celular: {
      src: `${base}-celular-200.webp`,
      srcSet: [200, 400].map((w) => `${base}-celular-${w}.webp ${w}w`).join(", "),
    },
  };
};
