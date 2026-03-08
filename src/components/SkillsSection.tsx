import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Bot, BarChart3, Users } from "lucide-react";

const categories = [
  {
    icon: BarChart3,
    title: "Analytics",
    skills: ["SQL", "Excel", "Power BI", "Data Visualization", "Statistical Analysis"],
  },
  {
    icon: Bot,
    title: "Automation & AI",
    skills: ["n8n Workflow Automation", "AI Agents", "API Integrations", "Workflow Design", "AI Tooling"],
  },
  {
    icon: Database,
    title: "Data Tools",
    skills: ["BigQuery", "Looker Studio", "Data Dashboards", "Growth Analytics"],
  },
  {
    icon: Users,
    title: "Community & Media",
    skills: ["Community Management", "Web3 Ecosystem", "Sports & Esports Content Strategy", "Social Media Growth"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group p-6 transition-all duration-300 hover:glow-primary"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
