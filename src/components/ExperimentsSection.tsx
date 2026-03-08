import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Bot, Wrench, BarChart3, Gamepad2, Share2 } from "lucide-react";

const experiments = [
  { icon: Bot, label: "AI workflow automation" },
  { icon: Wrench, label: "AI-powered productivity tools" },
  { icon: BarChart3, label: "Data analytics projects" },
  { icon: Gamepad2, label: "Sports & esports content analytics" },
  { icon: Share2, label: "Social media experiments" },
];

const ExperimentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <FlaskConical className="h-3.5 w-3.5" /> Currently exploring
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            What I'm <span className="text-gradient">Experimenting With</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experiments.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card flex items-center gap-4 p-4 transition-all duration-300 hover:glow-primary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <exp.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-sm font-medium md:text-base">{exp.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperimentsSection;
