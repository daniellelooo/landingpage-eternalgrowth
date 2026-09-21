import { useEffect, useState } from "react";
import {
  NEWS_BASE_PATH,
  NEWS_ITEMS,
  NewsItem,
  getNewsBySlug,
} from "../../../data/news";
import { applyPageMeta } from "../../../seo/applyMeta";
import { getPageMeta } from "../../../seo/meta";

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
      title: "¿Quieres implementar IA en tu negocio?",
      description:
        "Te ayudamos a convertir esta tendencia en procesos reales de ventas, atención y productividad.",
      buttonLabel: "Contáctanos para implementarlo en tu negocio",
      suggestedService: "Automatizacion",
    },
  },
  {
    keyword: "automatizacion",
    config: {
      title: "¿Quieres automatizar procesos en tu negocio?",
      description:
        "Diseñamos flujos prácticos para reducir tareas manuales y escalar tu operación sin fricción.",
      buttonLabel: "Quiero automatizar",
      suggestedService: "Automatizacion",
    },
  },
  {
    keyword: "ciberseguridad",
    config: {
      title: "¿Quieres proteger mejor tu negocio?",
      description:
        "Te acompañamos a definir controles y buenas prácticas para reducir riesgos digitales en tu empresa.",
      buttonLabel: "Fortalecer seguridad",
      suggestedService: "Consultoria",
    },
  },
];

const DEFAULT_NEWS_CTA: NewsCtaConfig = {
  title: "¿Quieres aplicar esto en tu empresa?",
  description:
    "Traducimos esta señal en un plan de implementación claro para tu contexto y tus objetivos.",
  buttonLabel: "Hablar con un especialista",
  suggestedService: "Consultoria",
};

const NEWS_CTA_STORAGE_KEY = "eternalgrowth_news_cta";

const getNewsCtaConfig = (category: string): NewsCtaConfig => {
  // Sin tildes, para que "Automatización" siga casando con "automatizacion".
  const normalizedCategory = category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const matched = NEWS_CTA_BY_KEYWORD.find(({ keyword }) =>
    normalizedCategory.includes(keyword),
  );

  return matched?.config ?? DEFAULT_NEWS_CTA;
};


// Las imágenes del blog vienen de Unsplash a 1200px, que es lo que necesita la
// portada del artículo y la vista previa al compartir. En la tarjeta del listado
// el hueco tiene otra forma: en computador es alto y angosto (~210 x 480-700 px)
// y en celular es apaisado (todo el ancho x ~190 px). Se le pide a Unsplash la
// foto ya recortada a esa forma: pesa una fracción y se ve nítida. Con una foto
// apaisada pequeña, el recorte la estiraba y quedaba borrosa.
const imagenRecortada = (url: string, ancho: number, alto: number) => {
  const base = url.replace(/([?&])(w|h)=[^&]*/g, "$1").replace(/[?&]+$/, "").replace(/&&+/g, "&");
  const separador = base.includes("?") ? "&" : "?";
  // Recorte centrado, igual que el object-fit: cover de antes: mismo encuadre.
  return `${base}${separador}w=${ancho}&h=${alto}`;
};

const getSlugFromPath = (pathname: string) => {
  if (!pathname.startsWith(`${NEWS_BASE_PATH}/`)) {
    return null;
  }

  const slug = pathname.slice(`${NEWS_BASE_PATH}/`.length).replace(/\/+$/, "");
  return slug || null;
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
    const meta = getPageMeta(
      selectedNews ? `${NEWS_BASE_PATH}/${selectedNews.slug}` : NEWS_BASE_PATH,
    );
    if (meta) applyPageMeta(meta);
  }, [selectedNews]);

  const handleCtaClick = (newsItem: NewsItem) => {
    const ctaConfig = getNewsCtaConfig(newsItem.category);
    const prefilledMessage =
      newsItem.contactMessage ??
      (`Hola, leí el blog \"${newsItem.title}\" y necesito ayuda ` +
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
    const esGuia = selectedNews.tipo === "guia";

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
              <h1>{selectedNews.title}</h1>
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
              <h2>{esGuia ? "De qué se trata" : "Qué está pasando"}</h2>
              <p>{selectedNews.deck}</p>
              <p>{selectedNews.insight}</p>
            </section>

            <section className="news-article-block">
              <h2>{esGuia ? "Lo que hay que entender" : "Señales para mirar"}</h2>
              <ul>
                {selectedNews.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>

            <section className="news-article-block">
              <h2>{esGuia ? "Por dónde empezar" : "Cómo convertirlo en acción"}</h2>
              <ul>
                {selectedNews.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>

            {selectedNews.url && (
              <a
                href={selectedNews.url}
                target="_blank"
                rel="noreferrer"
                className="news-link news-source-link"
              >
                Fuente original: {selectedNews.source}
              </a>
            )}

            <section className="news-article-cta" aria-label="Llamado a la acción">
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
          <h1 className="news-title">Sin filtro digital</h1>
          <p className="news-subtitle">
            Guías y señales de tecnología, negocios e IA, escritas para que una
            pequeña empresa las pueda convertir en acción.
          </p>
        </div>

        <div className="news-layout news-grid-layout">
          <div className="news-stack news-grid" aria-label="Noticias destacadas">
            {NEWS_ITEMS.map((item, index) => (
              <article className="news-card" key={item.title}>
                <div className="news-card-media">
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={`${imagenRecortada(item.image, 400, 220)} 1x, ${imagenRecortada(item.image, 800, 440)} 2x, ${imagenRecortada(item.image, 1200, 660)} 3x`}
                    />
                    <img
                      src={imagenRecortada(item.image, 240, 720)}
                      srcSet={`${imagenRecortada(item.image, 240, 720)} 1x, ${imagenRecortada(item.image, 480, 1440)} 2x`}
                      alt={item.alt}
                      // Las dos primeras están a la vista al entrar: se piden ya.
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index < 2 ? "high" : "auto"}
                      decoding="async"
                    />
                  </picture>
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
                  <a
                    href={`${NEWS_BASE_PATH}/${item.slug}`}
                    className="news-link news-read-button"
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                      event.preventDefault();
                      handleOpenNews(item);
                    }}
                  >
                    Leer análisis Eternal
                  </a>
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
