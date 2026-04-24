/**
 * Configuration file for EternalGrowth typewriter phrases
 * Easy to modify for future updates
 */

export const TYPEWRITER_PHRASES = [
  "Tu web trabajando mientras duermes.",
  "Clientes que llegan solos por Google.",
  "WhatsApp que responde sin que estés.",
  "Un sistema, no piezas sueltas.",
  "Presencia digital que vende de verdad.",
  "Automatiza. Crece. Descansa.",
  "Tu negocio merece más que una página bonita.",
  "Leads en tiempo real, 24/7.",
  "De invisible a imparable.",
  "Marketing que mide cada peso invertido.",
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
