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
  { href: "mailto:whoissourabh@gmail.com", icon: Mail, label: "Email", color: ORANGE },
  { href: "https://www.linkedin.com/in/sourabh-pawar-a94039216/", icon: Linkedin, label: "LinkedIn", color: TEAL },
  { href: "https://www.instagram.com/who_is_sourabh_/", icon: Instagram, label: "Instagram", color: PINK },
  { href: "https://x.com/0xSOURABH", icon: Twitter, label: "X", color: VOLT },
];

// Decorative sticker on the sides
const Sticker = ({
  emoji,
  rotate,
  color,
  side,
  delay,
}: {
  emoji: string;
  rotate: number;
  color: string;
  side: "left" | "right";
  delay: number;
}) => {
  const posClass = side === "left"
    ? "left-2 top-1/2 -translate-y-1/2 lg:left-8"
    : "right-2 top-1/2 -translate-y-1/2 lg:right-8";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 20 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ delay, type: "spring", stiffness: 180, damping: 14 }}
      whileHover={{ rotate: rotate * -0.5, scale: 1.12, y: -8 }}
      className={`pointer-events-auto absolute hidden xl:flex ${posClass} cursor-default select-none flex-col items-center justify-center`}
      style={{
        width: 120,
        height: 120,
        background: CREAM,
        border: `3px solid ${INK}`,
        borderRadius: "50%",
        boxShadow: `5px 5px 0 ${color}`,
        fontSize: 56,
      }}
    >
      {emoji}
    </motion.div>
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
      <Sticker emoji="🎮" rotate={-12} color={VOLT} side="left" delay={0.6} />
      <Sticker emoji="⚡" rotate={10} color={ORANGE} side="right" delay={0.75} />

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
            className="font-display text-5xl uppercase leading-[1.0] tracking-tight md:text-7xl lg:text-8xl"
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
            whileHover={{ x: 3, y: 3, boxShadow: `2px 2px 0 ${VOLT}` }}
            whileTap={{ x: 5, y: 5, boxShadow: "none" }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="cursor-hover mt-2 w-full rounded-full border-2 py-4 font-display text-lg uppercase tracking-widest"
            style={{
              background: CREAM,
              borderColor: CREAM,
              color: INK,
              boxShadow: `5px 5px 0 ${VOLT}`,
            }}
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
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  Send it <ArrowRight className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Social icons */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hovered"
              className="cursor-hover group relative overflow-hidden rounded-full border-2 px-5 py-3"
              style={{
                borderColor: link.color,
                boxShadow: `4px 4px 0 ${link.color}`,
                color: link.color,
              }}
            >
              {/* flood fill on hover */}
              <motion.span
                variants={{
                  hovered: { scaleX: 1, originX: 0 },
                }}
                initial={{ scaleX: 0, originX: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ background: link.color }}
              />
              <motion.span
                variants={{
                  hovered: { color: INK },
                }}
                className="relative flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-widest"
                transition={{ duration: 0.15 }}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
