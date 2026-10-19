/**
 * Shared neo-brutalist building blocks: 3D tilt cards, section headings, page wipe.
 */
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Card that tilts toward the pointer in real 3D. Children can use
 * `style={{ transform: "translateZ(40px)" }}` to float above the surface.
 */
export const TiltCard = ({
  children,
  className = "",
  style,
  max = 12,
  glare = true,
  shadow = "hsl(var(--foreground))",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  glare?: boolean;
  /** colour of the hard offset shadow, which drifts opposite the tilt */
  shadow?: string;
}) => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), spring);
  const gx = useTransform(mx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(my, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`;
  const sx = useSpring(useTransform(mx, [0, 1], [10, 2]), spring);
  const sy = useSpring(useTransform(my, [0, 1], [10, 2]), spring);
  const boxShadow = useMotionTemplate`${sx}px ${sy}px 0 ${shadow}`;
  // Glare only shows while the pointer is over the card
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", boxShadow, ...style }}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg, opacity: glareOpacity, transform: "translateZ(1px)" }}
          />
        )}
      </motion.div>
    </div>
  );
};

/** Label + big reveal heading used at the top of every section */
export const SectionHeading = ({
  label,
  children,
  aside,
  dark = false,
  className = "mb-12",
}: {
  label: string;
  children: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div>
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${
            dark ? "text-[#FAF0D7]/55" : "text-primary"
          }`}
        >
          <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
          {label}
        </motion.span>
        <div className="overflow-hidden pb-1">
          <motion.h2
            initial={{ y: "105%", rotate: 2 }}
            animate={inView ? { y: "0%", rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="origin-bottom-left font-display text-4xl uppercase leading-[1.02] tracking-tight md:text-6xl"
          >
            {children}
          </motion.h2>
        </div>
      </div>
      {aside && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {aside}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Entrance wipe — two colour panels slide away when a page mounts.
 * Pure CSS (see .page-wipe in index.css) so it can never get stuck covering the page.
 */
export const PageWipe = ({ colors = ["#F77F1A", "#1F271B"] }: { colors?: [string, string] }) => (
  <>
    {colors.map((c, i) => (
      <div
        key={c + i}
        aria-hidden
        className="page-wipe"
        style={{ background: c, animationDelay: `${0.12 * (colors.length - 1 - i)}s` }}
      />
    ))}
  </>
);

/** Scroll-driven 3D entrance: the block tips back from rotateX as it scrolls into view */
export const TipIn = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} style={{ perspective: 1200 }} className={className}>
      <motion.div
        initial={reduce ? false : { rotateX: 28, y: 60, opacity: 0 }}
        animate={inView ? { rotateX: 0, y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "50% 100%" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
