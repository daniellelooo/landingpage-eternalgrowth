import {
  NEWS_BASE_PATH,
  NEWS_ITEMS,
  getIsoDateFromNewsDate,
  getNewsBySlug,
} from "../data/news";
import { SITE, absoluteUrl } from "./site";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  image: string;
  imageAlt: string;
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
};

const ORGANIZATION_ID = `${SITE.url}/#organization`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  email: SITE.email,
  sameAs: [SITE.instagram],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#localbusiness`,
  name: SITE.name,
  description:
    "Agencia de software y transformación digital en Medellín: desarrollo web, automatización con n8n, chatbots de WhatsApp y software a la medida para pymes.",
  url: SITE.url,
  image: absoluteUrl(SITE.ogImage),
  logo: absoluteUrl(SITE.logo),
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: [
    { "@type": "City", name: "Medellín" },
    { "@type": "Country", name: "Colombia" },
  ],
  knowsAbout: [
    "Desarrollo web",
    "Automatización con n8n",
    "Chatbots de WhatsApp",
    "Software a la medida",
    "Marketing digital",
  ],
  sameAs: [SITE.instagram],
  parentOrganization: { "@id": ORGANIZATION_ID },
};

const truncate = (text: string, max = 158) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

const DEFAULT_IMAGE_ALT = "EternalGrowth, agencia de software en Medellín";

const HOME_META: PageMeta = {
  path: "/",
  title: "EternalGrowth | Desarrollo web y automatización en Medellín",
  description:
    "Agencia de software en Medellín: desarrollo web, automatización con n8n, chatbots de WhatsApp y software a la medida para pymes. Diagnóstico gratuito.",
  ogType: "website",
  image: SITE.ogImage,
  imageAlt: DEFAULT_IMAGE_ALT,
  jsonLd: [
    organizationJsonLd,
    localBusinessJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      inLanguage: "es-CO",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

const ABOUT_META: PageMeta = {
  path: "/eternalgrowth",
  title: "Nuestra historia | EternalGrowth, agencia digital en Medellín",
  description:
    "Quiénes somos: una startup de Medellín que cierra la brecha digital de micro y pequeñas empresas con tecnología práctica y acompañamiento real.",
  ogType: "website",
  image: SITE.ogImage,
  imageAlt: DEFAULT_IMAGE_ALT,
  jsonLd: [
    organizationJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Nuestra historia",
      url: absoluteUrl("/eternalgrowth"),
      about: { "@id": ORGANIZATION_ID },
    },
  ],
};

const BLOG_DESCRIPTION =
  "Noticias de tecnología, negocios e IA explicadas para pymes en Colombia: qué está pasando, qué señales mirar y cómo convertirlo en acción.";

const BLOG_META: PageMeta = {
  path: NEWS_BASE_PATH,
  title: "Sin filtro digital: tecnología e IA para pymes | EternalGrowth",
  description: BLOG_DESCRIPTION,
  ogType: "website",
  image: SITE.ogImage,
  imageAlt: DEFAULT_IMAGE_ALT,
  jsonLd: [
    organizationJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Sin filtro digital",
      description: BLOG_DESCRIPTION,
      url: absoluteUrl(NEWS_BASE_PATH),
      inLanguage: "es-CO",
      publisher: { "@id": ORGANIZATION_ID },
      blogPost: NEWS_ITEMS.map((item) => ({
        "@type": "BlogPosting",
        headline: item.title,
        url: absoluteUrl(`${NEWS_BASE_PATH}/${item.slug}`),
        datePublished: getIsoDateFromNewsDate(item.date),
      })),
    },
  ],
};

export const NOT_FOUND_META: PageMeta = {
  path: "/404",
  title: "Página no encontrada | EternalGrowth",
  description: "La página que buscas no existe o fue movida.",
  ogType: "website",
  image: SITE.ogImage,
  imageAlt: DEFAULT_IMAGE_ALT,
  noindex: true,
  jsonLd: [],
};

const getArticleMeta = (slug: string): PageMeta | null => {
  const item = getNewsBySlug(slug);
  if (!item) return null;

  const path = `${NEWS_BASE_PATH}/${item.slug}`;
  const isoDate = getIsoDateFromNewsDate(item.date);

  return {
    path,
    title: `${item.title} | EternalGrowth`,
    description: truncate(item.summary),
    ogType: "article",
    image: item.image,
    imageAlt: item.alt,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: item.title,
        description: item.deck,
        image: [item.image],
        datePublished: isoDate,
        dateModified: isoDate,
        inLanguage: "es-CO",
        articleSection: item.category,
        mainEntityOfPage: absoluteUrl(path),
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: absoluteUrl(SITE.logo) },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sin filtro digital",
            item: absoluteUrl(NEWS_BASE_PATH),
          },
          { "@type": "ListItem", position: 3, name: item.title, item: absoluteUrl(path) },
        ],
      },
    ],
  };
};

export const normalizePath = (pathname: string) => {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

// Devuelve null cuando la ruta no existe: el llamador decide mostrar el 404.
export const getPageMeta = (pathname: string): PageMeta | null => {
  const path = normalizePath(pathname);

  if (path === "/") return HOME_META;
  if (path === "/eternalgrowth") return ABOUT_META;
  if (path === NEWS_BASE_PATH) return BLOG_META;
  if (path.startsWith(`${NEWS_BASE_PATH}/`)) {
    return getArticleMeta(path.slice(NEWS_BASE_PATH.length + 1));
  }

  return null;
};

// Todas las páginas reales del sitio. De aquí salen el prerender y el sitemap:
// una página nueva que no esté en esta lista no tendrá HTML propio.
export const getAllPaths = (): string[] => [
  "/",
  "/eternalgrowth",
  NEWS_BASE_PATH,
  ...NEWS_ITEMS.map((item) => `${NEWS_BASE_PATH}/${item.slug}`),
];

// Entradas del sitemap. Solo los artículos llevan fecha: es la única que es
// verdad. Poner la fecha del build en todo le diría a Google que todo cambió.
export const getSitemapEntries = (): { path: string; lastmod?: string }[] => {
  const articleDates = NEWS_ITEMS.map((item) => getIsoDateFromNewsDate(item.date));
  const newest = [...articleDates].sort().at(-1);

  return [
    { path: "/" },
    { path: "/eternalgrowth" },
    { path: NEWS_BASE_PATH, lastmod: newest },
    ...NEWS_ITEMS.map((item, index) => ({
      path: `${NEWS_BASE_PATH}/${item.slug}`,
      lastmod: articleDates[index],
    })),
  ];
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const JSON_LD_ID = "seo-jsonld";

export const renderHeadTags = (meta: PageMeta): string => {
  const url = absoluteUrl(meta.path === "/" ? "/" : meta.path);
  const image = absoluteUrl(meta.image);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}" />`,
    meta.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    meta.image === SITE.ogImage
      ? `<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />`
      : "",
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    meta.jsonLd.length
      ? `<script type="application/ld+json" id="${JSON_LD_ID}">${JSON.stringify(
          meta.jsonLd,
        ).replace(/</g, "\\u003c")}</script>`
      : "",
  ];

  return tags.filter(Boolean).join("\n    ");
};
