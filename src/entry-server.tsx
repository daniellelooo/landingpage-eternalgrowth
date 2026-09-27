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
export const renderPage = (pathname: string) => {
  const meta = getPageMeta(pathname) ?? NOT_FOUND_META;

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
