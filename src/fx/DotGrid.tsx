import { useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Retícula de puntos que reacciona al puntero: los puntos cercanos se tiñen del
 * acento, se dispersan cuando el cursor pasa rápido y vuelven con un muelle
 * amortiguado. Al hacer clic, onda de choque. Al cargar, onda de aparición
 * desde el centro.
 *
 * Física propia (muelle crítico-amortiguado integrado en el rAF): cero
 * dependencias. Pausa el dibujo cuando está fuera de pantalla y respeta
 * prefers-reduced-motion.
 */

type Dot = {
  cx: number;
  cy: number;
  x: number; // desplazamiento actual
  y: number;
  vx: number; // velocidad
  vy: number;
  delay: number; // retardo de aparición (onda de carga)
};

type Props = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  className?: string;
};

const ONDA_RECORRIDO = 620;
const ONDA_PUNTO = 420;
/* muelle: rigidez y amortiguación (ligeramente sub-amortiguado, rebota una vez) */
const K = 90;
const DAMP = 12;

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export default function DotGrid({
  dotSize = 3,
  gap = 26,
  baseColor = "#28243a",
  activeColor = "#8b5cf6",
  proximity = 190,
  speedTrigger = 55,
  shockRadius = 280,
  shockStrength = 4.2,
  className = "",
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const dots = useRef<Dot[]>([]);
  const pointer = useRef({ x: -9999, y: -9999, lastX: 0, lastY: 0, lastT: 0 });
  const visible = useRef(true);
  const activos = useRef(0);
  const sucio = useRef(true);

  const base = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const active = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const build = useCallback(() => {
    const w = wrap.current;
    const c = canvas.current;
    if (!w || !c) return;

    const { width, height } = w.getBoundingClientRect();
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    c.style.width = `${width}px`;
    c.style.height = `${height}px`;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);
    const startX = (width - (cell * cols - gap)) / 2 + dotSize / 2;
    const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2;

    const next: Dot[] = [];
    const midX = width / 2;
    const midY = height / 2;
    const maxD = Math.hypot(midX, midY) || 1;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        next.push({
          cx,
          cy,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          delay: (Math.hypot(cx - midX, cy - midY) / maxD) * ONDA_RECORRIDO,
        });
      }
    }
    dots.current = next;
    sucio.current = true;
  }, [dotSize, gap]);

  /* ---------- dibujo + integración del muelle ---------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const proxSq = proximity * proximity;
    const r = dotSize / 2;
    let drawnX = NaN;
    let drawnY = NaN;
    let t0 = 0;
    let lastFrame = 0;
    const duracionOnda = reduce ? 0 : ONDA_RECORRIDO + ONDA_PUNTO;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const c = canvas.current;
      if (!c || !visible.current) return;

      const ahora = performance.now();
      if (t0 === 0) t0 = ahora;
      const transcurrido = ahora - t0;
      const entrando = transcurrido < duracionOnda;
      const dt = Math.min((ahora - (lastFrame || ahora)) / 1000, 0.032);
      lastFrame = ahora;

      /* integra el muelle de los puntos empujados */
      if (activos.current > 0 && dt > 0) {
        let quietos = 0;
        for (const d of dots.current) {
          if (d.x === 0 && d.y === 0 && d.vx === 0 && d.vy === 0) continue;
          d.vx += (-K * d.x - DAMP * d.vx) * dt;
          d.vy += (-K * d.y - DAMP * d.vy) * dt;
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          if (
            Math.abs(d.x) < 0.08 &&
            Math.abs(d.y) < 0.08 &&
            Math.abs(d.vx) < 0.5 &&
            Math.abs(d.vy) < 0.5
          ) {
            d.x = 0;
            d.y = 0;
            d.vx = 0;
            d.vy = 0;
            quietos++;
          }
        }
        if (quietos > 0) activos.current = Math.max(0, activos.current - quietos);
        sucio.current = true;
      }

      const { x: pxNow, y: pyNow } = pointer.current;
      if (
        !entrando &&
        !sucio.current &&
        activos.current === 0 &&
        pxNow === drawnX &&
        pyNow === drawnY
      ) {
        return;
      }
      sucio.current = false;
      drawnX = pxNow;
      drawnY = pyNow;

      const ctx = c.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, c.width, c.height);
      const { x: px, y: py } = pointer.current;

      for (const d of dots.current) {
        let aparicion = 1;
        if (entrando) {
          aparicion = Math.min(1, Math.max(0, (transcurrido - d.delay) / ONDA_PUNTO));
          if (aparicion === 0) continue;
        }

        const dx = d.cx - px;
        const dy = d.cy - py;
        const dsq = dx * dx + dy * dy;

        let fill = baseColor;
        if (!reduce && dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          const e = t * t;
          fill = `rgb(${Math.round(base.r + (active.r - base.r) * e)},${Math.round(
            base.g + (active.g - base.g) * e,
          )},${Math.round(base.b + (active.b - base.b) * e)})`;
        }

        ctx.globalAlpha = aparicion;
        ctx.beginPath();
        ctx.arc(d.cx + d.x, d.cy + d.y, r * (0.4 + 0.6 * aparicion), 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [proximity, dotSize, baseColor, base, active]);

  /* ---------- construcción y visibilidad ---------- */
  useEffect(() => {
    build();
    const w = wrap.current;
    const ro = new ResizeObserver(build);
    if (w) ro.observe(w);

    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    if (w) io.observe(w);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [build]);

  /* ---------- puntero ---------- */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const empujar = (d: Dot, ix: number, iy: number) => {
      if (d.x === 0 && d.y === 0 && d.vx === 0 && d.vy === 0) activos.current += 1;
      d.vx += ix * 9;
      d.vy += iy * 9;
    };

    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const c = canvas.current;
      if (!c || !visible.current) return;

      const now = performance.now();
      if (now - lastMove < 28) return;
      lastMove = now;

      const p = pointer.current;
      const dt = p.lastT ? now - p.lastT : 16;
      const vx = ((e.clientX - p.lastX) / dt) * 1000;
      const vy = ((e.clientY - p.lastY) / dt) * 1000;
      const speed = Math.min(Math.hypot(vx, vy), 4000);
      p.lastT = now;
      p.lastX = e.clientX;
      p.lastY = e.clientY;

      const rect = c.getBoundingClientRect();
      p.x = e.clientX - rect.left;
      p.y = e.clientY - rect.top;

      if (speed < speedTrigger) return;

      for (const d of dots.current) {
        const dist = Math.hypot(d.cx - p.x, d.cy - p.y);
        if (dist >= proximity) continue;
        empujar(d, (d.cx - p.x) * 0.09 + vx * 0.004, (d.cy - p.y) * 0.09 + vy * 0.004);
      }
    };

    const onDown = (e: PointerEvent) => {
      const c = canvas.current;
      if (!c || !visible.current) return;
      const rect = c.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx < 0 || cy < 0 || cx > rect.width || cy > rect.height) return;

      for (const d of dots.current) {
        const dist = Math.hypot(d.cx - cx, d.cy - cy);
        if (dist >= shockRadius) continue;
        const falloff = 1 - dist / shockRadius;
        empujar(d, (d.cx - cx) * shockStrength * falloff * 0.08, (d.cy - cy) * shockStrength * falloff * 0.08);
      }
    };

    const onLeave = () => {
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      activos.current = 0;
    };
  }, [proximity, speedTrigger, shockRadius, shockStrength]);

  return (
    <div ref={wrap} className={`dot-grid ${className}`} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
