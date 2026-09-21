# Web de EternalGrowth

La web pública de EternalGrowth, agencia de software y transformación digital de Medellín.

- **Producción:** https://www.eternalgrowth.xyz
- **Stack:** React 19 + TypeScript + Vite 7, desplegado en Vercel.
- **Correos:** Resend (`api/contact.ts` para el formulario, `api/send-news.ts` para el boletín).

## Páginas

| Ruta | Qué es |
|---|---|
| `/` | Inicio: hero, por qué elegirnos, servicios y formulario de contacto |
| `/blog` | Sin filtro digital: noticias de tecnología e IA para pymes |
| `/blog/<slug>` | Cada artículo |
| `/eternalgrowth` | Nuestra historia |

## Desarrollo

```bash
npm install
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Build + genera el HTML de cada página, el 404 y el sitemap |
| `npm run preview` | Sirve el resultado del build |
| `npm run lint` | Comprueba los tipos (es lo mismo que corre el CI) |

## Antes de tocar nada

**Lee `docs/SEO.md`.** El build genera un HTML real por página; si se agrega una página sin
registrarla ahí, funciona al navegar pero responde 404 al entrar directo y no existe para
Google. Ese archivo explica también cómo publicar un artículo del blog y cómo verificar un
despliegue.

## Variables de entorno

Se configuran en Vercel. Ninguna es necesaria para `npm run dev` salvo que se prueben correos.

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Enviar correos |
| `RESEND_FROM_EMAIL` | Remitente. Debe ser de un dominio verificado en Resend |
| `CONTACT_TO_EMAIL` | Dónde llegan los mensajes del formulario |
| `RESEND_AUDIENCE_ID` | Lista de suscriptores del boletín |
| `SITE_URL` | Enlaces dentro de los correos. Si falta, se usa el dominio de producción |
| `ADMIN_SECRET` | Cabecera `x-admin-secret` para poder enviar el boletín |

## Ramas

Se trabaja en `develop`. `main` es producción y se actualiza por promoción desde `develop`.
Los rediseños van en ramas `diseno/*`.
