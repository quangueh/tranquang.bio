"use client";

import { motion } from "framer-motion";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { useLang, t } from "@/lib/i18n";
import { content } from "@/lib/content";

export function Skills() {
  const { lang } = useLang();
  const s = content.skills;

  return (
    <section id="skills" className="py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t(s.eyebrow, lang)} title={t(s.title, lang)} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {s.items.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 4) * 0.06}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                data-cursor
                className="gradient-border glass group relative h-full overflow-hidden rounded-3xl p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-[220%]" />
                <h3 className="font-[var(--font-display)] text-lg font-semibold tracking-tight">{skill.name}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t(skill.desc, lang)}</p>
                <div className="mt-4 flex gap-4 font-[var(--font-mono)] text-xs text-[var(--color-text-dim)]">
                  <span>
                    <span className="text-[var(--color-cyan)]">{skill.years}</span>{" "}
                    {lang === "vi" ? "năm" : "yrs"}
                  </span>
                  <span>
                    <span className="text-[var(--color-blue)]">{skill.projects}</span>{" "}
                    {lang === "vi" ? "dự án" : "projects"}
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
