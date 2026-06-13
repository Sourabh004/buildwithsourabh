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
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} — Designed & built by Sourabh
        </p>
        <div className="flex gap-6">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sourabh-pawar-a94039216/" },
            { label: "Instagram", href: "https://www.instagram.com/who_is_sourabh_/" },
            { label: "X", href: "https://x.com/0xSOURABH" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-hover text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
