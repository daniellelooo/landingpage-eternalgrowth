# SEO de eternalgrowth.xyz

Qué se hizo en septiembre de 2026, cómo funciona y qué hay que mantener.

## Cómo funciona

La web sigue siendo React + Vite, pero ya no entrega un `<div id="root">` vacío. El build
hace tres cosas (`npm run build`):

1. Build normal de Vite (lo que corre en el navegador).
2. Un segundo build de `src/entry-server.tsx`, que permite renderizar React fuera del navegador.
3. `scripts/prerender.mjs` recorre todas las páginas y escribe un HTML real por cada una
   (`dist/blog/index.html`, `dist/blog/<slug>/index.html`...), con su `title`, descripción,
   canonical, Open Graph, Twitter Card, datos estructurados y el contenido ya pintado.
   También genera `dist/404.html` y `dist/sitemap.xml`.

En el navegador React "hidrata" ese HTML: la página se ve y se comporta igual que antes.

| Archivo | Para qué |
|---|---|
| `src/seo/site.ts` | Dominio, correo, ciudad, Instagram. Se cambia solo aquí. |
| `src/seo/meta.ts` | Título, descripción y datos estructurados de cada ruta. Lista de páginas y sitemap. |
| `src/seo/applyMeta.ts` | Mantiene las etiquetas al día al navegar dentro del blog sin recargar. |
| `src/data/news.ts` | Los artículos del blog. |
| `scripts/prerender.mjs` | Escribe los HTML, el 404 y el sitemap. |
| `vercel.json` | `cleanUrls`, redirección de `/news` a `/blog`. Ya no hay rewrites a `index.html`. |
| `public/og-image.png` | Imagen de previsualización (1200x630) al compartir por WhatsApp o LinkedIn. |

## Dos tipos de artículo

- **Noticia** (por defecto): comenta algo que pasó y enlaza a la fuente original. Los
  encabezados son "Qué está pasando", "Señales para mirar" y "Cómo convertirlo en acción".
- **Guía** (`tipo: "guia"`): contenido propio, sin fuente externa. Los encabezados pasan a
  "De qué se trata", "Lo que hay que entender" y "Por dónde empezar", y no se muestra el
  enlace de fuente.

**Para que la gente encuentre la web desde Google, las guías rinden mucho más.** Una noticia
la buscan unos días; una guía como "qué es la transformación digital para una pyme" la buscan
todo el año. Lo ideal es al menos una guía por cada dos noticias.

Al escribir una guía, el título debe ser lo que alguien escribiría en Google, no un titular
de periódico. "Herramientas de IA para negocios pequeños" se busca; "La revolución de la IA
llegó a las pymes" no lo busca nadie.

## Publicar un artículo nuevo

Agregar un objeto al inicio de `NEWS_ITEMS` en `src/data/news.ts`. Nada más: el HTML propio,
el título, el Open Graph, los datos estructurados y la entrada del sitemap salen solos.

- `tipo`: `"guia"` para contenido propio; se omite para una noticia con fuente.
- `slug`: en minúsculas, sin tildes, con guiones. **No se cambia después de publicar.**
  Que contenga las palabras que alguien buscaría.
- `date`: formato `2 May 2026` (día, mes de tres letras, año). De ahí sale la fecha para Google.
- `title`: es el título que aparece en Google. Con tildes y por debajo de ~65 caracteres si se puede.
- `summary`: es la descripción que aparece en Google (se corta a 158 caracteres).
- Textos con tildes. Sin emojis, tampoco en la categoría.

**Cadencia:** un artículo cada dos semanas como mínimo. El blog estuvo parado de mayo a
septiembre de 2026 y un blog parado le dice a Google y al cliente que la empresa también.

## Agregar una página nueva sin romper el SEO

1. Crear el componente de la página.
2. Agregar la ruta en `renderPage` de `src/App.tsx`.
3. En `src/seo/meta.ts`: crear su `PageMeta`, devolverlo en `getPageMeta` y agregar la ruta
   a `getAllPaths` y a `getSitemapEntries`.

Si se salta el paso 3 la página funciona en el navegador, pero responde 404 al entrar
directo y no existe para Google.

Reglas para que el componente se pueda generar en el build:

- Nada de `window`, `document` ni `localStorage` fuera de un `useEffect` o de un manejador
  de eventos. En el build no existen.
- El primer render debe ser igual en el servidor y en el navegador. Si algo depende del
  navegador (una hora, `localStorage`), arranca con un valor fijo y se ajusta en `useEffect`.
- Un solo `h1` por página.
- Lo que deba seguir Google va en `<a href>`, no en un botón con `onClick`.

## Cómo verificar después de cada despliegue

```bash
curl -s https://www.eternalgrowth.xyz/blog | grep -o '<title>[^<]*'
```

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.eternalgrowth.xyz/no-existe
```

El primero debe devolver el título del blog (no el de la home) y el segundo `404`.
Si todas las páginas devuelven el mismo título, el prerender no corrió: mirar el log del
build en Vercel y buscar la línea `prerender: N páginas`.

Los previews de Vercel de este proyecto piden inicio de sesión (protección del equipo),
así que con `curl` solo se puede verificar producción. Los previews se revisan en el
navegador con la cuenta de Vercel.

Para probar en local: `npm run build` y `npm run preview`. Ojo: el servidor de preview de
Vite sirve la home en `/blog`; para ver el HTML correcto hay que entrar a `/blog/` (con
barra final). En Vercel no pasa.

## Analítica

Vercel Web Analytics (`@vercel/analytics`, montado en `src/App.tsx`). Se ve en el panel de
Vercel, pestaña Analytics del proyecto `eternalgrowth`. No usa cookies, no necesita aviso.

## Pendiente (no es código)

- **Google Search Console**: verificar `eternalgrowth.xyz` y enviar
  `https://www.eternalgrowth.xyz/sitemap.xml`. Es lo que hace que Google indexe el sitio.
- **Google Business Profile**: la ficha, con los datos de
  `Documentacion/eternalgrowth-docs/01-reunion-21-sep/datos-google-business.md`.
- Paquetes nuevos con precio "desde" y página de casos: cuando se definan. El componente
  `src/components/sections/Packages` se conserva sin usar para reutilizar la maqueta.
