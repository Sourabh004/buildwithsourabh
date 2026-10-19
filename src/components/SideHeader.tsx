import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Gamepad2 } from "lucide-react";

/** Floating pill header for the Tech / Gaming sub-pages */
const SideHeader = ({ side }: { side: "tech" | "gaming" }) => {
  const dark = side === "gaming";
  const other = dark
    ? { to: "/tech", label: "Tech side", Icon: Cpu, accent: "#F77F1A" }
    : { to: "/gaming", label: "Gaming side", Icon: Gamepad2, accent: "#C6F24E" };
  const ink = dark ? "#FAF0D7" : "#1F271B";
  const bg = dark ? "rgba(31,39,27,0.85)" : "rgba(250,240,215,0.85)";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 md:top-5"
    >
      <div
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border-2 px-2 py-2 backdrop-blur-md"
        style={{ borderColor: ink, background: bg, boxShadow: `4px 4px 0 ${ink}` }}
      >
        <Link
          to="/"
          className="cursor-hover flex items-center gap-2 rounded-full border-2 px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest transition-colors"
          style={{ borderColor: ink, color: ink }}
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <span className="hidden font-display text-lg uppercase italic sm:block" style={{ color: dark ? "#C6F24E" : "#F77F1A" }}>
          The {side} side
        </span>
        <Link
          to={other.to}
          className="cursor-hover flex items-center gap-2 rounded-full border-2 px-4 py-2 font-grotesk text-xs font-bold uppercase tracking-widest transition-transform hover:translate-x-[2px] hover:translate-y-[2px]"
          style={{ borderColor: ink, background: other.accent, color: "#1F271B" }}
        >
          <other.Icon className="h-4 w-4" /> {other.label}
        </Link>
      </div>
    </motion.header>
  );
};

export default SideHeader;
