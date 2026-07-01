"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../brand-icons";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content, type Lang } from "@/lib/content";

function ProjectCard({ proj, lang }: { proj: (typeof content.projects.items)[number]; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(mx, { stiffness: 150, damping: 15 });
  const ry = useSpring(my, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor
      className="gradient-border-run glass group flex flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      style={{
        rotateY: rx,
        rotateX: ry,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      {/* Media */}
      <div className="relative h-44 overflow-hidden" data-cursor-image>
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${proj.c1}, ${proj.c2})` }}
        />
        <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 font-[var(--font-mono)] text-xs text-white/90">
          {proj.category}
        </span>
        <div className="absolute inset-0 flex items-center justify-center font-[var(--font-display)] text-3xl font-bold tracking-tight text-white/90">
          {proj.title}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-[var(--font-display)] text-xl font-semibold tracking-tight">{proj.title}</h3>
        <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{t(proj.desc, lang)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--color-bg-soft)] px-2.5 py-1 font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-4">
          <a
            href={proj.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-cyan)] active:scale-95"
          >
            <ExternalLink size={15} /> Demo
          </a>
          <a
            href={proj.code}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] active:scale-95"
          >
            <GithubIcon size={15} /> Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { lang } = useLang();
  const p = content.projects;
  const [filter, setFilter] = useState("All");

  const filtered = p.items.filter((it) => filter === "All" || it.category === filter);

  return (
    <section id="projects" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(p.eyebrow, lang)} title={t(p.title, lang)} />

        {/* Filters */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {p.filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all active:scale-95 ${
                  filter === f ? "text-white" : "glass text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "linear-gradient(135deg, var(--color-blue), var(--color-cyan))" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <ProjectCard key={proj.title} proj={proj} lang={lang} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
