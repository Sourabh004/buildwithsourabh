import { motion } from "framer-motion";
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
  Users,
  Zap,
} from "lucide-react";
import { SectionHeading, TiltCard } from "./brutal";

type Tool = { name: string; description: string; icon: React.ElementType };

/** Compact stack: three category cards, each a grid of keycap-style tool tiles */
const groups: { title: string; color: string; tools: Tool[] }[] = [
  {
    title: "AI & Automation",
    color: "#F77F1A",
    tools: [
      { name: "n8n", description: "Where most of my workflows and agents run", icon: Workflow },
      { name: "Claude & GPT", description: "Scoring, extraction, ranking", icon: Brain },
      { name: "MCP", description: "Gives agents tools and data", icon: Plug },
      { name: "Make.com", description: "Quick visual integrations", icon: Zap },
    ],
  },
  {
    title: "Data & Analytics",
    color: "#019EA5",
    tools: [
      { name: "Airtable", description: "Ops databases for workflows", icon: Database },
      { name: "Postgres", description: "Production data for tools", icon: TableProperties },
      { name: "BigQuery", description: "Large-dataset SQL analysis", icon: Search },
      { name: "Looker Studio", description: "Daily metric dashboards", icon: LayoutDashboard },
      { name: "Power BI", description: "Interactive reporting", icon: BarChart3 },
      { name: "Excel", description: "Quick analysis & models", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Community & Platforms",
    color: "#9B5DE5",
    tools: [
      { name: "Discord & Telegram", description: "Running and moderating communities", icon: MessageCircle },
      { name: "Slack", description: "Where automations report back", icon: Users },
    ],
  },
];

const ToolTile = ({ tool, color, i }: { tool: Tool; color: string; i: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, rotate: i % 2 ? 2 : -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: i * 0.05, type: "spring", stiffness: 220, damping: 18 }}
    whileHover={{ y: -4 }}
    className="cursor-hover group relative flex items-center gap-3 rounded-xl border-2 border-foreground bg-background p-3 shadow-[0_4px_0_hsl(var(--foreground))] transition-shadow hover:shadow-[0_6px_0_hsl(var(--foreground))]"
  >
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-foreground transition-transform group-hover:-rotate-6"
      style={{ background: color }}
    >
      <tool.icon className="h-5 w-5" />
    </span>
    <span className="min-w-0">
      <span className="block truncate font-display text-sm uppercase leading-tight">{tool.name}</span>
      <span className="block text-[11px] leading-snug text-muted-foreground">{tool.description}</span>
    </span>
  </motion.div>
);

const GroupCard = ({ g, gi }: { g: (typeof groups)[number]; gi: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: 20 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformPerspective: 1200 }}
  >
    <TiltCard className="flex flex-col rounded-2xl border-2 border-foreground bg-card" shadow={g.color} max={6} glare={false}>
      <div
        className="flex items-center justify-between rounded-t-[14px] border-b-2 border-foreground px-5 py-3"
        style={{ background: g.color }}
      >
        <h3 className="font-display text-base uppercase leading-none">{g.title}</h3>
        <span className="rounded-full border-2 border-foreground bg-background px-2 py-0.5 font-grotesk text-[10px] font-black">
          {String(g.tools.length).padStart(2, "0")}
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {g.tools.map((t, i) => (
          <ToolTile key={t.name} tool={t} color={g.color} i={i} />
        ))}
      </div>
    </TiltCard>
  </motion.div>
);

const AIStackSection = () => (
  <section id="stack" className="section-padding relative">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        label="Tools & Technologies"
        aside={
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            The core tools I use to build AI workflows, analyse data and automate processes.
          </p>
        }
      >
        My AI &amp; <span className="text-primary">Data Stack</span>
      </SectionHeading>

      {/* AI + Community stacked left, Data right — both columns end level */}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <GroupCard g={groups[0]} gi={0} />
          <GroupCard g={groups[2]} gi={1} />
        </div>
        <GroupCard g={groups[1]} gi={2} />
      </div>
    </div>
  </section>
);

export default AIStackSection;
