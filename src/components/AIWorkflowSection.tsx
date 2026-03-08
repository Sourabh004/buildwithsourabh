import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, Zap, MessageSquare, Users, FileText } from "lucide-react";

const workflows = [
  {
    icon: MessageSquare,
    title: "AI Sales Follow-up Automation",
    description: "Automatically analyzes sales calls and sends personalized follow-up messages to prospects.",
  },
  {
    icon: Users,
    title: "Automated Lead Qualification",
    description: "Qualifies incoming leads using AI scoring and routes them to the right team members.",
  },
  {
    icon: FileText,
    title: "AI Content Generation Pipelines",
    description: "Generates and schedules content across platforms using AI-driven workflows.",
  },
  {
    icon: Zap,
    title: "CRM Workflow Automation",
    description: "Syncs and automates CRM data flows, reducing manual entry and improving data accuracy.",
  },
];

const AIWorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-workflows" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-hero)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <Workflow className="h-3.5 w-3.5" /> Powered by n8n
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            AI Workflows <span className="text-gradient">I Build</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Leveraging AI and automation to streamline business processes, reduce manual work, and drive efficiency at scale.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {workflows.map((wf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group p-6 transition-all duration-300 hover:glow-accent"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <wf.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{wf.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{wf.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIWorkflowSection;
