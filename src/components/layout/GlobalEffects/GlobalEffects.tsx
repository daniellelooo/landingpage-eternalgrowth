/**
 * Capas globales de textura: grano animado sobre toda la página.
 * pointer-events: none; opacidad baja. El movimiento va dentro de
 * prefers-reduced-motion: no-preference en el CSS.
 */
const GlobalEffects = () => {
  return <div className="grain" aria-hidden="true" />;
};

export default GlobalEffects;
