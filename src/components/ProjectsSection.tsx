import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, LineChart, Bot } from "lucide-react";

const projects = [
  {
    icon: TrendingUp,
    title: "Push Notification Optimization",
    problem: "Low push notification engagement at just 0.5% click-through rate.",
    approach: "Analyzed large datasets using BigQuery, segmented users by behavior, and optimized notification timing and content.",
    tools: ["BigQuery", "SQL", "Data Visualization"],
    impact: "0.5% → 5% — a 10x increase",
    number: "01",
    color: "#FCAD50",
  },
  {
    icon: DollarSign,
    title: "AdMob Revenue Optimization",
    problem: "Ad revenue was underperforming relative to user base size.",
    approach: "Identified key user behavior patterns and optimized ad placement and frequency.",
    tools: ["BigQuery", "Analytics Dashboards", "A/B Testing"],
    impact: "Revenue nearly 2x in two months",
    number: "02",
    color: "#019EA5",
  },
  {
    icon: LineChart,
    title: "Gold Market Analysis",
    problem: "Need for historical trend analysis of gold prices for investment insights.",
    approach: "Analyzed historical gold price data and built visual dashboards with trend indicators.",
    tools: ["Excel", "Power BI", "Statistical Analysis"],
    impact: "Dashboards revealing market patterns",
    number: "03",
    color: "#FF7A9C",
  },
  {
    icon: Bot,
    title: "AI Sales Follow-up Automation",
    problem: "Sales teams spending hours on manual follow-up after calls.",
    approach: "Built an AI workflow using n8n that analyzes sales call transcripts and generates personalized follow-ups.",
    tools: ["n8n", "AI Agents", "API Integrations"],
    impact: "Hours of manual work saved weekly",
    number: "04",
    color: "#758C32",
  },
];

const StackCard = ({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  // Earlier cards shrink slightly as later ones stack on top
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky" style={{ top: `${110 + index * 26}px` }}>
      <motion.div
        style={{ scale }}
        className="glass-card relative mx-auto mb-10 max-w-4xl origin-top overflow-hidden"
      >
        {/* Color band header */}
        <div
          className="flex items-center justify-between border-b-2 border-foreground px-6 py-4 md:px-10"
          style={{ background: project.color }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground bg-card">
              <project.icon className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="font-display text-lg uppercase leading-tight md:text-2xl">{project.title}</h3>
          </div>
          <span className="font-display text-3xl md:text-5xl opacity-30">{project.number}</span>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10">
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Problem</span>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Approach</span>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.approach}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Impact</span>
              <p className="mt-2 font-display text-2xl uppercase leading-tight md:text-3xl">{project.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border-2 border-foreground bg-background px-3 py-1 text-xs font-bold"
                  style={{ boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const headRef = useRef(null);
  const isInView = useInView(headRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Case Studies
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl uppercase leading-tight md:text-6xl"
            >
              Featured <span className="text-primary">Projects</span>
            </motion.h2>
          </div>
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <StackCard
              key={i}
              project={project}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
