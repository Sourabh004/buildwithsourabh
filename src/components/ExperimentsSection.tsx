import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Bot, Wrench, BarChart3, Zap, LineChart } from "lucide-react";

const ORANGE = "#F77F1A";
const TEAL   = "#019EA5";
const PURPLE = "#9B5DE5";

const experiments = [
  {
    icon: Bot,
    label: "AI Workflow Automation",
    desc: "End-to-end n8n pipelines that replace repetitive manual tasks with smart, triggered automation.",
    color: ORANGE,
    rotate: -1.5,
    status: "Active",
  },
  {
    icon: Wrench,
    label: "AI-Powered Productivity Tools",
    desc: "LLM-backed tools that collapse hours of knowledge-work into seconds.",
    color: TEAL,
    rotate: 1.5,
    status: "Building",
  },
  {
    icon: BarChart3,
    label: "Data Analytics Projects",
    desc: "Turning raw data into visual stories and insights that actually change decisions.",
    color: PURPLE,
    rotate: -1,
    status: "Active",
  },
  {
    icon: Zap,
    label: "LLM-Powered Internal Tools",
    desc: "Custom AI tools built for teams — designed around how people actually work, not how tools want them to.",
    color: TEAL,
    rotate: 2,
    status: "Exploring",
  },
  {
    icon: LineChart,
    label: "Dashboard & Data Storytelling",
    desc: "Dashboards that make numbers feel human and turn metrics into momentum.",
    color: PURPLE,
    rotate: -1.5,
    status: "Ongoing",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active:    "#C6F24E",
  Building:  ORANGE,
  Exploring: TEAL,
  Ongoing:   PURPLE,
};

const ExperimentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="section-label"
            >
              <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
              Currently Exploring
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl uppercase leading-tight md:text-6xl"
              >
                WHAT I'M <span className="text-primary">BUILDING</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
            animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground bg-primary"
            style={{ boxShadow: "4px 4px 0 hsl(var(--foreground))" }}
          >
            <FlaskConical className="h-7 w-7 text-white" />
          </motion.div>
        </div>

        {/* Card grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => {
            const Icon = exp.icon;
            const statusColor = STATUS_COLOR[exp.status] ?? ORANGE;
            // Last card spans 2 cols on lg if odd count
            const isLast = i === experiments.length - 1 && experiments.length % 3 !== 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: exp.rotate * 1.5 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: exp.rotate } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 140, damping: 18 }}
                whileHover={{ y: -6, rotate: 0, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col border-2 border-foreground bg-card overflow-hidden cursor-default${isLast ? " lg:col-span-2" : ""}`}
                style={{ boxShadow: `5px 5px 0 hsl(var(--foreground))` }}
              >
                {/* Accent bar */}
                <div className="h-1.5 w-full" style={{ background: exp.color }} />

                <div className="flex flex-1 flex-col p-5">
                  {/* Icon + status row */}
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground"
                      style={{ background: exp.color + "25" }}
                    >
                      <Icon className="h-4 w-4" style={{ color: exp.color }} />
                    </span>
                    <span
                      className="rounded-full border-2 border-foreground px-2.5 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-widest"
                      style={{ background: statusColor + "20", color: statusColor, borderColor: statusColor }}
                    >
                      ● {exp.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 font-display text-base uppercase leading-tight tracking-tight md:text-lg"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {exp.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {exp.desc}
                  </p>
                </div>

                {/* Hover color wash */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: exp.color + "0A" }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1 bg-foreground/20" />
          <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-muted-foreground">
            ...and still exploring ✱
          </span>
          <div className="h-px flex-1 bg-foreground/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
