import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Instagram, Twitter, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Sourabh will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { href: "mailto:whoissourabh@gmail.com", icon: Mail, label: "Email", value: "whoissourabh@gmail.com" },
    { href: "https://www.linkedin.com/in/sourabh-pawar-a94039216/", icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn" },
    { href: "https://www.instagram.com/who_is_sourabh_/", icon: Instagram, label: "Instagram", value: "@who_is_sourabh_" },
    { href: "https://x.com/0xSOURABH", icon: Twitter, label: "X", value: "@0xSOURABH" },
  ];

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-label">
            <span className="inline-block h-2 w-2 rotate-45 bg-primary" />
            Contact
          </span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl uppercase leading-tight md:text-6xl"
            >
              Let's Make Your
              <br />
              <span className="text-primary">Wish Come True</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
          >
            Have a project in mind or want to chat about data, AI, or community building? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Social links */}
          <div className="flex flex-col justify-center gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="cursor-hover group flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:glow-primary"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{link.label}</p>
                  <p className="mt-0.5 font-display text-sm font-medium">{link.value}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm"
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              required
              className="rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="Your email"
              required
              className="rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message"
              rows={4}
              required
              className="resize-none rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button type="submit" className="btn-brutal cursor-hover mt-1 w-full">
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
