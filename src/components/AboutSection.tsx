import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

const TimelineItem = ({ item, i }: { item: typeof timeline[0]; i: number }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
      className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
    >
      <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="glass-card p-6"
        >
          <div className={`mb-3 flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={isInView ? { rotate: 0, scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"
            >
              <item.icon className="h-5 w-5 text-primary" />
            </motion.div>
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </motion.div>
      </div>
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-6 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2 md:block"
      />
      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
          {/* Animated timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border/30 md:left-1/2 md:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 hidden w-px bg-primary md:left-1/2 md:block"
          />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
