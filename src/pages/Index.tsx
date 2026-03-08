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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <AIStackSection />
      <ProjectsSection />
      <WorkShowcaseSection />
      <AIWorkflowSection />
      <FreelanceSection />
      
      <SportsSection />
      <ExperimentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
