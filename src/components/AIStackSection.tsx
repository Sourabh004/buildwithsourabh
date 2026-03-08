import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
  Cpu,
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

const categoryColors: Record<string, string> = {
  "AI & Automation": "from-primary/20 to-primary/5 border-primary/30",
  "Data & Analytics": "from-accent/20 to-accent/5 border-accent/30",
  "Community & Platforms": "from-secondary/40 to-secondary/10 border-secondary/60",
};

const categoryBadgeColors: Record<string, string> = {
  "AI & Automation": "bg-primary/15 text-primary border-primary/25",
  "Data & Analytics": "bg-accent/15 text-accent border-accent/25",
  "Community & Platforms": "bg-secondary text-secondary-foreground border-secondary",
};

const categoryIconColors: Record<string, string> = {
  "AI & Automation": "text-primary",
  "Data & Analytics": "text-accent",
  "Community & Platforms": "text-muted-foreground",
};

const AIStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Cpu className="h-3.5 w-3.5" /> Tools & Technologies
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            My AI & <span className="text-gradient">Data Stack</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-14 max-w-2xl text-center text-muted-foreground"
        >
          These are the core tools and technologies I use to build AI workflows, analyze data, and automate processes.
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${categoryColors[tool.category]}`}
              >
                <div className={`mb-3 inline-flex rounded-xl bg-background/60 p-2.5 ${categoryIconColors[tool.category]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{tool.name}</h3>
                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
                <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${categoryBadgeColors[tool.category]}`}>
                  {tool.category}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIStackSection;
