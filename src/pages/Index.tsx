import { useLenis } from "@/hooks/useLenis";
import CustomCursor from "@/components/CustomCursor";
import VelocityMarquee from "@/components/VelocityMarquee";
import StatementSection from "@/components/StatementSection";
import SplitPortal from "@/components/SplitPortal";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FreelanceSection from "@/components/FreelanceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useLenis();

  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <VelocityMarquee text="DATA ✱ AI ✱ AUTOMATION ✱ GAMING ✱" outline />
      <SplitPortal />
      <StatementSection />
      <AboutSection />
      <VelocityMarquee text="TECH ✱ GAMING ✱ COMMUNITY ✱ CULTURE ✱" baseVelocity={-2} />
      <FreelanceSection />
      <VelocityMarquee text="LET'S WORK TOGETHER ✱ SAY HELLO ✱" outline baseVelocity={1.5} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
