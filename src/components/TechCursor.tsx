import { useEffect, useRef } from "react";

const TRAIL_MAX = 12;
const GREEN_RGB = "0, 255, 65";

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

// Pixel-art Claude Code mascot
const P = 4;
const O = "#E8774A";
const D = "#8B3A1A";
const W = "#FAD5B0";

const pixels: ([number, number, string])[] = [
  [2,0,O],[3,0,O],[4,0,O],[5,0,O],[6,0,O],[7,0,O],
  [1,1,O],[2,1,O],[3,1,O],[4,1,O],[5,1,O],[6,1,O],[7,1,O],[8,1,O],
  [0,2,O],[1,2,O],[2,2,W],[3,2,D],[4,2,O],[5,2,O],[6,2,D],[7,2,W],[8,2,O],[9,2,O],
  [0,3,O],[1,3,O],[2,3,O],[3,3,O],[4,3,O],[5,3,O],[6,3,O],[7,3,O],[8,3,O],[9,3,O],
  [0,4,O],[1,4,O],[2,4,D],[3,4,O],[4,4,O],[5,4,O],[6,4,O],[7,4,D],[8,4,O],[9,4,O],
  [1,5,O],[2,5,O],[3,5,O],[4,5,O],[5,5,O],[6,5,O],[7,5,O],[8,5,O],
  [1,6,O],[2,6,O],[3,6,O],[4,6,O],[5,6,O],[6,6,O],[7,6,O],[8,6,O],
  [0,7,O],[1,7,O],[3,7,O],[4,7,O],[5,7,O],[6,7,O],[8,7,O],[9,7,O],
  [0,8,O],[1,8,O],[3,8,D],[4,8,D],[5,8,D],[6,8,D],[8,8,O],[9,8,O],
];

const ClaudePixel = () => (
  <svg width={10 * P} height={9 * P} viewBox={`0 0 ${10 * P} ${9 * P}`} style={{ imageRendering: "pixelated" }}>
    <defs>
      <filter id="cglow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g filter="url(#cglow)">
      {pixels.map(([x, y, fill]) => (
        <rect key={`${x}-${y}`} x={x * P} y={y * P} width={P} height={P} fill={fill} />
      ))}
    </g>
  </svg>
);

const TechCursor = () => {
  const claudeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const claude = claudeRef.current;
    const canvas = canvasRef.current;
    if (!claude || !canvas) return;

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
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div ref={claudeRef} className="pointer-events-none fixed z-[9999]" style={{ opacity: 0.95 }}>
        <ClaudePixel />
      </div>
    </>
  );
};

export default TechCursor;
