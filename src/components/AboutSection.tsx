import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Bot, Gamepad2 } from "lucide-react";

const timeline = [
  {
    icon: Gamepad2,
    title: "Community & Culture",
    description: "Passionate about sports, esports, and gaming culture — building communities at the intersection of tech and entertainment.",
    color: "#CA5449",
    tag: "Community",
  },
  {
    icon: Briefcase,
    title: "Early-Stage Web3 Startup",
    description: "Joined a Web3 startup where I gained hands-on experience in the fast-paced world of decentralized tech.",
    color: "#019EA5",
    tag: "First Gig",
  },
  {
    icon: GraduationCap,
    title: "MCA Graduate",
    description: "Built a strong foundation in computer applications with a growing passion for data analytics and AI.",
    color: "#FCAD50",
    tag: "Education",
  },
  {
    icon: Bot,
    title: "AI Workflow Builder",
    description: "Started building powerful AI automations using n8n — from sales follow-ups to content pipelines.",
    color: "#758C32",
    tag: "Automation",
  },
];

const TimelineItem = ({ item, i }: { item: (typeof timeline)[0]; i: number }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-80px" });
  const isLeft = i % 2 === 0;
  const tilt = isLeft ? -1.5 : 1.5;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -80 : 80, rotate: isLeft ? -6 : 6 }}
      animate={isInView ? { opacity: 1, x: 0, rotate: tilt } : {}}
      transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 14 }}
      className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
    >
      <div className="flex-1">
        <motion.div
          whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="glass-card cursor-hover group relative overflow-visible p-0"
        >
          {/* Giant step number hanging off the corner */}
          <span
            className={`pointer-events-none absolute -top-6 font-display text-5xl md:text-6xl select-none ${
              isLeft ? "-right-3 md:-right-5" : "-left-3 md:-left-5"
            }`}
            style={{
              color: item.color,
              WebkitTextStroke: "2px hsl(var(--foreground))",
              textShadow: "4px 4px 0 hsl(var(--foreground) / 0.15)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Color band header */}
          <div
            className="flex items-center justify-between gap-3 rounded-t-2xl border-b-2 border-foreground px-5 py-3"
            style={{ background: item.color }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.25, type: "spring", stiffness: 250 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-card"
              >
                <item.icon className="h-5 w-5 text-foreground" />
              </motion.div>
              <h3 className="font-display text-sm uppercase tracking-tight md:text-base">{item.title}</h3>
            </div>
            <span className="hidden rotate-2 rounded-full border-2 border-foreground bg-background px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:inline-block">
              {item.tag}
            </span>
          </div>

          <p className="p-5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </motion.div>
      </div>

      {/* Center node — rotated square with border */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={isInView ? { scale: 1, rotate: 45 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-6 top-8 z-10 hidden md:left-1/2 md:block"
      >
        <div
          className="h-4 w-4 -translate-x-1/2 border-2 border-foreground"
          style={{ background: item.color, boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
        />
      </motion.div>
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
    <section id="about" className="section-padding relative" ref={ref}>
      {/* Decorative spinning asterisk */}
      <span className="pointer-events-none absolute left-[6%] top-32 hidden animate-spin-slow font-display text-6xl text-primary/70 lg:block">
        ✱
      </span>

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Background
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl uppercase leading-tight md:text-6xl"
            >
              Main Quest:
              <br />
              <span className="text-primary">How I Leveled Up</span>
            </motion.h2>
          </div>
        </motion.div>

        <div className="relative">
          {/* Chunky dashed spine + animated fill */}
          <div className="absolute left-6 top-0 hidden h-full w-1 border-l-2 border-dashed border-foreground/25 md:left-1/2 md:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 hidden w-1 rounded-full bg-foreground md:left-1/2 md:block"
          />

          <div className="space-y-16 md:space-y-20">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} i={i} />
            ))}
          </div>

          {/* Finish flag at the end of the line */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative mx-auto mt-16 hidden w-fit md:block"
          >
            <span
              className="inline-block -rotate-2 rounded-full border-2 border-foreground bg-primary px-6 py-2 font-display text-sm uppercase tracking-wide"
              style={{ boxShadow: "4px 4px 0 hsl(var(--foreground))" }}
            >
              ...and still going ✱
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
