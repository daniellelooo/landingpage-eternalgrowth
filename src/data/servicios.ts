// Una página por servicio, pensada para que alguien la encuentre buscando ese
// servicio en Medellín. La home explica la empresa; estas páginas explican UNA
// cosa y responden las preguntas que la gente hace antes de escribir.
//
// Las preguntas frecuentes no son relleno: son lo que Google muestra en los
// resultados y lo que un asistente de IA cita cuando alguien le pregunta por
// esto. Escribirlas con la respuesta real, no con publicidad.

export type PreguntaFrecuente = {
  pregunta: string;
  respuesta: string;
};

export type Servicio = {
  slug: string;
  nombre: string;
  titulo: string;
  metaTitulo: string;
  metaDescripcion: string;
  entradilla: string;
  intro: string[];
  incluye: { titulo: string; detalle: string }[];
  paraQuien: string[];
  preguntas: PreguntaFrecuente[];
};

export const SERVICIOS_BASE_PATH = "/servicios";

export const SERVICIOS: Servicio[] = [
  {
    slug: "desarrollo-web-medellin",
    nombre: "Desarrollo web",
    titulo: "Desarrollo web en Medellín para negocios que quieren vender",
    metaTitulo: "Desarrollo web en Medellín | EternalGrowth",
    metaDescripcion:
      "Desarrollo de páginas web y tiendas en línea en Medellín para pymes: rápidas, que salen en Google y conectadas con WhatsApp. Diagnóstico gratuito.",
    entradilla:
      "Una página que carga lento, que no sale en Google y desde la que nadie puede escribirte no es una página web: es un folleto caro.",
    intro: [
      "Hacemos sitios web para micro y pequeñas empresas de Medellín y el Valle de Aburrá. No partimos de una plantilla: partimos de qué tiene que pasar cuando alguien llega a tu página. Si tu negocio vende por WhatsApp, la web tiene que llevar a WhatsApp. Si agendas citas, la web tiene que agendar citas.",
      "La mayoría de páginas de negocios pequeños fallan por las mismas tres cosas: tardan en cargar, no están hechas para que Google las lea, y no tienen un camino claro para contactar. Esas tres se resuelven al construir, no después.",
    ],
    incluye: [
      {
        titulo: "Un sitio que carga rápido en celular",
        detalle:
          "La mayoría de tus visitantes llega desde el celular con datos móviles. Medimos el peso real de cada página, no solo cómo se ve en un computador.",
      },
      {
        titulo: "SEO técnico desde el primer día",
        detalle:
          "Título y descripción propios por página, direcciones legibles, mapa del sitio y datos estructurados. Es lo que hace que Google entienda qué vendes y dónde estás.",
      },
      {
        titulo: "Conectada con cómo vendes hoy",
        detalle:
          "Formularios que llegan a tu correo, botón a WhatsApp, catálogo, pasarela de pago o reservas, según lo que tu negocio necesite.",
      },
      {
        titulo: "Contenido que puedes actualizar",
        detalle:
          "Dejamos claro qué puedes cambiar tú y qué necesita a alguien técnico, por escrito y sin tecnicismos.",
      },
    ],
    paraQuien: [
      "Negocios que hoy solo existen en Instagram y pierden a quien busca en Google.",
      "Empresas con una página vieja que no sale en búsquedas y nadie sabe quién la administra.",
      "Comercios que quieren vender en línea sin montar una operación de e-commerce completa.",
    ],
    preguntas: [
      {
        pregunta: "¿Cuánto cuesta una página web en Medellín?",
        respuesta:
          "Depende de cuántas páginas tenga y de con qué se conecte. No es lo mismo un sitio de una página con formulario que una tienda con catálogo y pagos. Por eso empezamos con un diagnóstico gratuito de 30 minutos: primero entendemos qué necesitas y después te pasamos una cifra, no al revés.",
      },
      {
        pregunta: "¿Cuánto se demora?",
        respuesta:
          "Un sitio sencillo de una o pocas páginas toma unas semanas. Lo que más alarga un proyecto no suele ser el desarrollo: son los textos y las fotos del negocio. Si eso está listo, todo va más rápido.",
      },
      {
        pregunta: "¿La página va a salir en Google?",
        respuesta:
          "Entregamos el sitio preparado para que Google lo pueda leer e indexar, y lo conectamos con Google Search Console. Aparecer de primeras en búsquedas competidas es otro trabajo, continuo, que depende de contenido y de tiempo. Nadie serio te puede garantizar el primer puesto.",
      },
      {
        pregunta: "¿Puedo editar la página yo mismo después?",
        respuesta:
          "Sí, dejamos editable lo que tiene sentido que cambies seguido: textos, productos, publicaciones. Lo que toca la estructura lo hacemos nosotros para que nada se rompa sin que te des cuenta.",
      },
      {
        pregunta: "¿Trabajan solo con negocios de Medellín?",
        respuesta:
          "Somos de Medellín y trabajamos sobre todo con negocios del Valle de Aburrá, porque poder vernos en persona ayuda. Pero el trabajo se puede hacer a distancia con cualquier parte de Colombia.",
      },
    ],
  },
  {
    slug: "automatizacion-procesos-medellin",
    nombre: "Automatización de procesos",
    titulo: "Automatización de procesos para pymes en Medellín",
    metaTitulo: "Automatización de procesos y n8n en Medellín | EternalGrowth",
    metaDescripcion:
      "Automatizamos tareas repetitivas de tu negocio con n8n: leads, seguimiento, reportes y avisos. Menos trabajo a mano, sin contratar a nadie más.",
    entradilla:
      "Si alguien de tu equipo pasa datos de un lado a otro a mano todos los días, eso es una nómina pagando trabajo que puede hacer un flujo automático.",
    intro: [
      "Automatizar no es comprar un robot. Es conectar las herramientas que ya usas para que la información se mueva sola: que un formulario llene tu base de datos, que un pedido avise a quien despacha, que un cliente que no ha vuelto reciba un mensaje sin que nadie se acuerde de mandarlo.",
      "Trabajamos con n8n, una herramienta de automatización que permite construir flujos a la medida y que se puede alojar en tu propia infraestructura. Eso importa cuando los datos que pasan por ahí son de tus clientes.",
    ],
    incluye: [
      {
        titulo: "Mapa de lo que se hace a mano hoy",
        detalle:
          "Antes de automatizar nada, escribimos el proceso real tal como ocurre. Casi siempre aparecen pasos que nadie sabía que existían.",
      },
      {
        titulo: "Flujos conectados a tus herramientas",
        detalle:
          "WhatsApp, correo, hojas de cálculo, CRM, tu web, pasarelas de pago. Si tiene forma de conectarse, se conecta.",
      },
      {
        titulo: "Avisos cuando algo falla",
        detalle:
          "Una automatización que se cae en silencio es peor que no tenerla. Los flujos avisan cuando algo no salió.",
      },
      {
        titulo: "Documentación de qué hace cada flujo",
        detalle:
          "Para que no dependas de que nosotros nos acordemos, ni de una sola persona de tu equipo.",
      },
    ],
    paraQuien: [
      "Negocios donde alguien copia y pega información entre WhatsApp, Excel y el correo.",
      "Equipos que pierden clientes porque nadie alcanzó a responder a tiempo.",
      "Empresas que sacan los mismos reportes a mano cada semana o cada mes.",
    ],
    preguntas: [
      {
        pregunta: "¿Qué procesos vale la pena automatizar primero?",
        respuesta:
          "Los que se repiten más de tres veces por semana y siguen siempre los mismos pasos. Responder preguntas frecuentes, registrar un pedido, agendar una cita, hacer seguimiento a quien cotizó y no compró. Lo que cambia cada vez y necesita criterio no se automatiza: se ordena primero.",
      },
      {
        pregunta: "¿Tengo que cambiar las herramientas que ya uso?",
        respuesta:
          "Casi nunca. La idea es conectar lo que ya tienes. Solo sugerimos cambiar una herramienta cuando de verdad no se puede conectar con nada, y te decimos por qué.",
      },
      {
        pregunta: "¿Qué es n8n?",
        respuesta:
          "Es una herramienta para construir automatizaciones conectando aplicaciones entre sí, parecida a Zapier o Make, con dos diferencias: es de código abierto y se puede instalar en un servidor propio. Eso la hace más flexible y, cuando hay volumen, más barata.",
      },
      {
        pregunta: "¿Qué pasa si la automatización deja de funcionar?",
        respuesta:
          "Las herramientas de terceros cambian y a veces rompen conexiones. Por eso los flujos avisan cuando fallan, y por eso tiene sentido un acompañamiento mensual en vez de entregarlos y desaparecer.",
      },
    ],
  },
  {
    slug: "chatbot-whatsapp-medellin",
    nombre: "WhatsApp automatizado",
    titulo: "Chatbots y respuestas automáticas de WhatsApp para negocios",
    metaTitulo: "Chatbot de WhatsApp para negocios en Medellín | EternalGrowth",
    metaDescripcion:
      "Automatizamos la atención por WhatsApp de tu negocio: respuestas a preguntas frecuentes, agendamiento y seguimiento, sin perder el trato humano.",
    entradilla:
      "En Colombia el negocio se hace por WhatsApp. El problema no es tener WhatsApp: es que alguien tiene que estar ahí para responder.",
    intro: [
      "La mayoría de mensajes que recibe un negocio pequeño son las mismas cuatro preguntas: cuánto cuesta, dónde quedan, a qué hora abren, si hacen domicilio. Responder eso a mano, todos los días, es trabajo que se puede quitar de encima sin perder nada.",
      "Automatizamos la parte repetitiva y dejamos pasar a una persona lo que de verdad necesita una persona. Un cliente que quiere negociar o que tiene un reclamo no debería quedarse hablando con un robot.",
    ],
    incluye: [
      {
        titulo: "Respuestas a lo que más preguntan",
        detalle:
          "Salen de tus conversaciones reales, no de una plantilla. Primero miramos qué te preguntan de verdad.",
      },
      {
        titulo: "Paso a una persona cuando hace falta",
        detalle:
          "El bot reconoce cuándo se acabó lo que puede resolver y avisa a quien atiende, con el contexto de la conversación.",
      },
      {
        titulo: "Registro de cada conversación",
        detalle:
          "Para que sepas cuánta gente escribe, qué pregunta y en qué momento se pierden.",
      },
      {
        titulo: "Seguimiento a quien no volvió",
        detalle:
          "Recordatorios de cita y mensajes a quien cotizó y no respondió, dentro de lo que permiten las reglas de WhatsApp.",
      },
    ],
    paraQuien: [
      "Negocios que reciben más mensajes de los que alcanzan a responder.",
      "Consultorios, talleres y salones que viven de citas y pierden tiempo confirmándolas.",
      "Comercios que venden por catálogo y repiten precios todo el día.",
    ],
    preguntas: [
      {
        pregunta: "¿Mis clientes van a notar que es un bot?",
        respuesta:
          "Sí, y es mejor así. Un bot que finge ser persona genera desconfianza cuando se descubre. Lo que se cuida es que resuelva rápido y que pase a una persona sin hacer dar vueltas.",
      },
      {
        pregunta: "¿Sirve con el WhatsApp normal o necesito uno de empresa?",
        respuesta:
          "Para automatizaciones serias se usa WhatsApp Business. Según el volumen y lo que se quiera hacer, puede hacer falta la API oficial de WhatsApp, que tiene costo por conversación. Eso se revisa antes de construir nada, para que no te lleves sorpresas en la factura.",
      },
      {
        pregunta: "¿Puede agendar citas directamente?",
        respuesta:
          "Sí. Se puede conectar con tu calendario para mostrar horarios libres, agendar y mandar el recordatorio. Es de las automatizaciones que más tiempo ahorran en negocios de servicios.",
      },
      {
        pregunta: "¿Qué pasa con los datos de mis clientes?",
        respuesta:
          "Se quedan en tus herramientas, no en las nuestras. Te decimos por escrito qué información se guarda, dónde y quién la puede ver.",
      },
    ],
  },
  {
    slug: "transformacion-digital-medellin",
    nombre: "Transformación digital",
    titulo: "Transformación digital para empresas en Medellín",
    metaTitulo: "Transformación digital en Medellín para pymes | EternalGrowth",
    metaDescripcion:
      "Acompañamos a micro y pequeñas empresas de Medellín a digitalizar su operación por etapas: qué automatizar primero y qué no vale la pena tocar.",
    entradilla:
      "La transformación digital que sirve no empieza comprando software. Empieza mirando qué trabajo se está haciendo a mano y cuánto cuesta.",
    intro: [
      "Acompañamos a negocios de Medellín que operan en papel, en Excel o en WhatsApp y quieren dar el paso sin parar la operación ni gastar en herramientas que después nadie usa.",
      "Lo hacemos por etapas y en orden: primero que te encuentren, después que te puedan contactar sin fricción, después que lo que entra quede registrado, y al final que el sistema te diga cosas que hoy no sabes. Saltarse el orden es lo que hace que un proyecto de estos termine abandonado.",
    ],
    incluye: [
      {
        titulo: "Diagnóstico de cómo opera el negocio hoy",
        detalle:
          "Treinta minutos sin costo para entender el negocio, y si hace falta profundizar, un diagnóstico completo con hoja de ruta.",
      },
      {
        titulo: "Un orden de prioridades con costo y tiempo",
        detalle:
          "Qué se hace primero, qué se puede esperar y qué no vale la pena tocar. Con cifras, no con promesas.",
      },
      {
        titulo: "Implementación por etapas",
        detalle:
          "Cada etapa deja algo funcionando. Nada de proyectos de seis meses donde no ves nada hasta el final.",
      },
      {
        titulo: "Acompañamiento después de entregar",
        detalle:
          "El momento en que más se abandonan estos proyectos es el mes siguiente a la entrega, cuando aparece la primera duda y no hay a quién preguntarle.",
      },
    ],
    paraQuien: [
      "Empresas que llevan la operación en cuadernos, Excel y grupos de WhatsApp.",
      "Negocios que crecieron y ya no les alcanza el control manual.",
      "Equipos que compraron un software y terminaron sin usarlo.",
    ],
    preguntas: [
      {
        pregunta: "¿Qué es la transformación digital para una pyme?",
        respuesta:
          "Es dejar de hacer a mano el trabajo que una herramienta puede hacer sola, para que el equipo dedique ese tiempo a vender y atender. No es comprar software: si una herramienta nueva no le quita trabajo a alguien ni le resuelve algo al cliente, es un gasto con pantalla bonita.",
      },
      {
        pregunta: "¿Por dónde se empieza?",
        respuesta:
          "Por escribir las tres tareas que más se repiten en la semana y medir cuánto tiempo consumen. Esa lista, con números, es el punto de partida real. Casi nunca coincide con lo que uno cree antes de medirlo.",
      },
      {
        pregunta: "¿Cuánto cuesta y cuánto se demora?",
        respuesta:
          "Depende del tamaño de la operación y de cuántos procesos se toquen. Por eso se trabaja por etapas: cada una tiene su costo y su tiempo, y se puede parar entre una y otra. La conversación inicial de 30 minutos no tiene costo.",
      },
      {
        pregunta: "¿Tengo que cambiar toda la forma de trabajar del equipo?",
        respuesta:
          "No, y si la respuesta fuera que sí, sería mala señal. Los cambios que funcionan son los que el equipo puede adoptar sin dejar de atender clientes. Se va por partes justamente para eso.",
      },
      {
        pregunta: "¿Sirve para un negocio pequeño o es solo para empresas grandes?",
        respuesta:
          "Es donde más se nota. En una empresa grande automatizar una tarea ahorra un porcentaje; en un negocio de tres personas, le devuelve horas a alguien que hoy está haciendo tres trabajos.",
      },
    ],
  },
];

export const getServicioBySlug = (slug: string) =>
  SERVICIOS.find((servicio) => servicio.slug === slug) ?? null;
