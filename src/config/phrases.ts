/**
 * Frases del typewriter del hero.
 * El contenido no cambia entre rediseños; los tiempos sí se afinan.
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
  /* cadencia humana: rápida con microvariación, no un metrónomo */
  typeSpeed: { min: 38, max: 74 }, // ms por carácter al escribir
  eraseSpeed: { min: 18, max: 30 }, // ms por carácter al borrar
  pauseBetweenPhrases: { min: 2600, max: 3800 }, // ms con la frase completa
  pauseBeforeTyping: 420, // ms en vacío antes de la siguiente frase
} as const;
