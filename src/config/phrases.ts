/**
 * Configuration file for EternalGrowth typewriter phrases
 * Easy to modify for future updates
 */

export const TYPEWRITER_PHRASES = [
  "Algo viene...",
  "El futuro se acerca...",
  "Preparándose...",
  "Evolución en progreso...",
  "Cargando dimensión...",
  "Sintonizando frecuencia...",
  "Acceso restringido...",
  "Protocolo activado...",
  "Realidad alterada...",
  "Sistemas online...",
  "Conexión establecida...",
  "Iniciando secuencia...",
  "Decodificando señal...",
] as const;

export const TYPING_CONFIG = {
  typeSpeed: { min: 80, max: 120 }, // milliseconds per character
  eraseSpeed: { min: 30, max: 50 }, // milliseconds per character
  pauseBetweenPhrases: { min: 3000, max: 5000 }, // milliseconds
  glitchProbability: 0.25, // 25% chance (era 8%, ahora es mucho más frecuente)
  glitchInterval: 2000, // check every 2 seconds (era 4000ms)
} as const;

export const ANIMATION_CONFIG = {
  logoGlowDuration: 3000,
  noiseUpdateInterval: 3000,
  crtEffectDuration: 100,
  horizontalSweepDuration: 3000,
} as const;
