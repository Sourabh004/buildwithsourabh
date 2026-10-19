import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SceneSlot, StatementScene } from "./three/SceneSlot";

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
  // Overlapping windows so the fill sweeps through quickly
  const start = (index / total) * 0.82;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const rotateX = useTransform(progress, [start, end], [-70, 0]);

  return (
    <motion.span
      style={{ opacity, y, rotateX, transformPerspective: 600 }}
      className={`inline-block origin-bottom ${HIGHLIGHT.has(word) ? "text-primary" : "text-foreground"}`}
    >
      {word}&nbsp;
    </motion.span>
  );
};

/**
 * Full-screen statement: words flip up one by one while a 3D bar chart
 * grows beside them as the section scrolls through.
 */
const StatementSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section ref={ref} className="relative section-padding overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            What I do
          </span>
          <p className="font-display text-4xl uppercase leading-[1.12] tracking-tight md:text-6xl">
            {words.map((word, i) => (
              <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
            ))}
          </p>
        </div>

        <SceneSlot className="relative h-[340px] md:h-[440px]">
          {(active) => <StatementScene active={active} target={ref} />}
        </SceneSlot>
      </div>
    </section>
  );
};

export default StatementSection;
