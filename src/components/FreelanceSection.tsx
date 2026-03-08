import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bot, BarChart3, Trophy, ChevronDown, ChevronUp, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "AI Workflow Automation",
    description: "Design and build automation systems using n8n and AI tools.",
    examples: [
      "AI-powered sales follow-up workflows",
      "Lead qualification automation",
      "Automated reporting and analytics workflows",
      "AI content generation pipelines",
      "CRM and API workflow automation",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Helping teams turn data into insights.",
    examples: [
      "Dashboard creation (Power BI / Looker Studio)",
      "Data analysis and reporting",
      "User behavior and engagement analysis",
      "Growth analytics",
    ],
  },
  {
    icon: Trophy,
    title: "Sports & Esports Content Strategy",
    description: "Helping sports and gaming brands grow their online presence.",
    examples: [
      "Content planning for sports and esports pages",
      "Social media strategy",
      "Viral content ideas for Instagram and short-form video",
      "Community engagement strategies",
      "Analytics for sports and gaming audiences",
    ],
  },
];

const ServiceCard = ({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="glass-card group cursor-pointer overflow-hidden transition-all duration-300 hover:glow-primary"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{service.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{service.description}</p>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
          )}
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-border pt-4"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">What I can help with</p>
            <ul className="space-y-2">
              {service.examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  {ex}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FreelanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="freelance" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-hero)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Handshake className="h-3.5 w-3.5" /> Open for Work
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Open for Freelance & <span className="text-gradient">Collaborations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I'm open to freelance projects and collaborations where I can help businesses automate workflows with AI, analyze data for better decision-making, and build engaging content strategies for sports and esports communities.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">
              Let's Work Together <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceSection;
