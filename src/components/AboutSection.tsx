import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Bot, Gamepad2, Users, Video, Music, BarChart3, ArrowUpRight } from "lucide-react";

type Kind = "Education" | "Work" | "Community";

const timeline: {
  icon: typeof Bot;
  year: string;
  title: string;
  meta: string;
  note: string;
  kind: Kind;
  color: string;
  current?: boolean;
  /** official logo files in /public/orgs — wide ones are wordmarks */
  logos?: { src: string; bg: string; wide?: boolean }[];
}[] = [
  {
    icon: Bot,
    year: "2025",
    title: "The Experience Co.",
    meta: "Junior Tech & Automation Manager · Apr 2025 – now",
    note: "Internal AI and automation tools on n8n with Claude/GPT, Airtable, Postgres and MCP — plus sprint planning and release tracking.",
    kind: "Work",
    color: "#F77F1A",
    current: true,
    logos: [{ src: "/orgs/exco.svg", bg: "#FFFFFF" }],
  },
  {
    icon: GraduationCap,
    year: "2024",
    title: "MCA, Jain University",
    meta: "Master of Computer Applications · 2023 – 2024",
    note: "Postgraduate degree alongside analytics and community work.",
    kind: "Education",
    color: "#C6F24E",
    logos: [{ src: "/orgs/jain.png", bg: "#FFFFFF", wide: true }],
  },
  {
    icon: BarChart3,
    year: "2024",
    title: "STAN · CropBytes",
    meta: "Business analytics intern · Community manager",
    note: "Push engagement 0.5% → ~4–5% and ad revenue ~2x at STAN. Ran ~15k Discord and ~20k Telegram members at CropBytes.",
    kind: "Work",
    color: "#019EA5",
    logos: [
      { src: "/orgs/stan.ico", bg: "#FFFFFF" },
      { src: "/orgs/cropbytes.png", bg: "#16B45A" },
    ],
  },
  {
    icon: Music,
    year: "2023",
    title: "One Mind Music",
    meta: "Freelance community manager · 2023 – 24",
    note: "Invite-only fan community (~1k core fans) for artist Arjun Kanungo — online meet-and-greets and event access.",
    kind: "Community",
    color: "#FF7A9C",
  },
  {
    icon: Video,
    year: "2022",
    title: "Viral Gamer",
    meta: "Freelance content · May 2022 – now",
    note: "Content for the esports audience with brands like Red Bull India, Nodwin Gaming and Krafton.",
    kind: "Community",
    color: "#9B5DE5",
    current: true,
  },
  {
    icon: Users,
    year: "2022",
    title: "One World Nation (OWN)",
    meta: "Community manager → QA manager · 2022 – 23",
    note: "Started on community, moved to QA in Nov 2022.",
    kind: "Work",
    color: "#019EA5",
  },
  {
    icon: Gamepad2,
    year: "2020",
    title: "Esports Community Manager",
    meta: "Self-employed · Dec 2020 – May 2022",
    note: "Ran esports communities — moderation, events and the people side of play.",
    kind: "Community",
    color: "#CA5449",
  },
  {
    icon: GraduationCap,
    year: "2019",
    title: "BCA, Bengaluru City University",
    meta: "Bachelor of Computer Applications · 2019 – 2022",
    note: "Coding-focused undergraduate degree — where it started.",
    kind: "Education",
    color: "#FCAD50",
    logos: [{ src: "/orgs/bcu.png", bg: "#1F3B8A", wide: true }],
  },
];

const kindStyle: Record<Kind, string> = {
  Work: "#F77F1A",
  Education: "#C6F24E",
  Community: "#9B5DE5",
};

const Row = ({ item, i }: { item: (typeof timeline)[number]; i: number }) => (
  <motion.li
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    className="group relative grid grid-cols-[64px_1fr] gap-4 md:grid-cols-[80px_1fr] md:gap-6"
  >
    {/* Year + node on the rail */}
    <div className="relative flex flex-col items-end pt-4">
      <span className="font-display text-lg leading-none md:text-xl">{item.year}</span>
      <span
        className="absolute -right-[23px] top-[18px] z-10 h-3.5 w-3.5 rotate-45 border-2 border-foreground transition-transform group-hover:scale-125 md:-right-[31px]"
        style={{ background: item.color }}
      />
    </div>

    {/* Card */}
    <div className="cursor-hover relative ml-3 overflow-hidden rounded-2xl border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_hsl(var(--foreground))] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_hsl(var(--foreground))] md:ml-4 md:p-5">
      {/* colour edge */}
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: item.color }} />
      <div className="flex items-start gap-3 pl-2">
        {item.logos ? (
          <span className="mt-0.5 flex shrink-0 gap-1.5">
            {item.logos.map((l) => (
              <span
                key={l.src}
                className={`flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 border-foreground ${
                  l.wide ? "w-24 px-1.5" : "w-10"
                }`}
                style={{ background: l.bg }}
              >
                <img src={l.src} alt="" loading="lazy" draggable={false} className="max-h-full max-w-full object-contain" />
              </span>
            ))}
          </span>
        ) : (
          <span
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-foreground"
            style={{ background: item.color }}
          >
            <item.icon className="h-4 w-4" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base uppercase leading-tight md:text-lg">{item.title}</h3>
            {item.current && (
              <span className="flex items-center gap-1 rounded-full border-2 border-foreground bg-[#C6F24E] px-2 py-0.5 font-grotesk text-[9px] font-black uppercase tracking-widest">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" /> Now
              </span>
            )}
            <span
              className="ml-auto rounded-full border px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-widest"
              style={{ borderColor: kindStyle[item.kind], color: "hsl(var(--foreground))" }}
            >
              {item.kind}
            </span>
          </div>
          <p className="mt-0.5 font-grotesk text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{item.meta}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.note}</p>
        </div>
      </div>
    </div>
  </motion.li>
);

const stats = [
  { n: "6+", label: "Years in community & content" },
  { n: "8", label: "Esports events on the road" },
  { n: "2", label: "Degrees — BCA, MCA" },
];

const AboutSection = () => {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="section-padding relative overflow-x-clip">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Background
          </span>
          <h2 className="font-display text-4xl uppercase leading-[1.02] md:text-5xl">
            Main quest:
            <br />
            <span className="text-primary">How I levelled up</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            From running esports communities to building AI tools — newest first.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border-2 border-foreground bg-card p-3 shadow-[3px_3px_0_hsl(var(--foreground))]">
                <p className="font-display text-2xl leading-none text-primary">{s.n}</p>
                <p className="mt-1 font-grotesk text-[10px] font-bold uppercase leading-tight tracking-wide text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <a href="/resume" className="btn-brutal-ghost cursor-hover mt-8">
            Full resume <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative">
          {/* rail + scroll fill, sits between year column and cards */}
          <div className="absolute bottom-4 left-[78.5px] top-4 w-[3px] rounded-full bg-foreground/15 md:left-[102.5px]" />
          <motion.div
            style={{ height: fill }}
            className="absolute left-[78.5px] top-4 w-[3px] rounded-full bg-primary md:left-[102.5px]"
          />
          <ol className="relative space-y-5">
            {timeline.map((item, i) => (
              <Row key={item.title} item={item} i={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
