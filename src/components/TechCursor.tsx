import { useEffect, useRef } from "react";

const TRAIL_MAX = 14;
const GREEN_RGB = "0, 255, 65";
const GREEN = "#00FF41";

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

const TechCursor = () => {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const charRef    = useRef<HTMLSpanElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const char   = charRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !char || !canvas) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;

    let mouseX = 0, mouseY = 0, prevX = 0, prevY = 0;
    let rafId: number;
    const trail: TrailPoint[] = [];

    const onMouseMove = (e: MouseEvent) => {
      prevX = mouseX; prevY = mouseY;
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top  = `${mouseY}px`;
      trail.push({ x: mouseX, y: mouseY, vx: mouseX - prevX, vy: mouseY - prevY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    // Blink the underscore at 530ms (terminal rate)
    let blinkVisible = true;
    const blinkId = setInterval(() => {
      if (!hoveredRef.current) {
        blinkVisible = !blinkVisible;
        char.style.opacity = blinkVisible ? "1" : "0";
      }
    }, 530);

    const onEnter = () => {
      hoveredRef.current = true;
      char.textContent = "█";
      char.style.opacity = "1";
    };
    const onLeave = () => {
      hoveredRef.current = false;
      char.textContent = "_";
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

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />

      {/* Terminal prompt — positioned left of cursor tip, centred vertically */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] select-none"
        style={{ transform: "translate(4px, -50%)" }}
      >
        <span
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 22,
            fontWeight: "bold",
            color: GREEN,
            textShadow: `0 0 8px ${GREEN}, 0 0 18px ${GREEN}, 0 0 40px ${GREEN}90`,
            whiteSpace: "nowrap",
            letterSpacing: "0.02em",
          }}
        >
          {">"}&thinsp;<span ref={charRef}>_</span>
        </span>
      </div>
    </>
  );
};

export default TechCursor;
