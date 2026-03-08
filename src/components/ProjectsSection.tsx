import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, DollarSign, LineChart, Bot, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    icon: TrendingUp,
    title: "Push Notification Optimization",
    problem: "Low push notification engagement at just 0.5% click-through rate.",
    approach: "Analyzed large datasets using BigQuery, segmented users by behavior, and optimized notification timing and content.",
    tools: ["BigQuery", "SQL", "Data Visualization"],
    impact: "Improved engagement from 0.5% to 5% — a 10x increase.",
  },
  {
    icon: DollarSign,
    title: "AdMob Revenue Optimization",
    problem: "Ad revenue was underperforming relative to user base size.",
    approach: "Identified key user behavior patterns and optimized ad placement and frequency.",
    tools: ["BigQuery", "Analytics Dashboards", "A/B Testing"],
    impact: "Increased AdMob revenue nearly 2x within two months.",
  },
  {
    icon: LineChart,
    title: "Gold Market Analysis",
    problem: "Need for historical trend analysis of gold prices for investment insights.",
    approach: "Analyzed historical gold price data and built visual dashboards with trend indicators.",
    tools: ["Excel", "Power BI", "Statistical Analysis"],
    impact: "Created comprehensive dashboards revealing actionable market patterns.",
  },
  {
    icon: Bot,
    title: "AI Sales Follow-up Automation",
    problem: "Sales teams spending hours on manual follow-up after calls.",
    approach: "Built an AI workflow using n8n that analyzes sales call transcripts and generates personalized follow-ups.",
    tools: ["n8n", "AI Agents", "API Integrations"],
    impact: "Automated follow-up process, saving hours of manual work per week.",
  },
];

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="glass-card group cursor-pointer overflow-hidden transition-all duration-300 hover:glow-primary"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <project.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold">{project.title}</h3>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
          )}
        </div>

        <p className="text-sm text-muted-foreground">{project.impact}</p>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 space-y-3 border-t border-border pt-4"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Problem</span>
              <p className="mt-1 text-sm text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Approach</span>
              <p className="mt-1 text-sm text-muted-foreground">{project.approach}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Tools</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Click to expand and see details.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
