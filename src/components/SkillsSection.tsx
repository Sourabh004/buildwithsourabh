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

const SkillCard = ({ cat, i }: { cat: typeof categories[0]; i: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 100 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card group p-6 transition-all duration-300 hover:glow-primary"
    >
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 200 }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20"
        >
          <cat.icon className="h-6 w-6 text-primary" />
        </motion.div>
        <h3 className="font-display text-xl font-semibold">{cat.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.12 + 0.4 + si * 0.05 }}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

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
            <SkillCard key={i} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
