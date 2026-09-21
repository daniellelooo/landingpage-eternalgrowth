import { JSON_LD_ID, PageMeta } from "./meta";
import { absoluteUrl } from "./site";

// El HTML de cada página ya sale del build con sus etiquetas. Esto solo las
// mantiene al día cuando se navega dentro del blog sin recargar la página.
const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

export const applyPageMeta = (meta: PageMeta) => {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image);

  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "robots", meta.noindex ? "noindex, follow" : "index, follow");
  upsertMeta("property", "og:type", meta.ogType);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:alt", meta.imageAlt);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", image);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (meta.noindex) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }

  let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!meta.jsonLd.length) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSON_LD_ID;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(meta.jsonLd);
};
