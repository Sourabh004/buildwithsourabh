import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, BarChart3, Bot, Gamepad2 } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    title: "MCA Graduate",
    description: "Built a strong foundation in computer applications with a growing passion for data analytics and AI.",
  },
  {
    icon: Briefcase,
    title: "Early-Stage Web3 Startup",
    description: "Joined a Web3 startup where I gained hands-on experience in the fast-paced world of decentralized tech.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Impact",
    description: "Analyzed user behavior, improved engagement metrics, and turned raw data into actionable insights using BigQuery and dashboards.",
  },
  {
    icon: Bot,
    title: "AI Workflow Builder",
    description: "Started building powerful AI automations using n8n — from sales follow-ups to content pipelines.",
  },
  {
    icon: Gamepad2,
    title: "Community & Culture",
    description: "Passionate about sports, esports, and gaming culture — building communities at the intersection of tech and entertainment.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A journey from computer science to data-driven innovation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:left-1/2 md:block" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card p-6">
                    <div className={`mb-3 flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="absolute left-6 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2 md:block" />
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
