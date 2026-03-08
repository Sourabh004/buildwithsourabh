import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumePage = () => {
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar - hidden in print */}
      <div className="print:hidden sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Button>
          <Button variant="hero" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* Resume content */}
      <div ref={resumeRef} className="mx-auto max-w-4xl px-6 py-12 print:px-0 print:py-0">
        <div className="glass-card p-8 print:border-none print:bg-transparent print:shadow-none print:backdrop-blur-none md:p-12">
          {/* Header */}
          <header className="mb-8 border-b border-border pb-8 print:border-foreground/20">
            <h1 className="font-display text-4xl font-bold print:text-3xl">Sourabh</h1>
            <p className="mt-2 font-display text-lg text-primary print:text-foreground">
              Data Analyst • AI Workflow Builder • Community Builder
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-foreground/70">
              I design systems that turn data into insights and automate workflows using AI.
              My work focuses on data analytics, AI automation, and building communities
              around technology, sports, and gaming.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground print:text-foreground/60">
              <span>📧 sourabh@example.com</span>
              <span>🔗 linkedin.com/in/sourabh</span>
              <span>📸 instagram.com/sourabh</span>
            </div>
          </header>

          {/* Education */}
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary print:text-foreground">Education</h2>
            <div>
              <h3 className="font-display font-semibold">Master of Computer Applications (MCA)</h3>
              <p className="text-sm text-muted-foreground print:text-foreground/70">
                Strong foundation in computer science with specialization in data analytics and AI.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary print:text-foreground">Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold">Data Analyst & AI Workflow Builder</h3>
                <p className="text-sm text-muted-foreground print:text-foreground/70">Early-Stage Web3 Startup</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground print:text-foreground/80">
                  <li>• Analyzed user behavior data using BigQuery and SQL to drive product decisions</li>
                  <li>• Improved push notification engagement from 0.5% to 5% (10x increase)</li>
                  <li>• Increased AdMob revenue nearly 2x within two months through data-driven optimization</li>
                  <li>• Built AI automation workflows using n8n for sales follow-ups and content pipelines</li>
                  <li>• Created data dashboards and visual reports using Power BI and Looker Studio</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary print:text-foreground">Key Projects</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-semibold">Push Notification Optimization</h3>
                <p className="text-sm text-muted-foreground print:text-foreground/80">
                  Analyzed large datasets using BigQuery and improved push notification engagement from 0.5% to 5%. Tools: BigQuery, SQL, Data Visualization.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold">AdMob Revenue Optimization</h3>
                <p className="text-sm text-muted-foreground print:text-foreground/80">
                  Identified key user behavior patterns and increased AdMob revenue nearly 2x within two months. Tools: BigQuery, Analytics Dashboards, A/B Testing.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold">Gold Market Analysis</h3>
                <p className="text-sm text-muted-foreground print:text-foreground/80">
                  Analyzed historical gold price trends and built visual dashboards to identify insights. Tools: Excel, Power BI, Statistical Analysis.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold">AI Sales Follow-up Automation</h3>
                <p className="text-sm text-muted-foreground print:text-foreground/80">
                  Built an AI automation workflow using n8n that automatically analyzes sales calls and sends personalized follow-up messages. Tools: n8n, AI Agents, API Integrations.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl font-bold text-primary print:text-foreground">Skills</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="mb-1 font-display font-semibold">Analytics</h3>
                <p className="text-muted-foreground print:text-foreground/80">SQL, Excel, Power BI, Data Visualization, Statistical Analysis</p>
              </div>
              <div>
                <h3 className="mb-1 font-display font-semibold">Automation & AI</h3>
                <p className="text-muted-foreground print:text-foreground/80">n8n Workflow Automation, AI Agents, API Integrations, Workflow Design, AI Tooling</p>
              </div>
              <div>
                <h3 className="mb-1 font-display font-semibold">Data Tools</h3>
                <p className="text-muted-foreground print:text-foreground/80">BigQuery, Looker Studio, Data Dashboards, Growth Analytics</p>
              </div>
              <div>
                <h3 className="mb-1 font-display font-semibold">Community & Media</h3>
                <p className="text-muted-foreground print:text-foreground/80">Community Management, Web3 Ecosystem, Sports & Esports Content Strategy, Social Media Growth</p>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section>
            <h2 className="mb-4 font-display text-xl font-bold text-primary print:text-foreground">Interests</h2>
            <p className="text-sm text-muted-foreground print:text-foreground/80">
              Sports & Motorsports, Gaming Culture, Esports Communities, AI Workflow Experimentation, Data Analytics Projects, Social Media Growth Strategies
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
