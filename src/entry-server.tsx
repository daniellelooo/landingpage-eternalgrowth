import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import {
  NOT_FOUND_META,
  getAllPaths,
  getPageMeta,
  getSitemapEntries,
  renderHeadTags,
} from "./seo/meta";
import { SITE } from "./seo/site";

// Lo usa scripts/prerender.mjs durante el build para escribir el HTML real de
// cada página. No se ejecuta en el navegador.
// metaDe: de qué ruta salen el título y los datos (las páginas /hero/<letra>
// de la rama diseno/hero son la home con otro hero y llevan su metadata).
export const renderPage = (pathname: string, metaDe: string = pathname) => {
  const meta = getPageMeta(metaDe) ?? NOT_FOUND_META;

  return {
    head: renderHeadTags(meta),
    html: renderToString(
      <React.StrictMode>
        <App pathname={pathname} />
      </React.StrictMode>,
    ),
  };
};

export { getAllPaths, getSitemapEntries, SITE };
export { RUTAS_CONCEPTOS } from "./components/sections/Hero/conceptos";
