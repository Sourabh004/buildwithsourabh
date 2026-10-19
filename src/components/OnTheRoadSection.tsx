import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Move, RotateCcw } from "lucide-react";
import { SectionHeading } from "./brutal";
import EventPass from "./EventPass";
import { GlobeScene, SceneSlot } from "./three/SceneSlot";
import { alsoVisited, stops } from "@/data/events";

const VOLT = "#C6F24E";
const INK = "#1F271B";
const CREAM = "#FAF0D7";


const OnTheRoadSection = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  const pickFromPass = (i: number) => {
    setSelected(i);
    const el = globeRef.current;
    if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -110 }) : el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-t-2 border-[#FAF0D7]/20 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="On the Road"
          dark
          aside={
            <p className="max-w-xs font-grotesk text-xs leading-relaxed text-[#FAF0D7]/50">
              Eight events across India and Saudi Arabia, straight from my Instagram highlights.
            </p>
          }
        >
          Event <span style={{ color: VOLT }}>Map</span>
        </SectionHeading>

        {/* Globe + city list */}
        <div ref={globeRef} className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div
            className="relative h-[420px] overflow-hidden rounded-3xl border-2 md:h-[560px]"
            style={{
              borderColor: CREAM,
              boxShadow: `8px 8px 0 ${VOLT}`,
              background: "radial-gradient(circle at 50% 45%, #2E3A26 0%, #1A2016 70%)",
            }}
          >
            <SceneSlot className="h-full w-full">
              {(active) => <GlobeScene active={active} selected={selected} onSelect={setSelected} />}
            </SceneSlot>

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border-2 border-[#FAF0D7] bg-[#1F271B] px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest text-[#FAF0D7]">
              <Move className="h-3.5 w-3.5" style={{ color: VOLT }} /> Drag · click + scroll to zoom · hover a pin
            </div>
            {selected !== null && (
              <button
                onClick={() => setSelected(null)}
                className="cursor-hover absolute right-4 top-4 flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest"
                style={{ borderColor: VOLT, color: INK, background: VOLT }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> All events
              </button>
            )}
            <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-3 font-grotesk text-[9px] font-bold uppercase tracking-widest text-[#FAF0D7]/60">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-[#1F271B] bg-[#F77F1A]" /> Event
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FAF0D7]" /> Also visited
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 bg-[#C6F24E]" /> Flight from Bengaluru
              </span>
            </div>
          </div>

          {/* City list */}
          <ol className="flex flex-col gap-2">
            {stops.map((s, i) => {
              const on = selected === i;
              return (
                <li key={s.city}>
                  <button
                    onClick={() => setSelected(on ? null : i)}
                    className="cursor-hover group flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-2.5 text-left transition-all"
                    style={{
                      borderColor: on ? s.color : CREAM + "25",
                      background: on ? s.color : "transparent",
                      color: on ? INK : CREAM,
                      transform: on ? "translateX(6px)" : undefined,
                      boxShadow: on ? `4px 4px 0 ${CREAM}` : undefined,
                    }}
                  >
                    <span className="font-display text-lg leading-none opacity-50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">
                      <span className="block font-display text-base uppercase leading-tight">{s.city}</span>
                      <span className={`block font-grotesk text-[10px] font-bold uppercase tracking-widest ${on ? "" : "text-[#FAF0D7]/50"}`}>
                        {s.event}
                      </span>
                    </span>
                    <span className="font-grotesk text-[10px] font-bold uppercase tracking-widest opacity-70">{s.year}</span>
                    <span className="h-3 w-3 shrink-0 rounded-full border-2" style={{ background: s.color, borderColor: on ? INK : CREAM }} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Passes */}
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {stops.map((stop, i) => (
            <EventPass key={stop.city} stop={stop} i={i} selected={selected === i} onPick={() => pickFromPass(i)} />
          ))}

          {/* Next stop */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="cursor-hover group mx-auto mt-[118px] flex aspect-[5/8] w-full max-w-[300px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#FAF0D7]/30 p-8 text-center transition-colors hover:border-[#C6F24E]"
          >
            <span className="font-display text-3xl uppercase leading-none" style={{ color: VOLT }}>
              Next stop?
            </span>
            <span className="max-w-[220px] text-sm text-[#FAF0D7]/60">Running a tournament or community night? Let's talk.</span>
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-transform group-hover:rotate-45"
              style={{ borderColor: VOLT, color: VOLT }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </motion.a>
        </div>

        {/* Also on the map */}
        <div className="mt-16 flex flex-wrap items-center gap-3 border-t-2 border-dashed border-[#FAF0D7]/15 pt-8">
          <span className="mr-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.25em] text-[#FAF0D7]/45">
            Also on the map
          </span>
          {alsoVisited.map((c, i) => (
            <motion.span
              key={c.city}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ rotate: 0, y: -3 }}
              className="flex items-center gap-1.5 rounded-full border-2 border-[#FAF0D7]/30 px-3 py-1 font-grotesk text-xs font-bold uppercase tracking-wider text-[#FAF0D7]/75"
            >
              <MapPin className="h-3 w-3" style={{ color: VOLT }} />
              {c.city}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnTheRoadSection;