"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

const sections = ["home", "about", "skills", "experience", "projects", "contact"] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const links = sections
    .filter((s) => s !== "home")
    .map((id) => ({ id, label: t(content.nav[id as keyof typeof content.nav], lang) }));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-x">
        <nav
          className={`mt-4 flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled ? "glass-strong shadow-[var(--shadow-card)]" : "border border-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-[var(--font-display)] text-lg font-bold">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-purple))", boxShadow: "0 0 12px var(--color-purple)" }}
            />
            QT
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: "color-mix(in srgb, var(--color-purple) 14%, transparent)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={active === l.id ? "text-[var(--color-text)]" : ""}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="glass grid h-10 w-10 place-items-center rounded-full text-xs font-bold transition-colors hover:border-[var(--color-border-strong)]"
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="glass grid h-10 w-10 place-items-center rounded-full transition-colors hover:border-[var(--color-border-strong)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-x md:hidden"
          >
            <ul className="glass-strong mt-2 flex flex-col gap-1 rounded-3xl p-3">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      active === l.id ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
