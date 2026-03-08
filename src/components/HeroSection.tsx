import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden section-padding pt-24">
      <ParticleBackground />
      <div className="tech-grid absolute inset-0 opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
          >
            Available for opportunities
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">Sourabh</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-display text-lg text-muted-foreground md:text-xl">
            Data Analyst • AI Workflow Builder • Community Builder
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/80 md:text-base">
            I design systems that turn data into insights and automate workflows using AI.
            My work focuses on data analytics, AI automation, and building communities
            around technology, sports, and gaming.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View Projects <ArrowDown className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="/resume">
                <Download className="mr-1 h-4 w-4" /> Download Resume
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#contact">
                <Mail className="mr-1 h-4 w-4" /> Contact Me
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
    </section>
  );
};

export default HeroSection;
