import { useEffect, useState } from "react";

type NewsItem = {
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
  source: string;
  url: string;
  image: string;
  alt: string;
  contactMessage?: string;
};

type NewsCtaConfig = {
  title: string;
  description: string;
  buttonLabel: string;
  suggestedService: "Automatizacion" | "Consultoria" | "Marketing Digital" | "Otro";
};

const NEWS_CTA_BY_KEYWORD: Array<{ keyword: string; config: NewsCtaConfig }> = [
  {
    keyword: "ia",
    config: {
      title: "Quieres implementar IA en tu negocio?",
      description:
        "Te ayudamos a convertir esta tendencia en procesos reales de ventas, atencion y productividad.",
      buttonLabel: "Contactanos para implementarlo en tu negocio",
      suggestedService: "Automatizacion",
    },
  },
  {
    keyword: "automatizacion",
    config: {
      title: "Quieres automatizar procesos en tu negocio?",
      description:
        "Diseñamos flujos practicos para reducir tareas manuales y escalar tu operacion sin friccion.",
      buttonLabel: "Quiero automatizar",
      suggestedService: "Automatizacion",
    },
  },
  {
    keyword: "ciberseguridad",
    config: {
      title: "Quieres proteger mejor tu negocio?",
      description:
        "Te acompañamos a definir controles y buenas practicas para reducir riesgos digitales en tu empresa.",
      buttonLabel: "Fortalecer seguridad",
      suggestedService: "Consultoria",
    },
  },
];

const DEFAULT_NEWS_CTA: NewsCtaConfig = {
  title: "Quieres aplicar esto en tu empresa?",
  description:
    "Traducimos esta señal en un plan de implementacion claro para tu contexto y tus objetivos.",
  buttonLabel: "Hablar con un especialista",
  suggestedService: "Consultoria",
};

const NEWS_CTA_STORAGE_KEY = "eternalgrowth_news_cta";

const getNewsCtaConfig = (category: string): NewsCtaConfig => {
  const normalizedCategory = category.toLowerCase();
  const matched = NEWS_CTA_BY_KEYWORD.find(({ keyword }) =>
    normalizedCategory.includes(keyword),
  );

  return matched?.config ?? DEFAULT_NEWS_CTA;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    slug: "ransomware-latam-pymes-colombia-alerta",
    category: "Ciberseguridad y datos",
    date: "2 May 2026",
    displayDate: "Sabado - 2 de mayo de 2026",
    title: "El 88% de los ataques de ransomware en LATAM apuntan a pymes: Colombia, en alerta",
    deck:
      "Colombia es el unico pais de LATAM donde el spyware esta creciendo, y las pymes son el blanco principal.",
    summary:
      "El informe Cyber Protect 2026 de SonicWall advierte que 88% de las filtraciones de ransomware en 2025 afectaron a pymes, con Colombia en alerta por el crecimiento del spyware.",
    insight:
      "No te atacan porque seas grande. Te atacan porque no tienes proteccion: una sola brecha puede paralizar operaciones, exponer datos de clientes y generar riesgos legales.",
    signals: [
      "El 88% de las filtraciones de ransomware en 2025 afectaron a pymes, mas del doble que a grandes empresas.",
      "En Colombia, los ataques de gravedad alta y media aumentaron 20.8%.",
      "Colombia es el unico mercado de America Latina donde el spyware muestra una tendencia al alza del 50.1%.",
    ],
    actions: [
      "Activa autenticacion de dos factores (2FA) en Gmail, Meta Ads, WhatsApp Business y todas las cuentas criticas.",
      "Haz una copia de seguridad de tus datos importantes esta semana en Google Drive, OneDrive u otra nube confiable.",
      "Revisa que personas del equipo tienen acceso a cada sistema; menos accesos significan menos riesgo.",
    ],
    source: "SonicWall Cyber Protect Report 2026 / Noticias Super",
    url: "https://elespaciodigital.com/ciberseguridad/sonicwall-revela-que-el-88-de-filtraciones-en-pymes-se-vincula-a-ransomware-pese-a-caida-del-volumen-global/",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    alt: "Panel de ciberseguridad con alertas digitales y proteccion de datos",
    contactMessage:
      "Hola, lei el blog sobre ransomware en pymes y quiero revisar si mi negocio esta protegido: accesos, copias de seguridad, datos de clientes y riesgos de seguridad.",
  },
  {
    slug: "zapier-make-n8n-automatizar-pyme",
    category: "Automatizacion",
    date: "30 Abr 2026",
    displayDate: "Jueves - 30 de abril de 2026",
    title: "Zapier, Make o n8n: cual elegir para automatizar tu pyme sin saber programar",
    deck:
      "En 2026 la automatizacion ya no es 'si pasa esto, haz aquello': ahora piensa, decide y actua sola.",
    summary:
      "Zapier, Make y n8n lideran la automatizacion no-code para pymes, pero elegir la herramienta equivocada puede costarte tiempo, dinero y procesos mal armados.",
    insight:
      "Para una pyme con equipo pequeno, automatizar bien un proceso repetitivo puede equivaler a sumar capacidad operativa sin contratar otra persona.",
    signals: [
      "Zapier destaca por facilidad de uso y mas de 7.000 integraciones.",
      "Make funciona bien para flujos visuales complejos y suele tener mejor precio por volumen.",
      "n8n gana fuerza por ser codigo abierto e ideal para automatizaciones con IA integrada.",
    ],
    actions: [
      "Si estas empezando y no tienes conocimientos tecnicos, prueba Zapier con su plan gratis de 100 tareas al mes.",
      "Si necesitas flujos mas complejos con buen precio, evalua Make y sus 1.000 operaciones gratis al mes.",
      "Automatiza primero lo mas doloroso: responder leads, agendar citas o notificar al equipo de ventas.",
    ],
    source: "Aprender21 / Ecosistema Startup / NoCode Hackers",
    url: "https://www.aprender21.com/blog/automatizacion-ia-n8n-make-zapier",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    alt: "Equipo revisando flujos de automatizacion en pantallas de trabajo",
    contactMessage:
      "Hola, lei el blog sobre Zapier, Make y n8n. Quiero identificar que procesos de mi negocio puedo automatizar primero: leads, WhatsApp, CRM, agenda o seguimiento comercial.",
  },
  {
    slug: "ia-no-opcional-pyme-latam",
    category: "🤖 IA Practica",
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

const NEWS_BASE_PATH = "/blog";

const getSlugFromPath = (pathname: string) => {
  if (!pathname.startsWith(`${NEWS_BASE_PATH}/`)) {
    return null;
  }

  const slug = pathname.slice(`${NEWS_BASE_PATH}/`.length).replace(/\/+$/, "");
  return slug || null;
};

const getNewsBySlug = (slug: string) =>
  NEWS_ITEMS.find((newsItem) => newsItem.slug === slug) ?? null;

const upsertMetaTag = (
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
};

const upsertJsonLd = (jsonLd: Record<string, unknown>) => {
  const scriptId = "news-jsonld";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(jsonLd);
};

const getIsoDateFromNewsDate = (rawDate: string) => {
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

interface NewsProps {
  initialSlug?: string;
}

const News = ({ initialSlug }: NewsProps) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(
    initialSlug ? getNewsBySlug(initialSlug) : null,
  );

  useEffect(() => {
    setSelectedNews(initialSlug ? getNewsBySlug(initialSlug) : null);
  }, [initialSlug]);

  useEffect(() => {
    const handlePopState = () => {
      const slug = getSlugFromPath(window.location.pathname);
      setSelectedNews(slug ? getNewsBySlug(slug) : null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const baseUrl = window.location.origin;
    const defaultTitle = "Sin filtro digital | EternalGrowth";
    const defaultDescription =
      "Noticias de tecnologia, negocios e IA para tomar decisiones con contexto y accion.";
    const pageUrl = selectedNews
      ? `${baseUrl}${NEWS_BASE_PATH}/${selectedNews.slug}`
      : `${baseUrl}${NEWS_BASE_PATH}`;
    const title = selectedNews
      ? `${selectedNews.title} | Sin filtro digital`
      : defaultTitle;
    const description = selectedNews?.deck ?? defaultDescription;
    const image = selectedNews?.image ?? `${baseUrl}/logo.jpeg`;
    const ogType = selectedNews ? "article" : "website";

    document.title = title;
    upsertCanonical(pageUrl);
    upsertMetaTag('meta[name="description"]', "name", "description", description);
    upsertMetaTag('meta[property="og:type"]', "property", "og:type", ogType);
    upsertMetaTag('meta[property="og:title"]', "property", "og:title", title);
    upsertMetaTag('meta[property="og:description"]', "property", "og:description", description);
    upsertMetaTag('meta[property="og:url"]', "property", "og:url", pageUrl);
    upsertMetaTag('meta[property="og:image"]', "property", "og:image", image);
    upsertMetaTag('meta[property="twitter:title"]', "property", "twitter:title", title);
    upsertMetaTag(
      'meta[property="twitter:description"]',
      "property",
      "twitter:description",
      description,
    );
    upsertMetaTag('meta[property="twitter:url"]', "property", "twitter:url", pageUrl);
    upsertMetaTag('meta[property="twitter:image"]', "property", "twitter:image", image);

    if (selectedNews) {
      upsertJsonLd({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: selectedNews.title,
        description: selectedNews.deck,
        image: [selectedNews.image],
        datePublished: getIsoDateFromNewsDate(selectedNews.date),
        dateModified: getIsoDateFromNewsDate(selectedNews.date),
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Organization",
          name: "EternalGrowth",
        },
        publisher: {
          "@type": "Organization",
          name: "EternalGrowth",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.jpeg`,
          },
        },
      });
    } else {
      upsertJsonLd({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Sin filtro digital",
        description: defaultDescription,
        url: pageUrl,
      });
    }
  }, [selectedNews]);

  const handleCtaClick = (newsItem: NewsItem) => {
    const ctaConfig = getNewsCtaConfig(newsItem.category);
    const prefilledMessage =
      newsItem.contactMessage ??
      (`Hola, lei el blog \"${newsItem.title}\" y necesito ayuda ` +
        `para implementar IA en mi negocio.`);

    window.localStorage.setItem(
      NEWS_CTA_STORAGE_KEY,
      JSON.stringify({
        descripcion_servicio: prefilledMessage,
        servicio: ctaConfig.suggestedService,
      }),
    );

    window.location.href = "/#contacto";
  };

  const handleOpenNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    window.history.pushState({}, "", `${NEWS_BASE_PATH}/${newsItem.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToNewsList = () => {
    setSelectedNews(null);
    window.history.pushState({}, "", NEWS_BASE_PATH);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedNews) {
    const ctaConfig = getNewsCtaConfig(selectedNews.category);
    const newsDisplayDate = selectedNews.displayDate ?? selectedNews.date;

    return (
      <section id="news" className="news-section news-article-section">
        <article className="news-article">
          <button
            type="button"
            className="news-back-button"
            onClick={handleBackToNewsList}
          >
            Volver a Sin filtro digital
          </button>

          <div className="news-article-hero">
            <img src={selectedNews.image} alt={selectedNews.alt} />
            <div className="news-article-hero-content">
              <div className="news-meta news-article-meta">
                <span>{selectedNews.category}</span>
                <span>{selectedNews.date}</span>
              </div>
              <h2>{selectedNews.title}</h2>
              <p>{selectedNews.deck}</p>
            </div>
          </div>

          <div className="news-article-body">
            <div className="news-article-lead">
              <div className="news-meta news-article-meta">
                <span>{newsDisplayDate}</span>
              </div>
              <p>{selectedNews.summary}</p>
            </div>

            <section className="news-article-block">
              <h3>Qué está pasando</h3>
              <p>{selectedNews.deck}</p>
              <p>{selectedNews.insight}</p>
            </section>

            <section className="news-article-block">
              <h3>Señales para mirar</h3>
              <ul>
                {selectedNews.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>

            <section className="news-article-block">
              <h3>Cómo convertirlo en acción</h3>
              <ul>
                {selectedNews.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>

            <a
              href={selectedNews.url}
              target="_blank"
              rel="noreferrer"
              className="news-link news-source-link"
            >
              Fuente original: {selectedNews.source}
            </a>

            <section className="news-article-cta" aria-label="Llamado a la accion">
              <p className="news-article-cta-kicker">Siguiente paso</p>
              <h3>{ctaConfig.title}</h3>
              <p>{ctaConfig.description}</p>
              <button
                type="button"
                className="news-article-cta-button"
                onClick={() => handleCtaClick(selectedNews)}
              >
                {ctaConfig.buttonLabel}
              </button>
            </section>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section id="news" className="news-section">
      <div className="news-container">
        <div className="news-header">
          <span className="news-kicker">Sin filtro digital</span>
          <h2 className="news-title">Sin filtro digital</h2>
          <p className="news-subtitle">
            Señales de negocios, tecnología e IA que una pequeña empresa puede
            convertir en acción esta semana.
          </p>
        </div>

        <div className="news-layout news-grid-layout">
          <div className="news-stack news-grid" aria-label="Noticias destacadas">
            {NEWS_ITEMS.map((item) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-media">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>

                <div className="news-card-content">
                  <div className="news-meta">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="news-takeaway">
                    <strong>Señal:</strong> {item.insight}
                  </div>
                  <button
                    type="button"
                    className="news-link news-read-button"
                    onClick={() => handleOpenNews(item)}
                  >
                    Leer análisis Eternal
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
