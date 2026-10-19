/**
 * "What I'm into" — each interest as a small, realistic live widget:
 * an F1 timing tower, mechanical WASD keycaps, a broadcast score bug and a ticket stub.
 */
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, PartyPopper, Trophy, TrendingUp } from "lucide-react";
import { SectionHeading, TiltCard } from "./brutal";

const VOLT = "#C6F24E";
const CREAM = "#FAF0D7";
const INK = "#1F271B";

/** Re-render every `ms` — drives the "live" numbers */
const useTick = (ms: number) => {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((n) => n + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, reduce]);
  return t;
};

/* ───────────────────────── Motorsport: timing tower ───────────────────────── */

const tyre = { S: "#E10600", M: "#FFD12E", H: "#F2F2F2" } as const;
const drivers = [
  { pos: 1, code: "VER", team: "#3671C6", t: "LEADER", tyre: "M" as const, sector: ["#B138DD", "#2ECC71", "#2ECC71"] },
  { pos: 2, code: "NOR", team: "#FF8000", t: "+1.204", tyre: "H" as const, sector: ["#2ECC71", "#B138DD", "#FFD12E"] },
  { pos: 3, code: "LEC", team: "#E8002D", t: "+3.871", tyre: "M" as const, sector: ["#FFD12E", "#2ECC71", "#B138DD"] },
  { pos: 4, code: "HAM", team: "#E8002D", t: "+6.512", tyre: "S" as const, sector: ["#FFD12E", "#FFD12E", "#2ECC71"] },
];

const TimingTower = () => {
  const tick = useTick(1400);
  const lap = 48 + (tick % 10);
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0F0F12] font-mono text-[11px] text-white">
      {/* chequered strip */}
      <div
        className="h-2"
        style={{ background: "repeating-conic-gradient(#fff 0 25%, #111 0 50%) 0 0 / 8px 8px" }}
      />
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest">
        <span>
          Lap <span style={{ color: VOLT }}>{lap}</span>/57
        </span>
        <span className="flex items-center gap-1.5 text-[#E10600]">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#E10600]"
          />
          Live timing
        </span>
      </div>
      {drivers.map((d, i) => {
        // tiny jitter so the gaps feel live
        const jitter = i === 0 ? "" : (parseFloat(d.t) + ((tick * (i + 3)) % 7) * 0.013).toFixed(3);
        return (
          <div key={d.code} className={`flex items-center gap-2 px-3 py-1.5 ${i % 2 ? "bg-white/[0.03]" : ""}`}>
            <span className="w-4 text-right text-white/60">{d.pos}</span>
            <span className="h-3.5 w-1 rounded-sm" style={{ background: d.team }} />
            <span className="w-9 font-bold tracking-wider">{d.code}</span>
            <span className="flex gap-0.5">
              {d.sector.map((c, s) => (
                <span key={s} className="h-1.5 w-3 rounded-sm" style={{ background: c }} />
              ))}
            </span>
            <span className="ml-auto tabular-nums text-white/85">{i === 0 ? d.t : `+${jitter}`}</span>
            <span
              className="flex h-4 w-4 items-center justify-center rounded-full border-2 text-[8px] font-black"
              style={{ borderColor: tyre[d.tyre], color: tyre[d.tyre] }}
            >
              {d.tyre}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ───────────────────────── PC gaming: WASD keycaps ───────────────────────── */

const Keycap = ({ k, pressed, wide = false }: { k: string; pressed: boolean; wide?: boolean }) => (
  <div
    className={`relative flex h-11 items-start justify-start rounded-[7px] p-1.5 font-grotesk text-[11px] font-black text-white/90 transition-all duration-100 ${
      wide ? "w-28" : "w-11"
    }`}
    style={{
      background: "linear-gradient(180deg, #34343E 0%, #22222A 100%)",
      boxShadow: pressed
        ? "0 1px 0 #0B0B0F, inset 0 1px 0 rgba(255,255,255,0.08)"
        : "0 5px 0 #0B0B0F, 0 6px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
      transform: pressed ? "translateY(4px)" : "translateY(0)",
    }}
  >
    {k}
    {/* RGB legend glow */}
    <span
      className="pointer-events-none absolute inset-x-2 bottom-1 h-[2px] rounded-full opacity-80"
      style={{ background: pressed ? VOLT : "rgba(155,93,229,0.8)", boxShadow: pressed ? `0 0 8px ${VOLT}` : "0 0 6px #9B5DE5" }}
    />
  </div>
);

const WASD = () => {
  const tick = useTick(420);
  const seq = ["W", "W", "A", "S", "D", "D", " ", "W"];
  const down = seq[tick % seq.length];
  const fps = 238 + ((tick * 7) % 9);
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#101015] px-4 pb-5 pt-4">
      {/* RGB underglow */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-10 opacity-60 blur-xl"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(90deg, #FF7A9C, #FCAD50, #C6F24E, #019EA5, #9B5DE5, #FF7A9C)",
          backgroundSize: "300% 100%",
        }}
      />
      <div className="absolute right-3 top-2 text-right font-mono text-[10px] leading-tight">
        <p style={{ color: VOLT }}>FPS {fps}</p>
        <p className="text-white/50">PING 12ms</p>
      </div>
      <div className="relative flex flex-col items-center gap-1.5">
        <Keycap k="W" pressed={down === "W"} />
        <div className="flex gap-1.5">
          {["A", "S", "D"].map((k) => (
            <Keycap key={k} k={k} pressed={down === k} />
          ))}
        </div>
        <Keycap k="SPACE" pressed={down === " "} wide />
      </div>
    </div>
  );
};

/* ───────────────────────── Esports: broadcast score bug ───────────────────────── */

const ScoreBug = () => {
  const tick = useTick(900);
  const viewers = (1.21 + ((tick * 13) % 37) / 1000).toFixed(2);
  const pts = [8, 14, 11, 19, 17, 26, 24, 33, 30, 38, 44, 41];
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${50 - p}`).join(" ");
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0D1117] text-white">
      <div className="flex items-center justify-between px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1.5 rounded-sm bg-[#E10600] px-1.5 py-0.5">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
          Live
        </span>
        <span className="text-white/60">Grand Final · Map 3</span>
        <span className="tabular-nums" style={{ color: "#5CE1FF" }}>
          👁 {viewers}M
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-y border-white/10">
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#019EA5]/40 to-transparent px-3 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#019EA5] font-display text-[10px]">BLR</span>
          <span className="font-grotesk text-[11px] font-bold uppercase">Team Blue</span>
        </div>
        <div className="flex items-center gap-2 bg-black px-3 py-2 font-display text-lg tabular-nums">
          <span style={{ color: "#5CE1FF" }}>11</span>
          <span className="text-white/40">:</span>
          <span style={{ color: "#FF7A9C" }}>9</span>
        </div>
        <div className="flex items-center justify-end gap-2 bg-gradient-to-l from-[#FF7A9C]/40 to-transparent px-3 py-2">
          <span className="font-grotesk text-[11px] font-bold uppercase">Team Red</span>
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#FF7A9C] font-display text-[10px] text-black">HYD</span>
        </div>
      </div>
      <div className="px-3 pb-2 pt-1.5">
        <p className="font-grotesk text-[9px] font-bold uppercase tracking-widest text-white/45">Peak viewership</p>
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="h-12 w-full">
          <defs>
            <linearGradient id="vw" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5CE1FF" stopOpacity="0.45" />
              <stop offset="1" stopColor="#5CE1FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L 100 50 L 0 50 Z`} fill="url(#vw)" />
          <motion.path
            d={path}
            fill="none"
            stroke="#5CE1FF"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
};

/* ───────────────────────── Events: ticket stub ───────────────────────── */

const Ticket = () => (
  <a href="#contact" className="cursor-hover group relative block">
    <div className="relative flex overflow-hidden rounded-lg" style={{ background: "#FBF3E0", color: INK }}>
      {/* perforation notches */}
      <span className="absolute left-[68%] top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#23291E]" />
      <span className="absolute bottom-0 left-[68%] h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#23291E]" />
      <div className="w-[68%] border-r-2 border-dashed border-black/25 p-3.5">
        <p className="font-grotesk text-[9px] font-black uppercase tracking-[0.25em] text-[#F77F1A]">Admit one · All access</p>
        <p className="mt-1 font-display text-xl uppercase leading-none">Your tournament</p>
        <p className="font-display text-xl uppercase leading-none text-black/35">Here</p>
        <div className="mt-3 grid grid-cols-3 gap-2 font-grotesk text-[8px] font-bold uppercase tracking-widest">
          {[
            ["Date", "TBD"],
            ["Venue", "Yours"],
            ["Crew", "Sourabh"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="opacity-45">{k}</p>
              <p className="text-[10px] font-black">{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 p-2">
        <p className="font-grotesk text-[8px] font-black uppercase tracking-widest opacity-50">No.</p>
        <p className="font-display text-lg leading-none">0001</p>
        <div className="mt-1 flex h-8 items-end gap-[2px]">
          {Array.from({ length: 16 }).map((_, b) => (
            <span key={b} className="block h-full bg-[#1F271B]" style={{ width: b % 3 === 0 ? 3 : 1 }} />
          ))}
        </div>
      </div>
      {/* stamp */}
      <span
        className="pointer-events-none absolute right-[37%] top-[38px] rotate-[-10deg] rounded-md border-[3px] px-2 py-0.5 font-display text-sm uppercase tracking-wider opacity-80 transition-transform group-hover:scale-110"
        style={{ borderColor: "#E10600", color: "#E10600" }}
      >
        Open for gigs
      </span>
    </div>
  </a>
);

/* ───────────────────────── Cards ───────────────────────── */

const cards: {
  title: string;
  sub: string;
  body: string;
  color: string;
  icon: typeof Trophy;
  widget: ReactNode;
}[] = [
  {
    title: "Motorsport",
    sub: "Race weekends, telemetry & strategy",
    body: "F1 is my favourite dataset. Lap deltas, tyre strategy, pit windows — I follow the racing through the numbers behind it.",
    color: VOLT,
    icon: Trophy,
    widget: <TimingTower />,
  },
  {
    title: "PC Gaming",
    sub: "Deep in the ecosystem",
    body: "From indie titles to competitive scenes — what makes games sticky, what drives engagement, and why communities form.",
    color: "#9B5DE5",
    icon: Gamepad2,
    widget: <WASD />,
  },
  {
    title: "Esports",
    sub: "Viewership & community analytics",
    body: "Viewership, audience behaviour, community dynamics and the creator economy — I watch the broadcast and the numbers.",
    color: "#019EA5",
    icon: TrendingUp,
    widget: <ScoreBug />,
  },
  {
    title: "Gaming Events",
    sub: "Freelance — tournaments & community nights",
    body: "Tournaments, watch parties, community nights and esports activations. Planning, ops, hype: handled.",
    color: "#F77F1A",
    icon: PartyPopper,
    widget: <Ticket />,
  },
];

const ArenaSection = () => (
  <section className="px-6 py-24 md:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading label="The Arena" dark>
        What I'm <span style={{ color: VOLT }}>Into</span>
      </SectionHeading>
      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 60, rotateX: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <TiltCard
              className="cursor-hover flex flex-col rounded-2xl border-2 bg-[#23291E] p-6 md:p-7"
              shadow={c.color}
              max={8}
              style={{ borderColor: c.color }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: c.color }}>
                  <c.icon className="h-5 w-5" style={{ color: INK }} />
                </span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none" style={{ color: c.color }}>
                    {c.title}
                  </h3>
                  <p className="mt-1 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/50">{c.sub}</p>
                </div>
                <span className="ml-auto font-display text-3xl opacity-15" style={{ color: c.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div style={{ transform: "translateZ(30px)" }}>{c.widget}</div>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: `${CREAM}BF` }}>
                {c.body}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ArenaSection;
