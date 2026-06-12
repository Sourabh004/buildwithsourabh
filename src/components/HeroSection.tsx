import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import SpinningBadge from "./SpinningBadge";

const lineReveal = {
  hidden: { y: "110%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden section-padding pt-32"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-foreground bg-card px-5 py-2"
          style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }}
        >
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Available for opportunities</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display uppercase leading-[0.92] tracking-tight">
          <div className="overflow-hidden">
            <motion.span
              custom={0.25}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              Making Data
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              custom={0.4}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              <span className="text-primary">Go Boom</span> — I'm
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              custom={0.55}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block text-[clamp(2.6rem,8.5vw,7.5rem)]"
            >
              Sourabh<span className="text-primary">.</span>
            </motion.span>
          </div>
        </h1>

        {/* Descriptor row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {["Data Analyst", "AI Workflow Builder", "Community Builder"].map((tag, i) => {
            const colors = ["#FCAD50", "#019EA5", "#FF7A9C"];
            return (
              <span
                key={tag}
                className="rounded-full border-2 border-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wide"
                style={{ background: colors[i], boxShadow: "2px 2px 0 hsl(var(--foreground))" }}
              >
                {tag}
              </span>
            );
          })}
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-6 max-w-lg font-grotesk text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          I design systems that turn data into insights and automate workflows with AI —
          analytics, automation, and communities around tech, sports & gaming.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#projects" className="btn-brutal cursor-hover">
            View Projects <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="/SOURABH_K_Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal-ghost cursor-hover"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <a
            href="#contact"
            className="cursor-hover inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" /> Say hello
          </a>
        </motion.div>
      </motion.div>

      {/* Spinning badge — rotates extra with scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 150 }}
        style={{ rotate: badgeRotate }}
        className="absolute bottom-16 right-8 z-10 md:bottom-24 md:right-24"
      >
        <SpinningBadge />
      </motion.div>

      {/* Decorative shapes */}
      <span className="pointer-events-none absolute left-[8%] top-[18%] hidden animate-spin-slow font-display text-5xl text-primary lg:block">✱</span>
      <span className="pointer-events-none absolute right-[14%] top-[22%] hidden h-6 w-6 rotate-12 border-2 border-foreground bg-accent lg:block" style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
