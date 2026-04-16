import { useState } from "react";

type NewsItem = {
  category: string;
  date: string;
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
};

const NEWS_ITEMS: NewsItem[] = [
  {
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

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (selectedNews) {
    return (
      <section id="news" className="news-section news-article-section">
        <article className="news-article">
          <button
            type="button"
            className="news-back-button"
            onClick={() => setSelectedNews(null)}
          >
            Volver a Eternal News
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
          </div>
        </article>
      </section>
    );
  }

  return (
    <section id="news" className="news-section">
      <div className="news-container">
        <div className="news-header">
          <span className="news-kicker">Eternal News</span>
          <h2 className="news-title">Noticias para decidir mejor</h2>
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
                    onClick={() => setSelectedNews(item)}
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
