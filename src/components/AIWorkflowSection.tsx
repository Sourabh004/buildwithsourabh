import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Users, FileText, Zap, Play, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./brutal";
const workflows = [
  {
    num: "01",
    icon: MessageSquare,
    title: "REAL-TIME AI CALL ANALYST",
    tagline: "Every call, scored.",
    description:
      "Transcribes calls with Whisper and routes them to five specialised AI agents. Structured scores land in Airtable and a summary posts to Slack, so teams can see friction and drop-off per call.",
    steps: ["Call recorded", "Whisper transcribes", "Five AI agents score", "Airtable + Slack summary"],
    color: "#F77F1A",
  },
  {
    num: "02",
    icon: FileText,
    title: "HOTEL VOUCHER GENERATOR",
    tagline: "Booked → voucher, no manual PDFs.",
    description:
      "On booking, picks the right brand template, exports a PDF voucher and emails it to the traveller. Slack alerts the team when a hotel confirmation is missing.",
    steps: ["Booking confirmed", "Brand template picked", "PDF emailed to traveller", "Slack alert if unconfirmed"],
    color: "#019EA5",
  },
  {
    num: "03",
    icon: Zap,
    title: "INVOICE FETCH & UPLOAD",
    tagline: "Invoices file themselves.",
    description:
      "Reads invoice emails, files the PDFs, extracts vendor, date and amount with an LLM, and appends each one to a reconciliation sheet.",
    steps: ["Invoice email arrives", "PDF filed", "LLM extracts fields", "Reconciliation sheet updated"],
    color: "#9B5DE5",
  },
  {
    num: "04",
    icon: Users,
    title: "FIND MY TRIP",
    tagline: "The right trip, ranked.",
    description:
      "A recommendation API: an LLM agent ranks travel options against a traveller's preferences and returns the top matches as JSON.",
    steps: ["Preferences in", "LLM agent ranks options", "Top matches picked", "JSON response"],
    color: "#C6F24E",
  },
];

const INK = "#1F271B";

/** n8n-style canvas: the selected workflow's steps as connected nodes, with a pulse running through them */
const FlowCanvas = ({ wf }: { wf: (typeof workflows)[number] }) => {
  const reduce = useReducedMotion();
  const n = wf.steps.length;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 border-foreground bg-[#1F271B] p-5 text-[#FAF0D7] shadow-[6px_6px_0_hsl(var(--foreground))] md:p-7"
      style={{
        backgroundImage: "radial-gradient(rgba(250,240,215,0.12) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* window bar */}
      <div className="mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/60">
          <span className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A9C]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCAD50]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#C6F24E]" />
          </span>
          n8n · {wf.title.toLowerCase()}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-[#C6F24E]/50 px-2 py-0.5 font-grotesk text-[9px] font-black uppercase tracking-widest text-[#C6F24E]">
          <motion.span
            animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#C6F24E]"
          />
          Active
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={wf.num}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {/* nodes */}
          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {wf.steps.map((step, si) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 * si }}
                className="relative"
              >
                <div className="relative z-10 h-full rounded-xl border-2 bg-[#2A3423] p-3" style={{ borderColor: si === 0 ? wf.color : "rgba(250,240,215,0.25)" }}>
                  {/* execution glow sweeps node to node */}
                  {!reduce && (
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-[10px]"
                      style={{ boxShadow: `0 0 0 2px ${wf.color}, 0 0 18px ${wf.color}66` }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatDelay: (n - 1) * 0.6, delay: si * 0.6 }}
                    />
                  )}
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg border-2 font-display text-[11px]"
                      style={{ background: si === 0 ? wf.color : "transparent", borderColor: wf.color, color: si === 0 ? INK : wf.color }}
                    >
                      {si === 0 ? <Play className="h-3.5 w-3.5" /> : si + 1}
                    </span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#C6F24E]/70" />
                  </div>
                  <p className="font-grotesk text-[9px] font-bold uppercase tracking-widest text-[#FAF0D7]/45">
                    {si === 0 ? "Trigger" : si === n - 1 ? "Output" : "Step"}
                  </p>
                  <p className="mt-0.5 font-grotesk text-sm font-bold leading-snug">{step}</p>
                </div>
                {/* connector to the next node (desktop: right, mobile: down) */}
                {si < n - 1 && (
                  <span
                    className="absolute z-0 hidden lg:block"
                    style={{ left: "100%", top: "50%", width: 12, height: 2, background: wf.color }}
                  />
                )}
              </motion.li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 border-t border-dashed border-[#FAF0D7]/20 pt-5 md:grid-cols-[auto_1fr] md:items-start">
            <p className="font-display text-lg uppercase leading-tight" style={{ color: wf.color }}>
              {wf.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#FAF0D7]/75">{wf.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AIWorkflowSection = () => {
  const [active, setActive] = useState(0);
  const wf = workflows[active];

  return (
    <section id="ai-workflows" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Powered by n8n"
          aside={
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Built at The Experience Co. on n8n with Claude/GPT, Airtable, Postgres and MCP. Pick one to watch it run.
            </p>
          }
        >
          AI workflows <span className="text-primary">I build</span>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_2fr]">
          {/* picker */}
          <div role="tablist" aria-label="Workflows" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {workflows.map((w, i) => {
              const on = i === active;
              const Icon = w.icon;
              return (
                <button
                  key={w.num}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className="cursor-hover flex items-center gap-3 rounded-xl border-2 border-foreground p-3 text-left transition-all duration-200"
                  style={{
                    background: on ? w.color : "hsl(var(--card))",
                    boxShadow: on ? "4px 4px 0 hsl(var(--foreground))" : "2px 2px 0 hsl(var(--foreground))",
                    transform: on ? "translate(-2px,-2px)" : undefined,
                  }}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-foreground"
                    style={{ background: on ? "hsl(var(--card))" : w.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-grotesk text-[10px] font-bold uppercase tracking-widest opacity-60">Workflow {w.num}</span>
                    <span className="block font-display text-sm uppercase leading-tight">{w.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <FlowCanvas wf={wf} />
        </div>
      </div>
    </section>
  );
};

export default AIWorkflowSection;