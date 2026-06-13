import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Bot, Wrench, BarChart3, Gamepad2, Share2 } from "lucide-react";

const experiments = [
  { icon: Bot, label: "AI workflow automation", color: "#F77F1A", rotate: -2 },
  { icon: Wrench, label: "AI-powered productivity tools", color: "#019EA5", rotate: 1.5 },
  { icon: BarChart3, label: "Data analytics projects", color: "#9B5DE5", rotate: -1 },
  { icon: Gamepad2, label: "Sports & esports analytics", color: "#8B5CF6", rotate: 2.5 },
  { icon: Share2, label: "Social media experiments", color: "#F77F1A", rotate: -1.5 },
];

const ExperimentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
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

        {/* Pill scatter — centered flex-wrap */}
        <div className="flex flex-wrap justify-center gap-4">
          {experiments.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.8, rotate: exp.rotate * 2 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: exp.rotate } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 150, damping: 18 }}
                whileHover={{ scale: 1.08, rotate: 0, transition: { duration: 0.2 } }}
                className="flex cursor-default items-center gap-3 border-2 border-foreground px-5 py-3"
                style={{
                  boxShadow: "4px 4px 0 hsl(var(--foreground))",
                  background: exp.color + "15",
                  borderRadius: 0,
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-foreground"
                  style={{ background: exp.color }}
                >
                  <Icon className="h-4 w-4 text-white" />
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide md:text-base">
                  {exp.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 flex items-center justify-center gap-3"
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
