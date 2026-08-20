/**
 * Marquesina doble: una línea sólida y una perfilada, cruzadas en direcciones
 * opuestas. Pura CSS; el loop vive en prefers-reduced-motion: no-preference.
 */

const ITEMS = [
  "Desarrollo web",
  "Automatización con n8n",
  "Marketing digital",
  "Consultoría y diagnóstico",
];

const Fila = ({ variante }: { variante: "solida" | "perfil" }) => (
  <div className={`marquee marquee--${variante}`}>
    <div className="marquee-track">
      {[0, 1].map((copia) => (
        <div className="marquee-group" key={copia} aria-hidden={copia === 1}>
          {ITEMS.map((item) => (
            <span className="marquee-item" key={item}>
              {item}
              <span className="marquee-sep" aria-hidden="true" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const Marquee = () => (
  <div className="banda" data-theme="dark" aria-label="Servicios de EternalGrowth">
    <Fila variante="solida" />
    <Fila variante="perfil" />
  </div>
);

export default Marquee;
