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
  typeSpeed: { min: 55, max: 95 }, // milliseconds per character
  eraseSpeed: { min: 24, max: 38 }, // milliseconds per character
  pauseBetweenPhrases: { min: 2800, max: 4200 }, // milliseconds
  glitchProbability: 0.06, // efecto glitch muy ocasional: acabado más sobrio
  glitchInterval: 4000, // check every 4 seconds
} as const;

export const ANIMATION_CONFIG = {
  logoGlowDuration: 3000,
  noiseUpdateInterval: 3000,
  crtEffectDuration: 100,
  horizontalSweepDuration: 3000,
} as const;
