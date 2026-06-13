import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Instagram, Twitter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const INK = "#1F271B";
const CREAM = "#FAF0D7";
const VOLT = "#C6F24E";
const ORANGE = "#F77F1A";
const PINK = "#9B5DE5";
const TEAL = "#019EA5";

const socialLinks = [
  { href: "mailto:whoissourabh@gmail.com", icon: Mail, label: "Email", color: ORANGE, tilt: -6 },
  { href: "https://www.linkedin.com/in/sourabh-pawar-a94039216/", icon: Linkedin, label: "LinkedIn", color: TEAL, tilt: 4 },
  { href: "https://www.instagram.com/who_is_sourabh_/", icon: Instagram, label: "Instagram", color: PINK, tilt: -4 },
  { href: "https://x.com/0xSOURABH", icon: Twitter, label: "X", color: VOLT, tilt: 6 },
];

// Decorative sticker on the sides
const Sticker = ({
  emoji,
  rotate,
  color,
  side,
  delay,
  variant,
}: {
  emoji: string;
  rotate: number;
  color: string;
  side: "left" | "right";
  delay: number;
  variant: "controller" | "lightning";
}) => {
  const posClass = side === "left"
    ? "left-2 top-1/2 -translate-y-1/2 lg:left-8"
    : "right-2 top-1/2 -translate-y-1/2 lg:right-8";

  const floatDuration = variant === "lightning" ? 2.2 : 3;

  return (
    <div className={`pointer-events-auto absolute hidden xl:block ${posClass}`}>
      {/* Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: rotate - 25 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ delay, type: "spring", stiffness: 160, damping: 14 }}
      >
        {/* Continuous float */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
          whileHover={{ scale: 1.18, y: -18, transition: { type: "spring", stiffness: 400, damping: 14 } }}
          className="cursor-default select-none"
        >
          {/* Pulsing glow ring — radiates outward */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0px ${color}00`,
                `0 0 0 14px ${color}50`,
                `0 0 0 28px ${color}00`,
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: delay + 1.2 }}
            className="absolute inset-0 rounded-full"
          />

          {/* Circle */}
          <motion.div
            animate={{
              boxShadow: [`5px 5px 0 ${color}`, `9px 9px 0 ${color}`, `5px 5px 0 ${color}`],
            }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
            className="relative flex items-center justify-center"
            style={{
              width: 120,
              height: 120,
              background: CREAM,
              border: `3px solid ${INK}`,
              borderRadius: "50%",
            }}
          >
            {/* Emoji — controller vibrates, lightning flashes */}
            <motion.span
              style={{ fontSize: 52 }}
              animate={
                variant === "controller"
                  ? { x: [-3, 3, -2, 2, -1, 1, 0], rotate: [-4, 4, -2, 0] }
                  : { scale: [1, 1.35, 0.9, 1.15, 1], opacity: [1, 0.7, 1, 0.85, 1] }
              }
              transition={{
                duration: variant === "lightning" ? 0.6 : 0.5,
                repeat: Infinity,
                repeatDelay: variant === "lightning" ? 2.5 : 3.5,
                ease: "easeInOut",
                delay: delay + 2,
              }}
            >
              {emoji}
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Underline-only input with volt focus line
const UnderlineInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  as = "input",
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const Tag = as as "input" | "textarea";

  return (
    <div className="relative w-full">
      <Tag
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        type={type}
        required={required}
        rows={rows}
        className="w-full resize-none bg-transparent pb-3 pt-1 font-grotesk text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#FAF0D7]/30"
        style={{ color: CREAM }}
      />
      {/* static dim underline */}
      <span className="absolute bottom-0 left-0 h-px w-full" style={{ background: `${CREAM}30` }} />
      {/* animated volt underline on focus */}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        initial={false}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: VOLT }}
      />
    </div>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ email: "", message: "" });
  const [sent, setSent] = useState(false);

  const ready = form.email.trim().length > 0 && form.message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! I'll get back to you soon.");
    setTimeout(() => {
      setForm({ email: "", message: "" });
      setSent(false);
    }, 2500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t-2 border-foreground"
      style={{ background: INK }}
    >
      {/* Subtle volt grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${VOLT}08 1px, transparent 1px), linear-gradient(90deg, ${VOLT}08 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Side stickers */}
      <Sticker emoji="🎮" rotate={-12} color={VOLT} side="left" delay={0.6} variant="controller" />
      <Sticker emoji="⚡" rotate={10} color={ORANGE} side="right" delay={0.75} variant="lightning" />

      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        {/* SAY HELLO badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -6 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-block"
        >
          <span
            className="inline-block rounded-full border-2 px-5 py-2 font-display text-sm uppercase tracking-widest"
            style={{ background: VOLT, borderColor: INK, color: INK, boxShadow: `3px 3px 0 ${CREAM}` }}
          >
            ✦ Say Hello
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-12">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display uppercase leading-[1.0] tracking-tight text-[clamp(2rem,6.5vw,3.75rem)] whitespace-nowrap"
            style={{ color: CREAM }}
          >
            Got an idea?
            <br />
            <motion.span
              whileHover={{ skewX: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
              style={{ color: ORANGE }}
            >
              Let's build it.
            </motion.span>
          </motion.h2>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <UnderlineInput
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="Your best email"
            type="email"
            required
          />
          <UnderlineInput
            value={form.message}
            onChange={(v) => setForm({ ...form, message: v })}
            placeholder="Tell me what you're building..."
            as="textarea"
            rows={3}
            required
          />

          {/* CTA button */}
          <motion.button
            type="submit"
            disabled={!ready || sent}
            animate={{
              background: ready ? CREAM : `${CREAM}22`,
              borderColor: ready ? CREAM : `${CREAM}30`,
              color: ready ? INK : `${CREAM}50`,
              boxShadow: ready ? `5px 5px 0 ${VOLT}` : "none",
            }}
            whileHover={ready ? { x: 3, y: 3, boxShadow: `2px 2px 0 ${VOLT}` } : {}}
            whileTap={ready ? { x: 5, y: 5, boxShadow: "none" } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="mt-2 w-full rounded-full border-2 py-4 font-display text-lg uppercase tracking-widest"
            style={{ cursor: ready ? "pointer" : "not-allowed" }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  ✦ Sent!
                </motion.span>
              ) : ready ? (
                <motion.span
                  key="ready"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  Make it happen <ArrowRight className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  Don't be shy — type something
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Social icons */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hovered"
              whileTap="tapped"
              className="relative cursor-pointer"
            >
              {/* Ripple ring — sits outside overflow-hidden */}
              <motion.span
                variants={{
                  hovered: { scale: 1.65, opacity: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                initial={{ scale: 1, opacity: 0 }}
                className="pointer-events-none absolute inset-0 rounded-full border-2"
                style={{ borderColor: link.color }}
              />

              <motion.a
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                variants={{
                  hovered: {
                    y: -10,
                    rotate: link.tilt,
                    scale: 1.08,
                    boxShadow: `7px 7px 0 ${link.color}`,
                    transition: { type: "spring", stiffness: 500, damping: 14 },
                  },
                  tapped: {
                    y: 2,
                    rotate: 0,
                    scale: 0.93,
                    boxShadow: "none",
                    transition: { duration: 0.08 },
                  },
                }}
                className="relative block overflow-hidden rounded-full border-2 px-5 py-3"
                style={{
                  borderColor: link.color,
                  boxShadow: `4px 4px 0 ${link.color}`,
                  color: link.color,
                }}
              >
                <span className="relative flex items-center gap-2">
                  {/* Icon — spins on hover */}
                  <motion.span
                    variants={{
                      hovered: { rotate: 360, scale: 1.3, transition: { duration: 0.4, ease: "easeOut" } },
                      tapped: { scale: 0.8 },
                    }}
                    className="inline-flex"
                  >
                    <link.icon className="h-4 w-4" />
                  </motion.span>

                  <span className="font-grotesk text-xs font-bold uppercase tracking-widest">
                    {link.label}
                  </span>
                </span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
