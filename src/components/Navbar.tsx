import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tech", href: "/tech" },
  { label: "Gaming", href: "/gaming" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.02);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-primary"
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b-2 border-foreground bg-background/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="cursor-hover font-display text-xl uppercase italic tracking-tight text-primary"
            style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}
          >
            Sourabh
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.span
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3, duration: 0.4 }}
              >
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    className="cursor-hover group relative text-xs font-bold uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="cursor-hover group relative text-xs font-bold uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                )}
              </motion.span>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="cursor-hover rounded-full border-2 border-foreground bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wide transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 hsl(var(--foreground))" }}
            >
              Contact Us
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-hover text-foreground md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t-2 border-foreground bg-background md:hidden"
            >
              <div className="flex flex-col gap-5 px-6 py-7">
                {[...navLinks, { label: "Contact", href: "#contact" }].map((link, i) => (
                  <motion.span
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="cursor-hover font-display text-lg uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="cursor-hover font-display text-lg uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
