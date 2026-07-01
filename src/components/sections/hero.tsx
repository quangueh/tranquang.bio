"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../brand-icons";
import { MagneticButton } from "../magnetic-button";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1500 : empty ? 300 : deleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setWordIdx((i) => i + 1);
      } else {
        setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words]);

  return text;
}

const ease = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  { icon: GithubIcon, href: content.socials.github, label: "GitHub" },
  { icon: LinkedinIcon, href: content.socials.linkedin, label: "LinkedIn" },
];

export function Hero() {
  const { lang } = useLang();
  const h = content.hero;
  const typed = useTyping([...h.roles[lang]]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const bgX = useTransform(springX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(springY, [-0.5, 0.5], ["-2%", "2%"]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24 pb-16">
      {/* Hero-specific spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
      >
        <div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-blue), transparent 70%)" }}
        />
      </motion.div>

      <div className="container-x relative z-10 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        {/* Left content */}
        <div>
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-[var(--color-text-muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {lang === "vi" ? "Sẵn sàng cho dự án mới" : "Available for new projects"}
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="text-lg text-[var(--color-text-muted)]"
          >
            {t(h.greeting, lang)}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 1.0, ease }}
            className="font-[var(--font-display)] text-5xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
          >
            {h.name}
          </motion.h1>

          {/* Typed role */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-3 flex h-10 items-center font-[var(--font-mono)] text-2xl font-medium sm:text-3xl"
          >
            <span className="text-gradient">{typed}</span>
            <span className="ml-1 inline-block h-7 w-[3px] animate-pulse bg-[var(--color-cyan)]" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]"
          >
            {t(h.tagline, lang)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.6, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton href="#projects">{t(h.cta.projects, lang)}</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail size={16} /> {t(h.cta.contact, lang)}
            </MagneticButton>
            <MagneticButton href="#" variant="ghost">
              <FileDown size={16} /> {t(h.cta.cv, lang)}
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-8 flex gap-3"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass group grid h-11 w-11 place-items-center rounded-full text-[var(--color-text-muted)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--color-text)] active:scale-90"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: floating glass card with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 1.8, ease }}
          className="relative mx-auto w-full max-w-sm"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="animate-float">
            <div className="gradient-border glass-strong relative rounded-3xl p-8 shadow-[var(--shadow-glow)]">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl font-[var(--font-display)] text-2xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-cyan))" }}
                >
                  QT
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-lg font-bold tracking-tight">{h.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">ERP / AI / Automation</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((s) => (
                  <div key={s.suffix + s.value} className="rounded-2xl border border-[var(--color-border)] p-4">
                    <p className="font-[var(--font-display)] text-2xl font-bold text-gradient">
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{t(s.label, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-text-muted)]"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} className="animate-[bounce-down_2s_ease-in-out_infinite]" />
      </motion.a>
    </section>
  );
}
