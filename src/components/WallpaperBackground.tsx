import logoImage from "../assets/logo.jpeg";
import "./WallpaperBackground.css";

const WallpaperBackground = () => {
  return (
    <div className="wallpaper-container">
      {/* Background Logo */}
      <div className="wallpaper-background-logo">
        <img src={logoImage} alt="EternalGrowth" />
      </div>

      {/* CRT Effects Layer */}
      <div className="wallpaper-tv-static">
        <div className="wallpaper-scanlines"></div>
        <div className="wallpaper-horizontal-sweep"></div>
        <div className="wallpaper-crt-glow"></div>
      </div>

      {/* Noise Layer */}
      <div className="wallpaper-noise-layer">
        <svg width="100%" height="100%">
          <filter id="wallpaper-noise">
            <feTurbulence baseFrequency="0.7" numOctaves={3} result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#wallpaper-noise)" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export default WallpaperBackground;
