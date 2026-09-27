// Rama diseno/hero: tres conceptos de hero para elegir mirando el preview.
//   a  Vitrina: una cinta de webs reales cruza la pantalla, con notas a mano.
//   b  Del chat a la web: el negocio hoy (chats y cuaderno) contra su web.
//   c  La flor: el isotipo de la marca, cuyos píxeles se vuelven proyectos.
//
// Cada concepto tiene su propia página prerenderizada en /hero/<letra>, y
// vercel.json redirige /?hero=<letra> a esa página: así el concepto correcto
// sale en el HTML desde el primer pintado, sin ver otro un instante.
// Al elegir uno, se deja fijo en el Hero y se borran las rutas y redirecciones.
export type ConceptoHero = "a" | "b" | "c";

export const CONCEPTOS: ConceptoHero[] = ["a", "b", "c"];
export const HERO_POR_DEFECTO: ConceptoHero = "b";

export const esConcepto = (valor: unknown): valor is ConceptoHero =>
  typeof valor === "string" && CONCEPTOS.includes(valor as ConceptoHero);

const RUTA = /^\/hero\/([abc])$/;

// La letra del concepto si la ruta es /hero/<letra>.
export const conceptoDeRuta = (path: string): ConceptoHero | undefined => {
  const letra = path.match(RUTA)?.[1];
  return esConcepto(letra) ? letra : undefined;
};

export const RUTAS_CONCEPTOS = CONCEPTOS.map((c) => `/hero/${c}`);
