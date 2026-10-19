import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, BarChart3, Trophy, ArrowUpRight, Check } from "lucide-react";
import { SectionHeading, TiltCard } from "./brutal";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "AI Workflow Automation",
    tagline: "Build once. Run forever.",
    color: "#F77F1A",
    deliverables: [
      "n8n workflow design & build",
      "AI-powered sales follow-up",
      "Lead qualification systems",
      "Automated reporting pipelines",
      "CRM & API integrations",
    ],
  },
  {
    num: "02",
    icon: BarChart3,
    title: "Data Analytics",
    tagline: "Turn noise into signal.",
    color: "#019EA5",
    deliverables: [
      "Power BI / Looker Studio dashboards",
      "SQL data analysis & modeling",
      "User behavior analysis",
      "Growth & engagement reporting",
      "BigQuery data warehousing",
    ],
  },
  {
    num: "03",
    icon: Trophy,
    title: "Sports & Esports Content",
    tagline: "Grow your community.",
    color: "#9B5DE5",
    deliverables: [
      "Content strategy for sports brands",
      "Short-form video concepts",
      "Instagram & TikTok planning",
      "Audience analytics",
      "Community engagement playbooks",
    ],
  },
];

const ServiceCard = ({ svc, i }: { svc: (typeof services)[0]; i: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = svc.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, rotateX: 25 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      <TiltCard className="cursor-hover rounded-3xl border-2 border-foreground bg-card" max={9}>
        {/* Colour header */}
        <div
          className="relative flex h-40 items-end justify-between rounded-t-[22px] border-b-2 border-foreground p-5"
          style={{ background: svc.color }}
        >
          <span
            className="font-display text-7xl leading-none text-transparent"
            style={{ WebkitTextStroke: "2px hsl(var(--foreground))", transform: "translateZ(30px)" }}
          >
            {svc.num}
          </span>
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-foreground bg-card shadow-[4px_4px_0_hsl(var(--foreground))]"
            style={{ transform: "translateZ(60px) rotate(-6deg)" }}
          >
            <Icon className="h-7 w-7" />
          </span>
        </div>

        <div className="p-6" style={{ transform: "translateZ(25px)" }}>
          <h3 className="font-display text-2xl uppercase leading-none tracking-tight">{svc.title}</h3>
          <p className="mt-2 font-grotesk text-sm font-bold italic" style={{ color: svc.color }}>
            {svc.tagline}
          </p>
          <ul className="mt-6 space-y-2.5">
            {svc.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-foreground"
                  style={{ background: svc.color }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="font-grotesk font-medium leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const FreelanceSection = () => (
  <section id="freelance" className="section-padding">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        label="Open for Work"
        aside={
          <a href="#contact" className="btn-brutal cursor-hover">
            Let's work together <ArrowUpRight className="h-4 w-4" />
          </a>
        }
      >
        Freelance &amp; <span className="text-primary">Collab</span>
      </SectionHeading>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc, i) => (
          <ServiceCard key={svc.num} svc={svc} i={i} />
        ))}
      </div>

      <p className="mt-12 text-center font-grotesk text-xs font-medium text-muted-foreground">
        Available for remote contracts, part-time retainers, or one-off projects. Message me to discuss scope.
      </p>
    </div>
  </section>
);

export default FreelanceSection;
