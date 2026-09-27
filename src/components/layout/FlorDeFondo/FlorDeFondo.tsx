import { useEffect, useRef } from "react";
import logoImage from "../../../assets/logo.jpeg";

// La flor grande y tenue que queda fija detrás de las secciones de la home.
// Antes vivía dentro del hero; ahora el hero tiene fondo propio y la tapa, y
// la flor sigue apareciendo detrás de "¿Por qué elegirnos?" y lo que sigue.
// Con mouse se corre unos pocos píxeles en sentido contrario al puntero.
const DESPLAZAMIENTO_MAXIMO = 18;

const FlorDeFondo = () => {
  const fondoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fondo = fondoRef.current;
    if (!fondo) return;
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
  }, []);

  return (
    <div className="background-logo" ref={fondoRef} aria-hidden="true">
      <img src={logoImage} alt="" />
    </div>
  );
};

export default FlorDeFondo;
