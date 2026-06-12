import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, BarChart3, Trophy, ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Bot,
    title: "AI WORKFLOW AUTOMATION",
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
    title: "DATA ANALYTICS",
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
    title: "SPORTS & ESPORTS CONTENT",
    tagline: "Grow your community.",
    color: "#FF7A9C",
    deliverables: [
      "Content strategy for sports brands",
      "Viral short-form video concepts",
      "Instagram & TikTok planning",
      "Audience analytics",
      "Community engagement playbooks",
    ],
  },
];

const ServiceRow = ({ svc, i }: { svc: (typeof services)[0]; i: number }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });
  const Icon = svc.icon;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border-2 border-foreground"
      style={{ boxShadow: "6px 6px 0 hsl(var(--foreground))", marginBottom: i < services.length - 1 ? 16 : 0 }}
    >
      {/* Color band top */}
      <div className="flex items-center gap-4 px-6 py-4" style={{ background: svc.color }}>
        <span className="font-display text-sm font-bold uppercase text-foreground/70">{svc.num}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground bg-background">
          <Icon className="h-4 w-4" style={{ color: svc.color }} />
        </span>
        <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight md:text-2xl">
          {svc.title}
        </h3>
        <span className="ml-auto font-grotesk text-xs font-bold italic">{svc.tagline}</span>
      </div>

      {/* Deliverables grid */}
      <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {svc.deliverables.map((item, di) => (
          <div
            key={di}
            className="border-r-2 border-t-2 border-foreground px-4 py-4 last:border-r-0 transition-colors duration-200 hover:bg-foreground hover:text-background"
          >
            <span className="block font-grotesk text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              {String(di + 1).padStart(2, "0")}
            </span>
            <span className="font-grotesk text-xs font-medium leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const FreelanceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="freelance" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="section-label"
            >
              <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
              Open for Work
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl uppercase leading-tight md:text-6xl"
              >
                FREELANCE &amp; <span className="text-primary">COLLAB</span>
              </motion.h2>
            </div>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="btn-brutal flex items-center gap-2"
          >
            LET'S WORK TOGETHER <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Service rows */}
        <div>
          {services.map((svc, i) => (
            <ServiceRow key={svc.num} svc={svc} i={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center font-grotesk text-xs font-medium text-muted-foreground"
        >
          Available for remote contracts, part-time retainers, or one-off projects. DM to discuss scope.
        </motion.p>
      </div>
    </section>
  );
};

export default FreelanceSection;
