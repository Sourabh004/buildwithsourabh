import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

const pages = [
  { label: "Home", to: "/" },
  { label: "Tech side", to: "/tech" },
  { label: "Gaming side", to: "/gaming" },
  { label: "Resume", to: "/resume" },
];

const socials = [
  { label: "Email", href: "mailto:whoissourabh@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sourabhpawarai/" },
  { label: "Instagram", href: "https://www.instagram.com/who_is_sourabh_/" },
  { label: "X", href: "https://x.com/0xSOURABH" },
];

const linkClass =
  "cursor-hover font-grotesk text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary";

/** Big sign-off footer — the wordmark tips up in 3D as it scrolls in */
const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative overflow-hidden border-t-2 border-foreground bg-card text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-6 pt-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-12">
        <div>
          <p className="font-display text-2xl uppercase leading-tight">
            Data, AI &amp; play —<br />
            <span className="text-primary">all in one place.</span>
          </p>
          <button onClick={toTop} className="btn-brutal-ghost cursor-hover mt-6">
            <ArrowUp className="h-4 w-4" /> Back to top
          </button>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Pages">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Pages</span>
          {pages.map((p) => (
            <Link key={p.to} to={p.to} className={linkClass}>
              {p.label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-col gap-3" aria-label="Elsewhere">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Elsewhere</span>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={linkClass}
            >
              {s.label} ↗
            </a>
          ))}
        </nav>
      </div>

      <div style={{ perspective: 900 }} className="px-4">
        <motion.p
          style={{ rotateX, y, transformOrigin: "50% 100%" }}
          className="select-none text-center font-display uppercase leading-[0.8] tracking-tight text-foreground"
        >
          {/* solid ink with a hard orange offset — reads clearly on the cream footer */}
          <span
            className="block text-[clamp(3rem,14vw,15rem)]"
            style={{ textShadow: "0.04em 0.04em 0 hsl(var(--primary))" }}
          >
            Sourabh<span className="text-primary">.</span>
          </span>
        </motion.p>
      </div>

      <div className="flex items-center justify-between border-t-2 border-foreground px-6 py-4 font-grotesk text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:px-12">
        <span>© {new Date().getFullYear()} Sourabh</span>
        <span>Designed &amp; built by Sourabh · React Three Fiber</span>
      </div>
    </footer>
  );
};

export default Footer;
