import { useLenis } from "@/hooks/useLenis";
import CustomCursor from "@/components/CustomCursor";
import VelocityMarquee from "@/components/VelocityMarquee";
import StatementSection from "@/components/StatementSection";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AIStackSection from "@/components/AIStackSection";
import AIWorkflowSection from "@/components/AIWorkflowSection";
import FreelanceSection from "@/components/FreelanceSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import SportsSection from "@/components/SportsSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useLenis();

  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <VelocityMarquee text="DATA ✱ AI ✱ AUTOMATION ✱ ANALYTICS ✱" outline />
      <StatementSection />
      <AboutSection />
      <SkillsSection />
      <VelocityMarquee text="BIGQUERY ✱ N8N ✱ POWER BI ✱ SQL ✱ AI AGENTS ✱" baseVelocity={-2} />
      <AIStackSection />
      <ProjectsSection />
      <WorkShowcaseSection />
      <AIWorkflowSection />
      <FreelanceSection />
      <SportsSection />
      <ExperimentsSection />
      <VelocityMarquee text="LET'S WORK TOGETHER ✱ SAY HELLO ✱" outline baseVelocity={1.5} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
