"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

export function Hero() {
  const { lang } = useLang();
  const h = content.hero;
  const typed = useTyping([...h.roles[lang]]);

  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        {/* left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-[var(--color-text-muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            {lang === "vi" ? "Sẵn sàng cho dự án mới" : "Available for new projects"}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-lg text-[var(--color-text-muted)]"
          >
            {t(h.greeting, lang)}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {h.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 flex h-10 items-center font-[var(--font-mono)] text-2xl font-medium sm:text-3xl"
          >
            <span className="text-gradient">{typed}</span>
            <span className="ml-1 inline-block h-7 w-[3px] animate-pulse bg-[var(--color-cyan)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]"
          >
            {t(h.tagline, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton href="#projects">{t(h.cta.projects, lang)} →</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail size={16} /> {t(h.cta.contact, lang)}
            </MagneticButton>
            <MagneticButton href="#" variant="ghost">
              <FileDown size={16} /> {t(h.cta.cv, lang)}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex gap-3"
          >
            {[
              { icon: GithubIcon, href: content.socials.github },
              { icon: LinkedinIcon, href: content.socials.linkedin },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass grid h-11 w-11 place-items-center rounded-full text-[var(--color-text-muted)] transition-all hover:-translate-y-1 hover:text-[var(--color-text)]"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* right: floating glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="animate-float">
            <div className="gradient-border glass-strong relative rounded-[28px] p-8 shadow-[var(--shadow-glow)]">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="grid h-16 w-16 place-items-center rounded-2xl font-[var(--font-display)] text-2xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-purple))" }}
                >
                  QT
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-lg font-bold">{h.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">ERP · AI · Automation</p>
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

      {/* scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-text-dim)]"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} className="animate-[bounce-down_2s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
