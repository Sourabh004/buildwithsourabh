/**
 * A realistic event credential on a lanyard: woven strap, metal swivel clip,
 * clear plastic holder with glare, printed card with photo, zones, hologram,
 * QR and access band. Click to flip for the back.
 */
import { useMemo, useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Globe2, MapPin, RotateCw } from "lucide-react";
import type { Stop } from "@/data/events";
import { BrandMark, brandThemes } from "./brands";

const INK = "#1F271B";
const PAPER = "#FBF7EE";

/** Tiny deterministic hash → pseudo-random bits for the QR pattern */
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)), (h >>> 0) / 4294967296);
};

/** Decorative QR-style code with the three finder squares */
const QR = ({ seed, size = 56 }: { seed: string; size?: number }) => {
  const cells = useMemo(() => {
    const n = 21;
    const rnd = hash(seed);
    const finder = (x: number, y: number) =>
      [
        [0, 0],
        [n - 7, 0],
        [0, n - 7],
      ].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
    const out: [number, number][] = [];
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > 0.52) out.push([x, y]);
    return out;
  }, [seed]);

  return (
    <svg viewBox="0 0 21 21" width={size} height={size} shapeRendering="crispEdges" className="block bg-white p-[2px]">
      {[
        [0, 0],
        [14, 0],
        [0, 14],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} fill={INK}>
          <rect x={x} y={y} width={7} height={7} />
          <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
          <rect x={x + 2} y={y + 2} width={3} height={3} />
        </g>
      ))}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={INK} />
      ))}
    </svg>
  );
};

/** Woven lanyard strap with repeating print */
const Strap = ({ color, ink, text, side }: { color: string; ink: string; text: string; side: "l" | "r" }) => (
  <div
    className="absolute bottom-0 h-[118px] w-[22px] overflow-hidden rounded-[3px]"
    style={{
      left: side === "l" ? "calc(50% - 38px)" : "calc(50% + 16px)",
      transform: `rotate(${side === "l" ? -11 : 11}deg)`,
      transformOrigin: "bottom center",
      background: `repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 3px), ${color}`,
      boxShadow: "inset 2px 0 2px rgba(255,255,255,0.25), inset -2px 0 3px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.35)",
      // Strap fades out at the top, as if it carries on round the neck
      maskImage: "linear-gradient(to top, black 55%, transparent)",
      WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)",
    }}
  >
    <span
      className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-display text-[9px] uppercase tracking-[0.2em]"
      style={{ writingMode: "vertical-rl", color: ink, opacity: 0.9 }}
    >
      {text} ✦ {text} ✦ {text}
    </span>
  </div>
);

/** Metal swivel clip: ring, barrel, hook */
const Clip = () => (
  <svg width="34" height="48" viewBox="0 0 34 48" className="relative z-20 -mb-[14px] drop-shadow-[0_3px_3px_rgba(0,0,0,0.45)]">
    <defs>
      <linearGradient id="metal" x1="0" x2="1">
        <stop offset="0" stopColor="#8E9396" />
        <stop offset="0.35" stopColor="#F4F6F7" />
        <stop offset="0.6" stopColor="#B9BEC1" />
        <stop offset="1" stopColor="#6E7377" />
      </linearGradient>
    </defs>
    <ellipse cx="17" cy="7" rx="9" ry="6" fill="none" stroke="url(#metal)" strokeWidth="3" />
    <rect x="12" y="11" width="10" height="13" rx="3" fill="url(#metal)" />
    <path d="M17 24 v8 a7 7 0 1 0 7 7" fill="none" stroke="url(#metal)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const EventPass = ({
  stop,
  i,
  selected,
  onPick,
}: {
  stop: Stop;
  i: number;
  selected: boolean;
  onPick: () => void;
}) => {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  // Pointer tilt + glare
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 16 };
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), spring);
  const tiltY = useSpring(useTransform(mx, [0, 1], [-14, 14]), spring);
  const flipY = useSpring(0, { stiffness: 90, damping: 15 });
  const rotateY = useTransform([tiltY, flipY], ([t, f]: number[]) => t + f);
  const glareX = useTransform(mx, [0, 1], ["-30%", "60%"]);
  const glare = useMotionTemplate`linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.35) 38%, transparent 52%) ${glareX} 0 / 220% 100% no-repeat`;
  const holoPos = useMotionTemplate`${useTransform(mx, [0, 1], ["0%", "100%"])} ${useTransform(my, [0, 1], ["0%", "100%"])}`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const flip = () => {
    const next = !flipped;
    setFlipped(next);
    flipY.set(next ? 180 : 0);
  };

  const theme = brandThemes[stop.brand];
  const serial = `${stop.city.slice(0, 3).toUpperCase()}-${stop.year.slice(-2)}-${String(1047 + i * 311).padStart(4, "0")}`;
  const zones = [1, 2, 3, 4].map((z) => z <= (stop.pass === "MEDIA" ? 4 : stop.pass === "GUEST" ? 2 : 3));

  return (
    <motion.div
      initial={reduce ? false : { y: -240, rotate: i % 2 ? 10 : -10, opacity: 0 }}
      whileInView={{ y: 0, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 60, damping: 8, mass: 1.2, delay: (i % 3) * 0.1 }}
      style={{ transformOrigin: "50% 0%" }}
      className="relative mx-auto flex w-full max-w-[300px] flex-col items-center"
    >
      {/* Idle sway — each pass slightly out of phase */}
      <div
        className={reduce ? "" : "pass-sway"}
        style={{ animationDelay: `${-i * 0.9}s`, transformOrigin: "50% 0%", width: "100%" }}
      >
        {/* Lanyard */}
        <div className="relative flex h-[118px] justify-center">
          <Strap color={theme.strap} ink={theme.strapInk} text={stop.title} side="l" />
          <Strap color={theme.strap} ink={theme.strapInk} text={stop.title} side="r" />
          <div className="absolute bottom-0 flex justify-center">
            <Clip />
          </div>
        </div>

        {/* Holder + card */}
        <div style={{ perspective: 1200 }} onPointerMove={onMove} onPointerLeave={() => (mx.set(0.5), my.set(0.5))}>
          <motion.div
            onClick={flip}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="cursor-hover relative aspect-[5/8] w-full select-none"
          >
            {[false, true].map((back) => (
              <div
                key={String(back)}
                className="absolute inset-0 rounded-[20px] p-[9px] pt-[26px]"
                style={{
                  backfaceVisibility: "hidden",
                  transform: back ? "rotateY(180deg)" : undefined,
                  // Clear vinyl holder
                  background: "linear-gradient(160deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: selected
                    ? `0 0 0 3px ${stop.color}, 0 24px 40px rgba(0,0,0,0.55)`
                    : "0 24px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
                  backdropFilter: "blur(2px)",
                }}
              >
                {/* Punched slot */}
                <span className="absolute left-1/2 top-[8px] h-[9px] w-[46px] -translate-x-1/2 rounded-full bg-[#1F271B]/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] ring-1 ring-white/30" />

                {/* Printed card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-[12px]" style={{ background: PAPER, color: INK }}>
                  {!back ? (
                    <>
                      {/* Event header */}
                      <div className="relative px-3.5 pb-2.5 pt-3" style={{ background: theme.header, color: theme.headerInk }}>
                        <div className="flex items-start justify-between gap-2">
                          <BrandMark stop={stop} />
                          <span className="font-grotesk text-[8px] font-black uppercase tracking-[0.22em] opacity-80">{stop.year}</span>
                        </div>
                        <p className="mt-2 font-display text-[15px] uppercase leading-[1] tracking-tight">{stop.title}</p>
                        <p className="mt-1 flex items-center gap-1 font-grotesk text-[8px] font-bold uppercase tracking-[0.2em] opacity-75">
                          <MapPin className="h-2.5 w-2.5" /> {stop.city}, {stop.country === "IN" ? "India" : "Saudi Arabia"}
                        </p>
                        {/* thin accent rule like a printed credential */}
                        <span className="absolute inset-x-0 bottom-0 h-[3px]" style={{ background: theme.accent }} />
                      </div>

                      {/* Photo window */}
                      <div className="relative mx-3 mt-3 aspect-[16/10] overflow-hidden rounded-[6px] ring-1 ring-black/20">
                        {stop.photo ? (
                          <img
                            src={stop.photo}
                            alt={`${stop.event}, ${stop.city}`}
                            draggable={false}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            style={{ objectPosition: stop.focus ?? "center" }}
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center"
                            style={{ background: `radial-gradient(circle at 35% 35%, ${stop.color}, ${INK})` }}
                          >
                            <span className="font-display text-3xl uppercase text-white/90">{stop.city}</span>
                          </div>
                        )}
                        {/* Holographic security sticker */}
                        <motion.span
                          className="absolute bottom-1.5 right-1.5 h-9 w-9 rounded-full border border-white/70"
                          style={{
                            backgroundImage:
                              "conic-gradient(from 0deg, #ff7a9c, #fcad50, #c6f24e, #019ea5, #9b5de5, #ff7a9c)",
                            backgroundSize: "200% 200%",
                            backgroundPosition: holoPos,
                            opacity: 0.85,
                            mixBlendMode: "screen",
                          }}
                        />
                      </div>

                      {/* Holder */}
                      <div className="px-3.5 pt-2.5">
                        <p className="font-grotesk text-[7px] font-bold uppercase tracking-[0.25em] opacity-50">Pass holder</p>
                        <p className="font-display text-[17px] uppercase leading-none">Sourabh Pawar</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex gap-1">
                            {zones.map((on, z) => (
                              <span
                                key={z}
                                className="flex h-5 w-5 items-center justify-center rounded-[3px] border font-grotesk text-[9px] font-black"
                                style={{
                                  borderColor: INK,
                                  background: on ? INK : "transparent",
                                  color: on ? PAPER : INK,
                                  opacity: on ? 1 : 0.35,
                                }}
                              >
                                {z + 1}
                              </span>
                            ))}
                          </div>
                          <span className="font-grotesk text-[7px] font-bold uppercase tracking-[0.2em] opacity-50">Zones</span>
                        </div>
                        <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-dashed border-black/20 pt-2">
                          {[
                            ["Issued by", stop.org],
                            ["Valid", stop.year],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p className="font-grotesk text-[7px] font-bold uppercase tracking-[0.25em] opacity-50">{k}</p>
                              <p className="truncate font-grotesk text-[10px] font-black uppercase tracking-wide">{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Access band */}
                      <div
                        className="mt-auto flex items-center justify-between gap-2 px-3.5 py-2.5"
                        style={{ background: theme.band, color: theme.bandInk }}
                      >
                        <div className="min-w-0">
                          <p className="font-grotesk text-[7px] font-bold uppercase tracking-[0.3em] opacity-70">Access level</p>
                          <p className="font-display text-[21px] uppercase leading-none tracking-tight">{stop.pass}</p>
                          <p className="mt-1 font-mono text-[8px] tracking-wider opacity-75">No. {serial}</p>
                        </div>
                        <QR seed={serial} size={44} />
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col p-4">
                      <div className="flex items-center justify-between font-grotesk text-[8px] font-black uppercase tracking-[0.22em] opacity-60">
                        <span>Credential</span>
                        <span>{serial}</span>
                      </div>
                      <p className="mt-3 font-display text-xl uppercase leading-none">{stop.city}</p>
                      <p className="mt-1 font-grotesk text-[11px] font-bold leading-tight" style={{ color: INK }}>
                        {stop.event}
                      </p>
                      <p className="mt-3 text-[12px] leading-relaxed opacity-80">{stop.note}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {stop.tags.map((t) => (
                          <span key={t} className="rounded-full border border-black/30 px-2 py-0.5 font-grotesk text-[8px] font-bold uppercase tracking-wider">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPick();
                        }}
                        className="cursor-hover mt-4 flex items-center justify-center gap-2 rounded-full border-2 py-2 font-grotesk text-[10px] font-black uppercase tracking-widest transition-transform hover:-translate-y-0.5"
                        style={{ borderColor: INK, background: stop.color }}
                      >
                        <Globe2 className="h-3.5 w-3.5" /> Show on globe
                      </button>
                      <div className="mt-auto">
                        <p className="text-[7px] uppercase leading-snug tracking-wider opacity-45">
                          This credential is non-transferable and must be worn visibly at all times within the venue.
                        </p>
                        <div className="mt-2 flex items-end justify-between border-t border-dashed border-black/25 pt-2">
                          <span className="font-['Brush_Script_MT',cursive] text-2xl leading-none">Sourabh</span>
                          <span className="font-grotesk text-[7px] font-bold uppercase tracking-widest opacity-50">Signature</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Plastic glare */}
                <motion.div className="pointer-events-none absolute inset-0 rounded-[20px]" style={{ background: glare }} />
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={flip}
          className="cursor-hover mx-auto mt-4 flex items-center gap-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/55 transition-colors hover:text-[#FAF0D7]"
        >
          <RotateCw className="h-3 w-3" /> {flipped ? "Front" : "Flip pass"}
        </button>
      </div>
    </motion.div>
  );
};

export default EventPass;
