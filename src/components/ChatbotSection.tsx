import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const resumeData: Record<string, string> = {
  tools: "Sourabh uses SQL, Excel, Power BI, BigQuery, Looker Studio, n8n, and various AI tools for his work in data analytics and automation.",
  workflows: "Sourabh has built AI Sales Follow-up Automation, Automated Lead Qualification workflows, AI Content Generation Pipelines, and CRM Workflow Automation using n8n.",
  projects: "His key projects include Push Notification Optimization (10x engagement increase), AdMob Revenue Optimization (2x revenue), Gold Market Analysis dashboards, and AI Sales Follow-up Automation.",
  fit: "Sourabh is a strong fit for data analyst roles — he has an MCA degree, hands-on experience with BigQuery, SQL, Power BI, and proven results in improving metrics through data-driven insights.",
  experience: "Sourabh has worked at an early-stage Web3 startup, analyzing user behavior, improving engagement metrics, and building AI automations with n8n.",
  skills: "His skills span Analytics (SQL, Excel, Power BI), Automation & AI (n8n, AI Agents), Data Tools (BigQuery, Looker Studio), and Community Management.",
  default: "I can answer questions about Sourabh's tools, workflows, projects, experience, and skills. Try asking: 'What tools does Sourabh use?' or 'What projects has he worked on?'",
};

function getAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("tool") || q.includes("use") || q.includes("tech")) return resumeData.tools;
  if (q.includes("workflow") || q.includes("automat") || q.includes("n8n") || q.includes("ai workflow")) return resumeData.workflows;
  if (q.includes("project") || q.includes("work on") || q.includes("built") || q.includes("portfolio")) return resumeData.projects;
  if (q.includes("fit") || q.includes("hire") || q.includes("analyst") || q.includes("role") || q.includes("good")) return resumeData.fit;
  if (q.includes("experience") || q.includes("startup") || q.includes("web3") || q.includes("background")) return resumeData.experience;
  if (q.includes("skill") || q.includes("expert") || q.includes("know")) return resumeData.skills;
  return resumeData.default;
}

type Message = { role: "user" | "assistant"; content: string };

const ChatbotSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Sourabh's AI resume assistant. Ask me anything about his experience, skills, or projects!" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const answer = getAnswer(input);
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: answer }]);
    setInput("");
  };

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <MessageCircle className="h-3.5 w-3.5" /> AI Powered
          </div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Ask My <span className="text-gradient">Resume</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          <div className="flex h-[400px] flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sourabh's skills, projects..."
                  className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-xl">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotSection;
