interface SpinningBadgeProps {
  text?: string;
  className?: string;
}

/** Rotating circular-text badge, Stroffe style. */
const SpinningBadge = ({
  text = "OPEN TO WORK • DATA • AI • AUTOMATION • ",
  className = "",
}: SpinningBadgeProps) => (
  <div className={`relative h-28 w-28 md:h-36 md:w-36 ${className}`}>
    <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
      <defs>
        <path id="badge-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="hsl(var(--foreground))" />
      <text className="fill-background font-grotesk" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em" }}>
        <textPath href="#badge-circle">{text}</textPath>
      </text>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-display text-3xl text-primary md:text-4xl">
      S
    </span>
  </div>
);

export default SpinningBadge;
