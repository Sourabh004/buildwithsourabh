import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, DollarSign, PhoneCall, Compass } from "lucide-react";

const projects = [
  {
    icon: PhoneCall,
    title: "Real-time AI Call Analyst",
    problem: "Teams couldn't see where friction and drop-off happened across calls without listening to each one.",
    approach: "Calls are transcribed with Whisper and routed to five specialised AI agents; structured scores go to Airtable and summaries post to Slack.",
    tools: ["n8n", "Whisper", "Claude / GPT", "Airtable", "Slack"],
    impact: "Friction and drop-off visible per call",
    number: "01",
    color: "#F77F1A",
    where: "The Experience Co.",
  },
  {
    icon: Compass,
    title: "Find My Trip",
    problem: "Matching a traveller to the right trip meant manual back-and-forth.",
    approach: "A recommendation API where an LLM agent ranks travel options against a traveller's preferences.",
    tools: ["n8n", "LLM agent", "API"],
    impact: "Top matches returned as JSON",
    number: "02",
    color: "#019EA5",
    where: "The Experience Co.",
  },
  {
    icon: TrendingUp,
    title: "Push Notification Engagement",
    problem: "Push notification engagement sat at 0.5%.",
    approach: "Analyzed large datasets in BigQuery to find key trends and tune the content strategy.",
    tools: ["BigQuery", "SQL", "Looker Studio"],
    impact: "0.5% → ~4–5% engagement",
    number: "03",
    color: "#FCAD50",
    where: "STAN",
  },
  {
    icon: DollarSign,
    title: "Ad Revenue Growth",
    problem: "Ad revenue was low relative to activity in the app.",
    approach: "Detailed user-behaviour analysis to identify the key user actions, with Looker Studio dashboards to track them daily.",
    tools: ["BigQuery", "Looker Studio", "Data Visualization"],
    impact: "Nearly 2x in two months",
    number: "04",
    color: "#9B5DE5",
    where: "STAN",
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
  // ...and tip back in 3D, like cards falling onto a pile
  const rotateX = useTransform(progress, [index / total, 1], [0, index === total - 1 ? 0 : 10]);

  return (
    <div className="sticky" style={{ top: `${110 + index * 26}px`, perspective: 1400 }}>
      <motion.div
        style={{ scale, rotateX, boxShadow: `6px 6px 0 ${project.color}` }}
        className="relative mx-auto mb-10 max-w-4xl origin-top overflow-hidden rounded-2xl border-2 border-foreground bg-card"
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
            <div>
              <h3 className="font-display text-lg uppercase leading-tight md:text-2xl">{project.title}</h3>
              <p className="font-grotesk text-[10px] font-bold uppercase tracking-widest opacity-70">{project.where}</p>
            </div>
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
              <p
                className="mt-2 font-display text-3xl uppercase leading-tight md:text-4xl"
                style={{ color: project.color }}
              >
                {project.impact}
              </p>
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
