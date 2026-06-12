import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const STATEMENT = "I TURN MESSY DATA INTO DECISIONS THAT MAKE BUSINESS GO BOOM";
const HIGHLIGHT = new Set(["BOOM", "DATA"]);

const Word = ({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block ${HIGHLIGHT.has(word) ? "text-primary" : "text-foreground"}`}
    >
      {word}&nbsp;
    </motion.span>
  );
};

/**
 * Stroffe-style full-screen statement: words fill in one by one
 * as the user scrolls through the section.
 */
const StatementSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section ref={ref} className="relative section-padding py-32 md:py-44">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">
          <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
          What I do
        </span>
        <p className="font-display text-4xl uppercase leading-[1.15] tracking-tight md:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>

      {/* Decorative spinning asterisk */}
      <div className="pointer-events-none absolute right-10 top-16 hidden md:block">
        <span className="inline-block animate-spin-slow font-display text-7xl text-primary">✱</span>
      </div>
    </section>
  );
};

export default StatementSection;
