import { useState, useEffect } from "react";
import { SectionId } from "../types";
import { scrollToSection } from "../utils/helpers";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import Benefits from "./sections/Benefits";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import DelBlog from "./sections/DelBlog";
import Proceso from "./sections/Proceso";
import Portafolio from "./sections/Portafolio";
import "./EternalGrowthLanding.css";
// Va después: la estructura nueva de la home sobreescribe reglas de la hoja base.
import "./sections/reestructuracion.css";

const EternalGrowthLanding = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === "blog") {
      window.location.href = "/blog";
      return;
    }

    scrollToSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const backgroundLogo = document.querySelector(".background-logo");
      const globalEffects = document.querySelector(".global-effects");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.classList.add("hidden");
      } else if (scrollIndicator) {
        scrollIndicator.classList.remove("hidden");
      }

      if (backgroundLogo) {
        // El desplazamiento por scroll va en una variable: el hero suma la del
        // puntero en el CSS, y así las dos no se pisan.
        (backgroundLogo as HTMLElement).style.setProperty("--sy", `${window.scrollY * 0.3}px`);
      }

      if (globalEffects && heroSection) {
        const inHero = scrollPosition < heroSection.offsetHeight;
        globalEffects.classList.toggle("paused", !inHero);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll-spy. Cada sección de la home marca una opción del menú; las que
    // no tienen opción propia marcan la más cercana ("Del blog" enciende Blog y
    // "Cómo empezamos" ya es parte de Contacto). Manda la última sección cuyo
    // inicio ya pasó una línea a media pantalla: así el orden sale igual al
    // bajar y al subir, y al saltar al final (donde la línea cae en el footer)
    // queda Contacto y no la opción de antes.
    const SECCION_A_MENU: Record<string, SectionId> = {
      hero: "hero",
      beneficios: "beneficios",
      servicios: "servicios",
      portafolio: "portafolio",
      "del-blog": "blog",
      "como-trabajamos": "contacto",
      contacto: "contacto",
    };

    const sections = Object.keys(SECCION_A_MENU)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    let cuadro = 0;
    const marcarSeccion = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const linea = window.innerHeight * 0.45;
        let actual = sections[0];
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= linea) actual = section;
        }
        if (actual) setActiveSection(SECCION_A_MENU[actual.id]);
      });
    };

    // En la home quien desplaza es el <body>: se escucha el scroll de
    // cualquier elemento, en fase de captura.
    document.addEventListener("scroll", marcarSeccion, { passive: true, capture: true });
    window.addEventListener("resize", marcarSeccion);
    marcarSeccion();
    handleScroll();

    if (window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      window.setTimeout(() => scrollToSection(sectionId), 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", marcarSeccion, { capture: true });
      window.removeEventListener("resize", marcarSeccion);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div className="eternal-growth-container">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />
      <Hero />
      <Benefits />
      <Services />
      <Portafolio />
      <DelBlog />
      <Proceso />
      <Contact />
      <Footer />
    </div>
  );
};

export default EternalGrowthLanding;
