import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Cpu, Gamepad2 } from "lucide-react";

type SideId = "tech" | "gaming";

type Side = {
  id: SideId;
  num: string;
  title: string;
  to: string;
  desc: string;
  tags: string[];
  words: string[];
  icon: React.ElementType;
  /** idle panel background */
  bg: string;
  /** flood color that rises on hover */
  flood: string;
  /** text color when idle */
  ink: string;
  /** text color once the flood covers the panel */
  inkActive: string;
};

const sides: Side[] = [
  {
    id: "tech",
    num: "01",
    title: "TECH",
    to: "/tech",
    desc: "Data pipelines, AI agents and automations that do the boring work for me.",
    tags: ["AI AGENTS", "ANALYTICS", "AUTOMATION"],
    words: ["N8N", "SQL", "POWER BI", "BIGQUERY", "OPENAI", "AIRTABLE", "PYTHON", "LOOKER"],
    icon: Cpu,
    bg: "hsl(var(--background))",
    flood: "#F77F1A",
    ink: "hsl(var(--foreground))",
    inkActive: "hsl(var(--foreground))",
  },
  {
    id: "gaming",
    num: "02",
    title: "GAMING",
    to: "/gaming",
    desc: "Esports, community and the culture of play — analyzed like a dataset.",
    tags: ["ESPORTS", "COMMUNITY", "CULTURE"],
    words: ["ESPORTS", "PC GAMING", "VIEWERSHIP", "STREAMS", "DISCORD", "MOTORSPORT", "META", "RANKED"],
    icon: Gamepad2,
    bg: "hsl(var(--foreground))",
    flood: "#C6F24E",
    ink: "hsl(var(--background))",
    inkActive: "hsl(var(--foreground))",
  },
];

/** Endless vertical word ribbon — speeds up when its panel is hovered */
const WordColumn = ({
  words,
  active,
  className,
  reverse = false,
}: {
  words: string[];
  active: boolean;
  className?: string;
  reverse?: boolean;
}) => (
  <div className={`pointer-events-none absolute inset-y-0 overflow-hidden ${className ?? ""}`}>
    <motion.div
      animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: active ? 7 : 22, ease: "linear", repeat: Infinity }}
      className="flex flex-col items-center gap-8 py-4"
    >
      {[...words, ...words].map((w, i) => (
        <span
          key={i}
          className="select-none whitespace-nowrap font-display text-2xl uppercase leading-none tracking-tight md:text-3xl"
          style={{ writingMode: "vertical-rl" }}
        >
          {w}
        </span>
      ))}
    </motion.div>
  </div>
);

const Panel = ({
  side,
  hovered,
  setHovered,
  index,
  inView,
}: {
  side: Side;
  hovered: SideId | null;
  setHovered: (id: SideId | null) => void;
  index: number;
  inView: boolean;
}) => {
  const active = hovered === side.id;
  const dimmed = hovered !== null && !active;
  const Icon = side.icon;
  const textColor = active ? side.inkActive : side.ink;

  return (
    <motion.div
      initial={{ x: index === 0 ? "-100%" : "100%" }}
      animate={inView ? { x: "0%" } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: side.bg, flexBasis: 0 }}
      className="relative min-h-[55vh] flex-1 overflow-hidden border-foreground max-md:border-b-2 md:min-h-0 md:border-r-2 md:last:border-r-0"
    >
      <motion.div
        animate={{ flexGrow: 1 }}
        className="h-full w-full"
        onMouseEnter={() => setHovered(side.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <Link to={side.to} className="cursor-hover block h-full w-full">
          {/* Color flood rising from the bottom */}
          <motion.div
            animate={{ scaleY: active ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: side.flood, originY: 1 }}
            className="absolute inset-0"
          />

          {/* Vertical word ribbons */}
          <div
            className="transition-opacity duration-300"
            style={{ color: textColor, opacity: active ? 0.28 : 0.1 }}
          >
            <WordColumn words={side.words} active={active} className="left-3 md:left-6" />
            <WordColumn words={side.words} active={active} reverse className="right-3 md:right-6" />
          </div>

          {/* Content */}
          <motion.div
            animate={{ scale: dimmed ? 0.92 : 1, opacity: dimmed ? 0.55 : 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full flex-col items-center justify-center gap-5 px-12 py-16 text-center transition-colors duration-300 md:gap-7"
            style={{ color: textColor }}
          >
            {/* Tag */}
            <span
              className="flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest"
              style={{ borderColor: textColor }}
            >
              <Icon className="h-3.5 w-3.5" />
              {side.num} / THE {side.title} SIDE
            </span>

            {/* Giant title — outline crossfades to solid on hover */}
            <span
              className="relative block font-display uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3.25rem, 6.5vw, 8.5rem)" }}
            >
              <motion.span
                animate={{ opacity: active ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="block"
                style={{ WebkitTextStroke: `2px ${textColor}`, color: "transparent" }}
                aria-hidden
              >
                {side.title}
              </motion.span>
              <motion.span
                animate={{ opacity: active ? 1 : 0, rotate: active ? -2 : 0, scale: active ? 1.04 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 block"
              >
                {side.title}
              </motion.span>
            </span>

            <p className="max-w-xs text-sm font-medium leading-relaxed opacity-80 md:text-base">
              {side.desc}
            </p>

            {/* Tag pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {side.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border-2 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider"
                  style={{ borderColor: textColor }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Enter button */}
            <span className="mt-2 flex items-center gap-3">
              <motion.span
                animate={{ rotate: active ? 45 : 0, scale: active ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                style={{ borderColor: textColor, background: active ? textColor : "transparent" }}
              >
                <ArrowUpRight
                  className="h-5 w-5 transition-colors duration-200"
                  style={{ color: active ? side.flood : textColor }}
                />
              </motion.span>
              <span className="font-grotesk text-xs font-bold uppercase tracking-widest">
                Enter {side.title.toLowerCase()}
              </span>
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

const SplitPortal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [hovered, setHovered] = useState<SideId | null>(null);

  return (
    <section id="sides" ref={ref} className="relative overflow-hidden border-b-2 border-foreground">
      {/* Panels — hovered side grows, the other gives way */}
      <div className="relative flex flex-col md:h-[88vh] md:flex-row">
        {sides.map((side, i) => (
          <motion.div
            key={side.id}
            animate={{
              flex: hovered === side.id ? 1.6 : hovered ? 0.75 : 1,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex md:min-w-0"
          >
            <Panel side={side} hovered={hovered} setHovered={setHovered} index={i} inView={inView} />
          </motion.div>
        ))}

        {/* Spinning badge on the seam — reacts to which side is hovered */}
        {(() => {
          const badgeBg =
            hovered === "tech"    ? "#C6F24E"               // volt  → nudge user toward gaming
            : hovered === "gaming" ? "#F77F1A"              // orange → nudge user toward tech
            : "hsl(var(--background))";
          const badgeBorder =
            hovered ? "#1F271B" : "hsl(var(--foreground))";
          const ringText =
            hovered === "tech"    ? "ENTER GAMING ✦ ENTER GAMING ✦"
            : hovered === "gaming" ? "ENTER TECH ✦ ENTER TECH ✦"
            : "PICK YOUR SIDE ✦ PICK YOUR SIDE ✦";
          const CenterIcon =
            hovered === "tech"    ? Gamepad2
            : hovered === "gaming" ? Cpu
            : null;

          return (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={inView ? {
                scale: 1,
                rotate: 0,
                left: hovered === "tech" ? "68%" : hovered === "gaming" ? "32%" : "50%",
              } : {}}
              transition={{ delay: inView ? 0 : 0.7, type: "spring", stiffness: 160, damping: 18 }}
              style={{ left: "50%" }}
              className="pointer-events-none absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            >
              <motion.div
                animate={{ background: badgeBg, borderColor: badgeBorder }}
                transition={{ duration: 0.3 }}
                className="relative flex h-32 w-32 items-center justify-center rounded-full border-2"
                style={{ boxShadow: `6px 6px 0 ${badgeBorder}` }}
              >
                {/* Spinning ring text — swaps on hover */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
                  <defs>
                    <path id="portal-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text
                    fill={hovered ? "#1F271B" : "hsl(var(--foreground))"}
                    fontFamily="inherit"
                    fontSize="9.5"
                    fontWeight="bold"
                    letterSpacing="0.22em"
                  >
                    <textPath href="#portal-circle">{ringText}</textPath>
                  </text>
                </svg>

                {/* Center — VS idle, icon when hovered */}
                <AnimatePresence mode="wait">
                  {CenterIcon ? (
                    <motion.span
                      key={hovered}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 30 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <CenterIcon className="h-9 w-9" style={{ color: "#1F271B" }} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="vs"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="font-display text-2xl uppercase text-primary"
                    >
                      VS
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
};

export default SplitPortal;
