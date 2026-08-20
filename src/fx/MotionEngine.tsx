import { useEffect } from "react";

/**
 * Un solo motor de scroll para toda la página:
 *   - IntersectionObserver para [data-reveal] / [data-trigger] (una vez, luego unobserve)
 *   - progreso 0→1 por elemento en [data-scrub] (escribe --p)
 *   - parallax de deriva interna en [data-parallax] (escribe --shift)
 *   - interpolación real de tema entre zonas [data-theme] (escribe --t-bg / --t-fg)
 *   - header que se retira al bajar y vuelve al subir (html[data-hidden])
 *
 * Un único listener de scroll + requestAnimationFrame.
 */
export default function MotionEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- reveals ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );
    document
      .querySelectorAll("[data-reveal], [data-trigger]")
      .forEach((el) => io.observe(el));

    /* ---------- progreso por elemento ---------- */
    const scrubs = [...document.querySelectorAll<HTMLElement>("[data-scrub]")];

    /* ---------- parallax ---------- */
    const parallax = reduce
      ? []
      : [...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((el) => ({
          el,
          amp: Number(el.dataset.parallax) || 22,
        }));

    /* ---------- inversión de tema ---------- */
    const zones = [...document.querySelectorAll<HTMLElement>("[data-theme]")];
    type Clave = "light" | "dark" | "accent";
    const TEMAS: Record<
      Clave,
      { bg: [number, number, number]; fg: [number, number, number]; invert: number }
    > = {
      light: { bg: [243, 241, 234], fg: [11, 10, 16], invert: 1 },
      dark: { bg: [11, 10, 16], fg: [248, 246, 242], invert: 0 },
      accent: { bg: [139, 92, 246], fg: [11, 10, 16], invert: 1 },
    };
    const claveDe = (el: HTMLElement | undefined): Clave => {
      const k = el?.dataset.theme;
      return k === "light" || k === "accent" ? k : "dark";
    };
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const mezcla = (a: [number, number, number], b: [number, number, number], t: number) =>
      `rgb(${lerp(a[0], b[0], t)},${lerp(a[1], b[1], t)},${lerp(a[2], b[2], t)})`;

    let vh = window.innerHeight;
    let headerH = 84;
    const readHeader = () => {
      headerH = parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 84;
    };
    readHeader();

    let frame: number | null = null;
    let ultimaY = window.scrollY;

    const update = () => {
      frame = null;

      /* progreso por elemento: el piso de 35vh da recorrido a los bloques cortos */
      for (const el of scrubs) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) continue;

        let p: number;
        if (el.dataset.scrub === "linea") {
          p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / r.height));
        } else {
          const alto = Math.max(r.height, vh * 0.35);
          p = Math.min(1, Math.max(0, (vh * 0.78 - r.top) / (alto + vh * 0.15)));
        }
        el.style.setProperty("--p", p.toFixed(4));
      }

      /* parallax: -1 arriba de la ventana, +1 abajo */
      for (const { el, amp } of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const centro = (r.top + r.height / 2 - vh / 2) / (vh / 2);
        el.style.setProperty("--shift", (centro * amp).toFixed(2));
      }

      /* tema: interpolación entre la zona anterior y la actual sobre media pantalla */
      let indice = 0;
      let t = 1;
      for (let i = 0; i < zones.length; i++) {
        const r = zones[i].getBoundingClientRect();
        if (r.top <= headerH + 2 && r.bottom > headerH + 2) {
          indice = i;
          t = i === 0 ? 1 : Math.min(1, Math.max(0, (headerH - r.top) / (vh * 0.45)));
          break;
        }
      }

      const actual = TEMAS[claveDe(zones[indice])];
      const previa = indice === 0 ? actual : TEMAS[claveDe(zones[indice - 1])];

      root.style.setProperty("--t-bg", mezcla(previa.bg, actual.bg, t));
      root.style.setProperty("--t-fg", mezcla(previa.fg, actual.fg, t));
      root.style.setProperty(
        "--theme-progress",
        (previa.invert + (actual.invert - previa.invert) * t).toFixed(3),
      );

      /* progreso de lectura */
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - vh;
      root.style.setProperty("--scroll-progress", max > 0 ? (y / max).toFixed(4) : "0");

      /* header que se retira */
      const bajando = y > ultimaY + 6;
      const subiendo = y < ultimaY - 6;
      if (bajando || subiendo) ultimaY = y;
      if (y < vh * 0.35) root.dataset.hidden = "false";
      else if (bajando) root.dataset.hidden = "true";
      else if (subiendo) root.dataset.hidden = "false";
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      vh = window.innerHeight;
      readHeader();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
