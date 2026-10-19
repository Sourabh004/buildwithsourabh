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

/* ───────────────────────── F1: broadcast timing tower ───────────────────────── */

type Team = { name: string; color: string; logo?: string; mark?: string; logoBg: string };
const teams: Record<string, Team> = {
  RBR: { name: "Red Bull Racing", color: "#3671C6", logo: "/brands/redbull.svg", logoBg: "#FFFFFF" },
  MCL: { name: "McLaren", color: "#FF8000", logo: "/f1/mclaren.svg", logoBg: "#FF8000" },
  FER: { name: "Ferrari", color: "#E8002D", mark: "SF", logoBg: "#E8002D" },
  MER: { name: "Mercedes", color: "#27F4D2", logo: "/f1/mercedes.svg", logoBg: "#FFFFFF" },
};

const tyre = { S: "#E10600", M: "#FFD12E", H: "#F2F2F2" } as const;
const drivers = [
  { pos: 1, code: "VER", team: "RBR", gap: 0, tyre: "M" as const, laps: 18, sector: ["#B138DD", "#2ECC71", "#2ECC71"] },
  { pos: 2, code: "NOR", team: "MCL", gap: 1.204, tyre: "H" as const, laps: 24, sector: ["#2ECC71", "#B138DD", "#FFD12E"] },
  { pos: 3, code: "LEC", team: "FER", gap: 3.871, tyre: "M" as const, laps: 15, sector: ["#FFD12E", "#2ECC71", "#B138DD"] },
  { pos: 4, code: "RUS", team: "MER", gap: 6.512, tyre: "S" as const, laps: 7, sector: ["#FFD12E", "#FFD12E", "#2ECC71"] },
];

const TeamBadge = ({ t }: { t: Team }) => (
  <span
    className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[5px] p-[3px]"
    style={{ background: t.logoBg }}
    title={t.name}
  >
    {t.logo ? (
      <img src={t.logo} alt={t.name} draggable={false} className="max-h-full max-w-full object-contain" />
    ) : (
      // Ferrari: drawn shield (no clean logo file available)
      <span
        className="flex h-full w-full items-center justify-center font-display text-[8px] leading-none text-black"
        style={{ background: "#FFF200", clipPath: "polygon(0 0,100% 0,100% 70%,50% 100%,0 70%)" }}
      >
        {t.mark}
      </span>
    )}
  </span>
);

const TimingTower = () => {
  const tick = useTick(1400);
  const lap = 48 + (tick % 10);
  const fastest = drivers[(tick >> 1) % drivers.length].code;
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0E] text-white">
      {/* header: F1 mark + lap counter */}
      <div className="flex items-center justify-between bg-[#E10600] px-3 py-1.5">
        <span className="font-display text-sm italic leading-none tracking-tight">F1</span>
        <span className="font-grotesk text-[10px] font-black uppercase tracking-widest">
          Lap {lap} <span className="opacity-60">/ 57</span>
        </span>
        <span className="flex items-center gap-1 font-grotesk text-[9px] font-black uppercase tracking-widest">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
          Live
        </span>
      </div>
      <div className="grid grid-cols-[18px_24px_1fr_auto_auto] items-center gap-x-2 px-3 py-1 font-grotesk text-[8px] font-bold uppercase tracking-widest text-white/40">
        <span>P</span>
        <span />
        <span>Driver</span>
        <span className="text-right">Interval</span>
        <span>Tyre</span>
      </div>
      {drivers.map((d, i) => {
        const t = teams[d.team];
        const gap = i === 0 ? "LEADER" : `+${(d.gap + ((tick * (i + 3)) % 7) * 0.013).toFixed(3)}`;
        return (
          <div
            key={d.code}
            className="relative grid grid-cols-[18px_24px_1fr_auto_auto] items-center gap-x-2 border-t border-white/[0.06] px-3 py-1.5 font-mono text-[11px]"
            style={{ background: `linear-gradient(90deg, ${t.color}22, transparent 55%)` }}
          >
            <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: t.color }} />
            <span className="text-center font-bold text-white/70">{d.pos}</span>
            <TeamBadge t={t} />
            <span className="flex min-w-0 items-center gap-2">
              <span className="font-bold tracking-wider">{d.code}</span>
              <span className="hidden truncate font-grotesk text-[9px] uppercase tracking-wider text-white/40 sm:inline">{t.name}</span>
              {fastest === d.code && (
                <span className="rounded-sm bg-[#B138DD] px-1 font-grotesk text-[8px] font-black uppercase">FL</span>
              )}
            </span>
            <span className="text-right tabular-nums text-white/85">{gap}</span>
            <span className="flex items-center gap-1">
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full border-2 text-[8px] font-black"
                style={{ borderColor: tyre[d.tyre], color: tyre[d.tyre] }}
              >
                {d.tyre}
              </span>
              <span className="w-4 text-[9px] text-white/40">{d.laps}</span>
            </span>
          </div>
        );
      })}
      {/* sector strip for the leader */}
      <div className="flex items-center gap-2 border-t border-white/10 px-3 py-1.5 font-grotesk text-[8px] font-bold uppercase tracking-widest text-white/45">
        Sectors
        {drivers[0].sector.map((c, s) => (
          <span key={s} className="h-1.5 flex-1 rounded-sm" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── PC gaming: full keyboard ───────────────────────── */

// Each row: [label, width in units]. Gaming keys get the RGB highlight.
const rows: [string, number][][] = [
  [["Esc", 1], ["1", 1], ["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1], ["7", 1], ["8", 1], ["9", 1], ["0", 1], ["⌫", 2]],
  [["Tab", 1.5], ["Q", 1], ["W", 1], ["E", 1], ["R", 1], ["T", 1], ["Y", 1], ["U", 1], ["I", 1], ["O", 1], ["P", 1], ["\\", 1.5]],
  [["Caps", 1.75], ["A", 1], ["S", 1], ["D", 1], ["F", 1], ["G", 1], ["H", 1], ["J", 1], ["K", 1], ["L", 1], ["Enter", 2.25]],
  [["Shift", 2.25], ["Z", 1], ["X", 1], ["C", 1], ["V", 1], ["B", 1], ["N", 1], ["M", 1], [",", 1], [".", 1], ["Shift", 2.75]],
  [["Ctrl", 1.5], ["Alt", 1.25], ["Space", 6.5], ["Alt", 1.25], ["Fn", 1.25], ["Ctrl", 1.5]],
];
const gaming: Record<string, string> = {
  W: VOLT, A: VOLT, S: VOLT, D: VOLT,
  Q: "#5CE1FF", E: "#5CE1FF", R: "#FF7A9C", F: "#FF7A9C",
  Shift: "#FCAD50", Ctrl: "#FCAD50", Space: "#9B5DE5", Tab: "#5CE1FF",
  "1": "#FF7A9C", "2": "#FF7A9C", "3": "#FF7A9C", "4": "#FF7A9C",
};

const Keyboard = () => {
  const tick = useTick(380);
  const seq = ["W", "W", "A", "W", "D", "Space", "S", "Shift", "W", "E", "R", "1", "Q", "F"];
  const down = seq[tick % seq.length];
  const fps = 238 + ((tick * 7) % 9);
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0E0E12] p-2.5 pt-7">
      <div className="absolute left-3 top-2 font-grotesk text-[9px] font-black uppercase tracking-widest text-white/40">
        Keybinds · FPS
      </div>
      <div className="absolute right-3 top-1.5 text-right font-mono text-[10px] leading-tight">
        <span style={{ color: VOLT }}>FPS {fps}</span> <span className="text-white/45">· 12ms</span>
      </div>
      {/* underglow */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-8 opacity-50 blur-xl"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(90deg, #FF7A9C, #FCAD50, #C6F24E, #019EA5, #9B5DE5, #FF7A9C)",
          backgroundSize: "300% 100%",
        }}
      />
      <div className="relative flex flex-col gap-[3px] rounded-md bg-[#1A1A20] p-[5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-[3px]">
            {row.map(([k, w], ki) => {
              const glow = gaming[k];
              const pressed = down === k;
              return (
                <span
                  key={`${k}-${ki}`}
                  className="relative flex h-[22px] items-center justify-center rounded-[4px] font-grotesk text-[8px] font-black uppercase transition-all duration-100"
                  style={{
                    flex: w,
                    color: glow ? glow : "rgba(255,255,255,0.45)",
                    background: glow ? "linear-gradient(180deg,#2E2E38,#1F1F27)" : "linear-gradient(180deg,#26262E,#1B1B22)",
                    boxShadow: pressed
                      ? `0 0 0 1px ${glow ?? "#fff"}, 0 0 10px ${glow ?? "#fff"}`
                      : glow
                        ? `0 2px 0 #08080B, inset 0 -2px 0 ${glow}55`
                        : "0 2px 0 #08080B",
                    transform: pressed ? "translateY(2px)" : undefined,
                    textShadow: glow ? `0 0 6px ${glow}` : undefined,
                  }}
                >
                  {k}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <div className="relative mt-2 flex flex-wrap gap-x-3 gap-y-1 font-grotesk text-[8px] font-bold uppercase tracking-widest text-white/45">
        {[
          ["Move", VOLT],
          ["Abilities", "#5CE1FF"],
          ["Utility", "#FF7A9C"],
          ["Jump", "#9B5DE5"],
          ["Mods", "#FCAD50"],
        ].map(([l, c]) => (
          <span key={l} className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 4px ${c}` }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────── Esports: BGMI points table ───────────────────────── */

// Sample standings for the widget — not real tournament results. Logos: Liquipedia.
// Drop an official logo in /public/bgmi/<file> and set `logo` to use it instead of the drawn crest.
const bgmi: { tag: string; name: string; color: string; ink: string; wwcd: number; place: number; fin: number; alive: number; logo?: string; wide?: boolean }[] = [
  { tag: "TAG", name: "Team Apex Gaming", color: "#F77F1A", ink: "#06202A", wwcd: 4, place: 54, fin: 71, alive: 4, logo: "/bgmi/tag.png", wide: true },
  { tag: "SOUL", name: "Team SouL", color: "#E10600", ink: "#FFFFFF", wwcd: 3, place: 48, fin: 62, alive: 3, logo: "/bgmi/soul.png" },
  { tag: "GDL", name: "GodLike Esports", color: "#F5C518", ink: "#0B0B10", wwcd: 2, place: 44, fin: 58, alive: 2, logo: "/bgmi/godlike.png" },
];

/** Team crest: official logo if provided, otherwise a drawn shield in team colours */
const Crest = ({ t }: { t: (typeof bgmi)[number] }) =>
  t.logo ? (
    <span className={`flex h-8 shrink-0 items-center justify-center ${t.wide ? "w-[72px]" : "w-7"}`}>
      <img src={t.logo} alt={`${t.name} logo`} draggable={false} className="max-h-full max-w-full object-contain" />
    </span>
  ) : (
    <svg viewBox="0 0 32 36" className="h-8 w-7 shrink-0" aria-label={`${t.name} crest`}>
      <path d="M16 1 L30 6 V18 C30 27 23 32 16 35 C9 32 2 27 2 18 V6 Z" fill={t.color} stroke="#0B0B10" strokeWidth="1.5" />
      <path d="M16 5 L26 8.5 V18 C26 24.5 21 28.5 16 31 C11 28.5 6 24.5 6 18 V8.5 Z" fill="none" stroke={t.ink} strokeOpacity="0.35" strokeWidth="1" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="Archivo Black, sans-serif"
        fontSize={t.tag.length > 3 ? 7.5 : 9}
        fill={t.ink}
      >
        {t.tag}
      </text>
    </svg>
  );

const BGMILeaderboard = () => {
  const tick = useTick(1600);
  const match = 14 + (tick % 4);
  // a finish point lands on a rotating team every tick
  const scorer = tick % bgmi.length;
  const rows = bgmi
    .map((t, i) => ({ ...t, fin: t.fin + Math.floor((tick + (bgmi.length - i)) / bgmi.length), hot: i === scorer }))
    .map((t) => ({ ...t, total: t.place + t.fin }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0B0B10] text-white">
      {/* header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#F2B705] to-[#F77F1A] px-3 py-1.5 text-black">
        <span className="font-display text-sm leading-none tracking-tight">BGMI</span>
        <span className="font-grotesk text-[10px] font-black uppercase tracking-widest">Overall standings · Match {match}</span>
        <span className="flex items-center gap-1 font-grotesk text-[9px] font-black uppercase tracking-widest">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-black"
          />
          Live
        </span>
      </div>
      <div className="grid grid-cols-[18px_1fr_34px_34px_34px_44px] items-center gap-x-2 px-3 py-1 font-grotesk text-[8px] font-bold uppercase tracking-widest text-white/40">
        <span>#</span>
        <span>Team</span>
        <span className="text-center">🍗</span>
        <span className="text-center">Place</span>
        <span className="text-center">Fin</span>
        <span className="text-right">Total</span>
      </div>
      {rows.map((t, i) => (
        <motion.div
          layout
          key={t.tag}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative grid grid-cols-[18px_1fr_34px_34px_34px_44px] items-center gap-x-2 border-t border-white/[0.06] px-3 py-2 font-mono text-[11px]"
          style={{ background: `linear-gradient(90deg, ${t.color}26, transparent 60%)` }}
        >
          <span className="absolute inset-y-0 left-0 w-[3px]" style={{ background: t.color }} />
          <span className="text-center font-display text-sm" style={{ color: i === 0 ? "#F2B705" : "rgba(255,255,255,0.7)" }}>
            {i + 1}
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <Crest t={t} />
            <span className="min-w-0">
              <span className="block truncate font-grotesk text-[11px] font-bold uppercase">{t.name}</span>
              {/* alive squad — 4 players */}
              <span className="mt-0.5 flex gap-[2px]">
                {[0, 1, 2, 3].map((p) => (
                  <span key={p} className="h-1.5 w-3 rounded-[1px]" style={{ background: p < t.alive ? t.color : "rgba(255,255,255,0.15)" }} />
                ))}
              </span>
            </span>
          </span>
          <span className="text-center text-white/80">{t.wwcd}</span>
          <span className="text-center text-white/80">{t.place}</span>
          <span className="relative text-center text-white/80">
            {t.fin}
            {t.hot && (
              <motion.span
                key={tick}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.1 }}
                className="absolute -top-1 right-0 font-grotesk text-[9px] font-black text-[#C6F24E]"
              >
                +1
              </motion.span>
            )}
          </span>
          <span className="text-right font-display text-sm tabular-nums" style={{ color: i === 0 ? "#F2B705" : "#FFFFFF" }}>
            {t.total}
          </span>
        </motion.div>
      ))}
      <div className="flex items-center justify-between border-t border-white/10 px-3 py-1.5 font-grotesk text-[8px] font-bold uppercase tracking-widest text-white/40">
        <span>Erangel · Zone 6</span>
        <span>Sample standings</span>
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
    title: "F1",
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
    widget: <Keyboard />,
  },
  {
    title: "Esports",
    sub: "Viewership & community analytics",
    body: "Viewership, audience behaviour, community dynamics and the creator economy — I watch the broadcast and the numbers.",
    color: "#019EA5",
    icon: TrendingUp,
    widget: <BGMILeaderboard />,
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
