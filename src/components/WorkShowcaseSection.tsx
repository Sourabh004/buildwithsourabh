import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

const works = [
  {
    image: work1,
    title: "Analytics Dashboard",
    description: "Built a comprehensive data analytics dashboard tracking KPIs, user engagement, and revenue metrics using Power BI and BigQuery.",
    tags: ["Power BI", "BigQuery", "SQL"],
  },
  {
    image: work2,
    title: "AI Workflow Automation",
    description: "Designed end-to-end AI sales follow-up automation using n8n, integrating CRM, email, and lead qualification systems.",
    tags: ["n8n", "OpenAI", "Automation"],
  },
  {
    image: work3,
    title: "Push Notification Optimization",
    description: "Achieved 10x engagement increase by analyzing notification patterns and optimizing delivery timing with data-driven strategies.",
    tags: ["Analytics", "A/B Testing", "Growth"],
  },
  {
    image: work4,
    title: "Gold Market Analysis",
    description: "Created real-time gold market analysis dashboards with candlestick charting, trend indicators, and price prediction models.",
    tags: ["Data Analysis", "Excel", "Looker Studio"],
  },
];

const WorkShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? works.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === works.length - 1 ? 0 : c + 1));

  return (
    <section id="showcase" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Briefcase className="h-3.5 w-3.5" /> Featured Work
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Work <span className="text-gradient">Showcase</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground"
        >
          A glimpse into the projects and dashboards I've built — from data analytics to AI automations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative"
        >
          {/* Carousel card */}
          <div className="glass-card overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden md:aspect-auto">
                <motion.img
                  key={current}
                  src={works[current].image}
                  alt={works[current].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center p-6 md:p-10">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="mb-3 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {works[current].title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {works[current].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {works[current].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="h-10 w-10 rounded-full border-border"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {works.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="h-10 w-10 rounded-full border-border"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
