import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";

const VOLT   = "#C6F24E";
const CREAM  = "#FAF0D7";
const INK    = "#1F271B";
const PINK   = "#FF7A9C";
const ORANGE = "#F77F1A";
const TEAL   = "#019EA5";

const lineReveal = {
  hidden: { y: "110%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden section-padding pt-32"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Headline */}
        <h1 className="font-display uppercase leading-[0.92] tracking-tight">
          <div className="overflow-hidden">
            <motion.span
              custom={0.25}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              AI, PM &amp;
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              custom={0.4}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              <span className="text-primary">Vibe Code</span> —
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              custom={0.55}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              I'm Sourabh<span className="text-primary">.</span>
            </motion.span>
          </div>
        </h1>

        {/* Descriptor row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {["AI Workflow Builder", "Community Builder", "Esports & Gaming"].map((tag, i) => {
            const colors = ["#019EA5", "#FF7A9C", "#FCAD50"];
            return (
              <span
                key={tag}
                className="rounded-full border-2 border-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wide"
                style={{ background: colors[i], boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
              >
                {tag}
              </span>
            );
          })}
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-6 max-w-lg font-grotesk text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          I design systems that turn data into insights and automate workflows with AI —
          analytics, automation, and communities around tech, sports & gaming.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#sides" className="btn-brutal cursor-hover">
            Pick a side <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="/SOURABH_K_Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-ghost cursor-hover"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <a
            href="#contact"
            className="cursor-hover inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" /> Say hello
          </a>
        </motion.div>
      </motion.div>

      {/* Sticky note — peek from right edge, slide in on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        whileHover="open"
        className="absolute bottom-24 right-0 z-20 hidden cursor-pointer md:block"
        style={{ width: 220 }}
      >
        <motion.div
          variants={{
            open: { x: -16, rotate: -3, transition: { type: "spring", stiffness: 220, damping: 22 } },
          }}
          initial={{ x: "calc(100% - 36px)", rotate: -6 }}
          animate={{ x: "calc(100% - 36px)", rotate: -6 }}
          style={{ originX: 1, originY: 0.5 }}
        >
          {/* Paper sticky note */}
          <div
            className="overflow-hidden"
            style={{
              width: 220,
              background: "linear-gradient(160deg, #fffef0 0%, #fef9c3 60%, #fef3a0 100%)",
              boxShadow: "1px 2px 8px rgba(0,0,0,0.18), 3px 5px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
              borderRadius: 2,
            }}
          >
            {/* Volt adhesive strip at top */}
            <div
              className="flex items-center justify-between px-3"
              style={{
                height: 28,
                background: `linear-gradient(180deg, ${VOLT} 0%, #b8e040 100%)`,
                boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.12)",
              }}
            >
              <span className="font-grotesk text-[9px] font-black uppercase tracking-widest" style={{ color: INK }}>
                who am i
              </span>
              {/* Peek arrow — visible when closed */}
              <motion.span
                variants={{ open: { opacity: 0 } }}
                className="font-bold text-xs"
                style={{ color: INK }}
              >
                ←
              </motion.span>
            </div>

            {/* Faint ruled lines — paper feel */}
            <div className="relative px-4 pt-3 pb-4 space-y-3"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, #e5d9a0 23px, #e5d9a0 24px)",
                backgroundPositionY: "12px",
              }}
            >
              {[
                { dot: ORANGE, label: "Role",   val: "PM + Vibe Coder" },
                { dot: PINK,   label: "Stack",  val: "AI & Automation" },
                { dot: TEAL,   label: "Energy", val: "Esports & Gaming" },
              ].map(({ dot, label, val }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: dot, boxShadow: `0 0 0 1.5px ${INK}40` }} />
                  <div>
                    <p className="font-grotesk text-[8px] font-bold uppercase tracking-widest opacity-50" style={{ color: INK }}>{label}</p>
                    <p className="font-display text-sm uppercase leading-tight" style={{ color: INK }}>{val}</p>
                  </div>
                </div>
              ))}

              {/* Status row */}
              <div className="flex items-center gap-2 pt-0.5">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="h-2 w-2 rounded-full"
                  style={{ background: INK }}
                />
                <span className="font-grotesk text-[9px] font-bold uppercase tracking-widest opacity-60" style={{ color: INK }}>
                  Currently building...
                </span>
              </div>
            </div>

            {/* Folded corner */}
            <div
              className="absolute bottom-0 right-0"
              style={{
                width: 0, height: 0,
                borderStyle: "solid",
                borderWidth: "0 0 18px 18px",
                borderColor: `transparent transparent #c9b84a transparent`,
                filter: "drop-shadow(-1px -1px 2px rgba(0,0,0,0.15))",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative shapes */}
      <span className="pointer-events-none absolute left-[8%] top-[18%] hidden animate-spin-slow font-display text-5xl text-primary lg:block">✱</span>
      <span className="pointer-events-none absolute right-[14%] top-[22%] hidden h-6 w-6 rotate-12 border-2 border-foreground bg-accent lg:block" style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
