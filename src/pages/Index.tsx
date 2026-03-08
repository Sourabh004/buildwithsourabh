import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AIWorkflowSection from "@/components/AIWorkflowSection";
import ChatbotSection from "@/components/ChatbotSection";
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
      <ProjectsSection />
      <AIWorkflowSection />
      <ChatbotSection />
      <SportsSection />
      <ExperimentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
