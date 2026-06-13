import { useEffect, useRef } from "react";

const TRAIL_MAX = 16;
const VOLT = "198, 242, 78";   // #C6F24E as rgb — wind colour

interface TrailPoint {
  x: number;
  y: number;
  vx: number;  // velocity snapshot for drift
  vy: number;
  life: number; // 0→1, starts at 1 and decays
}

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const dot    = dotRef.current;
    const ring   = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    // Full-screen canvas
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d")!;

    let mouseX = 0, mouseY = 0;
    let prevX  = 0, prevY  = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    const trail: TrailPoint[] = [];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      prevX  = mouseX;
      prevY  = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      // velocity direction — used so particles drift opposite to motion (wind)
      const vx = mouseX - prevX;
      const vy = mouseY - prevY;

      trail.push({ x: mouseX, y: mouseY, vx, vy, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const animate = () => {
      // Smooth ring follow
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;

      // Decay trail life
      for (const p of trail) {
        p.life = Math.max(0, p.life - 0.055);
        // drift each point slightly backward (wind dissipation)
        p.x -= p.vx * 0.04;
        p.y -= p.vy * 0.04;
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        const p       = trail[i];
        const t       = i / TRAIL_MAX;         // 0 = oldest, 1 = newest
        const opacity = p.life * t * 0.65;
        const radius  = t * 5.5 * p.life;

        if (radius < 0.3) continue;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${VOLT}, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Hover expand
    const onEnter = () => ring.classList.add("hovered");
    const onLeave = () => ring.classList.remove("hovered");

    document.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Wind trail canvas — sits above everything, pointer-events off */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
      />
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
