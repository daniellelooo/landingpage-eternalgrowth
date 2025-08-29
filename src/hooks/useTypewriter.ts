import { useState, useEffect, useCallback } from 'react';
import { TYPEWRITER_PHRASES, TYPING_CONFIG } from '../config/phrases';

type TypewriterState = 'typing' | 'pausing' | 'erasing';

export const useTypewriter = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [state, setState] = useState<TypewriterState>('typing');

  const getRandomDelay = useCallback((min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[currentPhraseIndex];
    let timeoutId: number;

    switch (state) {
      case 'typing':
        if (currentText.length < currentPhrase.length) {
          const delay = getRandomDelay(TYPING_CONFIG.typeSpeed.min, TYPING_CONFIG.typeSpeed.max);
          timeoutId = setTimeout(() => {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
          }, delay);
        } else {
          const pauseDelay = getRandomDelay(
            TYPING_CONFIG.pauseBetweenPhrases.min,
            TYPING_CONFIG.pauseBetweenPhrases.max
          );
          timeoutId = setTimeout(() => {
            setState('erasing');
          }, pauseDelay);
        }
        break;

      case 'erasing':
        if (currentText.length > 0) {
          const delay = getRandomDelay(TYPING_CONFIG.eraseSpeed.min, TYPING_CONFIG.eraseSpeed.max);
          timeoutId = setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, delay);
        } else {
          setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          setState('typing');
        }
        break;
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, currentPhraseIndex, state, getRandomDelay]);

  return currentText;
};
