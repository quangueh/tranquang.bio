"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../brand-icons";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

export function Projects() {
  const { lang } = useLang();
  const p = content.projects;
  const [filter, setFilter] = useState("All");

  const filtered = p.items.filter((it) => filter === "All" || it.category === filter);

  return (
    <section id="projects" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(p.eyebrow, lang)} title={t(p.title, lang)} />

        {/* filters */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            {p.filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === f ? "text-white" : "glass text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: "linear-gradient(120deg, var(--color-blue), var(--color-purple))" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.article
                key={proj.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -10 }}
                data-cursor
                className="gradient-border glass group flex flex-col overflow-hidden rounded-3xl"
              >
                {/* media */}
                <div className="relative h-44 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${proj.c1}, ${proj.c2})` }}
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-black/20 px-3 py-1 font-[var(--font-mono)] text-xs text-white backdrop-blur">
                    {proj.category}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center font-[var(--font-display)] text-3xl font-bold text-white/90">
                    {proj.title}
                  </div>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-[var(--font-display)] text-xl font-semibold">{proj.title}</h3>
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
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-cyan)] hover:underline"
                    >
                      <ExternalLink size={15} /> Demo
                    </a>
                    <a
                      href={proj.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    >
                      <GithubIcon size={15} /> Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
