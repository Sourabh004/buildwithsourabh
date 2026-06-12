import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Workflow,
  Brain,
  Database,
  Plug,
  TableProperties,
  FileSpreadsheet,
  BarChart3,
  Search,
  LayoutDashboard,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react";

type Tool = {
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
};

const tools: Tool[] = [
  { name: "n8n", description: "Workflow automation and AI integrations", category: "AI & Automation", icon: Workflow },
  { name: "OpenAI APIs", description: "Building AI-powered systems", category: "AI & Automation", icon: Brain },
  { name: "Airtable", description: "Database workflows and automation", category: "AI & Automation", icon: Database },
  { name: "API Integrations", description: "Connecting different tools seamlessly", category: "AI & Automation", icon: Plug },
  { name: "SQL", description: "Querying and managing relational databases", category: "Data & Analytics", icon: TableProperties },
  { name: "Excel", description: "Advanced data analysis and modeling", category: "Data & Analytics", icon: FileSpreadsheet },
  { name: "Power BI", description: "Interactive dashboards and reporting", category: "Data & Analytics", icon: BarChart3 },
  { name: "BigQuery", description: "Cloud-scale data warehousing", category: "Data & Analytics", icon: Search },
  { name: "Looker Studio", description: "Visual data exploration and dashboards", category: "Data & Analytics", icon: LayoutDashboard },
  { name: "Discord", description: "Community management and automation", category: "Community & Platforms", icon: MessageCircle },
  { name: "Social Analytics", description: "Social media performance tracking", category: "Community & Platforms", icon: TrendingUp },
  { name: "Growth Platforms", description: "User growth and engagement analytics", category: "Community & Platforms", icon: Users },
];

const categoryColor: Record<string, string> = {
  "AI & Automation": "#F77F1A",
  "Data & Analytics": "#019EA5",
  "Community & Platforms": "#FF7A9C",
};

const rowVariants = {
  rest: {},
  hover: {},
};

const fillVariants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const nameVariants = {
  rest: { x: 0 },
  hover: { x: 18, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const detailVariants = {
  rest: { opacity: 0, x: 24 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const arrowVariants = {
  rest: { opacity: 0, scale: 0.5, rotate: -45 },
  hover: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const ToolRow = ({ tool, i }: { tool: Tool; i: number }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: "-40px" });
  const color = categoryColor[tool.category];
  const Icon = tool.icon;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        variants={rowVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="cursor-hover group relative overflow-hidden border-b-2 border-foreground"
      >
        {/* Color flood that rises on hover */}
        <motion.div
          variants={fillVariants}
          style={{ background: color, originY: 1 }}
          className="absolute inset-0"
        />

        <div className="relative flex items-center justify-between gap-4 px-2 py-5 md:px-4 md:py-6">
          {/* Left: index + name */}
          <div className="flex min-w-0 items-baseline gap-4 md:gap-6">
            <span className="shrink-0 font-grotesk text-xs font-bold text-muted-foreground transition-colors group-hover:text-foreground/70">
              {String(i + 1).padStart(3, "0")}
            </span>
            <motion.h3
              variants={nameVariants}
              className="truncate font-display text-2xl uppercase leading-none tracking-tight md:text-4xl lg:text-5xl"
            >
              {tool.name}
            </motion.h3>
          </div>

          {/* Right: description + category slide in on hover (desktop) */}
          <motion.div variants={detailVariants} className="hidden items-center gap-4 md:flex shrink-0">
            <p className="max-w-[260px] text-right text-xs font-medium leading-snug text-foreground/80">
              {tool.description}
            </p>
            <span className="rounded-full border-2 border-foreground bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              {tool.category}
            </span>
            <motion.span
              variants={arrowVariants}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-background"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </motion.div>

          {/* Mobile: icon + tiny desc always visible */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground"
              style={{ background: color }}
            >
              <Icon className="h-4 w-4 text-foreground" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AIStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="section-padding relative" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Tools & Technologies
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl uppercase leading-tight md:text-6xl"
              >
                My AI & <span className="text-primary">Data Stack</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              The core tools I use to build AI workflows, analyze data, and automate processes — hover to inspect.
            </motion.p>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-2 flex flex-wrap gap-4"
        >
          {Object.entries(categoryColor).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <span className="h-3 w-3 rotate-45 border-2 border-foreground" style={{ background: color }} />
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Index list */}
        <div className="border-t-2 border-foreground">
          {tools.map((tool, i) => (
            <ToolRow key={tool.name} tool={tool} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIStackSection;
