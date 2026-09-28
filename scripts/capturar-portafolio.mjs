// Captura la primera pantalla de un sitio del portafolio (escritorio 1440 y
// celular 390) y la deja en public/portafolio/ en WebP, en los tamaños que usa
// la web. No corre en el build: se usa a mano al agregar un proyecto.
//
// Necesita Playwright y sharp, que no son dependencias del proyecto (no hacen
// falta para publicar la web). Se instalan sin tocar package.json:
//
//   npm i --no-save playwright-core sharp
//   node scripts/capturar-portafolio.mjs <slug> <url>
//
// Usa el Google Chrome instalado en el equipo. Después, revisar las imágenes a
// ojo: que no haya avisos tapando, que las fotos hayan cargado y que no salga
// negra (hay webs que desplazan el body y no el documento).
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [slug, url] = process.argv.slice(2);
if (!slug || !url) {
  console.error("uso: node scripts/capturar-portafolio.mjs <slug> <url>");
  process.exit(1);
}

let chromium;
let sharp;
try {
  ({ chromium } = await import("playwright-core"));
  sharp = (await import("sharp")).default;
} catch {
  console.error("Faltan playwright-core y sharp: npm i --no-save playwright-core sharp");
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destino = path.join(root, "public", "portafolio");
await mkdir(destino, { recursive: true });

// Anchos de salida. El de escritorio se muestra hasta ~800 px en la página del
// portafolio; el del celular, hasta ~190 px. Se guarda el doble para pantallas
// de alta densidad.
const VISTAS = [
  {
    tipo: "escritorio",
    viewport: { width: 1440, height: 900 },
    mobile: false,
    anchos: [640, 800, 1080, 1600],
  },
  {
    tipo: "celular",
    viewport: { width: 390, height: 844 },
    mobile: true,
    anchos: [200, 400],
  },
];

const navegador = await chromium.launch({ channel: "chrome" });

for (const vista of VISTAS) {
  const contexto = await navegador.newContext({
    viewport: vista.viewport,
    deviceScaleFactor: 2,
    isMobile: vista.mobile,
    hasTouch: vista.mobile,
    locale: "es-CO",
    userAgent: vista.mobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  const pagina = await contexto.newPage();
  await pagina.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await pagina.waitForTimeout(3500);
  await pagina.evaluate(async () => {
    const visibles = [...document.images].filter(
      (img) => img.getBoundingClientRect().top < window.innerHeight,
    );
    await Promise.all(
      visibles.map((img) =>
        img.complete
          ? null
          : new Promise((listo) => {
              img.onload = img.onerror = listo;
              setTimeout(listo, 8000);
            }),
      ),
    );
    await document.fonts.ready;
  });
  await pagina.waitForTimeout(1500);
  const png = await pagina.screenshot();
  await contexto.close();

  for (const ancho of vista.anchos) {
    const archivo = path.join(destino, `${slug}-${vista.tipo}-${ancho}.webp`);
    await sharp(png)
      .resize({ width: ancho, kernel: "lanczos3" })
      .sharpen({ sigma: 0.5 })
      .webp({ quality: 82, effort: 6 })
      .toFile(archivo);
    console.log(path.relative(root, archivo));
  }
}

await navegador.close();
