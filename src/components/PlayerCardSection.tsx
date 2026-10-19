import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Bot, Briefcase, Gamepad2, GraduationCap, Repeat2 } from "lucide-react";

const INK = "#1F271B";
const CREAM = "#FAF0D7";
const ORANGE = "#F77F1A";
const TEAL = "#019EA5";
const VOLT = "#C6F24E";
const PURPLE = "#9B5DE5";

const PHOTO =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/dtxobbSshCfoX3o32mczpvXb4ys2/social-images/social-1772993701081-Sourabh_photo.webp";

const attributes = [
  { label: "Main", value: "AI & Automation", color: ORANGE },
  { label: "Side", value: "Esports Content", color: PURPLE },
  { label: "Base", value: "Bengaluru", color: TEAL },
  { label: "Origin", value: "MCA · Jain Univ.", color: VOLT },
];

const loadout = ["n8n", "Claude", "MCP", "Airtable", "Postgres", "Make.com", "BigQuery", "Power BI"];

const questLog = [
  { icon: Gamepad2, year: "2020", title: "Esports community", note: "Ran esports communities, self-employed." },
  { icon: Briefcase, year: "2022", title: "One World Nation", note: "Community manager, then QA manager." },
  { icon: Bot, year: "2024", title: "STAN · CropBytes", note: "Analytics intern; community for ~15k Discord / ~20k Telegram." },
  { icon: GraduationCap, year: "2024", title: "MCA, Jain University", note: "After a BCA at Bengaluru City University." },
  { icon: Bot, year: "2025", title: "The Experience Co.", note: "Tech & automation — AI agents and internal tools." },
];

/** Card face — the 3D depth comes from translateZ on each layer */
const faceBase =
  "absolute inset-0 rounded-[22px] border-2 border-foreground [backface-visibility:hidden] [transform-style:preserve-3d]";

const PlayerCardSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [flipped, setFlipped] = useState(false);
  const [photoOk, setPhotoOk] = useState(true);

  // Pointer position over the card, 0..1
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [0, 1], [16, -16]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-20, 20]), spring);
  const gx = useTransform(mx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.55), rgba(255,255,255,0) 50%)`;
  const foilPos = useMotionTemplate`${gx} ${gy}`;
  // Hard shadow drifts opposite the tilt so the card seems to lift off the page
  const shadowX = useTransform(mx, [0, 1], [18, -6]);
  const shadowY = useTransform(my, [0, 1], [18, -2]);
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 0 ${INK}`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="section-padding relative overflow-hidden border-b-2 border-foreground"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Player Card
          </span>
          <h2 className="font-display text-4xl uppercase leading-[1.02] md:text-6xl">
            Pick me
            <br />
            <span className="text-primary">for your team</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Junior Tech &amp; Automation Manager at The Experience Co. — AI agents, internal tools and
            sprint planning. Esports content with Viral Gamer since 2022. Tilt the card, flip it for the
            quest log.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {loadout.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, y: 12, rotate: 0 }}
                animate={inView ? { opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ rotate: 0, y: -3 }}
                className="cursor-hover rounded-full border-2 border-foreground bg-card px-3 py-1 font-grotesk text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_hsl(var(--foreground))]"
              >
                {tool}
              </motion.span>
            ))}
          </div>

          <button
            onClick={() => setFlipped((f) => !f)}
            className="btn-brutal-ghost cursor-hover mt-10"
          >
            <Repeat2 className="h-4 w-4" /> {flipped ? "Show front" : "Flip card"}
          </button>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotate: 8 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.9, type: "spring", stiffness: 70, damping: 14 }}
          className="order-1 flex justify-center lg:order-2"
          style={{ perspective: 1400 }}
        >
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            onClick={() => setFlipped((f) => !f)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="cursor-hover relative aspect-[5/7] w-full max-w-[360px] select-none"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute inset-0"
            >
              {/* ───── Front ───── */}
              <motion.div className={faceBase} style={{ background: CREAM, boxShadow: shadow }}>
                {/* Header band */}
                <div
                  className="flex items-center justify-between rounded-t-[20px] border-b-2 border-foreground px-5 py-3"
                  style={{ background: ORANGE, transform: "translateZ(20px)" }}
                >
                  <span className="font-display text-sm uppercase">Player 01</span>
                  <span className="rounded-full border-2 border-foreground bg-card px-2.5 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-widest">
                    Tech + Automation
                  </span>
                </div>

                {/* Photo */}
                <div
                  className="relative mx-5 mt-5 h-[42%] overflow-hidden rounded-xl border-2 border-foreground"
                  style={{ background: TEAL, transform: "translateZ(45px)", boxShadow: `5px 5px 0 ${INK}` }}
                >
                  {photoOk ? (
                    <img
                      src={PHOTO}
                      alt="Sourabh"
                      draggable={false}
                      onError={() => setPhotoOk(false)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-display text-8xl text-card">S</span>
                  )}
                  <span
                    className="absolute bottom-2 left-2 rounded-full border-2 border-foreground px-2 py-0.5 font-grotesk text-[9px] font-bold uppercase tracking-widest"
                    style={{ background: VOLT }}
                  >
                    ● Online
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="mt-4 px-5 font-display text-[2.6rem] uppercase leading-none tracking-tight"
                  style={{ transform: "translateZ(70px)", textShadow: `3px 3px 0 ${ORANGE}` }}
                >
                  Sourabh
                </h3>

                {/* Attributes */}
                <div className="mt-3 grid grid-cols-2 gap-2 px-5" style={{ transform: "translateZ(35px)" }}>
                  {attributes.map((a) => (
                    <div key={a.label} className="rounded-lg border-2 border-foreground bg-card px-2.5 py-1.5">
                      <p className="flex items-center gap-1.5 font-grotesk text-[8px] font-bold uppercase tracking-widest opacity-60">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.color }} />
                        {a.label}
                      </p>
                      <p className="font-display text-[11px] uppercase leading-tight">{a.value}</p>
                    </div>
                  ))}
                </div>

                {/* Holo foil + glare */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-[20px] opacity-30 mix-blend-color-dodge"
                  style={{
                    backgroundImage:
                      "linear-gradient(115deg, #ff7a9c 0%, #fcad50 20%, #c6f24e 40%, #019ea5 60%, #9b5de5 80%, #ff7a9c 100%)",
                    backgroundSize: "300% 300%",
                    backgroundPosition: foilPos,
                  }}
                />
                <motion.div className="pointer-events-none absolute inset-0 rounded-[20px]" style={{ background: glare }} />
              </motion.div>

              {/* ───── Back ───── */}
              <motion.div
                className={faceBase}
                style={{ background: INK, color: CREAM, transform: "rotateY(180deg)", boxShadow: shadow }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[20px]"
                  style={{
                    backgroundImage: `linear-gradient(${VOLT}14 1px, transparent 1px), linear-gradient(90deg, ${VOLT}14 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="relative flex h-full flex-col p-6" style={{ transform: "translateZ(40px)" }}>
                  <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: VOLT }}>
                    Quest log
                  </span>
                  <h3 className="mt-1 font-display text-3xl uppercase leading-none">How I got here</h3>

                  <ol className="mt-5 space-y-3">
                    {questLog.map((q) => (
                      <li key={q.title} className="flex gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2"
                          style={{ borderColor: VOLT, color: VOLT }}
                        >
                          <q.icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="font-display text-xs uppercase">
                            <span style={{ color: ORANGE }}>{q.year}</span> {q.title}
                          </p>
                          <p className="text-xs leading-snug text-[#FAF0D7]/60">{q.note}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <span className="mt-auto font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]/50">
                    Click to flip back ↺
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlayerCardSection;
