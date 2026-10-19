import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { PageWipe } from "@/components/brutal";

const EMAIL = "whoissourabh@gmail.com";

const contacts = [
  { label: EMAIL, href: `mailto:${EMAIL}` },
  { label: "linkedin.com/in/sourabhpawarai", href: "https://www.linkedin.com/in/sourabhpawarai/" },
  { label: "instagram.com/who_is_sourabh_", href: "https://www.instagram.com/who_is_sourabh_/" },
];

const experience = [
  {
    role: "Junior Tech & Automation Manager",
    org: "The Experience Co. · Bengaluru",
    dates: "Apr 2025 – Present",
    points: [
      "Design and ship internal AI and automation tools — mostly n8n with Claude/GPT, Airtable, Postgres and MCP",
      "Real-time AI Call Analyst: Whisper transcription routed to five specialised AI agents; scores to Airtable, summaries to Slack",
      "Hotel Voucher Generator, Invoice Fetch & Upload, and the Find My Trip recommendation API",
      "Product work: sprint planning, prioritisation and release tracking",
    ],
  },
  {
    role: "Content Creation & Management",
    org: "Viral Gamer · Freelance",
    dates: "May 2022 – Present",
    points: [
      "Content for the esports audience with brands like Red Bull India, Nodwin Gaming and Krafton",
      "Promoting Indian gaming events and tournaments",
    ],
  },
  {
    role: "Community Manager",
    org: "CropBytes",
    dates: "Apr 2024 – Oct 2024",
    points: ["Managed the player community across Discord (~15k) and Telegram (~20k) — events and day-to-day moderation"],
  },
  {
    role: "Business Analytics Intern",
    org: "STAN · Bengaluru",
    dates: "Apr 2024 – Jun 2024",
    points: [
      "BigQuery analysis that lifted push notification engagement from 0.5% to ~4–5%",
      "Nearly 2x ad revenue in two months by identifying key user actions",
      "Looker Studio dashboards for daily user activity",
    ],
  },
  {
    role: "Community Manager",
    org: "One Mind Music · Freelance",
    dates: "Aug 2023 – Aug 2024",
    points: ["Ran the invite-only fan community (~1k core fans) for artist Arjun Kanungo"],
  },
  {
    role: "QA Manager · Community Manager",
    org: "One World Nation (OWN)",
    dates: "Jan 2022 – Sep 2023",
    points: ["Community manager from Jan 2022; QA manager from Nov 2022"],
  },
  {
    role: "Esports Community Manager",
    org: "Self-employed",
    dates: "Dec 2020 – May 2022",
    points: ["Built and ran esports communities"],
  },
];

const education = [
  { degree: "Master of Computer Applications (MCA)", school: "Jain (Deemed-to-be University)", dates: "2023 – 2024" },
  { degree: "Bachelor of Computer Applications (BCA)", school: "Bengaluru City University", dates: "2019 – 2022" },
];

const certifications = ["Google Data Analytics Specialization", "Analyzing and Visualizing Data with Microsoft Power BI", "SQL (Basic)"];

const skills = [
  { group: "AI & Automation", items: "n8n, Make.com, LLMs, RAG, Prompt Engineering, Model Context Protocol (MCP)", color: "#019EA5" },
  { group: "Data", items: "SQL, BigQuery, Looker Studio, Power BI, Postgres, Airtable", color: "#FCAD50" },
  { group: "Product", items: "Sprint planning, Prioritisation, Release tracking", color: "#9B5DE5" },
  { group: "Community & Media", items: "Community building, Moderation, Esports content, Video editing", color: "#C6F24E" },
];

const Heading = ({ children }: { children: string }) => (
  <h2 className="mb-5 flex items-center gap-3 font-display text-xl uppercase tracking-tight">
    <span className="inline-block h-3 w-3 rotate-45 border-2 border-foreground bg-primary print:bg-foreground" />
    {children}
  </h2>
);

const ResumePage = () => (
  <div className="relative min-h-screen bg-background print:bg-white">
    <div className="print:hidden">
      <PageWipe />
    </div>

    {/* Top bar — hidden in print */}
    <div className="sticky top-3 z-50 px-3 print:hidden">
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-full border-2 border-foreground bg-background/90 p-2 shadow-[4px_4px_0_hsl(var(--foreground))] backdrop-blur-md">
        <Link to="/" className="btn-brutal-ghost !px-4 !py-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> Portfolio
        </Link>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn-brutal-ghost !px-4 !py-2 text-xs">
            <Printer className="h-4 w-4" /> <span className="hidden sm:inline">Print</span>
          </button>
          <a href="/SOURABH_K_Resume.pdf" download className="btn-brutal !px-4 !py-2 text-xs">
            <Download className="h-4 w-4" /> PDF
          </a>
        </div>
      </div>
    </div>

    <motion.main
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1400 }}
      className="relative z-10 mx-auto max-w-4xl px-4 py-10 print:p-0"
    >
      <article className="rounded-3xl border-2 border-foreground bg-card shadow-[8px_8px_0_hsl(var(--foreground))] print:rounded-none print:border-0 print:shadow-none">
        {/* Header */}
        <header className="rounded-t-[22px] border-b-2 border-foreground bg-primary p-8 md:p-12 print:rounded-none print:bg-white print:p-0 print:pb-6">
          <p className="font-grotesk text-[10px] font-bold uppercase tracking-[0.3em]">Resume</p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-tight md:text-7xl">Sourabh Pawar</h1>
          <p className="mt-3 font-display text-base uppercase md:text-lg">
            Tech &amp; Automation · AI Agents · Esports Content
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {contacts.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full border-2 border-foreground bg-card px-3 py-1 font-grotesk text-[11px] font-bold print:border print:px-0 print:py-0 print:bg-transparent"
              >
                {c.label}
              </a>
            ))}
          </div>
        </header>

        <div className="space-y-10 p-8 md:p-12 print:p-0 print:pt-6">
          <section>
            <Heading>Profile</Heading>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground print:text-black">
              AI and workflow automation by day, esports content on the side. I build AI agents and internal tools at
              The Experience Co. in Bengaluru — mostly n8n with Claude/GPT, Airtable, Postgres and MCP — and help with
              sprint planning and release tracking. Before that: data analytics, and community work across esports,
              Web3 and music.
            </p>
          </section>

          <section>
            <Heading>Experience</Heading>
            <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.role + job.org} className="border-l-2 border-foreground pl-5 print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-base uppercase">{job.role}</h3>
                  <span className="font-grotesk text-[11px] font-bold uppercase tracking-widest text-muted-foreground print:text-black">
                    {job.dates}
                  </span>
                </div>
                <p className="font-grotesk text-xs font-bold uppercase tracking-widest text-primary print:text-black">{job.org}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground print:text-black">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-primary">▸</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </section>

          <section>
            <Heading>Skills</Heading>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group} className="flex gap-3">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-foreground" style={{ background: s.color }} />
                  <div>
                    <h3 className="font-display text-sm uppercase">{s.group}</h3>
                    <p className="text-sm text-muted-foreground print:text-black">{s.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 sm:grid-cols-2">
            <div>
              <Heading>Education</Heading>
              <div className="space-y-4">
                {education.map((e) => (
                  <div key={e.degree}>
                    <h3 className="font-display text-sm uppercase">{e.degree}</h3>
                    <p className="text-sm text-muted-foreground print:text-black">
                      {e.school} · {e.dates}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Heading>Certifications</Heading>
              <ul className="space-y-1.5 text-sm text-muted-foreground print:text-black">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-primary">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Heading>Interests</Heading>
                <p className="text-sm text-muted-foreground print:text-black">
                  Motorsport, gaming culture, esports communities, AI workflow experiments.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </motion.main>
  </div>
);

export default ResumePage;
