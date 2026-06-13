import { useEffect, useRef } from "react";

const TRAIL_MAX = 12;
const GREEN_RGB = "0, 255, 65";
const GREEN = "#00FF41";

const BASE_GAP  = 2;   // px margin each side of center char — tight
const HOVER_GAP = 8;   // spread on hover

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

const TechCursor = () => {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gapRef      = useRef(BASE_GAP);
  const targetGap   = useRef(BASE_GAP);
  const hoveredRef  = useRef(false);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const center = centerRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !center || !canvas) return;

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
      wrap.style.left = `${mouseX}px`;
      wrap.style.top  = `${mouseY}px`;
      trail.push({ x: mouseX, y: mouseY, vx: mouseX - prevX, vy: mouseY - prevY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    // Blink the pipe at 500ms
    let blinkOn = true;
    const blinkId = setInterval(() => {
      if (!hoveredRef.current) {
        blinkOn = !blinkOn;
        center.style.opacity = blinkOn ? "1" : "0";
      }
    }, 500);

    const onEnter = () => {
      hoveredRef.current = true;
      targetGap.current  = HOVER_GAP;
      center.style.opacity = "1";
      center.textContent   = "·";
    };
    const onLeave = () => {
      hoveredRef.current = false;
      targetGap.current  = BASE_GAP;
      center.textContent  = "|";
    };

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Smooth gap interpolation
      gapRef.current = lerp(gapRef.current, targetGap.current, 0.18);
      center.style.margin = `0 ${gapRef.current}px`;

      // Trail
      for (const p of trail) {
        p.life = Math.max(0, p.life - 0.06);
        p.x -= p.vx * 0.04;
        p.y -= p.vy * 0.04;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const t = i / TRAIL_MAX;
        const opacity = p.life * t * 0.45;
        const radius  = t * 3.5 * p.life;
        if (radius < 0.3) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GREEN_RGB}, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(blinkId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  const textStyle: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 22,
    fontWeight: "bold",
    color: GREEN,
    textShadow: `0 0 8px ${GREEN}, 0 0 20px ${GREEN}, 0 0 40px ${GREEN}70`,
    lineHeight: 1,
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />

      <div
        ref={wrapRef}
        className="pointer-events-none fixed z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={textStyle}>{"{"}</span>
          <span ref={centerRef} style={{ ...textStyle, margin: `0 ${BASE_GAP}px` }}>|</span>
          <span style={textStyle}>{"}"}</span>
        </div>
      </div>
    </>
  );
};

export default TechCursor;
