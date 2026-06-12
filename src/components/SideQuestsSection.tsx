import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PartyPopper, Terminal } from "lucide-react";

const VOLT = "#C6F24E";
const PINK = "#FF7A9C";
const ORANGE = "#F77F1A";
const CREAM = "#FAF0D7";

const terminalLines = [
  { text: "$ whoami", color: CREAM },
  { text: "> sourabh — event runner / vibe coder", color: VOLT },
  { text: '$ git commit -m "vibe: it works, don\'t touch it"', color: CREAM },
  { text: "$ git push --force   # yolo", color: CREAM },
  { text: "✔ shipped: 3 bugs, 1 feature (a classic ratio)", color: PINK },
  { text: "$ book-sourabh --event your-tournament", color: CREAM },
  { text: "> scheduling... see you at the venue ✦", color: VOLT },
];

const statementLines = [
  <>I FREELANCE</>,
  <>
    <span style={{ color: ORANGE }}>GAMING EVENTS</span> —
  </>,
  <>OR ELSE I'M</>,
  <>
    <span style={{ color: VOLT }}>VIBE CODING</span> &
  </>,
  <>
    SHIPPING <span style={{ color: PINK }}>BUGS</span>
  </>,
  <>
    & FEATURES <span style={{ color: VOLT }}>!!!</span>
  </>,
];

/** Dark inverted band on the cream home page — events freelancing + vibe coding */
const SideQuestsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y-2 border-foreground bg-[#1F271B] px-6 py-24 text-[#FAF0D7] md:px-12 lg:px-24"
    >
      {/* Subtle volt grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${VOLT}0D 1px, transparent 1px), linear-gradient(90deg, ${VOLT}0D 1px, transparent 1px)`,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Statement */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-6 flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-[#FAF0D7]/50"
          >
            <span className="inline-block h-2 w-2 rotate-45" style={{ background: ORANGE }} />
            Side Quests
          </motion.span>

          {statementLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl uppercase leading-[1.02] tracking-tight md:text-6xl"
              >
                {line}
              </motion.h2>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-[#FAF0D7]/60"
          >
            Tournaments, watch parties, community nights — if it's a gaming event, I can run it.
            Between gigs I'm building things with AI and pretending the bugs are features.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85 }}
            href="#contact"
            className="cursor-hover mt-8 inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 font-grotesk text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ borderColor: ORANGE, color: ORANGE, boxShadow: `4px 4px 0 ${ORANGE}` }}
          >
            <PartyPopper className="h-4 w-4" /> Book me for your event
          </motion.a>
        </div>

        {/* Fake terminal */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-2"
          style={{ borderColor: VOLT, boxShadow: `8px 8px 0 ${VOLT}`, background: "#15190F" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between border-b-2 px-4 py-3"
            style={{ borderColor: `${VOLT}40` }}
          >
            <span
              className="flex items-center gap-2 font-grotesk text-[10px] font-bold uppercase tracking-widest"
              style={{ color: VOLT }}
            >
              <Terminal className="h-3.5 w-3.5" /> vibe-station — zsh
            </span>
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full" style={{ background: PINK }} />
              <span className="h-3 w-3 rounded-full" style={{ background: ORANGE }} />
              <span className="h-3 w-3 rounded-full" style={{ background: VOLT }} />
            </span>
          </div>

          {/* Lines type in one by one */}
          <div className="space-y-3 p-5 font-mono text-xs md:text-sm">
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.35, duration: 0.25 }}
                style={{ color: line.color }}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [1, 0, 1] } : {}}
              transition={{ delay: 0.6 + terminalLines.length * 0.35, duration: 1, repeat: Infinity }}
              className="inline-block h-4 w-2.5"
              style={{ background: VOLT }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SideQuestsSection;
