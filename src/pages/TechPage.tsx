import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MousePointerClick } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import SideHeader from "@/components/SideHeader";
import { PageWipe } from "@/components/brutal";
import { SceneSlot, TechScene } from "@/components/three/SceneSlot";
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
      <PageWipe colors={["#019EA5", "#F77F1A"]} />
      <SideHeader side="tech" />

      {/* Page hero — copy left, live 3D workflow right */}
      <section className="relative flex min-h-screen flex-col overflow-hidden px-6 pb-16 pt-32 md:px-12 lg:flex-row lg:items-center lg:px-24">
        <div className="pointer-events-none relative z-10 lg:w-1/2">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground bg-card px-4 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_hsl(var(--foreground))]">
            <span className="h-2 w-2 rounded-full bg-primary" /> 01 / Data, AI & Automation
          </span>
          {heroLines.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ delay: 1 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Everything I build with data and AI — the stack, the workflows, the projects, and the
            experiments that keep me up at night.
          </motion.p>
          <motion.a
            href="#skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="btn-brutal cursor-hover pointer-events-auto mt-8"
          >
            Explore the stack <ArrowDown className="h-4 w-4" />
          </motion.a>
        </div>

        <div className="relative mt-10 h-[380px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[55%]">
          <SceneSlot className="h-full w-full">{(active) => <TechScene active={active} />}</SceneSlot>
          <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest shadow-[3px_3px_0_hsl(var(--foreground))] lg:bottom-10 lg:right-10">
            <MousePointerClick className="h-3.5 w-3.5" /> A live workflow — click to spin
          </span>
        </div>
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
