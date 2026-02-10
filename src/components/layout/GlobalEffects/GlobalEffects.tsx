const GlobalEffects = () => {
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
