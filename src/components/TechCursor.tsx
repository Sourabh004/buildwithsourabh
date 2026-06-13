import { useEffect, useRef } from "react";

const TRAIL_MAX = 14;
const ORANGE_RGB = "247, 127, 26";
const ORANGE = "#F77F1A";

// Distance from center to bracket corner
const BASE_SIZE = 14;
const HOVER_SIZE = 22;
const ARM   = 10;  // bracket arm length
const THICK = 2;   // line thickness

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

const C = 50; // center of 100×100 container

// Precompute bracket div styles using CSS var --s
const bracketStyles = (corner: "tl" | "tr" | "bl" | "br", arm: number, thick: number) => {
  const styles: { h: React.CSSProperties; v: React.CSSProperties } = {
    tl: {
      h: { left: `calc(${C}px - var(--s))`,                    top: `calc(${C}px - var(--s))`,                    width: arm,  height: thick },
      v: { left: `calc(${C}px - var(--s))`,                    top: `calc(${C}px - var(--s))`,                    width: thick, height: arm  },
    },
    tr: {
      h: { left: `calc(${C}px + var(--s) - ${arm}px)`,         top: `calc(${C}px - var(--s))`,                    width: arm,  height: thick },
      v: { left: `calc(${C}px + var(--s) - ${thick}px)`,       top: `calc(${C}px - var(--s))`,                    width: thick, height: arm  },
    },
    bl: {
      h: { left: `calc(${C}px - var(--s))`,                    top: `calc(${C}px + var(--s) - ${thick}px)`,       width: arm,  height: thick },
      v: { left: `calc(${C}px - var(--s))`,                    top: `calc(${C}px + var(--s) - ${arm}px)`,         width: thick, height: arm  },
    },
    br: {
      h: { left: `calc(${C}px + var(--s) - ${arm}px)`,         top: `calc(${C}px + var(--s) - ${thick}px)`,       width: arm,  height: thick },
      v: { left: `calc(${C}px + var(--s) - ${thick}px)`,       top: `calc(${C}px + var(--s) - ${arm}px)`,         width: thick, height: arm  },
    },
  }[corner];

  const base: React.CSSProperties = { position: "absolute", background: ORANGE, boxShadow: `0 0 5px ${ORANGE}` };
  return { h: { ...base, ...styles.h }, v: { ...base, ...styles.v } };
};

const TechCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const sizeRef      = useRef(BASE_SIZE);
  const targetSize   = useRef(BASE_SIZE);

  useEffect(() => {
    const el     = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;

    let mouseX = 0, mouseY = 0, prevX = 0, prevY = 0;
    let rafId: number;
    const trail: TrailPoint[] = [];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      prevX = mouseX; prevY = mouseY;
      mouseX = e.clientX; mouseY = e.clientY;
      el.style.left = `${mouseX}px`;
      el.style.top  = `${mouseY}px`;
      trail.push({ x: mouseX, y: mouseY, vx: mouseX - prevX, vy: mouseY - prevY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const onEnter = () => { targetSize.current = HOVER_SIZE; };
    const onLeave = () => { targetSize.current = BASE_SIZE; };

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((e) => {
        e.removeEventListener("mouseenter", onEnter);
        e.removeEventListener("mouseleave", onLeave);
        e.addEventListener("mouseenter", onEnter);
        e.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      sizeRef.current = lerp(sizeRef.current, targetSize.current, 0.18);
      el.style.setProperty("--s", `${sizeRef.current}px`);

      // Trail
      for (const p of trail) {
        p.life = Math.max(0, p.life - 0.055);
        p.x -= p.vx * 0.04;
        p.y -= p.vy * 0.04;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const t = i / TRAIL_MAX;
        const opacity = p.life * t * 0.5;
        const radius  = t * 4 * p.life;
        if (radius < 0.3) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ORANGE_RGB}, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  const tl = bracketStyles("tl", ARM, THICK);
  const tr = bracketStyles("tr", ARM, THICK);
  const bl = bracketStyles("bl", ARM, THICK);
  const br = bracketStyles("br", ARM, THICK);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />

      <div
        ref={containerRef}
        className="pointer-events-none fixed z-[9999]"
        style={{ width: 100, height: 100, transform: "translate(-50%, -50%)" }}
      >
        {/* Top-left bracket */}
        <div style={tl.h} /><div style={tl.v} />
        {/* Top-right bracket */}
        <div style={tr.h} /><div style={tr.v} />
        {/* Bottom-left bracket */}
        <div style={bl.h} /><div style={bl.v} />
        {/* Bottom-right bracket */}
        <div style={br.h} /><div style={br.v} />

        {/* Center square */}
        <div style={{
          position: "absolute",
          width: 4,
          height: 4,
          background: ORANGE,
          left: C - 2,
          top: C - 2,
          boxShadow: `0 0 6px ${ORANGE}`,
        }} />
      </div>
    </>
  );
};

export default TechCursor;
