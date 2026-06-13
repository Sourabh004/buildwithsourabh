import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Bot, BarChart3, Users } from "lucide-react";

const categories = [
  {
    icon: BarChart3,
    title: "Analytics",
    color: "#FCAD50",
    tag: "Crunch",
    skills: ["SQL", "Excel", "Power BI", "Data Visualization", "Statistical Analysis"],
  },
  {
    icon: Bot,
    title: "Automation & AI",
    color: "#019EA5",
    tag: "Robots",
    skills: ["n8n Workflow Automation", "AI Agents", "API Integrations", "Workflow Design", "AI Tooling"],
  },
  {
    icon: Database,
    title: "Data Tools",
    color: "#9B5DE5",
    tag: "Stack",
    skills: ["BigQuery", "Looker Studio", "Data Dashboards", "Growth Analytics"],
  },
  {
    icon: Users,
    title: "Community & Media",
    color: "#758C32",
    tag: "People",
    skills: ["Community Management", "Web3 Ecosystem", "Sports & Esports Strategy", "Social Media Growth"],
  },
];

// Deterministic pseudo-random tilt per pill so it looks hand-placed
const pillTilt = (ci: number, si: number) => ((ci * 7 + si * 13) % 5) - 2;

const SkillCard = ({ cat, i }: { cat: (typeof categories)[0]; i: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const tilt = i % 2 === 0 ? -1.2 : 1.2;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -5 : 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, type: "spring", stiffness: 90, damping: 14 }}
      whileHover={{ rotate: 0, y: -6, scale: 1.01 }}
      className="glass-card cursor-hover group relative overflow-visible p-0"
    >
      {/* Corner number sticker */}
      <span
        className="pointer-events-none absolute -top-5 -right-3 z-10 font-display text-4xl md:text-5xl select-none"
        style={{
          color: cat.color,
          WebkitTextStroke: "2px hsl(var(--foreground))",
          textShadow: "3px 3px 0 hsl(var(--foreground) / 0.15)",
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Color band header */}
      <div
        className="flex items-center justify-between gap-3 rounded-t-2xl border-b-2 border-foreground px-5 py-4"
        style={{ background: cat.color }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            whileHover={{ rotate: 360 }}
            transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 220 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-card"
          >
            <cat.icon className="h-5 w-5 text-foreground" />
          </motion.div>
          <h3 className="font-display text-base uppercase tracking-tight md:text-lg">{cat.title}</h3>
        </div>
        <span className="hidden -rotate-3 rounded-full border-2 border-foreground bg-background px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:inline-block">
          {cat.tag}
        </span>
      </div>

      {/* Sticker pills */}
      <div className="flex flex-wrap gap-2.5 p-5 pb-6">
        {cat.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0, rotate: -12 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: pillTilt(i, si) } : {}}
            whileHover={{ scale: 1.08, rotate: 0, y: -2 }}
            transition={{
              delay: i * 0.08 + 0.3 + si * 0.07,
              type: "spring",
              stiffness: 260,
              damping: 14,
            }}
            className="inline-block rounded-full border-2 border-foreground bg-background px-3.5 py-1.5 text-xs font-bold"
            style={{ boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Decorative shapes */}
      <span className="pointer-events-none absolute right-[7%] top-24 hidden animate-spin-slow font-display text-6xl text-primary/70 lg:block">✱</span>
      <span
        className="pointer-events-none absolute bottom-32 left-[5%] hidden h-7 w-7 -rotate-6 border-2 border-foreground lg:block"
        style={{ background: "#9B5DE5", boxShadow: "3px 3px 0 hsl(var(--foreground))" }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Expertise
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl uppercase leading-tight md:text-6xl"
            >
              Skills & <span className="text-primary">Toolkit</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {categories.map((cat, i) => (
            <SkillCard key={i} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
