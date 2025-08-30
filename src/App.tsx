import React from "react";
import EternalGrowthLanding from "./components/EternalGrowthLanding";
import WallpaperBackground from "./components/WallpaperBackground";

function App() {
  // Check if we're in wallpaper mode via URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const isWallpaperMode = urlParams.get('mode') === 'wallpaper';

  return isWallpaperMode ? <WallpaperBackground /> : <EternalGrowthLanding />;
}

export default App;
