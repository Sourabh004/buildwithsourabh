import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, Users, FileText, Zap, ArrowRight, Plus, Minus } from "lucide-react";

const workflows = [
  {
    num: "01",
    icon: MessageSquare,
    title: "AI SALES FOLLOW-UP AUTOMATION",
    tagline: "Close more deals, automatically.",
    description:
      "Analyzes every sales call transcript with AI, then fires personalized follow-up messages to each prospect—timing, tone, and content all tuned to the conversation.",
    steps: ["Record sales call", "AI extracts key signals", "Personalized email drafted", "Auto-sent at optimal time"],
    color: "#F77F1A",
  },
  {
    num: "02",
    icon: Users,
    title: "AUTOMATED LEAD QUALIFICATION",
    tagline: "Let AI filter the noise.",
    description:
      "Incoming leads are scored by AI the moment they land, then auto-routed to the right rep or pipeline stage. No more manual triage.",
    steps: ["Lead submits form", "AI scores & classifies", "Routed to right team", "CRM updated instantly"],
    color: "#019EA5",
  },
  {
    num: "03",
    icon: FileText,
    title: "AI CONTENT GENERATION PIPELINE",
    tagline: "Publish without the grind.",
    description:
      "A fully automated pipeline that takes a topic brief, generates platform-native content via AI, schedules it, and tracks performance.",
    steps: ["Brief entered", "AI writes + formats", "Scheduled across platforms", "Analytics loop back"],
    color: "#FF7A9C",
  },
  {
    num: "04",
    icon: Zap,
    title: "CRM WORKFLOW AUTOMATION",
    tagline: "Your CRM, finally alive.",
    description:
      "Syncs data between your CRM and every other tool in real-time. No duplicate entries, no stale contacts—just clean, accurate pipelines.",
    steps: ["Trigger event fires", "Data mapped & cleaned", "CRM record updated", "Team notified"],
    color: "#8B5CF6",
  },
];

const WorkflowRow = ({ wf, i }: { wf: (typeof workflows)[0]; i: number }) => {
  const [open, setOpen] = useState(false);
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });
  const Icon = wf.icon;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-b-2 border-foreground"
    >
      <button
        onClick={() => setOpen(!open)}
        className="group w-full text-left"
      >
        <div className="relative flex items-center gap-4 px-0 py-6 md:py-8">
          {/* Color flood on hover */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={open ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: wf.color, originX: 0 }}
            className="absolute inset-0 -mx-4 md:-mx-6"
          />

          <div className="relative flex w-full items-center gap-4 md:gap-8">
            {/* Number */}
            <span
              className="shrink-0 font-display text-5xl font-bold leading-none md:text-7xl lg:text-8xl"
              style={{ WebkitTextStroke: "2px hsl(var(--foreground))", color: "transparent" }}
            >
              {wf.num}
            </span>

            {/* Icon pill */}
            <span
              className="hidden shrink-0 items-center justify-center rounded-full border-2 border-foreground md:flex"
              style={{
                width: 52,
                height: 52,
                background: open ? "hsl(var(--foreground))" : wf.color + "20",
                transition: "background 0.3s",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: open ? "hsl(var(--background))" : wf.color }} />
            </span>

            {/* Title */}
            <div className="min-w-0 flex-1">
              <p className="mb-0.5 font-grotesk text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Workflow
              </p>
              <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight md:text-2xl lg:text-3xl">
                {wf.title}
              </h3>
            </div>

            {/* Toggle */}
            <span className="ml-auto shrink-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground transition-colors">
              {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 font-grotesk text-sm font-bold italic" style={{ color: wf.color }}>
                  {wf.tagline}
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {wf.description}
                </p>
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-2 md:items-end">
                {wf.steps.map((step, si) => (
                  <div key={si} className="flex items-center gap-2">
                    <span className="font-grotesk text-[10px] font-bold text-muted-foreground">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="rounded-full border-2 border-foreground px-3 py-1 font-grotesk text-xs font-bold uppercase tracking-wide"
                      style={{ background: wf.color + "20" }}
                    >
                      {step}
                    </span>
                    {si < wf.steps.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-muted-foreground md:hidden" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AIWorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-workflows" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="section-label"
          >
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Powered by n8n
          </motion.span>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl uppercase leading-tight md:text-6xl"
              >
                AI WORKFLOWS <span className="text-primary">I BUILD</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              Click any workflow below to see exactly how it runs — step by step.
            </motion.p>
          </div>
        </div>

        {/* Accordion rows */}
        <div className="border-t-2 border-foreground">
          {workflows.map((wf, i) => (
            <WorkflowRow key={wf.num} wf={wf} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIWorkflowSection;
