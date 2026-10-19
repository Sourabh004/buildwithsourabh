import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gamepad2, Trophy, TrendingUp, Plus, PartyPopper, MousePointerClick } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import GamingCursor from "@/components/GamingCursor";
import SideHeader from "@/components/SideHeader";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import OnTheRoadSection from "@/components/OnTheRoadSection";
import { PageWipe, SectionHeading, TiltCard } from "@/components/brutal";
import { GamingScene, SceneSlot } from "@/components/three/SceneSlot";

const VOLT = "#C6F24E";
const PINK = "#9B5DE5";
const TEAL = "#019EA5";
const ORANGE = "#F77F1A";
const CREAM = "#FAF0D7";
const INK = "#1F271B";

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
    body: "Tracking the growth of esports: viewership analytics, audience behaviour, community dynamics and the creator economy.",
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

const events = [
  {
    name: "EWC Riyadh",
    full: "Esports World Cup",
    location: "Riyadh, Saudi Arabia",
    sub: ["Opening Ceremony", "Main Stage", "Fan Zone"],
    color: "#F5C518",
    year: "2024",
    photo: "/ewc.jpg",
  },
  {
    name: "Red Bull",
    full: "Motojam & Events",
    location: "Multiple Cities",
    sub: ["Motojam", "Gaming Activations", "Brand Events"],
    color: "#E23B3B",
    year: "2023–24",
    photo: "/redbull.jpeg",
  },
  {
    name: "Krafton",
    full: "PUBG Mobile Circuit",
    location: "India",
    sub: ["BMPS", "BGIS", "BGIC"],
    color: ORANGE,
    year: "2023–24",
    photo: "/krafton.jpeg",
  },
  {
    name: "Comic-Con",
    full: "Comic-Con India",
    location: "India",
    sub: ["Gaming Zone", "Creator Meet", "Panels"],
    color: PINK,
    year: "2024",
    photo: "/comiccon.jpeg",
  },
];

const heroWord = "GAMING";

const GlitchLetter = ({ char, i }: { char: string; i: number }) => (
  <motion.span
    initial={{ y: 90, rotateX: -90, opacity: 0 }}
    animate={{ y: 0, rotateX: 0, opacity: 1 }}
    transition={{ delay: 0.55 + i * 0.07, type: "spring", stiffness: 220, damping: 16 }}
    whileHover={{ y: -14, rotate: i % 2 ? 4 : -4, color: CREAM, transition: { duration: 0.15 } }}
    style={{ transformPerspective: 500 }}
    className="pointer-events-auto inline-block cursor-default"
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
      initial={{ opacity: 0, y: 70, rotateX: 30 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      <TiltCard className="cursor-hover rounded-2xl border-2" shadow={item.color} style={{ borderColor: item.color, background: "#23291E" }}>
        <div className="h-2 w-full rounded-t-[14px]" style={{ background: item.color }} />
        <div className="p-6 md:p-8" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-6 flex items-center justify-between">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2"
              style={{ borderColor: item.color, background: item.color, transform: "translateZ(30px) rotate(-6deg)" }}
            >
              <Icon className="h-5 w-5" style={{ color: INK }} />
            </span>
            <span className="font-display text-5xl opacity-20" style={{ color: item.color }}>
              {item.num}
            </span>
          </div>
          <h3
            className="mb-1 font-display uppercase leading-none"
            style={{ color: item.color, fontSize: "clamp(1.5rem, 0.6rem + 1.6vw, 2.5rem)" }}
          >
            {item.title}
          </h3>
          <p className="mb-4 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/50">{item.sub}</p>
          <p className="mb-8 text-sm leading-relaxed text-[#FAF0D7]/75">{item.body}</p>
          <div className="flex items-baseline gap-3 border-t border-[#FAF0D7]/15 pt-4">
            <span className="font-display text-4xl" style={{ color: item.color }}>
              {item.stat}
            </span>
            <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-[#FAF0D7]/50">{item.statLabel}</span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const EventsSection = () => (
  <section className="border-t-2 border-[#FAF0D7]/20 px-6 py-24 md:px-12 lg:px-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        label="Been There"
        dark
        aside={
          <p className="max-w-xs font-grotesk text-xs leading-relaxed text-[#FAF0D7]/50">
            Events I've attended, brands I've worked with, moments I was part of.
          </p>
        }
      >
        Brands <span style={{ color: VOLT }}>&amp;</span> Events
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((ev, i) => (
          <motion.div
            key={ev.name}
            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 130, damping: 18 }}
          >
            <TiltCard className="cursor-hover flex flex-col rounded-2xl border-2 border-[#FAF0D7]/25 bg-[#23291E]" shadow={ev.color} max={14}>
              <div className="relative h-44 overflow-hidden rounded-t-[14px] border-b-2 border-[#FAF0D7]/10">
                <img src={ev.photo} alt={ev.full} loading="lazy" className="h-full w-full object-cover" />
                <span
                  className="absolute right-3 top-3 rounded-full border px-2.5 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: ev.color, borderColor: ev.color + "80", background: "#23291E" }}
                >
                  {ev.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(30px)" }}>
                <h3 className="mb-1 font-display text-2xl uppercase leading-none tracking-tight" style={{ color: ev.color }}>
                  {ev.name}
                </h3>
                <p className="mb-1 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/45">{ev.full}</p>
                <p className="mb-4 font-grotesk text-[10px] uppercase tracking-wider text-[#FAF0D7]/35">📍 {ev.location}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {ev.sub.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-wider text-[#FAF0D7]/70"
                      style={{ borderColor: ev.color + "50" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const GamingPage = () => {
  useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const comingRef = useRef(null);
  const comingInView = useInView(comingRef, { once: true, margin: "-80px" });

  return (
    <div className="relative min-h-screen bg-[#1F271B] text-[#FAF0D7] cursor-none">
      <PageWipe colors={[VOLT, PINK]} />
      <GamingCursor />
      <SideHeader side="gaming" />

      {/* Hero — copy left, 3D controller + trophy right */}
      <section className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-16 pt-32 md:px-12 lg:flex-row lg:items-center lg:px-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${VOLT}0F 1px, transparent 1px), linear-gradient(90deg, ${VOLT}0F 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
        <div className="pointer-events-none relative z-10 lg:w-1/2">
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
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
            >
              THE
            </motion.h1>
          </div>
          <h1 className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl" style={{ color: VOLT }}>
            {heroWord.split("").map((c, i) => (
              <GlitchLetter key={i} char={c} i={i} />
            ))}
          </h1>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-6xl uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
            >
              SIDE<span style={{ color: PINK }}>.</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-[#FAF0D7]/70 md:text-base"
          >
            The other half of my brain. Esports communities since 2020, and content with Viral Gamer since 2022 —
            working with brands like Red Bull India, Nodwin Gaming and Krafton.
          </motion.p>
        </div>

        <div className="relative mt-10 h-[380px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[52%]">
          <SceneSlot className="h-full w-full">{(active) => <GamingScene active={active} />}</SceneSlot>
          <span
            className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest lg:bottom-10 lg:right-10"
            style={{ borderColor: VOLT, color: VOLT }}
          >
            <MousePointerClick className="h-3.5 w-3.5" /> Press start — click anything
          </span>
        </div>
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
          <SectionHeading label="The Arena" dark>
            What I'm <span style={{ color: VOLT }}>Into</span>
          </SectionHeading>
          <div className="grid gap-8 md:grid-cols-2">
            {arena.map((item, i) => (
              <ArenaCard key={item.num} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      <OnTheRoadSection />
      <EventsSection />

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
          <h2 className="font-display text-5xl uppercase leading-none md:text-8xl" style={{ WebkitTextStroke: `2px ${VOLT}`, color: "transparent" }}>
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

      <ContactSection />
      <Footer />
    </div>
  );
};

export default GamingPage;
