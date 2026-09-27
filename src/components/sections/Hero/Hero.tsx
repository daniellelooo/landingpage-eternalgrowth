import { useEffect, useState } from "react";
import HeroVitrina from "./HeroVitrina";
import HeroTransformacion from "./HeroTransformacion";
import HeroFlor from "./HeroFlor";
import "./hero.css";

// Rama diseno/hero: tres conceptos de hero para elegir mirando el preview.
//   ?hero=a  Vitrina: una cinta de webs reales cruza la pantalla.
//   ?hero=b  Del chat a la web: lo que el negocio hace hoy por chat se
//            convierte en su web, con el borde en píxeles del logo.
//   ?hero=c  La flor: el isotipo crece y sus píxeles son proyectos reales.
// El que sale sin parámetro es HERO_POR_DEFECTO (o VITE_HERO en el build, que
// se usa para medir cada concepto con Lighthouse sin el cambio al cargar).
export type ConceptoHero = "a" | "b" | "c";

const CONCEPTOS: ConceptoHero[] = ["a", "b", "c"];
const HERO_POR_DEFECTO: ConceptoHero = "c";

const esConcepto = (valor: unknown): valor is ConceptoHero =>
  typeof valor === "string" && CONCEPTOS.includes(valor as ConceptoHero);

const porDefecto: ConceptoHero = esConcepto(import.meta.env.VITE_HERO)
  ? import.meta.env.VITE_HERO
  : HERO_POR_DEFECTO;

const Hero = () => {
  // El primer render es el del HTML prerenderizado; el parámetro se lee
  // después de hidratar para que servidor y navegador coincidan.
  const [concepto, setConcepto] = useState<ConceptoHero>(porDefecto);

  useEffect(() => {
    const pedido = new URLSearchParams(window.location.search).get("hero");
    if (esConcepto(pedido)) setConcepto(pedido);
  }, []);

  if (concepto === "a") return <HeroVitrina />;
  if (concepto === "b") return <HeroTransformacion />;
  return <HeroFlor />;
};

export default Hero;
