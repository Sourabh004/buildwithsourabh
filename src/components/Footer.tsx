import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-t-2 border-foreground bg-card"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <a
          href="#"
          className="cursor-hover font-display text-lg uppercase italic text-primary"
          style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}
        >
          Sourabh
        </a>
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} — Designed & built by Sourabh
        </p>
        <div className="flex gap-6">
          {["GitHub", "LinkedIn", "Twitter"].map((name) => (
            <a
              key={name}
              href="#"
              className="cursor-hover text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
