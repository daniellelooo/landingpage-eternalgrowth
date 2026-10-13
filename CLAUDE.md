# Web de EternalGrowth (landingpage-eternalgrowth)

## Qué es
La web pública de EternalGrowth, agencia de software y transformación digital de Medellín
(https://www.eternalgrowth.xyz): inicio con formulario de contacto, blog "Sin filtro digital",
páginas de servicio, portafolio, política de datos y la historia de la empresa. React 19 +
TypeScript + Vite 7 sin framework, con prerender propio, desplegada en Vercel. Los correos
salen por Resend desde `api/`. No usa base de datos ni Supabase. ¿Mueve dinero? No.

## Comandos
- Instalar: `npm ci`
- Desarrollo: `npm run dev` (puerto 3000)
- Tipos: `npm run lint` (es `tsc --noEmit`; no hay linter de estilo)
- Build: `npm run build` (Vite + build SSR + `scripts/prerender.mjs`; no necesita variables de entorno)
- Preview del build: `npm run preview`
- Pruebas: no hay pruebas automatizadas. Se verifica con el build y mirando la web en el navegador.
- Node 22.x.

## Ramas
- `develop`: integración. Todo entra por PR revisado por el tester del equipo.
- `main`: producción. Solo por promoción (`/equipo:promover`), con visto bueno de Daniel.
- Ramas de trabajo: `feat/<issue>-<slug>`, `fix/<issue>-<slug>`, `chore/<issue>-<slug>`. Rediseños en `diseno/*`.

## Zonas delicadas
- **`scripts/prerender.mjs` y todo el SEO.** El build escribe un HTML real por página, el 404
  y el sitemap. Títulos, descripciones, canonical, Open Graph y datos estructurados salen de
  `src/seo/meta.ts` y `src/seo/site.ts`. Una página nueva que no se registre ahí (ruta en
  `renderPage` de `src/App.tsx`, y `PageMeta`, `getAllPaths` y `getSitemapEntries` en
  `meta.ts`) funciona al navegar, pero responde 404 al entrar directo y no existe para Google.
  Antes de tocar nada de esto, leer `docs/SEO.md`. Los slugs del blog no se cambian después de publicar.
- **Código que corre en el build.** Nada de `window`, `document` ni `localStorage` fuera de un
  `useEffect` o un manejador de eventos, y el primer render debe ser igual en servidor y navegador. Un `h1` por página.
- **`api/contact.ts`.** Formulario de contacto y boletín: manda correos con Resend a la dirección
  que escriba el visitante. Tiene tope de envíos por IP (5 cada 10 minutos, en memoria),
  honeypot y validación de largos; quitarlo o aflojarlo convierte el endpoint en un emisor de
  correo con la marca de EternalGrowth. Exige la autorización de datos (Ley 1581) y deja la
  constancia en el correo que recibe la empresa. `api/send-news.ts` exige `x-admin-secret`.
- **`src/data/privacidad.ts`.** Política de datos. Si quedan campos del responsable entre
  corchetes, el build de producción (`VERCEL_ENV=production`) falla a propósito; en preview solo avisa.
- **Scroll en la home.** Quien hace scroll es el `<body>`, no la ventana (`html, body` tienen
  `overflow-y: auto` en `src/index.css`). `window.scrollY` da 0; usar `document.scrollingElement`
  o `document.body.scrollTop`, como en `Header` y `FlorDeFondo`.
- **Variables de entorno** (solo en Vercel, nunca en el repo): `RESEND_API_KEY`,
  `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `RESEND_AUDIENCE_ID`, `SITE_URL`, `ADMIN_SECRET`.

## Equipo de agentes
Este repo trabaja con el plugin `equipo` (planificador, desarrollador, tester, guardia, arreglador,
explorador). Tareas en GitHub Issues con etiquetas `estado:*`. Aprendizajes del proyecto en
`docs/soluciones/`. Todo en español, cero emojis en la interfaz, commits sin `Co-Authored-By`.
