export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  
  if (!element) {
    console.warn(`Element with id "${sectionId}" not found`);
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

export const getRandomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
