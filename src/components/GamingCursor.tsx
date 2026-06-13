import { useEffect, useRef } from "react";

const TRAIL_MAX = 14;
const VOLT_RGB = "198, 242, 78";
const VOLT = "#C6F24E";

// Gap between center and lines
const BASE_GAP = 7;
const HOVER_GAP = 14;
// Line length and thickness
const LINE_LEN = 13;
const LINE_W = 2;
// Outer ring radius
const RING_R = 22;

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

const GamingCursor = () => {
  const crosshairRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const gapRef        = useRef(BASE_GAP);
  const targetGapRef  = useRef(BASE_GAP);
  const ringScaleRef  = useRef(1);
  const ringTargetRef = useRef(1);
  const opacityRef    = useRef(0);

  useEffect(() => {
    const el     = crosshairRef.current;
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
      opacityRef.current = 1;
      trail.push({ x: mouseX, y: mouseY, vx: mouseX - prevX, vy: mouseY - prevY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const onEnter = () => { targetGapRef.current = HOVER_GAP; ringTargetRef.current = 1.4; };
    const onLeave = () => { targetGapRef.current = BASE_GAP;  ringTargetRef.current = 1; };

    const attachHovers = () => {
      document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((e) => {
        e.removeEventListener("mouseenter", onEnter);
        e.removeEventListener("mouseleave", onLeave);
        e.addEventListener("mouseenter", onEnter);
        e.addEventListener("mouseleave", onLeave);
      });
    };
    attachHovers();

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Interpolate gap and ring scale
      gapRef.current       = lerp(gapRef.current,       targetGapRef.current,  0.18);
      ringScaleRef.current = lerp(ringScaleRef.current, ringTargetRef.current, 0.15);

      const gap   = gapRef.current;
      const scale = ringScaleRef.current;
      const half  = 50; // half of container size (100px)

      // Update crosshair lines via CSS vars
      el.style.setProperty("--gap",   `${gap}px`);
      el.style.setProperty("--scale", `${scale}`);

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
        const opacity = p.life * t * 0.55;
        const radius  = t * 4.5 * p.life;
        if (radius < 0.3) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${VOLT_RGB}, ${opacity})`;
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

  const C = 50; // center of 100×100 container

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />

      {/* Crosshair container — 100×100 centred on cursor */}
      <div
        ref={crosshairRef}
        className="pointer-events-none fixed z-[9999]"
        style={{ width: 100, height: 100, transform: "translate(-50%, -50%)" }}
      >
        {/* Outer ring — scales on hover */}
        <svg
          width={100}
          height={100}
          viewBox="0 0 100 100"
          className="absolute inset-0"
          style={{ transform: "scale(var(--scale, 1))", transformOrigin: "50% 50%", transition: "none" }}
        >
          <circle
            cx={C} cy={C} r={RING_R}
            fill="none"
            stroke={VOLT}
            strokeWidth={1.5}
            strokeOpacity={0.6}
            strokeDasharray="4 6"
          />
        </svg>

        {/* Top line */}
        <div style={{
          position: "absolute",
          width: LINE_W,
          height: LINE_LEN,
          background: VOLT,
          left: C - LINE_W / 2,
          bottom: `calc(${C}px + var(--gap, ${BASE_GAP}px))`,
          boxShadow: `0 0 6px ${VOLT}`,
        }} />
        {/* Bottom line */}
        <div style={{
          position: "absolute",
          width: LINE_W,
          height: LINE_LEN,
          background: VOLT,
          left: C - LINE_W / 2,
          top: `calc(${C}px + var(--gap, ${BASE_GAP}px))`,
          boxShadow: `0 0 6px ${VOLT}`,
        }} />
        {/* Left line */}
        <div style={{
          position: "absolute",
          height: LINE_W,
          width: LINE_LEN,
          background: VOLT,
          top: C - LINE_W / 2,
          right: `calc(${C}px + var(--gap, ${BASE_GAP}px))`,
          boxShadow: `0 0 6px ${VOLT}`,
        }} />
        {/* Right line */}
        <div style={{
          position: "absolute",
          height: LINE_W,
          width: LINE_LEN,
          background: VOLT,
          top: C - LINE_W / 2,
          left: `calc(${C}px + var(--gap, ${BASE_GAP}px))`,
          boxShadow: `0 0 6px ${VOLT}`,
        }} />

        {/* Center dot */}
        <div style={{
          position: "absolute",
          width: 3,
          height: 3,
          borderRadius: "50%",
          background: VOLT,
          left: C - 1.5,
          top: C - 1.5,
          boxShadow: `0 0 4px ${VOLT}`,
        }} />
      </div>
    </>
  );
};

export default GamingCursor;
