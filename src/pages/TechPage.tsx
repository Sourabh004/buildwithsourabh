import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import TechCursor from "@/components/TechCursor";
import VelocityMarquee from "@/components/VelocityMarquee";
import SkillsSection from "@/components/SkillsSection";
import AIStackSection from "@/components/AIStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import AIWorkflowSection from "@/components/AIWorkflowSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const heroLines = ["THE", "TECH", "SIDE."];

const TechPage = () => {
  useLenis();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background cursor-none">
      <TechCursor />

      {/* Mini nav */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-2 border-foreground bg-background px-6 py-4 md:px-12">
        <Link
          to="/"
          className="cursor-hover flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_hsl(var(--foreground))] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_hsl(var(--foreground))]"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <span className="font-display text-lg uppercase italic text-primary">Sourabh</span>
        <Link
          to="/gaming"
          className="cursor-hover flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest text-background shadow-[4px_4px_0_#C6F24E] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#C6F24E]"
        >
          <Gamepad2 className="h-4 w-4" /> Switch side
        </Link>
      </header>

      {/* Page hero */}
      <section className="relative flex min-h-[70vh] flex-col justify-end px-6 pb-16 pt-32 md:px-12 lg:px-24">
        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_hsl(var(--foreground))]">
          <span className="h-2 w-2 rounded-full bg-primary" /> 01 / Data, AI & Automation
        </span>
        {heroLines.map((line, i) => (
          <div key={line} className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`font-display text-7xl uppercase leading-[0.95] tracking-tight md:text-9xl ${
                line === "TECH" ? "text-primary" : ""
              }`}
            >
              {line}
            </motion.h1>
          </div>
        ))}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Everything I build with data and AI — the stack, the workflows, the projects, and the
          experiments that keep me up at night.
        </motion.p>
      </section>

      <VelocityMarquee text="DATA ✱ AI AGENTS ✱ AUTOMATION ✱ ANALYTICS ✱" outline />
      <SkillsSection />
      <AIStackSection />
      <ProjectsSection />
      <WorkShowcaseSection />
      <AIWorkflowSection />
      <ExperimentsSection />
      <VelocityMarquee text="LET'S BUILD SOMETHING ✱ SAY HELLO ✱" baseVelocity={-2} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default TechPage;
