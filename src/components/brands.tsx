/**
 * Per-brand pass themes. Red Bull, Krafton, DreamHack and EWC use logo files
 * from Wikimedia Commons in /public/brands (set via `logo` in data/events.ts);
 * brands without a file fall back to a typographic wordmark in their colours.
 */
import type { Stop } from "@/data/events";

export type BrandTheme = {
  /** header background (CSS background) */
  header: string;
  headerInk: string;
  /** lanyard strap colour + print colour */
  strap: string;
  strapInk: string;
  /** access band */
  band: string;
  bandInk: string;
  accent: string;
  /** CSS filter to recolour a single-colour logo file for this header */
  logoFilter?: string;
  /** logo height in px */
  logoH?: number;
};

export const brandThemes: Record<Stop["brand"], BrandTheme> = {
  redbull: {
    header: "linear-gradient(135deg, #0B1B4D 0%, #14286B 100%)",
    headerInk: "#FFFFFF",
    strap: "#0B1B4D",
    strapInk: "#FFCC00",
    band: "#E21B3C",
    bandInk: "#FFFFFF",
    accent: "#FFCC00",
    logoH: 26,
  },
  krafton: {
    header: "linear-gradient(135deg, #0D0D0D 0%, #1C1C1C 100%)",
    headerInk: "#F5F5F5",
    strap: "#111111",
    strapInk: "#F2B705",
    band: "#F2B705",
    bandInk: "#111111",
    accent: "#F2B705",
    logoFilter: "brightness(0) invert(1)",
    logoH: 30,
  },
  dreamhack: {
    header: "linear-gradient(135deg, #0E0E0E 0%, #1F1F1F 100%)",
    headerInk: "#FFFFFF",
    strap: "#0E0E0E",
    strapInk: "#F77F1A",
    band: "#F77F1A",
    bandInk: "#0E0E0E",
    accent: "#F77F1A",
    logoFilter: "brightness(0) invert(1)",
    logoH: 13,
  },
  skyesports: {
    header: "linear-gradient(120deg, #241458 0%, #5B22C9 100%)",
    headerInk: "#FFFFFF",
    strap: "#3A1C8C",
    strapInk: "#5CE1FF",
    band: "#5CE1FF",
    bandInk: "#1A0F40",
    accent: "#5CE1FF",
  },
  ewc: {
    header: "linear-gradient(135deg, #0A0A0A 0%, #1A1712 100%)",
    headerInk: "#D9B56C",
    strap: "#121212",
    strapInk: "#D9B56C",
    band: "#D9B56C",
    bandInk: "#0A0A0A",
    accent: "#D9B56C",
    // black → warm gold
    logoFilter: "brightness(0) invert(0.78) sepia(0.6) saturate(2.2) hue-rotate(2deg)",
    logoH: 30,
  },
  esl: {
    header: "linear-gradient(135deg, #0B0B12 0%, #1B1B2A 100%)",
    headerInk: "#FFFFFF",
    strap: "#0B0B12",
    strapInk: "#FFC21A",
    band: "#FFC21A",
    bandInk: "#0B0B12",
    accent: "#FFC21A",
  },
  lan: {
    header: "repeating-linear-gradient(135deg, rgba(0,0,0,0.07) 0 6px, transparent 6px 12px), #C6F24E",
    headerInk: "#1F271B",
    strap: "#C6F24E",
    strapInk: "#1F271B",
    band: "#1F271B",
    bandInk: "#C6F24E",
    accent: "#1F271B",
  },
};

/** Brand wordmark for the pass header */
export const BrandMark = ({ stop }: { stop: Stop }) => {
  const t = brandThemes[stop.brand];

  if (stop.logo)
    return (
      <img
        src={stop.logo}
        alt={`${stop.org} logo`}
        draggable={false}
        className="w-auto max-w-[150px] object-contain object-left"
        style={{ height: t.logoH ?? 24, filter: t.logoFilter }}
      />
    );

  switch (stop.brand) {
    case "redbull":
      return (
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full" style={{ background: t.accent }} />
          <span className="font-display text-[19px] italic leading-none tracking-tight" style={{ color: "#E21B3C", textShadow: "0 1px 0 rgba(0,0,0,0.35)" }}>
            Red Bull
          </span>
        </span>
      );
    case "krafton":
      return (
        <span className="flex flex-col">
          <span className="font-grotesk text-[15px] font-black leading-none tracking-[0.32em]" style={{ color: t.headerInk }}>
            KRAFTON
          </span>
          <span className="mt-1 h-[2px] w-10" style={{ background: t.accent }} />
        </span>
      );
    case "dreamhack":
      return (
        <span className="flex flex-col">
          <span className="font-grotesk text-[7px] font-bold uppercase leading-none tracking-[0.3em] opacity-60" style={{ color: t.headerInk }}>
            Nodwin Gaming presents
          </span>
          <span className="mt-0.5 font-display text-[19px] uppercase leading-none tracking-tight" style={{ color: t.headerInk }}>
            Dream<span style={{ color: t.accent }}>Hack</span>
          </span>
        </span>
      );
    case "skyesports":
      return (
        <span className="flex items-center gap-1">
          <span className="font-display text-[18px] italic uppercase leading-none tracking-tight" style={{ color: t.headerInk }}>
            Skyesports
          </span>
          <span className="h-4 w-1 -skew-x-12" style={{ background: t.accent }} />
        </span>
      );
    case "ewc":
      return (
        <span className="flex items-center gap-2">
          <span className="h-[2px] w-4" style={{ background: t.accent }} />
          <span className="font-display text-[13px] uppercase leading-[0.9] tracking-wide" style={{ color: t.headerInk }}>
            Esports
            <br />
            World Cup
          </span>
          <span className="h-[2px] w-4" style={{ background: t.accent }} />
        </span>
      );
    case "esl":
      return (
        <span className="flex flex-col">
          <span className="font-grotesk text-[7px] font-bold uppercase leading-none tracking-[0.3em] opacity-60" style={{ color: t.headerInk }}>
            Nodwin Gaming presents
          </span>
          <span className="mt-0.5 flex items-center gap-1.5">
            <span className="font-display text-[22px] leading-none tracking-tight" style={{ color: t.headerInk }}>
              ESL
            </span>
            <span className="rounded-sm px-1 py-[1px] font-grotesk text-[8px] font-black uppercase tracking-widest" style={{ background: t.accent, color: "#0B0B12" }}>
              India
            </span>
          </span>
        </span>
      );
    default:
      return (
        <span className="font-display text-[18px] uppercase leading-none tracking-tight" style={{ color: t.headerInk }}>
          LAN<span className="opacity-50">/</span>BLR
        </span>
      );
  }
};
