import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

const INTERVAL = 4000;

const ORANGE = "#F77F1A";
const VOLT   = "#C6F24E";
const TEAL   = "#019EA5";
const PURPLE = "#9B5DE5";
const INK    = "#1F271B";

const works = [
  {
    image: work1,
    title: "Analytics Dashboard",
    description: "Built a comprehensive data analytics dashboard tracking KPIs, user engagement, and revenue metrics using Power BI and BigQuery.",
    tags: ["Power BI", "BigQuery", "SQL"],
    accent: ORANGE,
  },
  {
    image: work2,
    title: "AI Workflow Automation",
    description: "Designed end-to-end AI sales follow-up automation using n8n, integrating CRM, email, and lead qualification systems.",
    tags: ["n8n", "OpenAI", "Automation"],
    accent: TEAL,
  },
  {
    image: work3,
    title: "Push Notification Optimization",
    description: "Achieved 10× engagement increase by analysing notification patterns and optimising delivery timing with data-driven strategies.",
    tags: ["Analytics", "A/B Testing", "Growth"],
    accent: VOLT,
  },
  {
    image: work4,
    title: "Gold Market Analysis",
    description: "Created real-time gold market analysis dashboards with candlestick charting, trend indicators, and price prediction models.",
    tags: ["Data Analysis", "Excel", "Looker Studio"],
    accent: PURPLE,
  },
];

const WorkShowcaseSection = () => {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [progress, setProgress] = useState(0);

  const next = () => {
    setCurrent((c) => (c + 1) % works.length);
    setProgress(0);
  };
  const prev = () => {
    setCurrent((c) => (c === 0 ? works.length - 1 : c - 1));
    setProgress(0);
  };
  const goTo = (i: number) => { setCurrent(i); setProgress(0); };

  // Auto-advance with progress tracking
  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % works.length);
        setProgress(0);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, paused]);

  const w = works[current];

  return (
    <section id="showcase" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[3px_3px_0_hsl(var(--foreground))]">
            ✦ Featured Work
          </span>
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            Work{" "}
            <span style={{ color: ORANGE }}>Showcase</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            A glimpse into the projects and dashboards I've built — from data analytics to AI automations.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          {/* Progress bar */}
          <div className="mb-3 h-[3px] w-full overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress * 100}%`, background: w.accent }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>

          <div
            className="overflow-hidden border-2 border-foreground"
            style={{ boxShadow: `6px 6px 0 ${w.accent}`, transition: "box-shadow 0.3s ease" }}
          >
            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={w.image}
                    alt={w.title}
                    initial={{ opacity: 0, scale: 1.06, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.97, x: -20 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                {/* Accent bar on left edge */}
                <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: w.accent }} />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-between border-l-2 border-foreground bg-card p-6 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Slide counter */}
                    <span
                      className="mb-4 block font-display text-5xl leading-none opacity-15"
                      style={{ color: w.accent }}
                    >
                      {String(current + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mb-3 font-display text-2xl uppercase leading-tight tracking-tight text-foreground md:text-3xl">
                      {w.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {w.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {w.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-2 border-foreground px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0_hsl(var(--foreground))]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between">
                  {/* Dot indicators */}
                  <div className="flex gap-2">
                    {works.map((wp, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: i === current ? 28 : 8,
                          background: i === current ? w.accent : "hsl(var(--foreground) / 0.2)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Prev / Next */}
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="flex h-9 w-9 items-center justify-center border-2 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={next}
                      className="flex h-9 w-9 items-center justify-center border-2 border-foreground shadow-[2px_2px_0_hsl(var(--foreground))] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                      style={{ background: w.accent, borderColor: INK }}
                    >
                      <ChevronRight className="h-4 w-4" style={{ color: INK }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
