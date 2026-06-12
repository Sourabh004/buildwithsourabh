const items = [
  "Data Analytics",
  "AI Automation",
  "n8n Workflows",
  "BigQuery",
  "Community Building",
  "Power BI",
  "Growth Hacking",
  "SQL",
  "AI Agents",
  "Web3",
];

interface MarqueeSectionProps {
  reverse?: boolean;
  className?: string;
}

const MarqueeSection = ({ reverse = false, className = "" }: MarqueeSectionProps) => {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-border/30 py-4 ${className}`}>
      <div className={`flex whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-8">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
