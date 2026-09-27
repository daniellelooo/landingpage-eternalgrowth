import { useEffect, useRef, useState } from "react";
import logoImage from "../../../assets/logo.jpeg";

// La flor grande y tenue que queda fija detrás de las secciones de la home.
// Antes vivía dentro del hero; ahora el hero tiene fondo propio y la tapa, y
// la flor sigue apareciendo detrás de "¿Por qué elegirnos?" y lo que sigue.
// Con mouse se corre unos pocos píxeles en sentido contrario al puntero.
//
// No se carga hasta que la persona baja: detrás del hero no se ve, y si está
// en el primer pintado Google la toma como el elemento principal de la
// página (LCP) aunque quede tapada.
const DESPLAZAMIENTO_MAXIMO = 18;

const FlorDeFondo = () => {
  const fondoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // En la home desplaza el <body>, no la ventana: se escucha en captura.
    const alDesplazar = () => {
      const y = document.scrollingElement?.scrollTop || document.body.scrollTop;
      if (y > window.innerHeight * 0.3) setVisible(true);
    };
    document.addEventListener("scroll", alDesplazar, { passive: true, capture: true });
    alDesplazar();
    return () => document.removeEventListener("scroll", alDesplazar, { capture: true });
  }, []);

  useEffect(() => {
    const fondo = fondoRef.current;
    if (!visible || !fondo) return;
    const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!conMouse || sinMovimiento) return;

    let cuadro = 0;
    const alMover = (evento: PointerEvent) => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const x = (evento.clientX / window.innerWidth - 0.5) * -2 * DESPLAZAMIENTO_MAXIMO;
        const y = (evento.clientY / window.innerHeight - 0.5) * -2 * DESPLAZAMIENTO_MAXIMO;
        fondo.style.setProperty("--px", `${x.toFixed(1)}px`);
        fondo.style.setProperty("--py", `${y.toFixed(1)}px`);
      });
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      cancelAnimationFrame(cuadro);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="background-logo" ref={fondoRef} aria-hidden="true">
      <img src={logoImage} alt="" />
    </div>
  );
};

export default FlorDeFondo;
