import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface VelocityMarqueeProps {
  text: string;
  baseVelocity?: number;
  outline?: boolean;
  className?: string;
}

/**
 * Stroffe-style marquee: drifts on its own, then accelerates and even
 * reverses direction based on how fast the user scrolls.
 */
const VelocityMarquee = ({ text, baseVelocity = 2, outline = false, className = "" }: VelocityMarqueeProps) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const directionRef = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const copies = Array.from({ length: 4 });

  return (
    <div className={`relative z-10 overflow-hidden whitespace-nowrap border-y-2 border-foreground bg-background py-4 md:py-6 ${className}`}>
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {copies.map((_, i) => (
          <span
            key={i}
            className={`mr-8 font-display text-4xl uppercase leading-none md:text-6xl ${
              outline ? "text-outline" : "text-foreground"
            }`}
          >
            {text}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default VelocityMarquee;
