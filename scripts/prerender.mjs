// Genera el HTML real de cada página después del build de Vite.
// Sin esto el servidor entrega un <div id="root"> vacío y el mismo título en
// todas las rutas. Ver docs/SEO.md.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { renderPage, getAllPaths, getSitemapEntries, SITE } = await import(pathToFileURL(ssrEntry).href);

const template = await readFile(path.join(dist, "index.html"), "utf8");

const HEAD_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_BLOCK = '<div id="root"></div>';

if (!HEAD_BLOCK.test(template) || !template.includes(ROOT_BLOCK)) {
  throw new Error(
    "index.html perdió los marcadores <!--seo:start-->/<!--seo:end--> o el <div id=\"root\"></div>",
  );
}

const buildHtml = (pathname) => {
  const { head, html } = renderPage(pathname);
  return template
    .replace(HEAD_BLOCK, () => head)
    .replace(ROOT_BLOCK, () => `<div id="root">${html}</div>`);
};

const paths = getAllPaths();

for (const pathname of paths) {
  const file =
    pathname === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, pathname, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buildHtml(pathname), "utf8");
}

// Vercel sirve dist/404.html con estado 404 para cualquier ruta que no exista.
await writeFile(path.join(dist, "404.html"), buildHtml("/404"), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${getSitemapEntries()
  .map(
    ({ path: pathname, lastmod }) =>
      `  <url><loc>${SITE.url}${pathname}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`prerender: ${paths.length} páginas + 404.html + sitemap.xml`);
