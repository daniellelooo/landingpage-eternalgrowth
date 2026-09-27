import { useState } from "react";
import HeroVitrina from "./HeroVitrina";
import HeroTransformacion from "./HeroTransformacion";
import HeroFlor from "./HeroFlor";
import { ConceptoHero, HERO_POR_DEFECTO, esConcepto } from "./conceptos";
import "./hero.css";

// El concepto llega por la ruta (/hero/a, prerenderizada) o, en desarrollo,
// por ?hero=a. En producción /?hero=a ya llega redirigido a /hero/a.
const conceptoInicial = (concepto?: ConceptoHero): ConceptoHero => {
  if (concepto) return concepto;
  if (typeof window !== "undefined") {
    const pedido = new URLSearchParams(window.location.search).get("hero");
    if (esConcepto(pedido)) return pedido;
  }
  return HERO_POR_DEFECTO;
};

const Hero = ({ concepto }: { concepto?: ConceptoHero }) => {
  const [actual] = useState(() => conceptoInicial(concepto));

  if (actual === "a") return <HeroVitrina />;
  if (actual === "c") return <HeroFlor />;
  return <HeroTransformacion />;
};

export default Hero;
