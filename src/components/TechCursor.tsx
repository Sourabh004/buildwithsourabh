import { useEffect, useRef } from "react";

const TRAIL_MAX = 12;
const GREEN_RGB = "0, 255, 65";
const GREEN = "#00FF41";

const BASE_GAP  = 2;
const HOVER_GAP = 8;

interface TrailPoint {
  x: number; y: number; vx: number; vy: number; life: number;
}

// Inline robot SVG — circuit-faced bot
const RobotSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Glow filter */}
    <defs>
      <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {/* Antenna */}
    <line x1="18" y1="2" x2="18" y2="7" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" filter="url(#glow)" />
    <circle cx="18" cy="1.5" r="1.5" fill={GREEN} filter="url(#glow)" />
    {/* Head */}
    <rect x="7" y="7" width="22" height="16" rx="3" stroke={GREEN} strokeWidth="1.5" filter="url(#glow)" />
    {/* Eyes */}
    <rect x="11" y="11" width="5" height="4" rx="1" fill={GREEN} filter="url(#glow)" />
    <rect x="20" y="11" width="5" height="4" rx="1" fill={GREEN} filter="url(#glow)" />
    {/* Mouth */}
    <line x1="13" y1="19" x2="15" y2="19" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="17" y1="19" x2="19" y2="19" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="19" x2="23" y2="19" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
    {/* Neck */}
    <line x1="15" y1="23" x2="15" y2="26" stroke={GREEN} strokeWidth="1.5" />
    <line x1="21" y1="23" x2="21" y2="26" stroke={GREEN} strokeWidth="1.5" />
    {/* Body */}
    <rect x="9" y="26" width="18" height="9" rx="2" stroke={GREEN} strokeWidth="1.5" filter="url(#glow)" />
    {/* Chest LED */}
    <circle cx="18" cy="30.5" r="2" fill={GREEN} filter="url(#glow)" />
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

      {/* Robot companion — drags behind */}
      <div
        ref={robotRef}
        className="pointer-events-none fixed z-[9997]"
        style={{ opacity: 0.85 }}
      >
        <RobotSVG />
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
