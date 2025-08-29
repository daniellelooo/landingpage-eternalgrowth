import { useState, useEffect, useCallback } from 'react';
import { TYPING_CONFIG } from '../config/phrases';

export const useGlitchEffect = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
    }, 300); // glitch duration
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < TYPING_CONFIG.glitchProbability) {
        triggerGlitch();
      }
    }, TYPING_CONFIG.glitchInterval);

    return () => clearInterval(interval);
  }, [triggerGlitch]);

  return isGlitching;
};
