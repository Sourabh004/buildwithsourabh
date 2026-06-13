import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trophy, Gamepad2, TrendingUp } from "lucide-react";

const panels = [
  {
    num: "01",
    icon: Trophy,
    title: "SPORTS",
    sub: "PASSION",
    body: "Passionate about motorsports and competitive athletics. I track performance data, race analytics, and the intersection of technology and sport.",
    stat: "F1",
    statLabel: "Favourite Series",
    color: "#F77F1A",
    bg: "hsl(var(--background))",
  },
  {
    num: "02",
    icon: Gamepad2,
    title: "GAMING",
    sub: "CULTURE",
    body: "Deep in the gaming ecosystem — from indie titles to competitive scenes. I understand what drives engagement, community, and digital entertainment culture.",
    stat: "PC",
    statLabel: "Platform of choice",
    color: "#019EA5",
    bg: "hsl(var(--foreground))",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "ESPORTS",
    sub: "TRENDS",
    body: "Tracking the explosive growth of esports: viewership analytics, audience behaviour, community dynamics, and the creator economy around competitive gaming.",
    stat: "↑",
    statLabel: "Always growing",
    color: "#9B5DE5",
    bg: "hsl(var(--background))",
  },
];

const Panel = ({ panel, i }: { panel: (typeof panels)[0]; i: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const Icon = panel.icon;
  const isDark = panel.bg === "hsl(var(--foreground))";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border-2 border-foreground"
      style={{
        boxShadow: "6px 6px 0 hsl(var(--foreground))",
        background: panel.bg,
        color: isDark ? "hsl(var(--background))" : "hsl(var(--foreground))",
      }}
    >
      {/* Huge background number */}
      <motion.span
        style={{ y }}
        className="pointer-events-none absolute -right-4 -top-4 select-none font-display text-[160px] font-bold leading-none opacity-5"
      >
        {panel.num}
      </motion.span>

      {/* Color stripe top */}
      <div className="h-2 w-full" style={{ background: panel.color }} />

      <div className="relative p-6 md:p-8">
        {/* Icon + tag */}
        <div className="mb-6 flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border-2"
            style={{
              borderColor: isDark ? "hsl(var(--background))" : "hsl(var(--foreground))",
              background: panel.color + "20",
            }}
          >
            <Icon className="h-5 w-5" style={{ color: panel.color }} />
          </span>
          <span
            className="rounded-full border-2 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.3)" : "hsl(var(--foreground))",
              color: isDark ? "rgba(255,255,255,0.7)" : "hsl(var(--muted-foreground))",
            }}
          >
            {panel.num} / {panel.sub}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-4 font-display text-5xl font-bold uppercase leading-none tracking-tight md:text-6xl"
          style={isDark ? { WebkitTextStroke: "0px", color: "hsl(var(--background))" } : {}}
        >
          {panel.title}
        </h3>

        {/* Body */}
        <p
          className="mb-8 text-sm leading-relaxed md:text-base"
          style={{ color: isDark ? "rgba(255,255,255,0.75)" : "hsl(var(--muted-foreground))" }}
        >
          {panel.body}
        </p>

        {/* Stat */}
        <div
          className="flex items-baseline gap-3 border-t pt-4"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.15)" : "hsl(var(--border))" }}
        >
          <span className="font-display text-4xl font-bold" style={{ color: panel.color }}>
            {panel.stat}
          </span>
          <span
            className="font-grotesk text-xs font-bold uppercase tracking-widest"
            style={{ color: isDark ? "rgba(255,255,255,0.5)" : "hsl(var(--muted-foreground))" }}
          >
            {panel.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SportsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-label"
          >
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Beyond Work
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl uppercase leading-tight md:text-6xl"
            >
              SPORTS, GAMING <span className="text-primary">&amp; CULTURE</span>
            </motion.h2>
          </div>
        </div>

        {/* Panel grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {panels.map((panel, i) => (
            <Panel key={i} panel={panel} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsSection;
