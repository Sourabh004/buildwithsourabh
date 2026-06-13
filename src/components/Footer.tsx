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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <p className="text-xs text-muted-foreground/50">© {new Date().getFullYear()}</p>
        <p className="text-xs text-muted-foreground/50">Designed & built by Sourabh</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
