// Datos de la empresa que se repiten en títulos, Open Graph y datos estructurados.
// Si cambia el dominio, el correo o una red social, se cambia solo aquí.
export const SITE = {
  name: "EternalGrowth",
  url: "https://www.eternalgrowth.xyz",
  locale: "es_CO",
  email: "gerencia@eternalgrowth.xyz",
  city: "Medellín",
  region: "Antioquia",
  country: "CO",
  instagram: "https://www.instagram.com/eternalgrowth__/",
  ogImage: "/og-image.png",
  logo: "/logo.jpeg",
} as const;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path}`;
