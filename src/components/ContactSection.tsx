import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Instagram, Twitter, ArrowRight, ArrowUpRight, MousePointerClick } from "lucide-react";
import { ContactScene, SceneSlot } from "./three/SceneSlot";

const INK = "#1F271B";
const CREAM = "#FAF0D7";
const VOLT = "#C6F24E";
const ORANGE = "#F77F1A";
const PINK = "#9B5DE5";
const TEAL = "#019EA5";

const EMAIL = "whoissourabh@gmail.com";

const socialLinks = [
  { href: "https://www.linkedin.com/in/sourabhpawarai/", icon: Linkedin, label: "LinkedIn", handle: "/in/sourabhpawarai", color: TEAL },
  { href: "https://www.instagram.com/who_is_sourabh_/", icon: Instagram, label: "Instagram", handle: "@who_is_sourabh_", color: PINK },
  { href: "https://x.com/0xSOURABH", icon: Twitter, label: "X", handle: "@0xSOURABH", color: VOLT },
  { href: `mailto:${EMAIL}`, icon: Mail, label: "Email", handle: EMAIL, color: ORANGE },
];

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
        aria-label={placeholder}
        type={type}
        required={required}
        rows={rows}
        className="w-full resize-none bg-transparent pb-3 pt-1 font-grotesk text-sm font-bold uppercase tracking-widest outline-none placeholder:text-[#FAF0D7]/30"
        style={{ color: CREAM }}
      />
      <span className="absolute bottom-0 left-0 h-px w-full" style={{ background: `${CREAM}30` }} />
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
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);

  const ready = form.name.trim().length > 0 && form.message.trim().length > 0;

  // No backend — hand the message to the visitor's own mail app, pre-filled
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name.trim()}`);
    const body = encodeURIComponent(form.message.trim());
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t-2 border-foreground"
      style={{ background: INK }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${VOLT}08 1px, transparent 1px), linear-gradient(90deg, ${VOLT}08 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-2">
        <div>
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

          <div className="mb-12 overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] uppercase leading-[1.0] tracking-tight"
              style={{ color: CREAM }}
            >
              Got an idea?
              <br />
              <span style={{ color: ORANGE }}>Let's build it.</span>
            </motion.h2>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <UnderlineInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" required />
            <UnderlineInput
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder="Tell me what you're building..."
              as="textarea"
              rows={3}
              required
            />

            <motion.button
              type="submit"
              disabled={!ready || sent}
              animate={{
                background: ready ? CREAM : `${CREAM}22`,
                borderColor: ready ? CREAM : `${CREAM}30`,
                color: ready ? INK : `${CREAM}50`,
                boxShadow: ready ? `5px 5px 0 ${VOLT}` : "0px 0px 0 rgba(0,0,0,0)",
              }}
              whileHover={ready ? { x: 3, y: 3, boxShadow: `2px 2px 0 ${VOLT}` } : {}}
              whileTap={ready ? { x: 5, y: 5, boxShadow: "0px 0px 0 rgba(0,0,0,0)" } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="mt-2 w-full rounded-full border-2 py-4 font-display text-lg uppercase tracking-widest"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={sent ? "sent" : ready ? "ready" : "empty"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  {sent ? (
                    "✦ Opening your mail app"
                  ) : ready ? (
                    <>
                      Send it <ArrowRight className="h-5 w-5" />
                    </>
                  ) : (
                    "Don't be shy — type something"
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: `6px 6px 0 ${link.color}` }}
                whileTap={{ y: 1, boxShadow: `1px 1px 0 ${link.color}` }}
                className="cursor-hover group flex min-w-0 items-center gap-3 rounded-xl border-2 p-2.5 pr-3"
                style={{ background: CREAM, borderColor: INK, color: INK, boxShadow: `4px 4px 0 ${link.color}` }}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2"
                  style={{ background: link.color, borderColor: INK }}
                >
                  <link.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-grotesk text-[10px] font-black uppercase tracking-[0.2em] opacity-55">{link.label}</span>
                  <span className="block whitespace-nowrap font-grotesk text-[13px] font-bold leading-tight tracking-tight" style={{ fontSize: link.handle.length > 18 ? 11.5 : undefined }}>{link.handle}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-45" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* 3D */}
        <div className="relative h-[360px] md:h-[520px]">
          <SceneSlot className="h-full w-full">{(active) => <ContactScene active={active} />}</SceneSlot>
          <span
            className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-grotesk text-[10px] font-bold uppercase tracking-widest"
            style={{ borderColor: CREAM, color: CREAM }}
          >
            <MousePointerClick className="h-3.5 w-3.5" /> Poke it
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
