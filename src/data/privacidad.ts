// Política de tratamiento de datos personales de la web (Ley 1581 de 2012 y
// Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015, Libro 2, Parte 2,
// Título 2, Capítulo 25). De aquí salen la página /privacidad, el aviso corto y
// la casilla de autorización de los dos formularios.
//
// EternalGrowth no está constituida como sociedad: el responsable del
// tratamiento es la persona natural que opera la marca. Los campos entre
// corchetes se llenan con sus datos reales. Mientras quede alguno, el build de
// producción falla a propósito (scripts/prerender.mjs): una política sin
// responsable identificado no cumple la ley y no debe publicarse.
import { SITE } from "../seo/site";

export const PRIVACIDAD_PATH = "/privacidad";

export const RESPONSABLE = {
  // Nombre completo de la persona natural que opera EternalGrowth.
  nombre: "Samuel Roldan Laverde",
  // Documento de identidad, por ejemplo "C.C. 1.000.000.000".
  identificacion: "C.C. 1.025.884.673",
  // Dirección física para notificaciones (la ley la pide aunque no haya local).
  direccion: "Avenida 26 # 52-200",
  ciudad: "Medellín, Antioquia, Colombia",
  correo: SITE.email,
  // Teléfono de contacto del responsable (la ley lo pide en la política).
  telefono: "+57 324 209 0985",
} as const;

// Fecha de esta versión (AAAA-MM-DD). Va en la página, en el sitemap y en el
// registro de cada autorización. Si el texto cambia, cambia la fecha.
export const POLITICA_VERSION = "2026-10-11";

// Devuelve los campos que siguen sin llenar. Lo usa el prerender.
export const camposPendientesPrivacidad = (): string[] =>
  Object.entries(RESPONSABLE)
    .filter(([, valor]) => /\[[^\]]+\]/.test(valor))
    .map(([campo]) => campo);

const formatoFecha = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const fechaPolitica = formatoFecha.format(new Date(`${POLITICA_VERSION}T12:00:00Z`));

// Texto de las casillas. La autorización tiene que ser previa (antes de
// enviar), expresa (una casilla que la persona marca, nunca premarcada) e
// informada (dice para qué y enlaza la política).
export const AUTORIZACION_CONTACTO =
  "Autorizo el tratamiento de mis datos para que me respondan, agenden el diagnóstico y me contacten sobre esta solicitud, según la";

export const AUTORIZACION_BLOG =
  "Autorizo que usen mi correo para enviarme las nuevas publicaciones del blog. Me puedo dar de baja cuando quiera. Ver la";

export type BloquePolitica = {
  id: string;
  titulo: string;
  parrafos?: string[];
  lista?: string[];
  cierre?: string[];
};

const responsableTexto = `${RESPONSABLE.nombre}, identificado con ${RESPONSABLE.identificacion}, quien opera la marca EternalGrowth`;

export const AVISO_PRIVACIDAD = [
  `${responsableTexto}, con domicilio en ${RESPONSABLE.ciudad}, es el responsable del tratamiento de los datos personales que nos das en esta web. Contacto: ${RESPONSABLE.correo}, teléfono ${RESPONSABLE.telefono}.`,
  "Usamos tus datos para responder tu solicitud, agendar y hacer el diagnóstico gratuito y darle seguimiento; y, si te suscribes al blog, para avisarte de cada publicación nueva. No los vendemos ni los cedemos.",
  "Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos, a pedir prueba de tu autorización, a revocarla y a presentar quejas ante la Superintendencia de Industria y Comercio. No pedimos datos sensibles ni datos de menores de edad.",
  "Abajo está la política completa: qué datos recogemos, con quién se comparten, cuánto tiempo los guardamos y cómo ejercer tus derechos.",
];

export const POLITICA: BloquePolitica[] = [
  {
    id: "responsable",
    titulo: "1. Quién es el responsable",
    parrafos: [
      `EternalGrowth es una marca que todavía no está constituida como sociedad. Por eso el responsable del tratamiento es la persona natural que la opera: ${RESPONSABLE.nombre}, identificado con ${RESPONSABLE.identificacion}.`,
    ],
    lista: [
      `Domicilio: ${RESPONSABLE.ciudad}.`,
      `Dirección: ${RESPONSABLE.direccion}.`,
      `Correo: ${RESPONSABLE.correo}.`,
      `Teléfono: ${RESPONSABLE.telefono}.`,
      `Sitio web: ${SITE.url.replace("https://", "")}.`,
    ],
    cierre: [
      "Cuando EternalGrowth se constituya como sociedad publicaremos una versión nueva de esta política con la razón social y el NIT, y te lo informaremos antes de que cambie el responsable.",
    ],
  },
  {
    id: "datos",
    titulo: "2. Qué datos recogemos y cómo",
    lista: [
      "Formulario de diagnóstico: nombre, correo, número de WhatsApp o teléfono con su indicativo (opcional), el servicio que te interesa y lo que nos cuentes de tu negocio.",
      "Suscripción al blog: tu correo electrónico.",
      "Navegación: Vercel Web Analytics cuenta las visitas sin cookies. Registra la página visitada, la página desde la que llegaste, el país, el navegador y el tipo de dispositivo, de forma agregada y sin identificarte.",
      "Seguridad: la dirección IP desde la que se envía un formulario se guarda unos minutos en la memoria del servidor para limitar los envíos repetidos (máximo 5 cada 10 minutos). No se almacena en ninguna base de datos.",
      "En tu propio navegador (no en nuestros servidores) la web guarda si ya te suscribiste al blog, para no volver a preguntarte, y el servicio que elegiste desde un artículo, para llenarte el formulario.",
    ],
    cierre: [
      "No pedimos datos sensibles (salud, orientación sexual, origen racial, creencias, datos biométricos) ni datos de niños, niñas o adolescentes. Por favor no los incluyas en tu mensaje. La web no está dirigida a menores de 18 años; si nos enteramos de que un menor nos dio sus datos, los borramos.",
      "Si nos escribes directamente por correo o por Instagram, tratamos esos datos con las mismas finalidades y derechos de esta política. La conversación por Instagram la procesa también Meta, según su propia política.",
    ],
  },
  {
    id: "finalidades",
    titulo: "3. Para qué los usamos",
    lista: [
      "Responder tu solicitud y agendar el diagnóstico gratuito.",
      "Contactarte por correo, WhatsApp o llamada sobre esa solicitud: preparar el diagnóstico, enviarte una propuesta o cotización y hacerle seguimiento.",
      "Si te suscribes, enviarte por correo un aviso cada vez que publiquemos en el blog.",
      "Conocer, con cifras agregadas, qué páginas se visitan y desde dónde llegan las visitas, para mejorar la web.",
      "Proteger la web del abuso y del correo no deseado.",
      "Atender tus consultas y reclamos sobre tus datos, y cumplir obligaciones legales.",
    ],
    cierre: [
      "No vendemos, alquilamos ni cedemos tus datos a terceros, y no te enviamos publicidad de otras empresas. Si llegas a ser cliente, los datos del proyecto se rigen por el contrato que firmemos.",
    ],
  },
  {
    id: "proveedores",
    titulo: "4. Con quién se comparten",
    parrafos: [
      "Para que la web funcione usamos proveedores que tratan los datos por encargo nuestro, solo para prestarnos su servicio y bajo sus propios compromisos de protección de datos. Esto es una transmisión de datos a encargados, no una venta ni una cesión. Todos tienen servidores fuera de Colombia:",
    ],
    lista: [
      "Vercel Inc. (Estados Unidos): aloja la web, ejecuta el envío del formulario y mide las visitas (Vercel Web Analytics).",
      "Resend (Estados Unidos): envía los correos del formulario y del blog, y guarda la lista de suscriptores del blog.",
      "Spaceship (Spacemail): aloja el buzón de correo donde recibimos las solicitudes.",
    ],
    cierre: [
      "Al marcar la casilla de autorización aceptas también esta transmisión internacional. Fuera de estos casos, solo entregamos datos a una autoridad que los pida en ejercicio de sus funciones legales.",
    ],
  },
  {
    id: "conservacion",
    titulo: "5. Cuánto tiempo los guardamos",
    lista: [
      "Solicitudes de diagnóstico: mientras atendemos tu solicitud y hasta dos años después del último contacto. Después las borramos.",
      "Suscripción al blog: hasta que te des de baja.",
      "Si llegas a ser cliente: durante el contrato y el tiempo que exijan las normas contables y tributarias.",
      "Estadísticas de visitas: son agregadas y no te identifican.",
    ],
  },
  {
    id: "derechos",
    titulo: "6. Tus derechos",
    parrafos: [
      "Como titular de tus datos, la Ley 1581 de 2012 (artículo 8) te da derecho a:",
    ],
    lista: [
      "Conocer, actualizar y rectificar tus datos, incluso si están incompletos, son inexactos o inducen a error.",
      "Pedir prueba de la autorización que nos diste.",
      "Saber, si lo pides, qué uso les hemos dado.",
      "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.",
      "Revocar la autorización y pedir que borremos tus datos, salvo cuando exista un deber legal o contractual de conservarlos.",
      "Acceder gratis a tus datos.",
    ],
  },
  {
    id: "procedimiento",
    titulo: "7. Cómo ejercer tus derechos",
    parrafos: [
      `Escríbenos a ${RESPONSABLE.correo} con el asunto "Datos personales". Indica tu nombre, tu número de identificación, el correo o teléfono con el que nos contactaste y qué necesitas. Si actúas en nombre de otra persona, adjunta el documento que te acredita. Las solicitudes las atiende directamente el responsable.`,
      "Consultas (saber qué datos tenemos y cómo los usamos): te respondemos en máximo 10 días hábiles desde que recibimos tu correo. Si no podemos en ese plazo, te avisamos antes de que venza, con el motivo, y te respondemos en máximo 5 días hábiles más.",
      "Reclamos (corregir, actualizar o borrar datos, revocar la autorización o denunciar un incumplimiento): incluye tu identificación, la descripción de lo que pasó, tu dirección y los documentos que quieras hacer valer. Si falta algo, te lo pedimos dentro de los 5 días siguientes; si pasan 2 meses sin que lo envíes, entendemos que desististe. En máximo 2 días hábiles marcamos tus datos como \"reclamo en trámite\". Te respondemos en máximo 15 días hábiles; si no podemos, te avisamos el motivo y te respondemos en máximo 8 días hábiles más.",
      "Darte de baja del blog es inmediato: responde cualquier correo del blog con \"Cancelar suscripción\" o escríbenos.",
      "Si después de acudir a nosotros no quedas conforme, puedes presentar una queja ante la Superintendencia de Industria y Comercio en www.sic.gov.co.",
    ],
  },
  {
    id: "seguridad",
    titulo: "8. Cómo protegemos tus datos",
    parrafos: [
      "La web funciona solo con conexión cifrada (HTTPS). Los datos del formulario no se guardan en una base de datos propia: llegan por correo a nuestro buzón, al que solo accede el equipo de EternalGrowth que atiende las solicitudes. Ningún sistema es infalible; si ocurriera un incidente que afecte tus datos, lo informaremos a la SIC, como lo exige la ley, y a las personas afectadas.",
    ],
  },
  {
    id: "vigencia",
    titulo: "9. Vigencia y cambios",
    parrafos: [
      `Esta política rige desde el ${fechaPolitica} y estará vigente mientras EternalGrowth opere esta web. Si la cambiamos, publicamos la nueva versión en esta misma página con su fecha. Si el cambio es importante (otro responsable u otra finalidad), te lo informamos antes de aplicarlo y, cuando la ley lo exija, te pedimos una nueva autorización.`,
      "Marco legal: Ley 1581 de 2012 y Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015.",
    ],
  },
];
