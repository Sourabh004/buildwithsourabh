import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Gamepad2, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Trophy,
    title: "Sports Interests",
    description: "Passionate about motorsports and competitive athletics. Following the intersection of data analytics and sports performance.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Culture",
    description: "Active in the gaming community with a deep understanding of gaming ecosystems, trends, and digital entertainment culture.",
  },
  {
    icon: TrendingUp,
    title: "Esports Community Trends",
    description: "Tracking the growth of esports, analyzing viewership data, and contributing to community building around competitive gaming.",
  },
];

const SportsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Sports, Gaming & <span className="text-gradient">Culture</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Where passion meets community — exploring the culture of competition and digital entertainment.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const CardContent = () => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-card group p-6 text-center transition-all duration-300 hover:glow-primary"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                  >
                    <card.icon className="h-7 w-7 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </motion.div>
              );
            };
            return <CardContent key={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SportsSection;
