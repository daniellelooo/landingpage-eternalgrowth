import { useEffect, useState } from "react";

// Los efectos de TV (ruido, líneas de barrido, brillo CRT) son lo más caro de
// dibujar de toda la página: el ruido es un filtro SVG que se calcula píxel a
// píxel sobre la pantalla entera. Si van en el primer pintado, la página se
// queda en negro mientras se dibujan. Se montan justo después de que la página
// ya se ve, y entran con un fundido corto.
const GlobalEffects = () => {
  const [activos, setActivos] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActivos(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!activos) return null;

  return (
    <div className="global-effects">
      {/* CRT Effects Layer */}
      <div className="tv-static">
        <div className="scanlines"></div>
        <div className="horizontal-sweep"></div>
        <div className="crt-glow"></div>
      </div>

      {/* Noise Layer */}
      <div className="noise-layer">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence baseFrequency="0.7" numOctaves={3} result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export default GlobalEffects;
