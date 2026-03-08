import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="border-t border-border px-6 py-8 text-center"
    >
      <p className="font-display text-sm text-muted-foreground">
        Built by <span className="text-gradient font-semibold">Sourabh</span>
      </p>
    </motion.footer>
  );
};

export default Footer;
