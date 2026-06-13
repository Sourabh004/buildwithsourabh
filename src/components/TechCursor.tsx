import { useEffect, useRef } from "react";

const TRAIL_MAX = 12;
const GREEN_RGB = "0, 255, 65";
const GIF_SRC = "/claude-code.gif";

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

const TechCursor = () => {
  const claudeRef = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticSrc = useRef<string>("");
  const hovered   = useRef(false);

  useEffect(() => {
    const claude = claudeRef.current;
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!claude || !canvas || !img) return;

    // Capture first frame as static data URL
    const captureFrame = () => {
      const snap = document.createElement("canvas");
      snap.width = img.naturalWidth || 48;
      snap.height = img.naturalHeight || 48;
      snap.getContext("2d")?.drawImage(img, 0, 0);
      staticSrc.current = snap.toDataURL();
      img.src = staticSrc.current; // freeze by default
    };
    if (img.complete) captureFrame();
    else img.addEventListener("load", captureFrame, { once: true });

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;

    let mouseX = 0, mouseY = 0, prevX = 0, prevY = 0;
    let claudeX = window.innerWidth / 2;
    let claudeY = window.innerHeight / 2;
    let rafId: number;
    const trail: TrailPoint[] = [];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      prevX = mouseX; prevY = mouseY;
      mouseX = e.clientX; mouseY = e.clientY;
      trail.push({ x: mouseX, y: mouseY, vx: mouseX - prevX, vy: mouseY - prevY, life: 1 });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const onEnter = () => {
      hovered.current = true;
      if (img) img.src = GIF_SRC; // restart GIF
    };
    const onLeave = () => {
      hovered.current = false;
      if (img && staticSrc.current) img.src = staticSrc.current; // freeze
    };

    const attachHovers = () => {
      document.querySelectorAll("a, button, [role='button'], .cursor-hover").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHovers();
    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      claudeX = lerp(claudeX, mouseX, 0.07);
      claudeY = lerp(claudeY, mouseY, 0.07);

      const lagX  = mouseX - claudeX;
      const lagY  = mouseY - claudeY;
      const tilt  = Math.max(-22, Math.min(22, lagX * 0.6));
      const speed = Math.sqrt(lagX * lagX + lagY * lagY);
      const sx    = 1 + Math.min(speed * 0.004, 0.15);
      const sy    = 1 - Math.min(speed * 0.002, 0.08);

      claude.style.left      = `${claudeX}px`;
      claude.style.top       = `${claudeY}px`;
      claude.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scaleX(${sx}) scaleY(${sy})`;

      for (const p of trail) {
        p.life = Math.max(0, p.life - 0.06);
        p.x -= p.vx * 0.04;
        p.y -= p.vy * 0.04;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const t = i / TRAIL_MAX;
        const opacity = p.life * t * 0.4;
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
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div ref={claudeRef} className="pointer-events-none fixed z-[9999]" style={{ opacity: 0.95 }}>
        <img
          ref={imgRef}
          src={GIF_SRC}
          alt=""
          style={{ width: 48, height: 48, imageRendering: "pixelated" }}
          draggable={false}
        />
      </div>
    </>
  );
};

export default TechCursor;
