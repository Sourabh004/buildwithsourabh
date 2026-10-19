import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Bot, Wrench, BarChart3, Zap, LineChart } from "lucide-react";
import { SectionHeading, TiltCard } from "./brutal";

const ORANGE = "#F77F1A";
const TEAL = "#019EA5";
const PURPLE = "#9B5DE5";
const VOLT = "#C6F24E";

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
    color: VOLT,
    rotate: 2,
    status: "Exploring",
  },
  {
    icon: LineChart,
    label: "Dashboard & Data Storytelling",
    desc: "Dashboards that make numbers feel human and turn metrics into momentum.",
    color: ORANGE,
    rotate: -1.5,
    status: "Ongoing",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Active: VOLT,
  Building: ORANGE,
  Exploring: TEAL,
  Ongoing: PURPLE,
};

const ExperimentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Currently Exploring"
          aside={
            <motion.div
              initial={{ rotate: -12 }}
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground bg-primary shadow-[4px_4px_0_hsl(var(--foreground))]"
            >
              <FlaskConical className="h-7 w-7" />
            </motion.div>
          }
        >
          What I'm <span className="text-primary">Building</span>
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => {
            const Icon = exp.icon;
            const statusColor = STATUS_COLOR[exp.status] ?? ORANGE;
            const isLast = i === experiments.length - 1 && experiments.length % 3 !== 0;

            return (
              <motion.div
                key={exp.label}
                initial={{ opacity: 0, y: 50, rotate: exp.rotate * 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: exp.rotate } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 140, damping: 18 }}
                className={isLast ? "lg:col-span-2" : ""}
              >
                <TiltCard className="cursor-hover flex flex-col rounded-2xl border-2 border-foreground bg-card" max={10}>
                  <div className="h-2 w-full rounded-t-[14px] border-b-2 border-foreground" style={{ background: exp.color }} />
                  <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(30px)" }}>
                    <div className="mb-5 flex items-start justify-between">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))]"
                        style={{ background: exp.color, transform: "translateZ(25px) rotate(-4deg)" }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border-2 border-foreground bg-background px-2.5 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-widest">
                        <span className="h-2 w-2 rounded-full border border-foreground" style={{ background: statusColor }} />
                        {exp.status}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-lg uppercase leading-tight tracking-tight">{exp.label}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-foreground/20" />
          <span className="font-grotesk text-xs font-bold uppercase tracking-widest text-muted-foreground">
            ...and still exploring ✱
          </span>
          <div className="h-px flex-1 bg-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
