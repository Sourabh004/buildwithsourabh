import { useEffect, useRef } from "react";

const TRAIL_MAX = 12;
const GREEN_RGB = "0, 255, 65";
const GREEN = "#00FF41";

const BASE_GAP  = 2;
const HOVER_GAP = 8;

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

// Pixel-art Claude Code mascot (orange squid)
const P = 4; // pixel size
const O = "#E8774A"; // orange body
const D = "#8B3A1A"; // dark shadow/detail
const W = "#FAD5B0"; // highlight

const pixels: ([number, number, string])[] = [
  // row 0 — top head bumps
  [2,0,O],[3,0,O],[4,0,O],[5,0,O],[6,0,O],[7,0,O],
  // row 1
  [1,1,O],[2,1,O],[3,1,O],[4,1,O],[5,1,O],[6,1,O],[7,1,O],[8,1,O],
  // row 2 — face with eyes
  [0,2,O],[1,2,O],[2,2,W],[3,2,D],[4,2,O],[5,2,O],[6,2,D],[7,2,W],[8,2,O],[9,2,O],
  // row 3
  [0,3,O],[1,3,O],[2,3,O],[3,3,O],[4,3,O],[5,3,O],[6,3,O],[7,3,O],[8,3,O],[9,3,O],
  // row 4 — blush / smile
  [0,4,O],[1,4,O],[2,4,D],[3,4,O],[4,4,O],[5,4,O],[6,4,O],[7,4,D],[8,4,O],[9,4,O],
  // row 5 — body
  [1,5,O],[2,5,O],[3,5,O],[4,5,O],[5,5,O],[6,5,O],[7,5,O],[8,5,O],
  // row 6
  [1,6,O],[2,6,O],[3,6,O],[4,6,O],[5,6,O],[6,6,O],[7,6,O],[8,6,O],
  // row 7 — legs split
  [0,7,O],[1,7,O],[3,7,O],[4,7,O],[5,7,O],[6,7,O],[8,7,O],[9,7,O],
  // row 8 — feet
  [0,8,O],[1,8,O],[3,8,D],[4,8,D],[5,8,D],[6,8,D],[8,8,O],[9,8,O],
];

const ClaudePixel = () => (
  <svg
    width={10 * P} height={9 * P}
    viewBox={`0 0 ${10 * P} ${9 * P}`}
    style={{ imageRendering: "pixelated" }}
  >
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
  const wrapRef   = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLSpanElement>(null);
  const robotRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gapRef     = useRef(BASE_GAP);
  const targetGap  = useRef(BASE_GAP);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const center = centerRef.current;
    const robot  = robotRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !center || !robot || !canvas) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;

    let mouseX = 0, mouseY = 0, prevX = 0, prevY = 0;
    let robotX = 0, robotY = 0;
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

    // Initialise robot to first mouse position
    robotX = window.innerWidth  / 2;
    robotY = window.innerHeight / 2;

    let blinkOn = true;
    const blinkId = setInterval(() => {
      if (!hoveredRef.current) {
        blinkOn = !blinkOn;
        center.style.opacity = blinkOn ? "1" : "0";
      }
    }, 500);

    const onEnter = () => {
      hoveredRef.current     = true;
      targetGap.current      = HOVER_GAP;
      center.style.opacity   = "1";
      center.textContent     = "·";
    };
    const onLeave = () => {
      hoveredRef.current  = false;
      targetGap.current   = BASE_GAP;
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
      // Brace gap
      gapRef.current = lerp(gapRef.current, targetGap.current, 0.18);
      center.style.margin = `0 ${gapRef.current}px`;

      // Robot drags behind cursor (slow lerp = elastic drag feel)
      robotX = lerp(robotX, mouseX, 0.07);
      robotY = lerp(robotY, mouseY, 0.07);

      // Tilt based on horizontal lag distance
      const lagX = mouseX - robotX;
      const lagY = mouseY - robotY;
      const tilt  = Math.max(-22, Math.min(22, lagX * 0.6));
      // Slight squish when moving fast
      const speed = Math.sqrt(lagX * lagX + lagY * lagY);
      const scaleX = 1 + Math.min(speed * 0.004, 0.15);
      const scaleY = 1 - Math.min(speed * 0.002, 0.08);

      robot.style.left      = `${robotX}px`;
      robot.style.top       = `${robotY}px`;
      robot.style.transform = `translate(-50%, -60%) rotate(${tilt}deg) scaleX(${scaleX}) scaleY(${scaleY})`;

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

      {/* Claude Code pixel mascot — drags behind */}
      <div
        ref={robotRef}
        className="pointer-events-none fixed z-[9997]"
        style={{ opacity: 0.92 }}
      >
        <ClaudePixel />
      </div>

      {/* {|} brace cursor — sits exactly at pointer */}
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
