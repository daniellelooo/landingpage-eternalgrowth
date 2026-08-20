import { useState, useEffect, useCallback } from "react";
import { TYPEWRITER_PHRASES, TYPING_CONFIG } from "../config/phrases";

type TypewriterState = "typing" | "waiting" | "erasing";

/**
 * Escribe y borra las frases del hero. Con prefers-reduced-motion la frase
 * aparece completa y rota con la misma pausa, sin teclear.
 */
export const useTypewriter = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [state, setState] = useState<TypewriterState>("typing");
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const getRandomDelay = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[currentPhraseIndex];
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (reduce) {
      setCurrentText(currentPhrase);
      timeoutId = setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }, TYPING_CONFIG.pauseBetweenPhrases.max);
      return () => clearTimeout(timeoutId);
    }

    switch (state) {
      case "typing":
        if (currentText.length < currentPhrase.length) {
          const siguiente = currentPhrase[currentText.length];
          /* respiro tras signos de puntuación: cadencia de persona, no de máquina */
          const extra = /[.,;:]/.test(currentText.slice(-1)) ? 180 : 0;
          const delay =
            getRandomDelay(TYPING_CONFIG.typeSpeed.min, TYPING_CONFIG.typeSpeed.max) +
            (siguiente === " " ? 24 : 0) +
            extra;
          timeoutId = setTimeout(() => {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          }, delay);
        } else {
          setState("waiting");
        }
        break;

      case "waiting":
        timeoutId = setTimeout(
          () => setState("erasing"),
          getRandomDelay(
            TYPING_CONFIG.pauseBetweenPhrases.min,
            TYPING_CONFIG.pauseBetweenPhrases.max,
          ),
        );
        break;

      case "erasing":
        if (currentText.length > 0) {
          timeoutId = setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, getRandomDelay(TYPING_CONFIG.eraseSpeed.min, TYPING_CONFIG.eraseSpeed.max));
        } else {
          timeoutId = setTimeout(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
            setState("typing");
          }, TYPING_CONFIG.pauseBeforeTyping);
        }
        break;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentText, currentPhraseIndex, state, reduce, getRandomDelay]);

  return { text: currentText, isWaiting: state === "waiting" };
};
