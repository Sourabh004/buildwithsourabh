import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, Gamepad2, Trophy, TrendingUp, Plus, PartyPopper } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import GamingCursor from "@/components/GamingCursor";

const VOLT = "#C6F24E";
const PINK = "#9B5DE5";
const TEAL = "#019EA5";
const ORANGE = "#F77F1A";

/* Add new gaming cards here — they slot straight into the grid */
const arena = [
  {
    num: "01",
    icon: Trophy,
    title: "MOTORSPORT",
    sub: "Race weekends, telemetry & strategy",
    body: "F1 is my favourite dataset. Lap deltas, tyre strategy, pit windows — I follow the racing through the numbers behind it.",
    stat: "F1",
    statLabel: "Favourite series",
    color: VOLT,
  },
  {
    num: "02",
    icon: Gamepad2,
    title: "PC GAMING",
    sub: "Deep in the ecosystem",
    body: "From indie titles to competitive scenes — I understand what makes games sticky, what drives engagement, and why communities form.",
    stat: "PC",
    statLabel: "Platform of choice",
    color: PINK,
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "ESPORTS",
    sub: "Viewership & community analytics",
    body: "Tracking the explosive growth of esports: viewership analytics, audience behaviour, community dynamics and the creator economy.",
    stat: "↑",
    statLabel: "Always growing",
    color: TEAL,
  },
  {
    num: "04",
    icon: PartyPopper,
    title: "GAMING EVENTS",
    sub: "Freelance — tournaments & community nights",
    body: "I freelance gaming events — tournaments, watch parties, community nights and esports activations. Planning, ops, hype: handled.",
    stat: "OPEN",
    statLabel: "For event gigs",
    color: ORANGE,
  },
];

const heroWord = "GAMING";

const GlitchLetter = ({ char, i }: { char: string; i: number }) => (
  <motion.span
    initial={{ y: 90, rotate: 8, opacity: 0 }}
    animate={{ y: 0, rotate: 0, opacity: 1 }}
    transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 220, damping: 16 }}
    whileHover={{ y: -14, rotate: i % 2 ? 4 : -4, color: VOLT, transition: { duration: 0.15 } }}
    className="inline-block cursor-default"
  >
    {char}
  </motion.span>
);

const ArenaCard = ({ item, i }: { item: (typeof arena)[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 1.5 : -1.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 } : {}}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border-2"
      style={{ borderColor: item.color, boxShadow: `6px 6px 0 ${item.color}`, background: "#23291E" }}
    >
      <div className="h-2 w-full" style={{ background: item.color }} />
      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full border-2"
            style={{ borderColor: item.color, background: `${item.color}20` }}
          >
            <Icon className="h-5 w-5" style={{ color: item.color }} />
          </span>
          <span className="font-display text-4xl opacity-15" style={{ color: item.color }}>
            {item.num}
          </span>
        </div>
        <h3
          className="mb-1 font-display uppercase leading-none"
          style={{ color: item.color, fontSize: "clamp(1.3rem, 0.5rem + 1.5vw, 2.25rem)" }}
        >
          {item.title}
        </h3>
        <p className="mb-4 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/50">
          {item.sub}
        </p>
        <p className="mb-8 text-sm leading-relaxed text-[#FAF0D7]/75">{item.body}</p>
        <div className="flex items-baseline gap-3 border-t border-[#FAF0D7]/15 pt-4">
          <span className="font-display text-4xl" style={{ color: item.color }}>
            {item.stat}
          </span>
          <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-[#FAF0D7]/50">
            {item.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const GamingPage = () => {
  useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const comingRef = useRef(null);
  const comingInView = useInView(comingRef, { once: true, margin: "-80px" });

  return (
    <div className="relative min-h-screen bg-[#1F271B] text-[#FAF0D7] cursor-none">
      <GamingCursor />

      {/* Mini nav */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-2 border-[#FAF0D7]/20 bg-[#1F271B] px-6 py-4 md:px-12">
        <Link
          to="/"
          className="cursor-hover flex items-center gap-2 rounded-full border-2 border-[#FAF0D7] px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_#C6F24E] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#C6F24E]"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <span className="font-display text-lg uppercase italic" style={{ color: VOLT }}>
          Sourabh
        </span>
        <Link
          to="/tech"
          className="cursor-hover flex items-center gap-2 rounded-full border-2 border-[#FAF0D7] bg-[#FAF0D7] px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest text-[#1F271B] shadow-[4px_4px_0_#F77F1A] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#F77F1A]"
        >
          <Cpu className="h-4 w-4" /> Switch side
        </Link>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[75vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12 lg:px-24">
        {/* Scanline-ish grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${VOLT}0F 1px, transparent 1px), linear-gradient(90deg, ${VOLT}0F 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
        <span
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border-2 px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest"
          style={{ borderColor: VOLT, color: VOLT, boxShadow: `4px 4px 0 ${VOLT}` }}
        >
          <Gamepad2 className="h-3.5 w-3.5" /> 02 / Play, Watch, Analyze
        </span>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
          >
            THE
          </motion.h1>
        </div>
        <h1
          className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
          style={{ color: VOLT }}
        >
          {heroWord.split("").map((c, i) => (
            <GlitchLetter key={i} char={c} i={i} />
          ))}
        </h1>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
          >
            SIDE<span style={{ color: PINK }}>.</span>
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-[#FAF0D7]/70 md:text-base"
        >
          The other half of my brain — motorsport, gaming culture and esports, treated with the
          same curiosity I bring to data.
        </motion.p>
      </section>

      {/* Volt marquee */}
      <div className="overflow-hidden whitespace-nowrap border-y-2 border-[#1F271B] py-4 md:py-5" style={{ background: VOLT }}>
        <motion.div
          animate={{ x: ["0%", "-25%"] }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mr-8 font-display text-3xl uppercase leading-none text-[#1F271B] md:text-5xl">
              ESPORTS ✦ MOTORSPORT ✦ COMMUNITY ✦ CULTURE ✦&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* Arena grid */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <span className="mb-3 flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-[0.25em] text-[#FAF0D7]/50">
            <span className="inline-block h-2 w-2 rotate-45" style={{ background: VOLT }} />
            The Arena
          </span>
          <h2 className="mb-12 font-display text-4xl uppercase leading-tight md:text-6xl">
            WHAT I'M <span style={{ color: VOLT }}>INTO</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {arena.map((item, i) => (
              <ArenaCard key={item.num} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section ref={comingRef} className="border-t-2 border-[#FAF0D7]/20 px-6 py-24 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={comingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border-2 px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest"
            style={{ borderColor: PINK, color: PINK }}
          >
            <Plus className="h-3.5 w-3.5" /> Patch notes incoming
          </span>
          <h2
            className="font-display text-5xl uppercase leading-none md:text-8xl"
            style={{ WebkitTextStroke: `2px ${VOLT}`, color: "transparent" }}
          >
            MORE LOADING
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ WebkitTextStroke: "0px", color: VOLT }}
            >
              _
            </motion.span>
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-[#FAF0D7]/60">
            New drops on the way — setups, watchlists, esports breakdowns and more. Check back soon.
          </p>
        </motion.div>
      </section>

      {/* Footer strip */}
      <footer className="flex items-center justify-between border-t-2 border-[#FAF0D7]/20 px-6 py-6 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/50 md:px-12">
        <span>© {new Date().getFullYear()} Sourabh</span>
        <Link to="/" className="cursor-hover transition-colors hover:text-[#C6F24E]">
          ← Back to home
        </Link>
      </footer>
    </div>
  );
};

export default GamingPage;
