import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Profile", href: "#profile" },
  { label: "Tech", href: "/tech" },
  { label: "Gaming", href: "/gaming" },
  { label: "Resume", href: "/resume" },
];

const NavItem = ({ label, href, onClick, className }: { label: string; href: string; onClick?: () => void; className: string }) =>
  href.startsWith("/") ? (
    <Link to={href} onClick={onClick} className={className}>
      {label}
    </Link>
  ) : (
    <a href={href} onClick={onClick} className={className}>
      {label}
    </a>
  );

/** Floating pill nav — tucks away while scrolling down, returns on scroll up */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y > prev && !isOpen);
  });

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-primary"
      />

      {/* frosted strip only once scrolled, and it hides with the nav */}
      <motion.div
        aria-hidden
        animate={{ opacity: scrolled && !hidden ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="top-blur top-blur--light"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-5"
      >
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border-2 border-foreground px-3 py-2 transition-colors duration-300 md:px-4 ${
            scrolled ? "bg-background/90 shadow-[4px_4px_0_hsl(var(--foreground))] backdrop-blur-md" : "bg-background/60"
          }`}
        >
          <a href="#" className="cursor-hover flex items-center gap-2 pl-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-foreground font-display text-lg text-primary">
              S
            </span>
            <span className="font-display text-base uppercase italic tracking-tight">Sourabh</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.span
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i + 0.3, duration: 0.4 }}
              >
                <NavItem
                  {...link}
                  className="cursor-hover rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
                />
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="cursor-hover hidden items-center gap-1.5 rounded-full border-2 border-foreground bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_hsl(var(--foreground))] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_hsl(var(--foreground))] sm:inline-flex"
            >
              Contact <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="cursor-hover flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-card md:hidden"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-5xl rounded-3xl border-2 border-foreground bg-background p-6 shadow-[5px_5px_0_hsl(var(--foreground))] md:hidden"
            >
              <div className="flex flex-col gap-4">
                {[...navLinks, { label: "Contact", href: "#contact" }].map((link, i) => (
                  <motion.span
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <NavItem
                      {...link}
                      onClick={() => setIsOpen(false)}
                      className="cursor-hover font-display text-2xl uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                    />
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
