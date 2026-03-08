import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    { href: "mailto:sourabh@example.com", icon: Mail, label: "Email", value: "sourabh@example.com" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram", value: "Follow on Instagram" },
  ];

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Get In <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Social links */}
          <div className="flex flex-col justify-center gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12, type: "spring", stiffness: 100 }}
                whileHover={{ x: 6, scale: 1.02 }}
                className="glass-card flex items-center gap-4 p-5 transition-all hover:glow-primary"
              >
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={isInView ? { rotate: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
                >
                  <link.icon className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground">{link.label}</p>
                  <p className="font-display text-sm font-medium">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-4 p-6"
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="Your email"
              required
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message"
              rows={4}
              required
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" variant="hero" size="lg" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
