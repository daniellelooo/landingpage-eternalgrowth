export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  displayDate?: string;
  title: string;
  deck: string;
  summary: string;
  insight: string;
  signals: string[];
  actions: string[];
  // Las guías son contenido propio y no llevan fuente externa.
  tipo?: "noticia" | "guia";
  source?: string;
  url?: string;
  image: string;
  alt: string;
  contactMessage?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "black-friday-2026-colombia-preparar-negocio",
    category: "Ventas y comercio",
    date: "20 Oct 2026",
    displayDate: "Martes · 20 de octubre de 2026",
    title: "Black Friday 2026 en Colombia: cómo preparar tu negocio",
    deck:
      "El Black Friday cae el viernes 27 de noviembre. Lo que decide si vendes ese día no es el descuento: es si el cliente te encuentra, te entiende y te puede pagar sin fricción.",
    summary:
      "El Black Friday 2026 en Colombia es el 27 de noviembre. Qué pide la SIC a los comercios y qué preparar en tu negocio para vender más ese día.",
    insight:
      "Las grandes cadenas siempre van a poder bajar más el precio. Una pyme gana en lo que rodea la oferta: condiciones claras, respuesta rápida y un pago sin enredos.",
    signals: [
      "La fecha: viernes 27 de noviembre de 2026, según Bloomberg Línea. La duración de las promociones depende de cada establecimiento, así que define tú hasta cuándo dura la tuya.",
      "La SIC recuerda que toda promoción debe informar su vigencia, los productos incluidos y las condiciones, con el precio en pesos y el vendedor claramente identificado.",
      "Según las normas de protección al consumidor que cita Bloomberg Línea, si un mismo producto aparece con dos precios, el cliente puede pagar el más bajo. Un banner viejo que nadie actualizó puede salirte caro.",
      "Cuando los precios se parecen, decide la experiencia de compra: qué tan claro está todo y qué tan fácil es preguntar y pagar.",
    ],
    actions: [
      "Elige de tres a cinco productos para la promoción y anota su precio habitual de hoy. Así el descuento que anuncies es real y puedes demostrarlo.",
      "Escribe las condiciones en una sola frase (qué incluye, hasta cuándo, cuántas unidades) y repítela igual en la web, en Instagram y en WhatsApp.",
      "Revisa que tu página cargue rápido en el celular, tenga el botón de WhatsApp a la vista y muestre tu nombre, ciudad y contacto.",
      "Deja listas en WhatsApp Business las respuestas rápidas a lo que más van a preguntar: precio, envío, tiempos de entrega, medios de pago y cambios.",
      "Prueba todos tus medios de pago antes del 27 y define cuántos pedidos puedes despachar de verdad. La venta del viernes no puede convertirse en el reclamo del lunes.",
    ],
    source: "Bloomberg Línea",
    url: "https://www.bloomberglinea.com/latinoamerica/colombia/cuando-es-el-black-friday-2026-en-colombia-cae-el-27-de-noviembre-y-asi-puede-preparar-sus-compras/",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    alt: "Bolsas de compras rojas y negras sobre fondo oscuro, temporada de Black Friday",
    contactMessage:
      "Hola, leí el artículo sobre el Black Friday 2026 y quiero preparar mi página web y mi WhatsApp para vender más el 27 de noviembre.",
  },
  {
    slug: "como-automatizar-whatsapp-business-negocio",
    tipo: "guia",
    category: "Automatización",
    date: "20 Oct 2026",
    displayDate: "Martes · 20 de octubre de 2026",
    title: "Cómo automatizar WhatsApp Business en un negocio pequeño",
    deck:
      "La mitad de lo que contestas en WhatsApp es lo mismo todos los días. Qué puedes automatizar gratis desde hoy, cuándo vale la pena un chatbot y qué no deberías automatizar nunca.",
    summary:
      "Guía para automatizar WhatsApp Business en un negocio pequeño: qué se hace gratis con la app, cuándo pasar a un chatbot y qué no conviene automatizar.",
    insight:
      "Automatizar WhatsApp no es poner un robot a hablar con tus clientes: es que lo de siempre se responda solo, para que tu equipo dedique su tiempo a cerrar ventas.",
    signals: [
      "Gratis, en la app de WhatsApp Business: mensaje de bienvenida, mensaje de ausencia fuera de horario, respuestas rápidas con atajo, etiquetas para ordenar clientes y catálogo con fotos y precios.",
      "La app se queda corta cuando varias personas contestan desde el mismo número, los mensajes se pierden o quieres que cada pedido quede guardado solo en una hoja de cálculo o en tu sistema.",
      "Con costo, la plataforma de WhatsApp Business (la API) permite chatbots, varios agentes y conexiones con n8n, tu CRM o tu agenda. Meta cobra por mensaje según el tipo y el país: pide la tarifa vigente para Colombia antes de montar nada.",
      "Vale la pena automatizar preguntas frecuentes, recordatorios de citas y estado de pedidos. No conviene automatizar quejas ni negociaciones: un bot que no deja hablar con una persona espanta clientes.",
      "Escribirle a un cliente que no te ha escrito tiene reglas: Meta exige que haya aceptado tus mensajes, y la Ley 1581 de 2012 te pide su autorización para usar sus datos con fines comerciales.",
    ],
    actions: [
      "Revisa tus chats de la última semana y anota las diez preguntas que más se repiten. Esa lista es tu guion de automatización.",
      "Conviértelas en respuestas rápidas: cortas, con el dato concreto y terminando con una pregunta que mueva la venta.",
      "Activa el mensaje de bienvenida (qué vendes, horario, cómo pedir) y el de ausencia con la hora en que vas a responder.",
      "Si después de eso sigues sin dar abasto, evalúa un chatbot. Exige que siempre permita hablar con una persona y que te digan cuántos mensajes al mes vas a pagar.",
    ],
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
    alt: "Celular sobre una tela gris con una carpeta llamada Messages que reúne cinco aplicaciones de mensajería: WhatsApp, Telegram, WeChat, Line y Signal",
    contactMessage:
      "Hola, leí la guía para automatizar WhatsApp Business y quiero saber qué respuestas y procesos de mi negocio se pueden automatizar.",
  },
  {
    slug: "meta-ads-product-browsing-28-octubre",
    category: "Meta Ads y publicidad",
    date: "15 Oct 2026",
    displayDate: "Jueves · 15 de octubre de 2026",
    title: "Meta activará product browsing en tus anuncios el 28 de octubre",
    deck:
      "Meta avisó a los anunciantes que una función que antes se encendía anuncio por anuncio pasará a estar activa por defecto en los anuncios que ya están corriendo. Tienes hasta el 28 de octubre para decidir.",
    summary:
      "Meta activará por defecto el product browsing en los anuncios en marcha el 28 de octubre de 2026. Qué es, cómo desactivarlo y qué revisar.",
    insight:
      "Product browsing es una experiencia dentro de Facebook o Instagram: cuando alguien toca tu anuncio, puede ver información del producto y sugerencias personalizadas sin salir de la aplicación. Hasta ahora era una mejora de Advantage+ que cada anunciante encendía anuncio por anuncio. Con el cambio, se enciende sola en los anuncios que ya tienes publicados. Para un negocio de Medellín que vende por Instagram, esto significa que parte del recorrido del cliente puede pasar a ocurrir dentro de la plataforma y no en tu página web ni en tu WhatsApp. Puede sumar ventas, pero también cambia dónde ocurre la decisión de compra, y por eso conviene decidirlo tú y no que lo decida un valor por defecto.",
    signals: [
      "El cambio lo avisó Meta a los anunciantes alrededor del 14 de octubre de 2026 y entra en vigor el 28 de octubre. PPC Land, el medio que lo reportó el 15 de octubre, aclara que la fecha no está confirmada en una página oficial: se deduce de una publicación en LinkedIn con el aviso y de un registro de cambios de terceros.",
      "Se puede desactivar antes de la fecha con el botón de salida del propio aviso, o en cualquier momento desde la configuración de Advantage+ Creative y Destination, anuncio por anuncio. No está claro si el botón del aviso afecta una sola cuenta publicitaria, todas o un portafolio de negocio.",
      "No queda claro si los anuncios nuevos nacerán con la función encendida. El aviso habla de los anuncios que ya están en marcha.",
      "Meta justifica el cambio con un promedio de 3 % más de conversiones por empresa, medido en un experimento del 6 al 21 de agosto de 2026 con unos 117.700 anunciantes en el mundo, con una confianza superior al 99 %. PPC Land señala que no se define qué cuenta como conversión ni cómo se hizo la comparación, y que no se informa el costo por conversión ni el retorno sobre la inversión publicitaria.",
      "El calendario aprieta: el aviso llega con unas dos semanas de antelación y la función quedará activa justo antes de Black Friday, el 27 de noviembre, y Cyber Monday, el 30 de noviembre de 2026.",
    ],
    actions: [
      "Entra a tu administrador de anuncios esta semana y revisa si te apareció el aviso. Si manejas varias cuentas, mira cada una por separado, porque no se sabe si el botón las cubre todas.",
      "Decide con un criterio simple: si tu producto se vende bien con la información que Meta muestra dentro de la aplicación, déjalo encendido; si tu venta depende de que el cliente llegue a tu web o te escriba por WhatsApp, apágalo en esos anuncios.",
      "Si lo dejas encendido, no lo evalúes a ojo: compara ventas reales, no solo clics ni conversiones del panel, durante las dos semanas antes y las dos semanas después del 28 de octubre.",
      "Revisa que tus anuncios lleven a algo que puedas medir. Un anuncio que termina en un formulario o en un chat registrado te dice cuánto vendiste. Uno que termina en la nada, no.",
      "Antes de Black Friday, deja listos los anuncios que mejor te han funcionado y no cambies la configuración en plena campaña.",
    ],
    source: "PPC Land",
    url: "https://ppc.land/meta-will-turn-on-product-browsing-in-existing-ads-on-october-28/",
    image: "/blog-img/meta-ads-product-browsing-28-octubre.webp",
    alt: "Tarjeta de producto de un anuncio con un interruptor de activación al lado",
    contactMessage:
      "Hola, leí el artículo sobre el product browsing de Meta Ads y quiero revisar la configuración de mis anuncios antes del 28 de octubre.",
  },
  {
    slug: "google-spam-update-septiembre-2026",
    category: "SEO y Google",
    date: "8 Oct 2026",
    displayDate: "Jueves · 8 de octubre de 2026",
    title: "Google cerró su actualización antispam: qué revisar en tu web",
    deck:
      "Google lanzó el 24 de septiembre una actualización contra el spam que tardó casi dos semanas en completarse. Ya terminó, y es buen momento para mirar cómo quedó tu página.",
    summary:
      "Google completó el 8 de octubre de 2026 su actualización antispam de septiembre. Qué dijo, qué no dijo y cómo revisar en Search Console si te afectó.",
    insight:
      "Una actualización de spam no es una penalización a una web en particular: es un cambio en los sistemas con los que Google decide qué resultados mostrar. La de septiembre de 2026 se aplica en todo el mundo y en todos los idiomas, así que también cuenta para una pyme de Medellín que compite por búsquedas como desarrollo web o servicios locales. Google no dijo qué prácticas apunta, y esa es justamente la razón para no entrar en pánico ni correr a cambiar la web. Lo sensato es mirar los datos con calma, comparar antes y después, y asegurarte de que tu sitio no hace nada de lo que Google ya ha dicho que no quiere ver.",
    signals: [
      "Según el Panel de Estado de Búsqueda de Google, la actualización se lanzó el 24 de septiembre de 2026 a las 9:15 a. m., hora del Pacífico de Estados Unidos. Google anunció que se aplica globalmente y a todos los idiomas, y que su despliegue podía tardar hasta dos semanas.",
      "El mismo panel registra que el despliegue se completó el 8 de octubre de 2026. El encabezado de la página marca la 1:00 a. m. como cierre y la entrada final tiene las 1:37 a. m., hora del Pacífico, así que la hora exacta varía según qué línea se lea.",
      "El aviso de Google no explica qué tácticas de spam apunta esta actualización. Cualquier lista de culpables que circule por ahí es una suposición, no un dato de Google.",
      "Las políticas de spam de Google, que están publicadas en su documentación, incluyen prácticas como el contenido generado en masa sin valor, las páginas creadas solo para posicionar variaciones de una búsqueda y el relleno de palabras clave. Ninguna de estas es una novedad: ya estaban escritas.",
      "Que la actualización haya terminado no significa que tus posiciones se hayan quedado quietas durante esas dos semanas. Si viste movimientos, tienes que compararlos con fechas, no con sensaciones.",
    ],
    actions: [
      "Abre Google Search Console y compara el rendimiento de las dos semanas anteriores al 24 de septiembre con el de las dos semanas posteriores al 8 de octubre. Mira clics, impresiones y las páginas que más cambiaron.",
      "Si no tienes Search Console conectado, hazlo esta semana. Sin ese dato no vas a saber si te afectó o si fue una semana floja por otra razón.",
      "Revisa tu sitio contra las políticas de spam de Google. Una web con páginas casi idénticas donde solo cambia el nombre del barrio o de la ciudad, o con textos llenos de la misma palabra repetida, es la que debería preocuparte.",
      "No cambies medio sitio de golpe por una caída de pocos días. Si encuentras un problema real, corrígelo y anota la fecha para poder medir el efecto.",
      "Cada página debe responder algo que el cliente de verdad pregunta. Es la mejor protección contra cualquier actualización, la de septiembre y las que vienen.",
    ],
    source: "Google Search Status Dashboard",
    url: "https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu",
    image: "/blog-img/google-spam-update-septiembre-2026.webp",
    alt: "Escudo con una marca de verificación sobre dos páginas web",
    contactMessage:
      "Hola, leí el artículo sobre la actualización antispam de Google y quiero que revisen cómo está mi página web y si cumple las políticas de Google.",
  },
  {
    slug: "google-business-resenas-spam-pausa",
    category: "SEO local y Google Maps",
    date: "22 Sep 2026",
    displayDate: "Martes · 22 de septiembre de 2026",
    title: "Google pausa las reseñas de tu negocio si detecta spam: qué hacer",
    deck:
      "Google está avisando por correo a los dueños de fichas de negocio cuando sus sistemas detectan un pico de reseñas falsas: las elimina y pausa las nuevas. El problema es que el filtro puede confundir una buena semana con un ataque.",
    summary:
      "Google avisa por correo cuando detecta un pico de reseñas spam en tu ficha, las elimina y pausa las nuevas. Qué dice y cómo cuidar tus reseñas.",
    insight:
      "Para un negocio local, las reseñas de Google son parte del escaparate: son lo primero que mira un cliente nuevo antes de escribirte o de venir. Por eso importa lo que Search Engine Roundtable reportó el 22 de septiembre de 2026: Google ya está enviando un correo a los propietarios cuando sus sistemas antispam detectan un aumento repentino de reseñas falsas en la ficha. Google las elimina para que no afecten la calificación y, mientras tanto, pausa de forma temporal las nuevas calificaciones, reseñas y otras contribuciones de usuarios. En principio es una protección. En la práctica, abre una pregunta incómoda para quien pide reseñas de manera constante.",
    signals: [
      "El asunto del correo es Protecting your Business Profile from spam reviews. El texto dice que Google detectó un aumento de reseñas spam y las eliminó, y que las nuevas calificaciones y contribuciones quedaron temporalmente en pausa.",
      "Según el aviso, Google levanta la pausa cuando el riesgo se controla, normalmente en unos pocos días. Es el texto del correo: Google no ha publicado una duración oficial.",
      "El propietario no tiene que hacer nada, pero si cree que se eliminaron reseñas legítimas por error, el correo le permite pedir una revisión.",
      "La captura del correo la compartió en LinkedIn Antoine Cameron. Search Engine Roundtable aclara que la página no incluye un anuncio oficial de Google: lo que se conoce del aviso viene de esa captura.",
      "Amy Toman, que comenta en la nota, cuenta que un cliente recibió el aviso después de abrir una sucursal nueva y de recibir reseñas de forma constante. Ella considera que el filtro necesita ajustes, lo que sugiere que puede atrapar reseñas reales.",
    ],
    actions: [
      "Revisa tu ficha de Google Business Profile y confirma que el correo de la cuenta es uno que de verdad lees. El aviso llega por correo a los propietarios y, si nadie lo ve, nadie se entera de que las reseñas están pausadas.",
      "Si recibes el aviso, no pidas reseñas a toda tu base de clientes de golpe para compensar. Esperar a que la pausa se levante es mejor que parecer otro pico.",
      "Cuando se levante la pausa, revisa si desaparecieron reseñas reales. Si es así, usa la opción de pedir una revisión que trae el correo.",
      "Pide reseñas de forma pareja y natural, por ejemplo al entregar un trabajo o cerrar una venta, en lugar de lanzar una campaña masiva un solo día. Es una recomendación nuestra, no una regla de Google, y tiene sentido porque el filtro mira picos.",
      "Nunca compres reseñas ni se las pidas a conocidos que no han sido clientes. Es justo el tipo de patrón que estos sistemas están diseñados para cortar.",
    ],
    source: "Search Engine Roundtable",
    url: "https://www.seroundtable.com/google-business-profiles-spike-in-spam-reviews-42123.html",
    image: "/blog-img/google-business-resenas-spam-pausa.webp",
    alt: "Pin de ubicación con un símbolo de pausa sobre cinco estrellas de calificación",
    contactMessage:
      "Hola, leí el artículo sobre las reseñas de Google Business Profile y quiero ayuda para ordenar la ficha de mi negocio y conseguir reseñas de forma segura.",
  },
  {
    slug: "whatsapp-business-cobro-mensajes-octubre-2026",
    category: "Automatización y WhatsApp",
    date: "22 Sep 2026",
    displayDate: "Martes · 22 de septiembre de 2026",
    title: "WhatsApp cobra respuestas a empresas desde octubre: ¿te afecta?",
    deck:
      "Desde el 1 de octubre de 2026, las empresas que usan WhatsApp Business Platform pagan por los mensajes de servicio que superen 1.000 al mes por número. Si solo usas la aplicación gratuita, no cambia nada.",
    summary:
      "Desde el 1 de octubre de 2026 WhatsApp cobra a empresas con API los mensajes de servicio sobre 1.000 al mes. A quién afecta y qué revisar.",
    insight:
      "El cambio se explica fácil y se confunde fácil. No es que WhatsApp deje de ser gratis para los negocios: es que Meta empezó a cobrar a las empresas que lo usan a través de la plataforma de pago, la que se conecta con un CRM, un chatbot o un sistema de atención con varios agentes. Si en tu negocio alguien contesta desde la aplicación de WhatsApp Business en un celular, sigues igual. Si montaste automatizaciones, o tu proveedor lo hizo por ti, estás en el grupo afectado, y vale la pena preguntarte hoy cuántos mensajes salen cada mes y quién paga la factura.",
    signals: [
      "Proceso, que lo publicó el 22 de septiembre de 2026, explica que desde el 1 de octubre Meta cobra por cada mensaje de servicio entregado por empresas que usan WhatsApp Business Platform. Hasta el 30 de septiembre, las respuestas dentro de la ventana de 24 horas eran gratis.",
      "Cada número empresarial tiene 1.000 mensajes de servicio gratis al mes. El cobro empieza con el mensaje 1.001 del mismo mes, el cupo se reinicia mensualmente y lo que no se use no se acumula.",
      "Los mensajes de utilidad, como confirmaciones de pedido, avisos de entrega, recibos o recordatorios de cita, se cobran incluso dentro de la ventana de 24 horas. Para un negocio que automatiza avisos, esta es la parte que más pesa.",
      "El precio depende del país del cliente y de la categoría del mensaje. La nota no da una tarifa para Colombia ni un valor único: hay que consultar la tabla de tarifas vigente desde octubre. Además, el proveedor o el CRM pueden sumar su propio cobro.",
      "El cobro es por mensaje entregado, no por conversación. Proceso pone un ejemplo: una respuesta sobre un pedido partida en saludo, petición del número de compra y estado del envío cuenta como tres cargos. Los mensajes que el cliente envía a la empresa siguen siendo gratis y los intentos de envío no entregados no se cobran.",
      "Las conversaciones que empiezan desde un anuncio de clic a WhatsApp o desde un botón de una página de Facebook tienen una ventana gratuita que la nota describe, hoy, de 72 horas.",
    ],
    actions: [
      "Averigua primero en cuál de los dos mundos estás: aplicación de WhatsApp Business en el celular, o plataforma conectada a un sistema. Es la pregunta que decide si esto te importa.",
      "Si tienes la plataforma, pídele a tu proveedor el número de mensajes de servicio y de utilidad que enviaste el último mes y cuánto de eso habría quedado fuera del cupo de 1.000.",
      "Revisa tus flujos automáticos y junta en un solo mensaje lo que hoy sale en tres. Responder de forma completa y corta no solo cuesta menos: también se lee mejor.",
      "Antes de presupuestar, confirma con tu proveedor y en la documentación de Meta las condiciones vigentes y la tarifa para Colombia, que no aparece en la nota. Pregunta también quién tiene registrado el método de pago.",
      "Si tu negocio depende de WhatsApp para vender, no pongas todo en un solo canal: ten también el formulario de tu página y el correo funcionando.",
    ],
    source: "Proceso",
    url: "https://www.proceso.com.mx/ciencia-tecnologia/2026/9/22/whatsapp-cobrara-por-mensaje-desde-octubre-quienes-deberan-pagar-380407.html",
    image: "/blog-img/whatsapp-business-cobro-mensajes-octubre-2026.webp",
    alt: "Dos burbujas de conversación y un contador de 1.000 mensajes gratuitos",
    contactMessage:
      "Hola, leí el artículo sobre el cobro de mensajes de WhatsApp Business y quiero saber cómo me afecta y si conviene ajustar mis automatizaciones.",
  },
  {
    slug: "ia-empresas-colombianas-adopcion-escalar",
    category: "IA Práctica",
    date: "21 Sep 2026",
    displayDate: "Lunes · 21 de septiembre de 2026",
    title: "IA en Colombia: 61 % la prioriza, 37,7 % la integra",
    deck:
      "Un estudio de Endeavor Data Unit con Xertica.ai encuestó a 493 profesionales de empresas colombianas y encontró una brecha clara entre querer usar IA y lograr que funcione en el día a día.",
    summary:
      "Estudio de Endeavor y Xertica.ai: 61 % de las empresas colombianas ve la IA como prioridad y 37,7 % la integró de forma significativa. Qué aprender.",
    insight:
      "El estudio se llama Colombia AI Pulse: Adoptar ya no basta y lo reportó Infobae el 21 de septiembre de 2026. Ojo con la muestra: son 493 profesionales de organizaciones colombianas con al menos 50 empleados, de siete industrias. Eso deja por fuera a las microempresas y a los negocios pequeños, así que no mide a tu tienda de barrio ni a tu consultorio. Pero sí funciona como espejo: si empresas más grandes se estancan entre la intención y el resultado, una pyme tiene aún más razones para empezar por algo pequeño, concreto y medible.",
    signals: [
      "El 61 % considera la IA una prioridad estratégica o un pilar central del negocio, pero solo el 37,7 % dice haberla integrado de manera significativa en sus operaciones.",
      "Colombia saca 45,6 puntos sobre 100 en el Índice de Sofisticación de IA del estudio, frente a 45,1 de México. El 93,5 % de las organizaciones está en etapas intermedias de madurez y solo el 0,2 % llega a la categoría Liderando.",
      "El tamaño pesa: las empresas de más de 500 empleados promedian 49,6 puntos y las de 50 a 99 trabajadores, 42,1.",
      "Las tres barreras que más se repiten son ciberseguridad y privacidad, citada por el 50 %, infraestructura o integración de sistemas, por el 40 %, y talento especializado o calidad de los datos, por cerca del 33 %.",
      "El 63,7 % de los usos opera con asistencia o control humano directo y el 36,3 % tiene algún grado de delegación o funcionamiento autónomo. El estudio advierte que más autonomía no equivale a más madurez: en procesos sensibles, mantener a una persona al mando puede ser una decisión deliberada.",
      "El 62 % tiene políticas de IA documentadas y aplicadas de forma consistente, y cerca del 20 % no tiene ninguna. Además, el 71,9 % aumentó su presupuesto de IA en los últimos 12 meses.",
    ],
    actions: [
      "Antes de comprar una herramienta, escribe qué proceso concreto quieres mejorar y cómo vas a medir si mejoró. Si no puedes medirlo, todavía no es un proyecto.",
      "Empieza por un caso que se pueda repetir, como responder preguntas frecuentes, ordenar pedidos o resumir reuniones. Según Saúl Chrem, de Xertica.ai, que cita Infobae, casi todas las organizaciones tienen al menos un caso funcionando, pero solo cuatro de cada diez logran que sea reutilizable.",
      "Define una regla corta sobre qué información de clientes se puede subir a una herramienta de IA y cuál no. La seguridad y la privacidad son la barrera más citada.",
      "Deja a una persona revisando lo que la IA hace con clientes. Controlar no es falta de ambición, es parte de hacerlo bien.",
      "Asegúrate de que tus datos estén ordenados: una lista de clientes duplicada o un inventario desactualizado no se arreglan con IA, se vuelven un error más rápido.",
    ],
    source: "Infobae",
    url: "https://www.infobae.com/tecno/2026/09/21/la-ia-ya-es-prioridad-para-las-empresas-colombianas-pero-solo-4-de-cada-10-la-integran/",
    image: "/blog-img/ia-empresas-colombianas-adopcion-escalar.webp",
    alt: "Gráfico de barras ascendentes con un punto de conexión que representa la adopción de inteligencia artificial",
    contactMessage:
      "Hola, leí el artículo sobre el estudio de IA en empresas colombianas y quiero identificar un primer proceso de mi negocio donde la IA sirva de verdad.",
  },
  {
    slug: "que-es-transformacion-digital-pyme",
    tipo: "guia",
    category: "Transformación digital",
    date: "20 Sep 2026",
    displayDate: "Sábado · 20 de septiembre de 2026",
    title: "Qué es la transformación digital para una pyme (y por dónde se empieza)",
    deck:
      "Casi todos creen que es comprar software. Casi siempre es lo contrario: quitar trabajo manual que nadie debería estar haciendo.",
    summary:
      "Transformación digital no es comprar herramientas: es dejar de hacer a mano lo que te cuesta horas. Qué significa para una pyme y por dónde empezar.",
    insight:
      "Si una herramienta nueva no le quita trabajo a alguien de tu equipo ni le resuelve algo al cliente, no es transformación digital: es un gasto con pantalla bonita.",
    signals: [
      "Digitalizar y transformar no son lo mismo. Pasar tu cuaderno a un Excel es digitalizar. Que el pedido entre por WhatsApp, quede registrado solo y le avise a quien despacha, eso es transformar.",
      "El cuello de botella casi nunca es la tecnología, es el proceso. Si nadie sabe quién responde los mensajes, ningún sistema lo va a decidir por ti.",
      "Empieza por lo que más duele, no por lo más moderno. El orden natural suele ser: que te encuentren, que te puedan escribir, que quede registrado y que no se te pierda nadie.",
      "Lo que no se mide no se puede mejorar. Antes de cambiar algo, ten claro cuántas horas o cuántos clientes se están yendo por ahí.",
      "Un proyecto que solo entiende la persona que lo montó es un riesgo, no un avance.",
    ],
    actions: [
      "Escribe las tres tareas que tu equipo repite más de tres veces por semana. Esa lista es tu punto de partida real.",
      "Calcula cuánto tiempo se va en la primera de las tres. Multiplícalo por las semanas del mes: ese es el costo que llevas pagando sin verlo.",
      "Resuelve una sola, completa, antes de tocar la siguiente. Media transformación en cinco frentes no sirve para nada.",
      "Antes de contratar cualquier desarrollo, pide que te expliquen qué pasa el día que la persona que lo montó no esté.",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipo de una empresa pequeña revisando procesos e indicadores en una reunión",
    contactMessage:
      "Hola, leí el artículo sobre transformación digital y quiero identificar qué procesos de mi negocio se pueden dejar de hacer a mano.",
  },
  {
    slug: "herramientas-ia-negocios-pequenos",
    tipo: "guia",
    category: "IA Práctica",
    date: "20 Sep 2026",
    displayDate: "Sábado · 20 de septiembre de 2026",
    title: "Herramientas de IA para negocios pequeños: cuáles sirven de verdad",
    deck:
      "Hay cientos y casi todas prometen lo mismo. Estas son las categorías que de verdad le cambian el día a un negocio pequeño, y cómo saber si te sirven.",
    summary:
      "Guía práctica de herramientas de IA para pequeños negocios: qué categorías sirven de verdad, cómo elegir y qué revisar antes de pagar una suscripción.",
    insight:
      "La pregunta correcta no es cuál es la mejor herramienta de IA, sino qué tarea concreta le vas a quitar de encima a una persona. Sin esa respuesta, cualquier herramienta sobra.",
    signals: [
      "Atención de mensajes. Es donde más rápido se nota: responder lo de siempre (precios, horarios, si hay domicilio) sin que alguien tenga que estar pegado al celular.",
      "Escritura y contenido. Sirve para ir más rápido con publicaciones, descripciones de producto y correos. No sirve para publicar sin leer: el texto hay que revisarlo siempre.",
      "Orden de la información. Resumir reuniones, pasar audios a texto, sacar los datos de una factura. Tareas aburridas donde el error humano es alto.",
      "Conectar herramientas entre sí. Que un formulario llene tu base de datos y avise por WhatsApp sin que nadie copie y pegue.",
      "Cuidado con el dato que subes. Si una herramienta gratuita procesa información de tus clientes, esa información sale de tu negocio. Vale la pena saber a dónde va.",
    ],
    actions: [
      "Elige una sola tarea repetitiva y mide cuánto tiempo consume hoy. Sin ese número no vas a saber si la herramienta sirvió.",
      "Prueba primero lo que ya tienes: WhatsApp Business trae respuestas automáticas y no cuesta nada.",
      "Antes de pagar una suscripción anual, úsala un mes completo en el trabajo real. La mayoría se abandona a las dos semanas.",
      "Deja por escrito qué herramientas puede usar el equipo y qué datos no se suben nunca. Una regla de tres líneas evita el problema antes de que exista.",
    ],
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    alt: "Personas trabajando con computadores en una oficina pequeña",
    contactMessage:
      "Hola, leí el artículo sobre herramientas de IA y quiero saber cuáles aplican a mi negocio y por cuál empezar.",
  },
  {
    slug: "ransomware-latam-pymes-colombia-alerta",
    category: "Ciberseguridad y datos",
    date: "2 May 2026",
    displayDate: "Sábado · 2 de mayo de 2026",
    title: "El 88% de los ataques de ransomware en LATAM apuntan a pymes: Colombia, en alerta",
    deck:
      "Colombia es el único país de LATAM donde el spyware está creciendo, y las pymes son el blanco principal.",
    summary:
      "El informe Cyber Protect 2026 de SonicWall advierte que 88% de las filtraciones de ransomware en 2025 afectaron a pymes, con Colombia en alerta por el crecimiento del spyware.",
    insight:
      "No te atacan porque seas grande. Te atacan porque no tienes protección: una sola brecha puede paralizar operaciones, exponer datos de clientes y generar riesgos legales.",
    signals: [
      "El 88% de las filtraciones de ransomware en 2025 afectaron a pymes, más del doble que a grandes empresas.",
      "En Colombia, los ataques de gravedad alta y media aumentaron 20.8%.",
      "Colombia es el único mercado de América Latina donde el spyware muestra una tendencia al alza del 50.1%.",
    ],
    actions: [
      "Activa autenticación de dos factores (2FA) en Gmail, Meta Ads, WhatsApp Business y todas las cuentas críticas.",
      "Haz una copia de seguridad de tus datos importantes esta semana en Google Drive, OneDrive u otra nube confiable.",
      "Revisa qué personas del equipo tienen acceso a cada sistema; menos accesos significan menos riesgo.",
    ],
    source: "SonicWall Cyber Protect Report 2026 / Noticias Super",
    url: "https://elespaciodigital.com/ciberseguridad/sonicwall-revela-que-el-88-de-filtraciones-en-pymes-se-vincula-a-ransomware-pese-a-caida-del-volumen-global/",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    alt: "Panel de ciberseguridad con alertas digitales y protección de datos",
    contactMessage:
      "Hola, leí el blog sobre ransomware en pymes y quiero revisar si mi negocio está protegido: accesos, copias de seguridad, datos de clientes y riesgos de seguridad.",
  },
  {
    slug: "zapier-make-n8n-automatizar-pyme",
    category: "Automatización",
    date: "30 Abr 2026",
    displayDate: "Jueves · 30 de abril de 2026",
    title: "Zapier, Make o n8n: cuál elegir para automatizar tu pyme sin saber programar",
    deck:
      "En 2026 la automatización ya no es 'si pasa esto, haz aquello': ahora piensa, decide y actua sola.",
    summary:
      "Zapier, Make y n8n lideran la automatización no-code para pymes, pero elegir la herramienta equivocada puede costarte tiempo, dinero y procesos mal armados.",
    insight:
      "Para una pyme con equipo pequeño, automatizar bien un proceso repetitivo puede equivaler a sumar capacidad operativa sin contratar otra persona.",
    signals: [
      "Zapier destaca por facilidad de uso y más de 7.000 integraciones.",
      "Make funciona bien para flujos visuales complejos y suele tener mejor precio por volumen.",
      "n8n gana fuerza por ser código abierto e ideal para automatizaciones con IA integrada.",
    ],
    actions: [
      "Si estás empezando y no tienes conocimientos técnicos, prueba Zapier con su plan gratis de 100 tareas al mes.",
      "Si necesitas flujos más complejos con buen precio, evalúa Make y sus 1.000 operaciones gratis al mes.",
      "Automatiza primero lo más doloroso: responder leads, agendar citas o notificar al equipo de ventas.",
    ],
    source: "Aprender21 / Ecosistema Startup / NoCode Hackers",
    url: "https://www.aprender21.com/blog/automatizacion-ia-n8n-make-zapier",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipo revisando flujos de automatización en pantallas de trabajo",
    contactMessage:
      "Hola, leí el blog sobre Zapier, Make y n8n. Quiero identificar qué procesos de mi negocio puedo automatizar primero: leads, WhatsApp, CRM, agenda o seguimiento comercial.",
  },
  {
    slug: "ia-no-opcional-pyme-latam",
    category: "IA Práctica",
    date: "27 Abr 2026",
    displayDate: "Lunes · 27 de abril de 2026",
    title: "La IA ya no es opcional para tu pyme: el 54% de negocios en LATAM ya la usan",
    deck:
      "El 54% de las pymes latinoamericanas ya usan IA — pero solo las que saben cómo están ganando de verdad.",
    summary:
      "Según Microsoft, 54% de pymes en LatAm ya integra IA; Amazon Ads reporta que 65% de quienes la usan en publicidad ahorra 5.6 horas semanales.",
    insight:
      "Señal para pymes: automatizar tareas repetitivas libera horas que vuelven a ventas, atención y exploración de nuevos mercados.",
    signals: [
      "La adopción de IA pasó de tendencia a estándar operativo para pymes en la región.",
      "Las horas recuperadas se traducen en capacidad real para vender y atender mejor.",
      "La brecha entre quienes usan IA y quienes no se amplía cada mes.",
    ],
    actions: [
      "Identifica 1 tarea que repites más de 3 veces por semana y busca si hay una herramienta de IA que la pueda hacer.",
      "Prueba WhatsApp Business con respuestas automáticas — ya tiene IA integrada y es gratis.",
      "Si usas Meta Ads, activa las sugerencias automáticas de IA para tus anuncios — están disponibles sin costo adicional.",
    ],
    source: "Microsoft News LATAM",
    url: "https://news.microsoft.com/source/latam/noticias-de-microsoft/encuesta-pymes-2025-54-de-las-pymes-en-las-americas-usa-ia/",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    alt: "Persona trabajando con una laptop y graficas digitales relacionadas con IA",
  },
  {
    slug: "meta-ia-pequenos-negocios",
    category: "IA para ventas",
    date: "25 Mar 2026",
    title: "Meta enfoca una nueva iniciativa en pequeños negocios",
    deck:
      "Las plataformas sociales quieren convertir la IA en una capa diaria para vender, responder y operar conversaciones con clientes.",
    summary:
      "Meta Small Business apunta a que emprendedores usen IA en Facebook, Instagram y WhatsApp para vender, atender y crecer con menos fricción.",
    insight:
      "Señal para pymes: preparar catálogos, respuestas y anuncios para canales conversacionales con IA.",
    signals: [
      "Facebook, Instagram y WhatsApp siguen siendo vitrinas de venta para millones de negocios pequeños.",
      "La atención al cliente se está moviendo hacia conversaciones asistidas por IA, no solo publicaciones y anuncios.",
      "Los negocios con datos de producto claros tendrán ventaja cuando las plataformas automaticen más pasos de venta.",
    ],
    actions: [
      "Ordena preguntas frecuentes, precios, tiempos de entrega y políticas para que un asistente pueda responder sin improvisar.",
      "Actualiza catálogos y descripciones de producto con beneficios concretos, no solo características.",
      "Prueba respuestas asistidas por IA con supervisión humana antes de automatizar atención sensible.",
    ],
    source: "Axios",
    url: "https://www.axios.com/2026/03/25/exclusive-zuckerberg-launches-meta-small-business",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipo de una pequeña empresa trabajando con tecnología",
  },
  {
    slug: "gartner-ciberseguridad-ia",
    category: "Ciberseguridad",
    date: "5 Feb 2026",
    title: "Gartner alerta sobre nuevas reglas de seguridad con IA",
    deck:
      "La IA ya no es solo una herramienta de productividad: también crea nuevos accesos, permisos y riesgos de fuga de datos.",
    summary:
      "El avance de agentes de IA y el uso de cuentas personales de GenAI elevan el riesgo de accesos, datos sensibles y cumplimiento.",
    insight:
      "Señal para pymes: definir qué herramientas de IA se permiten, qué datos nunca se suben y quién aprueba accesos.",
    signals: [
      "El uso de cuentas personales de IA en el trabajo puede exponer información de clientes, contratos o campañas.",
      "Los agentes de IA necesitan permisos, y esos permisos deben tratarse como accesos de empleados o proveedores.",
      "La capacitación genérica de seguridad ya no alcanza si el equipo usa IA para tareas reales.",
    ],
    actions: [
      "Crea una política simple: herramientas permitidas, datos prohibidos y responsables de aprobación.",
      "Usa cuentas de empresa para herramientas críticas y evita compartir contraseñas por chat o documentos.",
      "Revisa qué automatizaciones tienen acceso a correo, CRM, archivos, pagos o información de clientes.",
    ],
    source: "Gartner",
    url: "https://www.gartner.com/en/newsroom/press-releases/2026-02-05-gartner-identifies-the-top-cybersecurity-trends-for-2026",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    alt: "Pantallas con código y controles de ciberseguridad",
  },
  {
    slug: "pymes-adopcion-tecnologica-2026",
    category: "Inversión tech",
    date: "16 Dic 2025",
    title: "Más pymes planean acelerar su adopción tecnológica",
    deck:
      "La inversión digital se está moviendo hacia herramientas que reducen trabajo manual y elevan la experiencia del cliente.",
    summary:
      "Clutch reporta que 55% de pequeñas empresas aumentará gasto tecnológico en 2026, con web, software, apps e IA entre prioridades.",
    insight:
      "Señal para pymes: invertir primero donde tecnología reduzca trabajo manual o mejore la experiencia del cliente.",
    signals: [
      "Web, software, apps, IA e infraestructura aparecen entre las prioridades de inversión para 2026.",
      "La presión viene de clientes que esperan respuestas rápidas, procesos simples y experiencias digitales claras.",
      "La falta de experiencia técnica interna sigue siendo una barrera para ejecutar bien.",
    ],
    actions: [
      "Elige un proceso repetitivo y mide cuánto tiempo consume antes de comprar herramientas.",
      "Prioriza mejoras visibles para clientes: formularios, pagos, reservas, seguimiento y soporte.",
      "Si contratas ayuda externa, define entregables medibles y revisiones por etapas.",
    ],
    source: "Business Wire / Clutch",
    url: "https://www.businesswire.com/news/home/20251216823520/en/Clutch-Report-55-of-Small-Businesses-Will-Accelerate-Tech-Adoption-in-2026-as-Customer-Demands-Rise",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Persona revisando indicadores digitales en un computador portátil",
  },
  {
    slug: "visa-ia-pagos-negocios",
    category: "Pagos inteligentes",
    date: "13 Ene 2026",
    title: "Visa ve a pequeños negocios avanzando más rápido con IA",
    deck:
      "La IA empieza a tocar pagos, comercio y decisiones operativas, especialmente en negocios que ya digitalizaron parte de su venta.",
    summary:
      "Visa proyecta que la adopción de IA y la inversión empresarial reconfiguran el comercio, con pequeños negocios usando IA a mayor ritmo que consumidores.",
    insight:
      "Señal para pymes: conectar ventas, pagos e inventario para que la IA pueda apoyar decisiones reales, no solo generar texto.",
    signals: [
      "Los negocios que integran IA muestran señales de mayor crecimiento transaccional, según el análisis de Visa.",
      "La inversión empresarial puede compensar un consumo más suave si se enfoca en productividad.",
      "Los pagos digitales serán una fuente de datos clave para entender demanda, recurrencia y flujo de caja.",
    ],
    actions: [
      "Centraliza ventas y pagos para ver qué productos, canales y horarios producen mejor margen.",
      "Usa reportes semanales de flujo de caja antes de automatizar decisiones de inventario o descuentos.",
      "Prepara tu tienda para compras asistidas por IA con información clara de precio, disponibilidad y entrega.",
    ],
    source: "Visa",
    url: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.22006.html",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
    alt: "Cliente realizando un pago digital en un comercio",
  },
];

export const NEWS_BASE_PATH = "/blog";

export const getNewsBySlug = (slug: string) =>
  NEWS_ITEMS.find((newsItem) => newsItem.slug === slug) ?? null;

export const getIsoDateFromNewsDate = (rawDate: string) => {
  const [dayRaw, monthRaw, yearRaw] = rawDate.split(" ");
  const monthMap: Record<string, string> = {
    ene: "01",
    feb: "02",
    mar: "03",
    abr: "04",
    may: "05",
    jun: "06",
    jul: "07",
    ago: "08",
    sep: "09",
    oct: "10",
    nov: "11",
    dic: "12",
  };
  const month = monthMap[monthRaw.toLowerCase()] ?? "01";
  const day = dayRaw.padStart(2, "0");
  return `${yearRaw}-${month}-${day}`;
};

// Las imágenes del blog vienen de Unsplash a 1200px, que es lo que necesita la
// portada del artículo y la vista previa al compartir. En la tarjeta del listado
// el hueco tiene otra forma: en computador es alto y angosto (~210 x 480-700 px)
// y en celular es apaisado (todo el ancho x ~190 px). Se le pide a Unsplash la
// foto ya recortada a esa forma: pesa una fracción y se ve nítida. Con una foto
// apaisada pequeña, el recorte la estiraba y quedaba borrosa.
export const imagenRecortada = (url: string, ancho: number, alto: number) => {
  // Las miniaturas propias (public/blog-img) vienen en dos formas ya recortadas:
  // apaisada (1200 x 630) y vertical (480 x 1440, para el hueco alto del
  // computador). No llevan parámetros de tamaño: es un archivo estático.
  if (url.startsWith("/")) return alto > ancho ? url.replace(/\.webp$/, "-vertical.webp") : url;
  const base = url.replace(/([?&])(w|h)=[^&]*/g, "$1").replace(/[?&]+$/, "").replace(/&&+/g, "&");
  const separador = base.includes("?") ? "&" : "?";
  // Recorte centrado, igual que el object-fit: cover de antes: mismo encuadre.
  return `${base}${separador}w=${ancho}&h=${alto}`;
};
